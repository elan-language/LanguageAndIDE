import { CodeSource } from "../code-source";
import { currentParameterIndex } from "../frame-helpers";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ArgListNode } from "../parse-nodes/arg-list-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { removeUnmatchedClosingBracket } from "../parse-nodes/parse-node-helpers";
import { CallStatement } from "../statements/call-statement";
import { parameterDescriptions } from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
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
    this.rootNode = new ArgListNode();
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

  private completionOverride = "";

  private argumentDescriptions(holder: Scope, transforms: Transforms) {
    if (holder instanceof CallStatement) {
      const proc = holder.proc.text;

      const ps = holder.resolveSymbol(proc, transforms, holder);
      const descriptions = parameterDescriptions(ps.symbolType(transforms));
      return descriptions.length > 0 ? descriptions : ["arguments"];
    }

    return ["arguments"];
  }

  public textAsHtml(): string {
    const descriptions = this.argumentDescriptions(this.getHolder(), transforms());

    if (this.text) {
      const count = currentParameterIndex(this.text);
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

  override parseCurrentText(): void {
    this.text = removeUnmatchedClosingBracket(this.text);
    super.parseCurrentText();
  }
}
