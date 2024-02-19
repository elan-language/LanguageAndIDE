import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

//TODO: stop-gap solution. Handles simple conditional expressions only. Pending parsing of expressions.
export class Condition extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("condition");
    }
    regExp(): RegExp {
        return new RegExp(`^${Regexes.condition}`);
    }
    getIdPrefix(): string {
        return 'expr';
    }
}