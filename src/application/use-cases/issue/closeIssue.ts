import { IssueService } from "@/application/services/issueService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabIssue } from "@/domain/issue/gitlabIssue";

export class CloseIssue extends BaseUseCase<
  { projectId: number | string; issueIid: number },
  GitLabIssue
> {
  issueService: IssueService;

  constructor(issueService: IssueService) {
    super();
    this.issueService = issueService;
  }

  override execute(
    params: { projectId: number | string; issueIid: number },
  ): Promise<GitLabIssue> {
    return this.issueService.closeIssue(params.projectId, params.issueIid);
  }
}
