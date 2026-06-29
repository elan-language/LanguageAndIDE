import {
  copyKeyword,
  endKeyword,
  returnKeyword,
  returnsKeyword
} from "../../../compiler/elan-keywords";
import {
  singleIndent
} from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { AbstractClass } from "../globals/abstract-class";
import { FunctionFrame } from "../globals/function-frame";
import { Assignment } from "../statements/assignment";
import { LetStatement } from "../statements/let-statement";
import { ReturnStatement } from "../statements/return-statement";

export class CopyWithMethod extends FunctionFrame {
  isMember: boolean = true;
  isAbstract = false;
  isPrivate = false;
  file: File;
  help: string = "with-method";
  document: string = "functionalRef.html";

  constructor(parent: Parent, parentClassName: string) {
    super(parent);
    this.file = parent.getFile();
    this.name.setPlaceholder("<i>with_propertyName</i>");
    this.returnType.setFieldToKnownValidText(parentClassName);
    const defaultSelector = this.getFirstSelectorAsDirectChild();
    const letCopyOfThis = new LetStatement(this);
    letCopyOfThis.name.setFieldToKnownValidText("copyOfThis");
    const this_inst = this.language().THIS_INSTANCE;
    letCopyOfThis.expr.setFieldToKnownValidText(`copy(${this_inst})`);
    this.addChildBefore(letCopyOfThis, defaultSelector);
    const firstProp = new Assignment(this);
    firstProp.assignable.setPlaceholder("copyOfThis.propertyName");
    this.addChildBefore(firstProp, defaultSelector);
    const ret = this.getLastChild() as ReturnStatement;
    ret.expr.setFieldToKnownValidText("copyOfThis");
    this.removeChild(defaultSelector);
  }

  initialKeywords(): string {
    return copyKeyword;
  }

  isOnAbstractClass(): boolean {
    return this.getParent() instanceof AbstractClass;
  }

  setDocument(id: string) {
    this.document = id;
  }

  override helpDocument(): string {
    return this.document;
  }

  helpId(): string {
    return this.help;
  }

  public override indent(): string {
    return singleIndent();
  }

  frameSpecificAnnotation(): string {
    return `copy with method`;
  }

  public override renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${copyKeyword} ${this.name.renderAsElanSource()}(${this.params.renderAsElanSource()}) ${returnsKeyword} ${this.returnType.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}${endKeyword} ${copyKeyword}\r
`;
  }

  renderAsExport(): string {
    return `${super.renderAsExport()}\r
`;
  }

    parseTop(source: CodeSource): void {
      source.remove(`${copyKeyword} `);
      this.name.parseFrom(source);
      source.remove("(");
      this.params.parseFrom(source);
      source.remove(`) ${returnsKeyword} `);
      this.returnType.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
      let result = false;
      source.removeIndent();
      if (source.isMatch(`${returnKeyword} `)) {
        const ret = this.getLastChild() as ReturnStatement;
        ret.parseFrom(source);
        source.removeNewLine().removeIndent();
        this.parseStandardEnding(source, `${endKeyword} ${copyKeyword}`);
        result = true;
      }
      return result;
    }
}
