import { IssueService } from "@/application/services/issueService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabIssueNote } from "@/domain/issue/gitlabIssue";

export class AddCommentToIssue extends BaseUseCase<
  { projectId: number | string; issueIid: number; body: string },
  GitLabIssueNote
> {
  issueService: IssueService;

  constructor(issueService: IssueService) {
    super();
    this.issueService = issueService;
  }

  override execute(
    params: { projectId: number | string; issueIid: number; body: string },
  ): Promise<GitLabIssueNote> {
    return this.issueService.createIssueNote(params.projectId, params.issueIid, params.body);
  }
}
