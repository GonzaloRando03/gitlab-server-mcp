import { ProjectService } from "@/application/services/projectService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabProject } from "@/domain/project/gitlabProject";

export class ListGroupProjects extends BaseUseCase<
  {
    groupId: number | string;
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  },
  { projects: GitLabProject[]; total: number }
> {
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
  }

  override execute(params: {
    groupId: number | string;
    page?: number;
    perPage?: number;
    search?: string;
    orderBy?: string;
    sort?: string;
  }): Promise<{ projects: GitLabProject[]; total: number }> {
    const { groupId, ...rest } = params;
    return this.projectService.listGroupProjects(groupId, rest);
  }
}
