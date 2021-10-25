import { preferences } from '@raycast/api'
import { Octokit } from 'octokit'

export const github = new Octokit({
  auth: preferences.token.value,
})
