
import { System } from "../../src/compiler/system";
import { TestInputOutput } from "./test-input-output";

export function getTestSystem(input: string) {
  const tc = new TestInputOutput();
  tc.inputed = input;
  const system = new System(tc);
  return system;
}
