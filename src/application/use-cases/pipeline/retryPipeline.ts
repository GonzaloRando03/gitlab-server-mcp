import { PipelineService } from "@/application/services/pipelineService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabPipeline } from "@/domain/pipeline/gitlabPipeline";

export class RetryPipeline extends BaseUseCase<
  { projectId: number | string; pipelineId: number },
  GitLabPipeline
> {
  pipelineService: PipelineService;

  constructor(pipelineService: PipelineService) {
    super();
    this.pipelineService = pipelineService;
  }

  override execute(
    params: { projectId: number | string; pipelineId: number },
  ): Promise<GitLabPipeline> {
    return this.pipelineService.retryPipeline(params.projectId, params.pipelineId);
  }
}
