import { File } from "../interfaces/file";
import { AbstractSelector } from "../abstract-selector";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";

export class GlobalSelector extends AbstractSelector  {
    isGlobal = true;
    file: File;

    constructor(parent: File) {
        super(parent);
        this.file = parent;
    }

    defaultOptions: [string, (parent: Parent) => Frame][] = [
        ["main", (parent: Parent) => this.file.createMain()],
        ["procedure", (parent: Parent) => this.file.createProcedure()],
        ["function", (parent: Parent) => this.file.createFunction()],
        ["class", (parent: Parent) => this.file.createClass()],
        ["constant", (parent: Parent) => this.file.createConstant()],
        ["enum", (parent: Parent) => this.file.createEnum()],
        ["test", (parent: Parent) => this.file.createTest()],
        ["#", (parent: Parent) => this.file.createGlobalComment()],
        ["abstract", (parent: Parent) => this.file.createClass()],
        ["immutable", (parent: Parent) => this.file.createClass()],
    ];

    validForEditorWithin(keyword: string): boolean {
        var result = false;
        if (keyword === "main") {
            result = !this.file.containsMain();
        } else if ( keyword === "abstract" || keyword === "immutable") { //Those options available for parsing code from file only
            result = false;
        } else {
            result = true;
        }
        return result;
    }

    renderAsHtml(): string {
        return `<global class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.textToDisplayAsHtml()}</global>`;
    }

    indent(): string {
        return "";
    }
} 
