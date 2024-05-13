import { Parent } from "../interfaces/parent";
import { ProcedureFrame } from "./procedure-frame";
import {Global as GlobalFrame} from "../interfaces/global-frame";

export class GlobalProcedure extends ProcedureFrame implements GlobalFrame {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    } 
}