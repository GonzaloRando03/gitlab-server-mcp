import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMergeRequest } from "@/domain/merge-request/gitlabMergeRequest";

export class CreateMR extends BaseUseCase<
  { projectId: number | string; source_branch: string; target_branch: string; title: string; description?: string; remove_source_branch?: boolean; squash?: boolean },
  GitLabMergeRequest
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; source_branch: string; target_branch: string; title: string; description?: string; remove_source_branch?: boolean; squash?: boolean },
  ): Promise<GitLabMergeRequest> {
    return this.mergeRequestService.createMR(params.projectId, {
      source_branch: params.source_branch,
      target_branch: params.target_branch,
      title: params.title,
      description: params.description,
      remove_source_branch: params.remove_source_branch,
      squash: params.squash,
    });
  }
}
