import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ExpressionField extends AbstractField {
  isParseByNodes = true;
  readUntil: RegExp;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder);
    this.readUntil = readUntil;
    this.setPlaceholder("<i>expression</i>");
    this.help = "Field may contain a literal value, a reference to a variable, or an expression";
  }

  getIdPrefix(): string {
    return "expr";
  }

  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new ExprNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(this.readUntil);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }

  public textAsHtml(): string {
    return super.textAsHtml();
  }
}
