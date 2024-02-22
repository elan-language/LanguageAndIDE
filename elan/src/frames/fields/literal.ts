import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";
import { Regexes } from "./regexes";

//Literal value or data structure
export class Literal extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("lit");
    }

    //TODO - this definition needs to be expanded to accommodate literal data structures
    regExp(): RegExp {
        return new RegExp(`^.*`);;
    }

    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
}