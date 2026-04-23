import { MergeRequestService } from "@/application/services/mergeRequestService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabMergeRequest } from "@/domain/merge-request/gitlabMergeRequest";

export class ListMRs extends BaseUseCase<
  { projectId: number | string; page?: number; perPage?: number; state?: "opened" | "closed" | "merged" | "all"; orderBy?: string; sort?: string; search?: string },
  GitLabMergeRequest[]
> {
  mergeRequestService: MergeRequestService;

  constructor(mergeRequestService: MergeRequestService) {
    super();
    this.mergeRequestService = mergeRequestService;
  }

  override execute(
    params: { projectId: number | string; page?: number; perPage?: number; state?: "opened" | "closed" | "merged" | "all"; orderBy?: string; sort?: string; search?: string },
  ): Promise<GitLabMergeRequest[]> {
    return this.mergeRequestService.listMRs(params.projectId, {
      page: params.page,
      perPage: params.perPage,
      state: params.state,
      orderBy: params.orderBy,
      sort: params.sort,
      search: params.search,
    });
  }
}
