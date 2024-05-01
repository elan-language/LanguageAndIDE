import { CodeSource } from "../code-source";
import { CodeStatus } from "../code-status";
import { editorEvent } from "./editor-event";

export interface Selectable  {

    isSelected() : boolean;
    select(withFocus?: boolean, multiSelect?: boolean, selection? : number): void;
    deselect(): void;

    isFocused() : boolean;
    focus(): void;
    defocus(): void;

    processKey(keyEvent: editorEvent): void;

    renderAsHtml(): string;
    renderAsSource(): string;
    compile(): string;

    getCodeStatus(): CodeStatus;

    parseFrom(source: CodeSource): void;
    getHtmlId(): string;
}
