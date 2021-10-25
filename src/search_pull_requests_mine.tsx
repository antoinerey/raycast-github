import { PullRequestsList } from './components/PullRequestsList'

export default function View() {
  return <PullRequestsList initialSearch="assignee:@me" />
}
