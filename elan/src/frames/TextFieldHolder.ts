import { Frame } from "./frame";
import { StatementFactory } from "./statement-factory";

export interface TextFieldHolder  { 
    getFrameMap(): Map<string, Frame>;
    select(withFocus: boolean, multiSelect: boolean): void;
    indent(): string;
}