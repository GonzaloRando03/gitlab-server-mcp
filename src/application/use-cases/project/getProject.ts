import { ProjectService } from "@/application/services/projectService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabProject } from "@/domain/project/gitlabProject";

export class GetProject extends BaseUseCase<
  number | string,
  GitLabProject
> {
  projectService: ProjectService;

  constructor(projectService: ProjectService) {
    super();
    this.projectService = projectService;
  }

  override execute(projectId: number | string): Promise<GitLabProject> {
    return this.projectService.getProject(projectId);
  }
}
