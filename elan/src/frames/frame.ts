export interface Frame {
    renderAsHtml(): string;

    applyClass(id: string, cls: string): void;

}