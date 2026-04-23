import { GitLabIssue, GitLabIssueNote } from "@/domain/issue/gitlabIssue";

export interface IssueService {
  listIssues(
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
  ): Promise<GitLabIssue[]>;

  getIssue(
    projectId: number | string,
    issueIid: number,
  ): Promise<GitLabIssue>;

  createIssue(
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
  ): Promise<GitLabIssue>;

  updateIssue(
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
  ): Promise<GitLabIssue>;

  closeIssue(
    projectId: number | string,
    issueIid: number,
  ): Promise<GitLabIssue>;

  listIssueNotes(
    projectId: number | string,
    issueIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabIssueNote[]>;

  createIssueNote(
    projectId: number | string,
    issueIid: number,
    body: string,
  ): Promise<GitLabIssueNote>;
}
