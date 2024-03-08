import { Parent } from "./interfaces/parent";
import { File } from "./interfaces/file";
import { StatementSelector } from "./statements/statement-selector";
import { CodeSource } from "./code-source";
import { AbstractSelector } from "./abstract-selector";
import { AbstractFrameWithChildren } from "./abstract-frame-with-children";

export abstract class FrameWithStatements extends AbstractFrameWithChildren {

    constructor(parent: File | Parent) {
        super(parent);   
        this.getChildren().push(new StatementSelector(this));
    }

    newChildSelector(): AbstractSelector {
        return new StatementSelector(this);
    }
    protected parseStandardEnding(source: CodeSource, keywords: string): boolean {
        source.removeIndent();
        var result = false;
        if (source.isMatch(keywords)) {
            source.remove(keywords);
            result = true;
        }
        return result;
    }
}