import { Frame } from "./frame";
import { Selectable } from "./selectable";
import {File} from "../interfaces/file";
import { CompileError } from "../compile-error";

export interface Field extends Selectable {
    isField: boolean;
    getHolder(): Frame | File; //File because of GlobalSelector
    compileErrors: CompileError[];
    aggregateCompileErrors(): CompileError[];
}