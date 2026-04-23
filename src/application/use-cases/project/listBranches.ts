import { ProjectService } from "@/application/services/projectService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabBranch } from "@/domain/project/gitlabProject";

export class ListBranches extends BaseUseCase<
  { projectId: number | string; page?: number; perPage?: number },
  GitLabBranch[]
> {
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
  }

  override execute(
    params: { projectId: number | string; page?: number; perPage?: number },
  ): Promise<GitLabBranch[]> {
    return this.projectService.listBranches(params.projectId, {
      page: params.page,
      perPage: params.perPage,
    });
  }
}
