import { TextFieldHolder } from "../TextFieldHolder";
import { Renderable } from "../frame";

export interface Member extends Renderable, TextFieldHolder {
    isMember : boolean;
    select(withFocus : boolean,  multiSelect: boolean): void ;
}