import { CodeSource } from "../code-source";
import { TokenType } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../status-enums";
import { isProcedure } from "../symbols/symbol-helpers";
import { transforms } from "../syntax-nodes/ast-helpers";
import { AbstractField } from "./abstract-field";

export class ProcRefField extends AbstractField {
  tokenTypes = [
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ];
  isParseByNodes = true;
  qualProc = () => new InstanceProcRef(); // These two are alternatives, not a combination!
  proc = () => new IdentifierNode([]); // These two are alternatives, not a combination

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("procedureName");
    this.help = `The name of the procedure to be called (starting lower-case). Alternatively, a 'dotted-call':  the name of a variable or property, followed by a ''' and the name of the procedure method to call on that 'instance'.`;
  }
  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new Alternatives([this.proc, this.qualProc]);
    this.rootNode.setSyntaxCompletionWhenEmpty(this.placeholder); //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\(/);

  protected override getSymbolCompleteId(s: ElanSymbol) {
    if (isProcedure(s, transforms())) {
      return s.symbolId;
    }
    return s.symbolId + ".";
  }

  public textAsHtml(): string {
    let text: string;
    if (this.isSelected()) {
      text = this.fieldAsInput();
    } else if (this.readParseStatus() === ParseStatus.valid) {
      const bestMatch = (this.rootNode! as Alternatives).bestMatch;
      if (bestMatch instanceof IdentifierNode) {
        text = `<el-method>${this.text}</el-method>`;
      } else {
        text = (bestMatch as InstanceProcRef).renderAsHtml();
      }
    } else {
      text = super.textAsHtml();
    }
    return text + this.symbolCompletionAsHtml(transforms());
  }

  isEndMarker(key: string) {
    return key === "(";
  }
}
