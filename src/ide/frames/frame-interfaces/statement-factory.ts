import { FrameType } from "../frame-type";
import { Frame } from "./frame";
import { Parent } from "./parent";

export interface StatementFactory {
  createFrame(type: FrameType, parent: Parent): Frame;
}
