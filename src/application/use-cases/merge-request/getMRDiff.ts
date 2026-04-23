import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMRDiffFile } from "@/domain/merge-request/gitlabMergeRequest";

export class GetMRDiff extends BaseUseCase<
  { projectId: number | string; mrIid: number },
  GitLabMRDiffFile[]
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(params: {
    projectId: number | string;
    mrIid: number;
  }): Promise<GitLabMRDiffFile[]> {
    return this.mergeRequestService.getMRDiff(params.projectId, params.mrIid);
  }
}
