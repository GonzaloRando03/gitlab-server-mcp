import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import {
  GitLabMergeRequest,
  GitLabMRNote,
  GitLabMRDiscussion,
  GitLabMRDiffFile,
} from "@/domain/merge-request/gitlabMergeRequest";
import { MergeRequestService } from "@/application/services/mergeRequestService";

export class MergeRequestController
  extends GitLabApiBaseController
  implements MergeRequestService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async listMRs(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      state?: "opened" | "closed" | "merged" | "all";
      orderBy?: string;
      sort?: string;
      search?: string;
    },
  ): Promise<GitLabMergeRequest[]> {
    const response = await this.request<GitLabMergeRequest[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests`,
      {
        page: params?.page,
        per_page: params?.perPage,
        state: params?.state,
        order_by: params?.orderBy,
        sort: params?.sort,
        search: params?.search,
      },
      "List merge requests",
    );
    return Array.isArray(response) ? response : [];
  }

  async getMR(
    projectId: number | string,
    mrIid: number,
  ): Promise<GitLabMergeRequest> {
    return this.request<GitLabMergeRequest>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}`,
      undefined,
      "Get merge request",
    );
  }

  async createMR(
    projectId: number | string,
    params: {
      source_branch: string;
      target_branch: string;
      title: string;
      description?: string;
      remove_source_branch?: boolean;
      squash?: boolean;
    },
  ): Promise<GitLabMergeRequest> {
    return this.request<GitLabMergeRequest>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests`,
      {
        source_branch: params.source_branch,
        target_branch: params.target_branch,
        title: params.title,
        description: params.description,
        remove_source_branch: params.remove_source_branch,
        squash: params.squash,
      },
      "Create merge request",
    );
  }

  async updateMR(
    projectId: number | string,
    mrIid: number,
    params: {
      title?: string;
      description?: string;
      state_event?: "close" | "reopen";
      target_branch?: string;
    },
  ): Promise<GitLabMergeRequest> {
    return this.request<GitLabMergeRequest>(
      "PUT",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}`,
      params,
      "Update merge request",
    );
  }

  async approveMR(
    projectId: number | string,
    mrIid: number,
  ): Promise<{ approved: boolean }> {
    return this.request<{ approved: boolean }>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/approve`,
      undefined,
      "Approve merge request",
    );
  }

  async unapproveMR(
    projectId: number | string,
    mrIid: number,
  ): Promise<{ approved: boolean }> {
    return this.request<{ approved: boolean }>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/unapprove`,
      undefined,
      "Unapprove merge request",
    );
  }

  async mergeMR(
    projectId: number | string,
    mrIid: number,
    params?: {
      squash?: boolean;
      squash_commit_message?: string;
      merge_commit_message?: string;
    },
  ): Promise<GitLabMergeRequest> {
    return this.request<GitLabMergeRequest>(
      "PUT",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/merge`,
      params,
      "Merge merge request",
    );
  }

  async listMRNotes(
    projectId: number | string,
    mrIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabMRNote[]> {
    const response = await this.request<GitLabMRNote[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/notes`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List MR notes",
    );
    return Array.isArray(response) ? response : [];
  }

  async createMRNote(
    projectId: number | string,
    mrIid: number,
    body: string,
  ): Promise<GitLabMRNote> {
    return this.request<GitLabMRNote>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/notes`,
      { body },
      "Create MR note",
    );
  }

  async listMRDiscussions(
    projectId: number | string,
    mrIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabMRDiscussion[]> {
    const response = await this.request<GitLabMRDiscussion[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/discussions`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List MR discussions",
    );
    return Array.isArray(response) ? response : [];
  }

  async getMRDiff(
    projectId: number | string,
    mrIid: number,
  ): Promise<GitLabMRDiffFile[]> {
    const response = await this.request<GitLabMRDiffFile[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/merge_requests/${mrIid}/diffs`,
      undefined,
      "Get MR diff",
    );
    return Array.isArray(response) ? response : [];
  }
}
