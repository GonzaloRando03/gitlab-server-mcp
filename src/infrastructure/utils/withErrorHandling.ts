import { RetryOptions } from "@/domain/config/retryOptions";
import { GitLabAPIError } from "@/domain/errors/gitlabApiError";
import { shouldRetry } from "@/infrastructure/utils/shouldRetry";
import { sleep } from "@/infrastructure/utils/sleep";
import { transformHttpError } from "@/infrastructure/utils/transformHttpError";

export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2,
};

export async function withErrorHandling<T>(
  operation: string,
  apiCall: () => Promise<T>,
  retryOptions?: Partial<RetryOptions>,
): Promise<T> {
  const options = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };
  let lastError: unknown;
  let delay = options.initialDelay;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError =
        error instanceof GitLabAPIError
          ? error
          : transformHttpError(error, operation);

      if (attempt < options.maxRetries && shouldRetry(lastError)) {
        const retryDelay = Math.min(delay, options.maxDelay);
        await sleep(retryDelay);
        delay *= options.backoffFactor;
      } else {
        break;
      }
    }
  }

  throw lastError;
}
