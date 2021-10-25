import { ActionPanel, Color, List, OpenInBrowserAction, useNavigation } from '@raycast/api'
import { useState, useEffect } from 'react'
import { PullRequestsList } from './PullRequestsList'
import { ReleasesList } from './ReleasesList'
import { github } from '../utils/github'

interface Props {
  initialSearch?: string
}

export function RepositoriesList({ initialSearch = '' }: Props) {
  const { push } = useNavigation()
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    async function fetchRepositories() {
      setIsLoading(true)

      const { data } = await github.request('GET /search/repositories', {
        q: `${initialSearch} ${search}`,
      })

      setIsLoading(false)
      setRepositories(data.items as Repository[])
    }

    fetchRepositories()
  }, [initialSearch, search])

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearch} throttle>
      {repositories.map((repository) => (
        <List.Item
          key={repository.id}
          title={repository.full_name}
          icon={{ source: 'repository.png', tintColor: Color.PrimaryText }}
          actions={
            <ActionPanel>
              <OpenInBrowserAction url={repository.html_url} title="Open in browser" />
              <ActionPanel.Item
                title="Open pull requests"
                icon={{ source: 'pull-request.png', tintColor: Color.PrimaryText }}
                onAction={() => push(<PullRequestsList initialSearch={`repo:${repository.full_name}`} />)}
              />
              <ActionPanel.Item
                title="Open releases"
                icon={{ source: 'tag.png', tintColor: Color.PrimaryText }}
                shortcut={{ modifiers: ['cmd'], key: 'r' }}
                onAction={() => push(<ReleasesList repository={repository} />)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  )
}
