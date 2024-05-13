
import { Parent } from "../interfaces/parent";
import {Global } from "../interfaces/global-frame";
import { FunctionFrame } from "./function-frame";

export class GlobalFunction extends FunctionFrame implements Global {
    isGlobal = true;

    constructor(parent: Parent) {
        super(parent);
    } 
}