export interface Frame {
    renderAsHtml(): string;

    applyClass(id: string, cls: string): void;

    newFrame(id? : string): void;

    userInput(key : string): Frame;

    htmlId: string;

    clearSelector() : void;
}