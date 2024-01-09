export interface Frame {
    renderAsHtml(): string;

    applyClass(id: string, cls: string): void;

    newFrame(): void;

    frameType(key : string): Frame;
}