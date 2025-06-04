import { currentParameterIndex } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { ArgListNode } from "../parse-nodes/arg-list-node";
import { CallStatement } from "../statements/call-statement";
import { ParseStatus } from "../status-enums";
import { parameterNames } from "../symbols/symbol-helpers";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ArgListField extends AbstractField {
  isParseByNodes = true;

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("<i>arguments</i>");
    this.setOptional(true);
  }

  helpId(): string {
    return "ArgListField";
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
    this.rootNode = new ArgListNode(() => "");
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

  private argumentDescriptions(holder: Frame, scope: Scope | undefined, transforms: Transforms) {
    const proc = (holder as CallStatement).proc.text;
    const ps = scope?.resolveSymbol(proc, transforms, scope);
    let descriptions = ["<i>arguments</i>"];
    if (ps && !(ps instanceof UnknownSymbol)) {
      descriptions = parameterNames(ps.symbolType());
    }
    return descriptions;
  }

  public textAsHtml(): string {
    const holder = this.getHolder();
    const descriptions = this.argumentDescriptions(
      holder,
      this.getFile().getAst(false)?.getScopeById(holder.getHtmlId()),
      transforms(),
    );

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
    super.parseCurrentText();
    if (this.readParseStatus() === ParseStatus.invalid && this.text.endsWith(")")) {
      this.text = this.text.slice(0, this.text.length - 1);
      super.parseCurrentText();
    }
  }
}
