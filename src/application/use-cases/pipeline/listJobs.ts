import { PipelineService } from "@/application/services/pipelineService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabJob } from "@/domain/pipeline/gitlabPipeline";

export class ListJobs extends BaseUseCase<
  { projectId: number | string; pipelineId: number; page?: number; perPage?: number },
  GitLabJob[]
> {
  pipelineService: PipelineService;

  constructor(pipelineService: PipelineService) {
    super();
    this.pipelineService = pipelineService;
  }

  override execute(
    params: { projectId: number | string; pipelineId: number; page?: number; perPage?: number },
  ): Promise<GitLabJob[]> {
    return this.pipelineService.listJobs(params.projectId, params.pipelineId, {
      page: params.page,
      perPage: params.perPage,
    });
  }
}
