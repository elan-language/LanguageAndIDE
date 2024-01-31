import { TextFieldHolder } from "../TextFieldHolder";
import { Frame } from "../frame";

export interface Global extends Frame, TextFieldHolder {
    isGlobal : boolean;
}