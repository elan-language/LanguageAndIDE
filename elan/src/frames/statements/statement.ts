import { TextFieldHolder } from "../TextFieldHolder";
import { Frame } from "../frame";

export interface Statement extends Frame, TextFieldHolder {
    isStatement : boolean;
}