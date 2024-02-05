import { Frame } from "./frame";
import { Selectable } from "./selectable";
import {File} from "../interfaces/file";

export interface Field extends Selectable {
    isField: boolean;
    getHolder(): Frame | File; //File because of GlobalSelector
    getPreviousField() : Field;
    getNextField(): Field;
}