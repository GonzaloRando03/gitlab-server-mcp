import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMergeRequest } from "@/domain/merge-request/gitlabMergeRequest";

export class ApproveMR extends BaseUseCase<
  { projectId: number | string; mrIid: number },
  { approved: boolean }
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; mrIid: number },
  ): Promise<{ approved: boolean }> {
    return this.mergeRequestService.approveMR(params.projectId, params.mrIid);
  }
}
