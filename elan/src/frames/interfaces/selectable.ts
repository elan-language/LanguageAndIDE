import { ParsingStatus } from "../parsing-status";
import { KeyEvent } from "./key-event";

export interface Selectable  {

    isSelected() : boolean;
    select(withFocus: boolean, multiSelect: boolean): void;
    deselect(): void;

    isFocused() : boolean;
    focus(): void;
    defocus(): void;

    processKey(keyEvent: KeyEvent): void;

    renderAsHtml(): string;
    renderAsSource(): string;

    status(): ParsingStatus;

    parseValidCode(code: string): void;
}
