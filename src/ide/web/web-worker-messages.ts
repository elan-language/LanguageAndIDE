import { AssertOutcome } from "../../compiler/assert-outcome";
import { DebugSymbol } from "../../compiler/compiler-interfaces/debug-symbol";

export type WebWorkerStatusMessage = {
  type: "status";
  status: "finished" | "error";
  error: unknown;
};

export type WebWorkerWriteMessage = {
  type: "write";
  function: string;
  parameters: (string | number)[];
};

export type WebWorkerReadMessage = {
  type: "read";
  value: string | [string, string];
};

export type WebWorkerTestMessage = {
  type: "test";
  value: [string, AssertOutcome[]][];
};

export type WebWorkerBreakpointMessage = {
  type: "breakpoint" | "singlestep";
  value: DebugSymbol[];
  pausedAt: string;
};

export type WebWorkerMessage = {
  type:
    | "start"
    | "read"
    | "write"
    | "status"
    | "test"
    | "resume"
    | "breakpoint"
    | "singlestep"
    | "pause";
} & (
  | WebWorkerStatusMessage
  | WebWorkerWriteMessage
  | WebWorkerReadMessage
  | WebWorkerTestMessage
  | WebWorkerBreakpointMessage
);
