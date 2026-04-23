import { ProjectService } from "@/application/services/projectService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabCommit } from "@/domain/project/gitlabProject";

export class ListCommits extends BaseUseCase<
  { projectId: number | string; page?: number; perPage?: number; refName?: string; since?: string; until?: string },
  GitLabCommit[]
> {
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
  }

  override execute(
    params: { projectId: number | string; page?: number; perPage?: number; refName?: string; since?: string; until?: string },
  ): Promise<GitLabCommit[]> {
    return this.projectService.listCommits(params.projectId, {
      page: params.page,
      perPage: params.perPage,
      refName: params.refName,
      since: params.since,
      until: params.until,
    });
  }
}
