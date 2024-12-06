import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { ExprNode } from "../parse-nodes/expr-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { CallStatement } from "../statements/call-statement";
import { ProcedureType } from "../symbols/procedure-type";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ArgListField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>arguments</i>");
    this.setOptional(true);
    this.help = `list of zero or more arguments, comma separated. Each argument may be a literal value, variable, or simple expression.`;
  }
  getIdPrefix(): string {
    return "args";
  }
  public contentAsSource(): string {
    if (this.text) {
      return this.text;
    } else {
      return "";
    }
  }
  initialiseRoot(): ParseNode {
    this.astNode = undefined;
    this.rootNode = new CSV(() => new ExprNode(), 0);
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) =>
    source.readToNonMatchingCloseBracket();

  isEndMarker(key: string) {
    return this.text === "" && key === ")";
  }

  symbolCompletion(): string {
    return this.symbolCompletionAsHtml(transforms());
  }

  private argumentDescriptions() {
    const holder = this.getHolder();
    if (holder instanceof CallStatement) {
      const proc = holder.proc.text;

      const ps = holder.resolveSymbol(proc, transforms(), holder);
      const procSymbolType = ps.symbolType(transforms());

      if (procSymbolType instanceof ProcedureType) {
        const parameterNames = procSymbolType.parameterNames;
        const parameterTypes = procSymbolType.parameterTypes;
        const descriptions = parameterNames.map((n, i) => `${n} (${parameterTypes[i].name})`);
        return descriptions;
      }
    }

    return ["arguments"];
  }

  private completionOverride = "";

  private currentParameterIndex() {
    if (this.text) {
      if (this.text.includes(",")) {
        const parameters = this.text.split(",");
        const count = parameters.length - 1;
        const startedInput = !!parameters[count].trim();
        return startedInput ? count + 1 : count;
      }

      return 1;
    }

    return 0;
  }

  public textAsHtml(): string {
    const descriptions = this.argumentDescriptions();

    if (this.text) {
      const count = this.currentParameterIndex();
      const remainingTypes = descriptions.slice(count).join(", ");
      this.completionOverride = remainingTypes ? `<i>${remainingTypes}</i>` : "";
    } else {
      this.completionOverride = "";
      const allTypes = descriptions.join(", ");
      this.setPlaceholder(`<i>${allTypes}</i>`);
    }

    return super.textAsHtml();
  }

  override getCompletion() {
    return this.completionOverride || super.getCompletion();
  }
}
