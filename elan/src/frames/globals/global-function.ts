
import { Parent } from "../interfaces/parent";
import {GlobalFrame } from "../interfaces/global-frame";
import { FunctionFrame } from "./function-frame";

export class GlobalFunction extends FunctionFrame implements GlobalFrame {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    } 
}