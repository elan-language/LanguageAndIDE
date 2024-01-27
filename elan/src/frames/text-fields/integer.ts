import { Frame } from "../frame";
import { Text } from "./text";

export class Integer extends Text {
    getPrefix(): string {
        return `int`;
    }
}