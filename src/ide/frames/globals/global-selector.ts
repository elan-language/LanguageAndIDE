import { GlobalBlockContext as PythonGlobalBlockContext } from "../../../generated/python/PythonParser";
import { GlobalBlockContext as RefLangGlobalBlockContext } from "../../../generated/ref-lang/RefLangParser";
import { getParserByLanguage, getVisitorFrameByLanguage } from "../../compile-api/parser-helpers";
import { PythonVisitorFrame } from "../../compile-api/python-visitor-frame";
import { RefLangVisitorFrame } from "../../compile-api/ref-lang-visitor-frame";
import { AbstractSelector } from "../abstract-selector";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { LanguagePython } from "../language-python";
import { LanguageRefLang } from "../language-ref-lang";
import { ParseStatus } from "../status-enums";

export class GlobalSelector extends AbstractSelector implements GlobalFrame {
  isGlobal = true;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.setParseStatus(ParseStatus.default);
  }

  override helpId(): string {
    return "GlobalInstructions";
  }

  defaultOptions(): [FrameType, string, string, boolean][] {
    return [
      [FrameType.mainRoutine, "m", "<b>m</b>ain routine", true],
      [FrameType.globalFunction, "f", "<b>f</b>unction", true],
      [FrameType.test, "t", "<b>t</b>est", true],
      [FrameType.globalProcedure, "p", "<b>p</b>rocedure", true],
      [FrameType.constant, "k", "<b>k</b> constant", true],
      [FrameType.enum, "e", "<b>e</b>num", true],
      [FrameType.concreteClass, "c", "<b>c</b>oncrete class", true],
      [FrameType.abstractClass, "a", "<b>a</b>bstract class", true],
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
    if (type === FrameType.mainRoutine && userEntry) {
      result = !this.file.containsMain();
    } else if (this.getParadigm().isProcedural() && userEntry) {
      result = type !== FrameType.abstractClass && type !== FrameType.concreteClass;
    }
    return result;
  }

  outerHtmlTag: string = "el-global";

  indent(): string {
    return "";
  }

  createFrame(type: FrameType, _parent: Parent): Frame {
    const frame = this.file.createGlobalFrame(type);
    frame.setNewlyCreatedTrue();
    return frame;
  }

  visitGlobalBlock(
    visitor: PythonVisitorFrame | RefLangVisitorFrame,
    context: PythonGlobalBlockContext | RefLangGlobalBlockContext,
  ): Frame[] {
    if (this.language() === LanguagePython.Instance) {
      return (visitor as PythonVisitorFrame).visitGlobalBlock(context as PythonGlobalBlockContext);
    }
    if (this.language() === LanguageRefLang.Instance) {
      return (visitor as RefLangVisitorFrame).visitGlobalBlock(
        context as RefLangGlobalBlockContext,
      );
    }
    return [];
  }

  parseFrames(code: string): Frame[] {
    const parser = getParserByLanguage(this.language(), code, this.getFile());
    const visitor = getVisitorFrameByLanguage(this.language(), this.getFile())!;
    const ctx = parser.globalBlock()!;
    return this.visitGlobalBlock(visitor, ctx);
  }
}
