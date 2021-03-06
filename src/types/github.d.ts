interface User {
  login: string
}

interface PullRequest {
  id: number
  number: number
  title: string
  html_url: string
  repository_url: string
  user: User
}

interface Release {
  id: number
  name: string
  published_at: string
  html_url: string
}

interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  owner: User
}
