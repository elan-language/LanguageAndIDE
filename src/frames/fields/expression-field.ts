import { Scope } from "../compiler-interfaces/scope";
import { CodeSource } from "../frame-interfaces/code-source";
import { Frame } from "../frame-interfaces/frame";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ArgListNode } from "../parse-nodes/arg-list-node";
import { ExprNode } from "../parse-nodes/expr-node";
import { parameterNames } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ExpressionField extends AbstractField {
  isParseByNodes = true;
  readUntil: RegExp;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder);
    this.readUntil = readUntil;
    this.setPlaceholder("<i>value or expression</i>");
  }

  helpId(): string {
    return "ExpressionField";
  }

  getIdPrefix(): string {
    return "expr";
  }

  initialiseRoot(): ParseNode {
    this.rootNode = new ExprNode();
    return this.rootNode;
  }

  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readUntil(this.readUntil);

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }

  private completionOverride = "";

  private argumentDescriptions(scope: Scope | undefined) {
    let descriptions = "";
    const an = this.rootNode?.getActiveNode();
    if (an instanceof ArgListNode) {
      const context = an.context();
      const ps = scope?.resolveSymbol(context, scope);
      descriptions = "<i>arguments</i>";
      if (ps && !(ps instanceof UnknownSymbol)) {
        const names = parameterNames(ps.symbolType());
        descriptions = names.length > 0 ? names.join(", ") : "";
      }
    }
    return descriptions;
  }

  public textAsHtml(): string {
    const holder = this.getHolder();
    const descriptions = this.argumentDescriptions(
      this.getFile().getAst(false)?.getScopeById(holder.getHtmlId()),
    );
    this.completionOverride = descriptions ? `<i>${descriptions}</i>)` : "";
    return super.textAsHtml();
  }

  override getCompletion() {
    return this.completionOverride || super.getCompletion();
  }
}
