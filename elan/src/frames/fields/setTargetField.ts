import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { propertyKeyword } from "../keywords";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { OptionalNode } from "../parse-nodes/optional-node";
import { Sequence } from "../parse-nodes/sequence";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { IndexNode } from "../parse-nodes/index-node";
import { Multiple } from "../parse-nodes/multiple";
import { DOT } from "../symbols";

export class SetTargetField extends AbstractField implements ParseByNodes { 
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode  { 
        var simple = () => new IdentifierNode(this);
        var prop = () => new KeywordNode(propertyKeyword, this); //global & library not applicable because no assignables there
        var dot = () => new SymbolNode(DOT, this);
        var qualDot = () => new Sequence([prop, dot], this);
        var optQualifier = () => new OptionalNode(qualDot, this);
        var indexes = () => new Multiple(() => new IndexNode(this), 0,this);
        var varRef = () => new Sequence([optQualifier, simple, indexes], this);
        var deconTup = () => new DeconstructedTuple(this);
        var deconList = () => new DeconstructedList(this);
        this.rootNode = new Alternatives([varRef, deconTup, deconList], this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = (source: CodeSource) => source.readUntil(/(\s+to\s+)|\r|\n/);
} 