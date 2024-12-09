import { CodeSource } from "../code-source";
import { currentParameterIndex } from "../helpers";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { SymbolCompletionSpec } from "../symbol-completion-helpers";
import { FunctionType } from "../symbols/function-type";
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

  private argumentDescriptions(holder: Scope, transforms: Transforms, spec: SymbolCompletionSpec) {
    const ps = holder.resolveSymbol(spec.context, transforms, holder);
    const funcSymbolType = ps.symbolType(transforms);

    if (funcSymbolType instanceof FunctionType) {
      const parameterNames = funcSymbolType.parameterNames;
      const parameterTypes = funcSymbolType.parameterTypes;
      const descriptions = parameterNames.map((n, i) => `${n} (${parameterTypes[i].name})`);
      return descriptions;
    }

    return ["arguments"];
  }

  override getCompletion() {
    return this.completionOverride || super.getCompletion();
  }

  public textAsHtml(): string {
    const spec = this.getSymbolCompletionSpec();
    if (spec.parameterPromptsExpected) {
      const descriptions = this.argumentDescriptions(this.getHolder(), transforms(), spec);
      const parameterText = this.text.slice(this.text.lastIndexOf("(") + 1);

      const count = currentParameterIndex(parameterText);
      const remainingTypes = descriptions.slice(count).join(", ");
      this.completionOverride = remainingTypes ? `<i>${remainingTypes}</i>` : "";
    }

    return super.textAsHtml();
  }
}
