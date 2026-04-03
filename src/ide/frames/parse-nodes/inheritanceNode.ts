import { inheritsKeyword } from "../../../compiler/elan-keywords";
import { ClassSubType } from "../../../compiler/symbols/class-type";
import { getClassType } from "../../../compiler/symbols/symbol-helpers";
import { KeywordCompletion } from "../symbol-completion-helpers";
import { CSV } from "./csv";
import { TypeNode } from "./type-node";
import { File } from "../frame-interfaces/file";

export class InheritanceNode extends CSV {
  constructor(file: File) {
    super(file, () => new TypeNode(file), 0);
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(inheritsKeyword)])
      : super.symbolCompletion_keywords();
  }

  getAllTypeNames(): string[] {
    return this.matchedText.split(", ");
  }

  firstTypeIsAbstract(): boolean {
    const firstType = this.getAllTypeNames()[0];
    const rootNode = this.file.getAst(true)!;
    return getClassType(firstType, rootNode) === ClassSubType.abstract;
  }
}
