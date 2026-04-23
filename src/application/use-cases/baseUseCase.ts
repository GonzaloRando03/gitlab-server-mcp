export class BaseUseCase<P, R> {
  execute(params: P): Promise<R> {
    throw new Error("Method not implemented.");
  }

  handle(params: P): Promise<R> {
    return this.execute(params);
  }
}
