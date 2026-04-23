import { IssueService } from "@/application/services/issueService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabIssue } from "@/domain/issue/gitlabIssue";

export class ListIssues extends BaseUseCase<
  { projectId: number | string; page?: number; perPage?: number; state?: "opened" | "closed" | "all"; labels?: string; search?: string; orderBy?: string; sort?: string },
  GitLabIssue[]
> {
  issueService: IssueService;

  constructor(issueService: IssueService) {
    super();
    this.issueService = issueService;
  }

  override execute(
    params: { projectId: number | string; page?: number; perPage?: number; state?: "opened" | "closed" | "all"; labels?: string; search?: string; orderBy?: string; sort?: string },
  ): Promise<GitLabIssue[]> {
    return this.issueService.listIssues(params.projectId, {
      page: params.page,
      perPage: params.perPage,
      state: params.state,
      labels: params.labels,
      search: params.search,
      orderBy: params.orderBy,
      sort: params.sort,
    });
  }
}
