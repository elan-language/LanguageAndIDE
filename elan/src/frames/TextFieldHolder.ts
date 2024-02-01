import { Frame } from "./frame";
import { FrameFactory } from "./frame-factory";

export interface TextFieldHolder  { 
    getFrameMap(): Map<string, Frame>;
    getFactory(): FrameFactory;
    select(withFocus: boolean, multiSelect: boolean): void;
}