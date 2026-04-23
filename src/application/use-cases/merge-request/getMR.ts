import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMergeRequest } from "@/domain/merge-request/gitlabMergeRequest";

export class GetMR extends BaseUseCase<
  { projectId: number | string; mrIid: number },
  GitLabMergeRequest
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; mrIid: number },
  ): Promise<GitLabMergeRequest> {
    return this.mergeRequestService.getMR(params.projectId, params.mrIid);
  }
}
