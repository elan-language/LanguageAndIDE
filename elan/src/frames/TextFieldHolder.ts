import { Renderable } from "./frame";
import { StatementFactory } from "./statement-factory";

export interface TextFieldHolder  { 
    getMap(): Map<string, Renderable>;
    select(withFocus: boolean, multiSelect: boolean): void;
    indent(): string;
}