import { AbstractSelector } from "../abstract-selector";
import { singleIndent } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { MemberFrame } from "../frame-interfaces/member-frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { ClassFrame } from "../globals/class-frame";

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
    return this.class.createMemberFrame(type);
  }
}
