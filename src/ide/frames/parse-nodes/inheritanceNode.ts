import { ClassSubType } from "../../../compiler/symbols/class-type";
import { getClassType } from "../../../compiler/symbols/symbol-helpers";
import { CSV } from "./csv";
import { TypeNode } from "./type-node";
import { File } from "../frame-interfaces/file";
import { RootAstNode } from "../../../compiler/compiler-interfaces/root-ast-node";

export class InheritanceNode extends CSV {
  constructor(file: File) {
    super(file, () => new TypeNode(file), 0);
  }

  private getAllTypeNames(): string[] {
    return this.matchedText.split(", ");
  }

  private rootNode(): RootAstNode {
    return this.file.getAst(true)!;
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
