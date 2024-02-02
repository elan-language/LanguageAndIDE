import { Field } from "./field";

export class PlainText extends Field {

    getPrefix(): string {
        return 'text';
    }
}