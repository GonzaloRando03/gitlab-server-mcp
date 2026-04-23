import { ProjectService } from "@/application/services/projectService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabProject } from "@/domain/project/gitlabProject";

export class ListProjects extends BaseUseCase<
  { page?: number; perPage?: number; membership?: boolean; minAccessLevel?: number; search?: string; orderBy?: string; sort?: string } | undefined,
  { projects: GitLabProject[]; total: number }
> {
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
  }

  override execute(
    params?: { page?: number; perPage?: number; membership?: boolean; minAccessLevel?: number; search?: string; orderBy?: string; sort?: string },
  ): Promise<{ projects: GitLabProject[]; total: number }> {
    return this.projectService.listProjects(params);
  }
}
