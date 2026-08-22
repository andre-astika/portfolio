export const GITHUB_PAGES_INQUIRY_API_ORIGIN = "https://andrefolio-f6gtj9q8.manus.space";

export function getTrpcApiUrl(isGitHubPagesBuild: boolean) {
  return `${isGitHubPagesBuild ? GITHUB_PAGES_INQUIRY_API_ORIGIN : ""}/api/trpc`;
}

export function shouldIncludeTrpcCredentials(isGitHubPagesBuild: boolean) {
  return !isGitHubPagesBuild;
}
