import { PipelineService } from "@/application/services/pipelineService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabPipeline } from "@/domain/pipeline/gitlabPipeline";

export class ListPipelines extends BaseUseCase<
  { projectId: number | string; page?: number; perPage?: number; ref?: string; status?: string; orderBy?: string; sort?: string },
  GitLabPipeline[]
> {
  pipelineService: PipelineService;

  constructor(pipelineService: PipelineService) {
    super();
    this.pipelineService = pipelineService;
  }

  override execute(
    params: { projectId: number | string; page?: number; perPage?: number; ref?: string; status?: string; orderBy?: string; sort?: string },
  ): Promise<GitLabPipeline[]> {
    return this.pipelineService.listPipelines(params.projectId, {
      page: params.page,
      perPage: params.perPage,
      ref: params.ref,
      status: params.status,
      orderBy: params.orderBy,
      sort: params.sort,
    });
  }
}
