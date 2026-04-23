import { UserService } from "@/application/services/userService";
import { BaseUseCase } from "@/application/use-cases/baseUseCase";
import { GitLabUser } from "@/domain/user/gitlabUser";

export class ListUsers extends BaseUseCase<
  { page?: number; perPage?: number; search?: string; orderBy?: string; sort?: string } | undefined,
  GitLabUser[]
> {
  userService: UserService;

  constructor(userService: UserService) {
    super();
    this.userService = userService;
  }

  override execute(
    params?: { page?: number; perPage?: number; search?: string; orderBy?: string; sort?: string },
  ): Promise<GitLabUser[]> {
    return this.userService.listUsers(params);
  }
}
