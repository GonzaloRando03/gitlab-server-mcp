import { GitLabErrorType } from "@/domain/errors/gitlabErrorType";
import { GitLabAPIError } from "@/domain/errors/gitlabApiError";

export function shouldRetry(error: unknown): boolean {
  if (error instanceof GitLabAPIError) {
    return (
      error.type === GitLabErrorType.SERVER_ERROR ||
      error.type === GitLabErrorType.RATE_LIMIT ||
      error.type === GitLabErrorType.NETWORK_ERROR
    );
  }
  return false;
}
