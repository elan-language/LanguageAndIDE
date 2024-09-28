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

export type WebWorkerMessage = {
  type: "start" | "read" | "write" | "status";
} & (WebWorkerStatusMessage | WebWorkerWriteMessage | WebWorkerReadMessage);
