import { GitLabPipeline, GitLabJob } from "@/domain/pipeline/gitlabPipeline";

export interface PipelineService {
  listPipelines(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      ref?: string;
      status?: string;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<GitLabPipeline[]>;

  getPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline>;

  triggerPipeline(
    projectId: number | string,
    params: {
      ref: string;
      variables?: Array<{ key: string; value: string }>;
    },
  ): Promise<GitLabPipeline>;

  retryPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline>;

  cancelPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline>;

  listJobs(
    projectId: number | string,
    pipelineId: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabJob[]>;

  getJob(
    projectId: number | string,
    jobId: number,
  ): Promise<GitLabJob>;

  retryJob(
    projectId: number | string,
    jobId: number,
  ): Promise<GitLabJob>;
}
