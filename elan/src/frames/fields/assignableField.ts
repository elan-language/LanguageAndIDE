import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

import { propertyKeyword, globalKeyword, libraryKeyword } from "../keywords";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { Sequence } from "../parse-nodes/sequence";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { IndexNode } from "../parse-nodes/index-node";
import { Multiple } from "../parse-nodes/multiple";
import { DOT } from "../symbols";

export class AssignableField extends AbstractField { 
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode  { 
        var simple = () => new IdentifierNode();
        var prop = () => new KeywordNode(propertyKeyword); //global & library not applicable because no assignables there
        var dot = () => new SymbolNode(DOT);
        var qualDot = () => new Sequence([prop, dot]);
        var optQualifier = () => new OptionalNode(qualDot);
        var indexes = () => new Multiple(() => new IndexNode(), 0);
        var varRef = () => new Sequence([optQualifier, simple, indexes]);
        var deconTup = () => new DeconstructedTuple();
        var deconList = () => new DeconstructedList();
        this.rootNode = new Alternatives([varRef, deconTup, deconList]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = (source: CodeSource) => source.readUntil(/(\s+to\s+)|\r|\n/);
} 