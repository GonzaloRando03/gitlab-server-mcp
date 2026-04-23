import {
  GitLabMergeRequest,
  GitLabMRNote,
  GitLabMRDiscussion,
  GitLabMRDiffFile,
} from "@/domain/merge-request/gitlabMergeRequest";

export interface MergeRequestService {
  listMRs(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      state?: "opened" | "closed" | "merged" | "all";
      orderBy?: string;
      sort?: string;
      search?: string;
    },
  ): Promise<GitLabMergeRequest[]>;

  getMR(projectId: number | string, mrIid: number): Promise<GitLabMergeRequest>;

  createMR(
    projectId: number | string,
    params: {
      source_branch: string;
      target_branch: string;
      title: string;
      description?: string;
      remove_source_branch?: boolean;
      squash?: boolean;
    },
  ): Promise<GitLabMergeRequest>;

  updateMR(
    projectId: number | string,
    mrIid: number,
    params: {
      title?: string;
      description?: string;
      state_event?: "close" | "reopen";
      target_branch?: string;
    },
  ): Promise<GitLabMergeRequest>;

  approveMR(
    projectId: number | string,
    mrIid: number,
  ): Promise<{ approved: boolean }>;

  unapproveMR(
    projectId: number | string,
    mrIid: number,
  ): Promise<{ approved: boolean }>;

  mergeMR(
    projectId: number | string,
    mrIid: number,
    params?: {
      squash?: boolean;
      squash_commit_message?: string;
      merge_commit_message?: string;
    },
  ): Promise<GitLabMergeRequest>;

  listMRNotes(
    projectId: number | string,
    mrIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabMRNote[]>;

  createMRNote(
    projectId: number | string,
    mrIid: number,
    body: string,
  ): Promise<GitLabMRNote>;

  listMRDiscussions(
    projectId: number | string,
    mrIid: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabMRDiscussion[]>;

  getMRDiff(
    projectId: number | string,
    mrIid: number,
  ): Promise<GitLabMRDiffFile[]>;
}
