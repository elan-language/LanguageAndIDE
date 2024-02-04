import { TextFieldHolder } from "../TextFieldHolder";
import { Selectable } from "../selectable";

export interface Global extends Selectable, TextFieldHolder {
    isGlobal : boolean;
}