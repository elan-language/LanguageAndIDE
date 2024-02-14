import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class Expression extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    parse(source: CodeSource): void {
        var expr = source.removeRegEx(/^[^\n]*/);
        this.text = expr;
    }
    getIdPrefix(): string {
        return 'expr';
    }
}