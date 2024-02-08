import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setLabel("values");
    }

    getIdPrefix(): string {
        return 'enumVals';
    }
}