import { ActionPanel, Color, List, OpenInBrowserAction, preferences } from '@raycast/api'
import { useState, useEffect } from 'react'
import { groupBy } from '../utils/functions'
import { github } from '../utils/github'

interface Props {
  initialSearch?: string
}

export function PullRequestsList({ initialSearch = '' }: Props) {
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([])

  useEffect(() => {
    async function fetchPullRequests() {
      setIsLoading(true)

      const { data } = await github.request('GET /search/issues', {
        q: `is:pr is:open ${initialSearch} ${search}`,
      })

      setIsLoading(false)
      setPullRequests(data.items as PullRequest[])
    }

    fetchPullRequests()
  }, [initialSearch, search])

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearch} throttle>
      {Object.entries(groupBy(pullRequests, 'repository_url')).map(([repository, list]) => {
        const title = repository.split('/').at(-1)

        return (
          <List.Section key={title} title={title}>
            {list.map((pullRequest) => {
              const accessoryIcon =
                pullRequest.user.login === preferences.username.value
                  ? { source: 'person.png', tintColor: Color.PrimaryText }
                  : undefined

              return (
                <List.Item
                  key={pullRequest.id}
                  title={pullRequest.title}
                  subtitle={`#${pullRequest.number}`}
                  icon={{ source: 'pull-request.png', tintColor: Color.Green }}
                  accessoryIcon={accessoryIcon}
                  actions={
                    <ActionPanel>
                      <OpenInBrowserAction url={pullRequest.html_url} title="Open in browser" />
                    </ActionPanel>
                  }
                />
              )
            })}
          </List.Section>
        )
      })}
    </List>
  )
}
