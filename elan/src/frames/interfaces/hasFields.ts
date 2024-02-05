import { Field } from "./field";

export interface hasFields {
    hasFields: boolean;
    getFirstField(): Field;
}