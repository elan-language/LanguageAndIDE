import { ParentFrame } from "./parent-frame";
import { Selectable } from "./selectable";
import {File} from "./file";

export interface Statement extends Selectable  {
    isStatement : boolean;
    getParentFrame() : ParentFrame;
}