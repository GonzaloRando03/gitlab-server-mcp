import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabErrorType } from "@/domain/errors/gitlabErrorType";
import { GitLabAPIError } from "@/domain/errors/gitlabApiError";
import { withErrorHandling } from "@/infrastructure/utils/withErrorHandling";
import { classifyHttpError } from "@/infrastructure/utils/classifyHttpError";

export class GitLabApiBaseController {
  private readonly baseUrl: string;
  private readonly headers: Record<string, string>;

  constructor(config: GitLabApiConfig) {
    this.baseUrl = (config.baseUrl ?? "https://gitlab.com").replace(/\/+$/, "");

    if (!config.token) {
      throw new GitLabAPIError(
        "GitLab authentication has not been configured",
        GitLabErrorType.CONFIGURATION_ERROR,
        {
          solution:
            "Provide 'GITLAB_TOKEN' environment variable with a valid GitLab Personal Access Token.",
        },
      );
    }

    this.headers = {
      "PRIVATE-TOKEN": config.token,
      "Content-Type": "application/json",
    };
  }

  async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    params?: Record<string, unknown>,
    operation?: string,
  ): Promise<T> {
    const op = operation ?? `${method} ${path}`;

    return withErrorHandling(op, async () => {
      let url: string;
      const fetchOptions: RequestInit = {
        method,
        headers: { ...this.headers },
      };

      if (method === "GET") {
        const queryString = this.buildQueryString(params);
        url = `${this.baseUrl}/api/v4${path}${queryString ? `?${queryString}` : ""}`;
      } else {
        url = `${this.baseUrl}/api/v4${path}`;
        if (params && Object.keys(params).length > 0) {
          fetchOptions.body = JSON.stringify(params);
        }
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const { type, solution } = classifyHttpError(response.status);
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorBody = await response.text();
          if (errorBody) errorMessage += `: ${errorBody}`;
        } catch {
          // Ignore errors reading body
        }
        throw new GitLabAPIError(errorMessage, type, {
          operation: op,
          statusCode: response.status,
          solution,
        });
      }

      // Some endpoints return 204 No Content
      if (response.status === 204) return {} as T;

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        return (await response.json()) as T;
      }
      return (await response.text()) as T;
    });
  }

  private buildQueryString(params?: Record<string, unknown>): string {
    if (!params) return "";

    const parts: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        if (value.length > 0) {
          for (const item of value) {
            parts.push(
              `${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`,
            );
          }
        }
      } else if (typeof value === "boolean") {
        parts.push(`${encodeURIComponent(key)}=${value ? "true" : "false"}`);
      } else if (typeof value === "number") {
        parts.push(`${encodeURIComponent(key)}=${value}`);
      } else {
        parts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
        );
      }
    }

    return parts.join("&");
  }
}
