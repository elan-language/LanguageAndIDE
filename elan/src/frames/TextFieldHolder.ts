import { Selectable } from "./selectable";
import { StatementFactory } from "./statement-factory";

export interface TextFieldHolder  { 
    getMap(): Map<string, Selectable>;
    select(withFocus: boolean, multiSelect: boolean): void;
    indent(): string;
}