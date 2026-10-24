import { CompoundFrame } from "./compound-frame";
import { Collapsible } from "./frame-interfaces/collapsible";
import { Parent } from "./frame-interfaces/parent";

export abstract class FrameWithStatements extends CompoundFrame implements Parent, Collapsible {}
