import { AbstractSelector } from "./abstract-selector";
import { CompoundFrame } from "./compound-frame";
import { CodeSource } from "./frame-interfaces/code-source";
import { Field } from "./frame-interfaces/field";
import { GlobalSelector } from "./globals/global-selector";

export class ProgramFrame extends CompoundFrame {
    newChildSelector(): AbstractSelector {
        return new GlobalSelector(this);
    }
    parseTop(_source: CodeSource): void {
        // Does nothing
    }
    parseBottom(_source: CodeSource): boolean {
       return true; 
    }
    initialKeywords(): string {
        return "";
    }
    outerHtmlTag: string = "";

    getFields(): Field[] {
        return [];
    }

    getIdPrefix(): string {
        return "";
    }
    renderAsElanSource(): string {
       return this.renderChildrenAsElanSource();
    }
    frameSpecificAnnotation(): string {
        return "";
    }

}