import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { ProjectController } from "@/infrastructure/controllers/projectController";
import { MergeRequestController } from "@/infrastructure/controllers/mergeRequestController";
import { IssueController } from "@/infrastructure/controllers/issueController";
import { PipelineController } from "@/infrastructure/controllers/pipelineController";
import { UserController } from "@/infrastructure/controllers/userController";
import { GroupController } from "@/infrastructure/controllers/groupController";

export const config: GitLabApiConfig = {
  token: "",
  baseUrl: "",
};

export const projectCtrl = new ProjectController(config);
export const mergeRequestCtrl = new MergeRequestController(config);
export const issueCtrl = new IssueController(config);
export const pipelineCtrl = new PipelineController(config);
export const userCtrl = new UserController(config);
export const groupCtrl = new GroupController(config);
