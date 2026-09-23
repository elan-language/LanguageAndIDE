import { RootAstNode } from "../../../compiler/compiler-interfaces/root-ast-node";
import { ClassSubType } from "../../../compiler/symbols/class-type";
import { getClassType } from "../../../compiler/symbols/symbol-helpers";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { CSV } from "./csv";
import { TypeNode } from "./type-node";

export class InheritanceNode extends CSV {
  constructor(file: File) {
    super(file, () => new TypeNode(file), 0);
  }

  override parseText(text: string): void {
    if (text.includes(`,`)) {
      this.status = ParseStatus.invalid;
    } else {
      super.parseText(text);
    }
  }

  private getAllTypeNames(): string[] {
    return this.matchedText.split(", ");
  }

  private rootNode(): RootAstNode {
    return this.file.getAst(false)!;
  }

  getAbstractClassNames(): string[] {
    const rootNode = this.rootNode();
    return this.getAllTypeNames().filter(
      (t) => getClassType(t, rootNode) === ClassSubType.abstract,
    );
  }

  getInterfaceNames(): string[] {
    const rootNode = this.rootNode();
    return this.getAllTypeNames().filter(
      (t) => getClassType(t, rootNode) === ClassSubType.interface,
    );
  }
}
