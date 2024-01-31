import { Text } from "./text";

export class PlainText extends Text {

    getPrefix(): string {
        return 'text';
    }
}