import { GitLabErrorType } from "@/domain/errors/gitlabErrorType";

export function classifyHttpError(status: number): {
  type: GitLabErrorType;
  solution: string;
} {
  switch (status) {
    case 401:
      return {
        type: GitLabErrorType.AUTHENTICATION_ERROR,
        solution:
          "Check your GITLAB_TOKEN environment variable is correct and has the required permissions.",
      };
    case 403:
      return {
        type: GitLabErrorType.AUTHENTICATION_ERROR,
        solution:
          "Your token does not have permission to perform this action. Check your token scopes.",
      };
    case 404:
      return {
        type: GitLabErrorType.NOT_FOUND,
        solution:
          "The requested resource was not found. Check the project ID, MR IID, or other identifiers.",
      };
    case 429:
      return {
        type: GitLabErrorType.RATE_LIMIT,
        solution:
          "GitLab API rate limit reached. Wait before making more requests.",
      };
    case 400:
      return {
        type: GitLabErrorType.VALIDATION_ERROR,
        solution: "Invalid request parameters. Check the API documentation for valid values.",
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: GitLabErrorType.SERVER_ERROR,
        solution: "GitLab server error. Try again later.",
      };
    default:
      return {
        type: GitLabErrorType.UNKNOWN_ERROR,
        solution: "An unexpected error occurred.",
      };
  }
}
