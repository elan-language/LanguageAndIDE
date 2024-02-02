import { TextFieldHolder } from "../TextFieldHolder";
import { Field } from "./field";

export class Integer extends Field {   
    getPrefix(): string {
        return `int`;
    }
}