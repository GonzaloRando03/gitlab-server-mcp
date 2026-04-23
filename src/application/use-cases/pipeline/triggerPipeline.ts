import { PipelineService } from "@/application/services/pipelineService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabPipeline } from "@/domain/pipeline/gitlabPipeline";

export class TriggerPipeline extends BaseUseCase<
  { projectId: number | string; ref: string; variables?: Array<{ key: string; value: string }> },
  GitLabPipeline
> {
  pipelineService: PipelineService;

  constructor(pipelineService: PipelineService) {
    super();
    this.pipelineService = pipelineService;
  }

  override execute(
    params: { projectId: number | string; ref: string; variables?: Array<{ key: string; value: string }> },
  ): Promise<GitLabPipeline> {
    return this.pipelineService.triggerPipeline(params.projectId, {
      ref: params.ref,
      variables: params.variables,
    });
  }
}
