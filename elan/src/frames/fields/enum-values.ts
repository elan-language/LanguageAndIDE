import { Frame } from "../interfaces/frame";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }

    getIdPrefix(): string {
        return 'enumVals';
    }
}