import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabIssue, GitLabIssueNote } from "@/domain/issue/gitlabIssue";
import { IssueService } from "@/application/services/issueService";

export class IssueController
  extends GitLabApiBaseController
  implements IssueService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async listIssues(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      state?: "opened" | "closed" | "all";
      labels?: string;
      search?: string;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<GitLabIssue[]> {
    const response = await this.request<GitLabIssue[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/issues`,
      {
        page: params?.page,
        per_page: params?.perPage,
        state: params?.state,
        labels: params?.labels,
        search: params?.search,
        order_by: params?.orderBy,
        sort: params?.sort,
      },
      "List issues",
    );
    return Array.isArray(response) ? response : [];
  }

  async getIssue(
    projectId: number | string,
    issueIid: number,
  ): Promise<GitLabIssue> {
    return this.request<GitLabIssue>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/issues/${issueIid}`,
      undefined,
      "Get issue",
    );
  }

  async createIssue(
    projectId: number | string,
    params: {
      title: string;
      description?: string;
      labels?: string;
      milestone_id?: number;
      assignees?: string[];
      weight?: number;
      issue_type?: "issue" | "incident" | "test_case";
    },
  ): Promise<GitLabIssue> {
    return this.request<GitLabIssue>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/issues`,
      params,
      "Create issue",
    );
  }

  async updateIssue(
    projectId: number | string,
    issueIid: number,
    params: {
      title?: string;
      description?: string;
      state_event?: "close" | "reopen";
      labels?: string;
      assignee_ids?: number[];
      milestone_id?: number | null;
      weight?: number | null;
    },
  ): Promise<GitLabIssue> {
    return this.request<GitLabIssue>(
      "PUT",
      `/projects/${encodeURIComponent(String(projectId))}/issues/${issueIid}`,
      params,
      "Update issue",
    );
  }

  async closeIssue(
    projectId: number | string,
    issueIid: number,
  ): Promise<GitLabIssue> {
    return this.request<GitLabIssue>(
      "PUT",
      `/projects/${encodeURIComponent(String(projectId))}/issues/${issueIid}`,
      { state_event: "close" },
      "Close issue",
    );
  }

  async listIssueNotes(
    projectId: number | string,
    issueIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabIssueNote[]> {
    const response = await this.request<GitLabIssueNote[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/issues/${issueIid}/notes`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List issue notes",
    );
    return Array.isArray(response) ? response : [];
  }

  async createIssueNote(
    projectId: number | string,
    issueIid: number,
    body: string,
  ): Promise<GitLabIssueNote> {
    return this.request<GitLabIssueNote>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/issues/${issueIid}/notes`,
      { body },
      "Create issue note",
    );
  }
}
