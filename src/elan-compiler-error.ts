export class ElanCompilerError extends Error {
  constructor(private readonly err: string | Error) {
    super(err instanceof Error ? err.message : err);
  }
}
