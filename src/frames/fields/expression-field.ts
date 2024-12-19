import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ArgListNode } from "../parse-nodes/arg-list-node";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { parameterNames } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
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

  private completionOverride = "";

  private argumentDescriptions(holder: Scope, transforms: Transforms) {
    let descriptions = "";
    const an = this.rootNode?.getActiveNode();
    if (an instanceof ArgListNode) {
      const context = an.context();
      const ps = holder.resolveSymbol(context, transforms, holder);
      descriptions = "<i>arguments</i>";
      if (!(ps instanceof UnknownSymbol)) {
        const names = parameterNames(ps.symbolType(transforms));
        descriptions = names.length > 0 ? names.join(", ") : "";
      }
    }
    return descriptions;
  }

  public textAsHtml(): string {
    const descriptions = this.argumentDescriptions(this.getHolder(), transforms());
    this.completionOverride = descriptions ? `<i>${descriptions}</i>)` : "";
    return super.textAsHtml();
  }

  override getCompletion() {
    return this.completionOverride || super.getCompletion();
  }
}
