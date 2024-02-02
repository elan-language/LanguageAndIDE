import { TextFieldHolder } from "../TextFieldHolder";
import { Renderable } from "../frame";

export interface Statement extends Renderable, TextFieldHolder {
    isStatement : boolean;
}