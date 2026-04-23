import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMergeRequest } from "@/domain/merge-request/gitlabMergeRequest";

export class MergeMR extends BaseUseCase<
  { projectId: number | string; mrIid: number; squash?: boolean; squash_commit_message?: string; merge_commit_message?: string },
  GitLabMergeRequest
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; mrIid: number; squash?: boolean; squash_commit_message?: string; merge_commit_message?: string },
  ): Promise<GitLabMergeRequest> {
    return this.mergeRequestService.mergeMR(params.projectId, params.mrIid, {
      squash: params.squash,
      squash_commit_message: params.squash_commit_message,
      merge_commit_message: params.merge_commit_message,
    });
  }
}
