import { TextFieldHolder } from "../TextFieldHolder";
import { Text } from "./text";

export class Integer extends Text {   
    getPrefix(): string {
        return `int`;
    }
}