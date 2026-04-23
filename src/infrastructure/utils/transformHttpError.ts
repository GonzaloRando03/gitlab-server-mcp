import { GitLabErrorType } from "@/domain/errors/gitlabErrorType";
import { GitLabAPIError } from "@/domain/errors/gitlabApiError";

export function transformHttpError(
  error: unknown,
  operation: string,
): GitLabAPIError {
  if (error instanceof GitLabAPIError) {
    return error;
  }

  if (error instanceof TypeError && error.message.includes("fetch")) {
    return new GitLabAPIError(
      `Network error: ${error.message}`,
      GitLabErrorType.NETWORK_ERROR,
      { operation },
    );
  }

  if (error instanceof SyntaxError) {
    return new GitLabAPIError(
      `Failed to parse response: ${error.message}`,
      GitLabErrorType.UNKNOWN_ERROR,
      { operation },
    );
  }

  return new GitLabAPIError(
    error instanceof Error ? error.message : String(error),
    GitLabErrorType.UNKNOWN_ERROR,
    { operation },
  );
}
