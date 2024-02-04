import { TextFieldHolder } from "../TextFieldHolder";
import { Selectable } from "../selectable";

export interface Statement extends Selectable, TextFieldHolder {
    isStatement : boolean;
}