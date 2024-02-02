import { TextFieldHolder } from "../TextFieldHolder";
import { Renderable } from "../frame";

export interface Global extends Renderable, TextFieldHolder {
    isGlobal : boolean;
}