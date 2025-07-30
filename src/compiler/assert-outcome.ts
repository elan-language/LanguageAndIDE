import { TestStatus } from "./test-status";

export class AssertOutcome {
  constructor(
    public readonly status: TestStatus,
    public readonly actual: string,
    public readonly expected: string,
    public readonly htmlId: string,
    public readonly error?: Error,
  ) {}
}
