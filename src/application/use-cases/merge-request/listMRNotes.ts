import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMRNote } from "@/domain/merge-request/gitlabMergeRequest";

export class ListMRNotes extends BaseUseCase<
  { projectId: number | string; mrIid: number; page?: number; perPage?: number },
  GitLabMRNote[]
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; mrIid: number; page?: number; perPage?: number },
  ): Promise<GitLabMRNote[]> {
    return this.mergeRequestService.listMRNotes(params.projectId, params.mrIid, {
      page: params.page,
      perPage: params.perPage,
    });
  }
}
