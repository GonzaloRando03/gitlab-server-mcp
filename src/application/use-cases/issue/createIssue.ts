import { IssueService } from "@/application/services/issueService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabIssue } from "@/domain/issue/gitlabIssue";

export class CreateIssue extends BaseUseCase<
  { projectId: number | string; title: string; description?: string; labels?: string; milestone_id?: number; assignees?: string[]; weight?: number; issue_type?: "issue" | "incident" | "test_case" },
  GitLabIssue
> {
  issueService: IssueService;

  constructor(issueService: IssueService) {
    super();
    this.issueService = issueService;
  }

  override execute(
    params: { projectId: number | string; title: string; description?: string; labels?: string; milestone_id?: number; assignees?: string[]; weight?: number; issue_type?: "issue" | "incident" | "test_case" },
  ): Promise<GitLabIssue> {
    return this.issueService.createIssue(params.projectId, {
      title: params.title,
      description: params.description,
      labels: params.labels,
      milestone_id: params.milestone_id,
      assignees: params.assignees,
      weight: params.weight,
      issue_type: params.issue_type,
    });
  }
}
