import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMRNote } from "@/domain/merge-request/gitlabMergeRequest";

export class CreateMRNote extends BaseUseCase<
  { projectId: number | string; mrIid: number; body: string },
  GitLabMRNote
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; mrIid: number; body: string },
  ): Promise<GitLabMRNote> {
    return this.mergeRequestService.createMRNote(params.projectId, params.mrIid, params.body);
  }
}
