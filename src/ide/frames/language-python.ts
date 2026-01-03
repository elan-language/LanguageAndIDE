import {
  callAnnotation,
  eachAnnotation,
  letAnnotation,
  mainAnnotation,
  privateAnnotation,
  setAnnotation,
} from "../../compiler/keywords";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { MainFrame } from "./globals/main-frame";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { Print } from "./statements/print";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { While } from "./statements/while";

export class LanguagePython implements Language {
  annotation(frame: Frame): string {
    //TODO: add 'private' as applicable
    let a = `Python annotation not specified for ${frame}`;
    if (frame instanceof MainFrame) {
      a = mainAnnotation;
    } else if (frame instanceof AssertStatement) {
      a = "";
    } else if (frame instanceof CallStatement) {
      a = callAnnotation;
    } else if (frame instanceof CatchStatement) {
      // TODO
    } else if (frame instanceof CommentStatement) {
      a = "";
    } else if (frame instanceof LetStatement) {
      a = letAnnotation;
    } else if (frame instanceof Each) {
      a = eachAnnotation;
    } else if (frame instanceof Else) {
      a = "";
    } else if (frame instanceof For) {
      a = "";
    } else if (frame instanceof IfStatement) {
      a = "";
    } else if (frame instanceof Print) {
      a = "";
    } else if (frame instanceof ReturnStatement) {
      a = "";
    } else if (frame instanceof SetStatement) {
      a = setAnnotation;
    } else if (frame instanceof Throw) {
      // TODO
    } else if (frame instanceof TryStatement) {
      // TODO
    } else if (frame instanceof While) {
      a = "";
    }
    return a;
  }

  private privateAnnotationIfPresent(member: MemberFrame): string {
    return member.private ? " " + privateAnnotation : "";
  }

  //TODO 1. How to handle the frame with statements.
  // Probably best as two methods e.g. renderTopAsHtml and so same for renderAsSource, & parsing. By separating this and renderBottom...
  // the latter can be implemented for Python as just retursing empty string?
  // 2. Factor out all the repetition of generation of Html, with a common one for all frameWithStatements, and singleLineStatements,
  // possibly introducing the latter as a new abstract frame class.
  renderAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof MainFrame) {
      html = `<el-kw>${this.defKeyword} </el-kw><el-method>main</el-method>(): <el-kw>${this.noneKeyword}</el-kw><el-punc>:</el-punc>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `${this.exceptKeyword}<el-punc>:</el-punc>`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Else) {
      const elseOrElif = frame.hasIf
        ? `<el-kw>${this.elifKeyword} </el-kw>${frame.condition.renderAsHtml()}`
        : `<el-kw>${this.elseKeyword}</el-kw>`;
      html = elseOrElif + `<el-punc>:</el-punc>`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw><el-method>range</el-method>(${frame.from.renderAsHtml()}, ${frame.to.renderAsHtml()}, ${frame.step.renderAsHtml()})<el-punc>:</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.ifKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    } else if (frame instanceof Print) {
      html = `<el-method>print</el-method><el-punc>(</el-punc>${frame.expr.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.raiseKeyword}</el-kw><el-punc>("</el-punc>${frame.text.renderAsHtml()}<el-punc>")</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `${this.tryKeyword}<el-punc>:</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-punc>:</el-punc>`;
    }
    return html;
  }

  commentMarker(): string {
    return this.hash;
  }

  private defKeyword = "def";
  private elifKeyword = "elif";
  private elseKeyword = "else";
  private exceptKeyword = "else";
  private forKeyword = "for";
  private ifKeyword = "if";
  private inKeyword = "in";
  private noneKeyword = "none";
  private raiseKeyword = "raise";
  private returnKeyword = "return";
  private tryKeyword = "try";
  private whileKeyword = "while";

  private hash = "#";
}
