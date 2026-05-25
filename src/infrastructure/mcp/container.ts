import { GitLabApiConfig } from "@/domain/config/gitlabApiConfig";
import { ProjectController } from "@/infrastructure/controllers/projectController";
import { MergeRequestController } from "@/infrastructure/controllers/mergeRequestController";
import { IssueController } from "@/infrastructure/controllers/issueController";
import { PipelineController } from "@/infrastructure/controllers/pipelineController";
import { UserController } from "@/infrastructure/controllers/userController";
import { GroupController } from "@/infrastructure/controllers/groupController";

import { ListProjects } from "@/application/use-cases/project/listProjects";
import { GetProject } from "@/application/use-cases/project/getProject";
import { ListBranches } from "@/application/use-cases/project/listBranches";
import { ListCommits } from "@/application/use-cases/project/listCommits";
import { ListGroupProjects } from "@/application/use-cases/project/listGroupProjects";

import { ListMRs } from "@/application/use-cases/merge-request/listMRs";
import { GetMR } from "@/application/use-cases/merge-request/getMR";
import { GetMRDiff } from "@/application/use-cases/merge-request/getMRDiff";
import { CreateMR } from "@/application/use-cases/merge-request/createMR";
import { ApproveMR } from "@/application/use-cases/merge-request/approveMR";
import { MergeMR } from "@/application/use-cases/merge-request/mergeMR";
import { ListMRNotes } from "@/application/use-cases/merge-request/listMRNotes";
import { CreateMRNote } from "@/application/use-cases/merge-request/createMRNote";

import { ListIssues } from "@/application/use-cases/issue/listIssues";
import { GetIssue } from "@/application/use-cases/issue/getIssue";
import { CreateIssue } from "@/application/use-cases/issue/createIssue";
import { CloseIssue } from "@/application/use-cases/issue/closeIssue";
import { AddCommentToIssue } from "@/application/use-cases/issue/addCommentToIssue";

import { ListPipelines } from "@/application/use-cases/pipeline/listPipelines";
import { TriggerPipeline } from "@/application/use-cases/pipeline/triggerPipeline";
import { RetryPipeline } from "@/application/use-cases/pipeline/retryPipeline";
import { ListJobs } from "@/application/use-cases/pipeline/listJobs";

import { GetCurrentUser } from "@/application/use-cases/user/getCurrentUser";
import { ListUsers } from "@/application/use-cases/user/listUsers";

import { ListGroups } from "@/application/use-cases/group/listGroups";
import { GetGroup } from "@/application/use-cases/group/getGroup";
import { ListGroupMembers } from "@/application/use-cases/group/listGroupMembers";

export interface AppContainer {
  listProjects: ListProjects;
  listGroupProjects: ListGroupProjects;
  getProject: GetProject;
  listBranches: ListBranches;
  listCommits: ListCommits;

  listMRs: ListMRs;
  getMR: GetMR;
  getMRDiff: GetMRDiff;
  createMR: CreateMR;
  approveMR: ApproveMR;
  mergeMR: MergeMR;
  listMRNotes: ListMRNotes;
  createMRNote: CreateMRNote;

  listIssues: ListIssues;
  getIssue: GetIssue;
  createIssue: CreateIssue;
  closeIssue: CloseIssue;
  addCommentToIssue: AddCommentToIssue;

  listPipelines: ListPipelines;
  triggerPipeline: TriggerPipeline;
  retryPipeline: RetryPipeline;
  listJobs: ListJobs;

  getCurrentUser: GetCurrentUser;
  listUsers: ListUsers;

  listGroups: ListGroups;
  getGroup: GetGroup;
  listGroupMembers: ListGroupMembers;
}

export function createContainer(config: GitLabApiConfig): AppContainer {
  const projectCtrl = new ProjectController(config);
  const mergeRequestCtrl = new MergeRequestController(config);
  const issueCtrl = new IssueController(config);
  const pipelineCtrl = new PipelineController(config);
  const userCtrl = new UserController(config);
  const groupCtrl = new GroupController(config);

  return {
    listProjects: new ListProjects(projectCtrl),
    listGroupProjects: new ListGroupProjects(projectCtrl),
    getProject: new GetProject(projectCtrl),
    listBranches: new ListBranches(projectCtrl),
    listCommits: new ListCommits(projectCtrl),

    listMRs: new ListMRs(mergeRequestCtrl),
    getMR: new GetMR(mergeRequestCtrl),
    getMRDiff: new GetMRDiff(mergeRequestCtrl),
    createMR: new CreateMR(mergeRequestCtrl),
    approveMR: new ApproveMR(mergeRequestCtrl),
    mergeMR: new MergeMR(mergeRequestCtrl),
    listMRNotes: new ListMRNotes(mergeRequestCtrl),
    createMRNote: new CreateMRNote(mergeRequestCtrl),

    listIssues: new ListIssues(issueCtrl),
    getIssue: new GetIssue(issueCtrl),
    createIssue: new CreateIssue(issueCtrl),
    closeIssue: new CloseIssue(issueCtrl),
    addCommentToIssue: new AddCommentToIssue(issueCtrl),

    listPipelines: new ListPipelines(pipelineCtrl),
    triggerPipeline: new TriggerPipeline(pipelineCtrl),
    retryPipeline: new RetryPipeline(pipelineCtrl),
    listJobs: new ListJobs(pipelineCtrl),

    getCurrentUser: new GetCurrentUser(userCtrl),
    listUsers: new ListUsers(userCtrl),

    listGroups: new ListGroups(groupCtrl),
    getGroup: new GetGroup(groupCtrl),
    listGroupMembers: new ListGroupMembers(groupCtrl),
  };
}
