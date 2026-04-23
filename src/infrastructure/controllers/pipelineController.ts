import { GitLabApiBaseController } from "@/infrastructure/controllers/gitlabApiBaseController";
import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { GitLabPipeline, GitLabJob } from "@/domain/pipeline/gitlabPipeline";
import { PipelineService } from "@/application/services/pipelineService";

export class PipelineController
  extends GitLabApiBaseController
  implements PipelineService
{
  constructor(config: GitLabApiConfig) {
    super(config);
  }

  async listPipelines(
    projectId: number | string,
    params?: {
      page?: number;
      perPage?: number;
      ref?: string;
      status?: string;
      orderBy?: string;
      sort?: string;
    },
  ): Promise<GitLabPipeline[]> {
    const response = await this.request<GitLabPipeline[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines`,
      {
        page: params?.page,
        per_page: params?.perPage,
        ref: params?.ref,
        status: params?.status,
        order_by: params?.orderBy,
        sort: params?.sort,
      },
      "List pipelines",
    );
    return Array.isArray(response) ? response : [];
  }

  async getPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline> {
    return this.request<GitLabPipeline>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines/${pipelineId}`,
      undefined,
      "Get pipeline",
    );
  }

  async triggerPipeline(
    projectId: number | string,
    params: {
      ref: string;
      variables?: Array<{ key: string; value: string }>;
    },
  ): Promise<GitLabPipeline> {
    return this.request<GitLabPipeline>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines`,
      params,
      "Trigger pipeline",
    );
  }

  async retryPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline> {
    return this.request<GitLabPipeline>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines/${pipelineId}/retry`,
      undefined,
      "Retry pipeline",
    );
  }

  async cancelPipeline(
    projectId: number | string,
    pipelineId: number,
  ): Promise<GitLabPipeline> {
    return this.request<GitLabPipeline>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines/${pipelineId}/cancel`,
      undefined,
      "Cancel pipeline",
    );
  }

  async listJobs(
    projectId: number | string,
    pipelineId: number,
    params?: { page?: number; perPage?: number },
  ): Promise<GitLabJob[]> {
    const response = await this.request<GitLabJob[]>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/pipelines/${pipelineId}/jobs`,
      {
        page: params?.page,
        per_page: params?.perPage,
      },
      "List pipeline jobs",
    );
    return Array.isArray(response) ? response : [];
  }

  async getJob(
    projectId: number | string,
    jobId: number,
  ): Promise<GitLabJob> {
    return this.request<GitLabJob>(
      "GET",
      `/projects/${encodeURIComponent(String(projectId))}/jobs/${jobId}`,
      undefined,
      "Get job",
    );
  }

  async retryJob(
    projectId: number | string,
    jobId: number,
  ): Promise<GitLabJob> {
    return this.request<GitLabJob>(
      "POST",
      `/projects/${encodeURIComponent(String(projectId))}/jobs/${jobId}/retry`,
      undefined,
      "Retry job",
    );
  }
}
