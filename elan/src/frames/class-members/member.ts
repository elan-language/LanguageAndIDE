import { TextFieldHolder } from "../TextFieldHolder";
import { Frame } from "../frame";

export interface Member extends Frame, TextFieldHolder {
    isMember : boolean;
    select(withFocus : boolean,  multiSelect: boolean): void ;
}