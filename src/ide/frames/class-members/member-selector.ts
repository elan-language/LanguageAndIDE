import { MemberBlockContext as PythonMemberBlockContext } from "../../../generated/python/PythonParser";
import { MemberBlockContext as RefLangMemberBlockContext } from "../../../generated/ref-lang/RefLangParser";import { getParserByLanguage, getVisitorFrameByLanguage } from "../../compile-api/parser-helpers";
import { PythonVisitorFrame } from "../../compile-api/python-visitor-frame";
import { RefLangVisitorFrame } from "../../compile-api/ref-lang-visitor-frame";
import { AbstractSelector } from "../abstract-selector";
import { singleIndent } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { ClassFrame } from "../globals/class-frame";
import { LanguagePython } from "../language-python";
import { LanguageRefLang } from "../language-ref-lang";

export class MemberSelector extends AbstractSelector implements MemberFrame {

  isMember: boolean = true;
  isAbstract = false;
  isPrivate = false;
  private class: ClassFrame;
  constructor(parent: Parent) {
    super(parent);
    this.class = parent as ClassFrame;
  }
  isOnAbstractClass(): boolean {
    throw new Error("Should not be called");
  }

  override helpId(): string {
    return "MemberInstructions";
  }

  getClass() {
    return this.getParent() as unknown as ClassFrame;
  }

  defaultOptions(): [FrameType, string, string, boolean][] {
    return [
      [FrameType.property, "p", "<b>p</b>roperty", true],
      [FrameType.procedureMethod, "c", "pro<b>c</b>edure method", true],
      [FrameType.functionMethod, "f", "<b>f</b>unction method", true],
      [FrameType.abstractProcedure, "", "abstract procedure", true],
      [FrameType.abstractFunction, "", "abstract function", true],
      [
        FrameType.commentFrame,
        this.getCommentMarker(),
        `<b>${this.getCommentMarker()}</b> comment`,
        true,
      ],
    ];
  }

  validWithinCurrentContext(type: FrameType, userEntry: boolean): boolean {
    let result = true;
    if (type === FrameType.abstractFunction || type === FrameType.abstractProcedure) {
      result = this.class.isAbstract;
    } else if (type === FrameType.procedureMethod) {
      result = !(this.getParadigm().isFunctional() && userEntry);
    }
    return result;
  }

  outerHtmlTag: string = "el-member";

  indent(): string {
    return singleIndent();
  }

  createFrame(type: FrameType, _parent: Parent): Frame {
    const frame = this.class.createMemberFrame(type);
    frame.setNewlyCreatedTrue();
    return frame;
  }

  visitMemberBlock(
    visitor: PythonVisitorFrame | RefLangVisitorFrame,
    context: PythonMemberBlockContext | RefLangMemberBlockContext,
  ): Frame[] {
    if (this.language() === LanguagePython.Instance) {
      return (visitor as PythonVisitorFrame).visitMemberBlock(context as PythonMemberBlockContext);
    }
    if (this.language() === LanguageRefLang.Instance) {
      return (visitor as RefLangVisitorFrame).visitMemberBlock(
        context as RefLangMemberBlockContext,
      );
    }
    return [];
  }

  parseFrames(code: string): Frame[] {
    const parser = getParserByLanguage(this.language(), code, this.getFile());
    const visitor = getVisitorFrameByLanguage(this.language(), this.getFile())!;
    const ctx = parser.memberBlock()!;
    return this.visitMemberBlock(visitor, ctx);
  }
}
