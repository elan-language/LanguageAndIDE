import { TextFieldHolder } from "../TextFieldHolder";
import { Selectable } from "../selectable";

export interface Member extends Selectable, TextFieldHolder {
    isMember : boolean;
    select(withFocus : boolean,  multiSelect: boolean): void ;
}