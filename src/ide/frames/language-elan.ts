import { AbstractFrame } from "./abstract-frame";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MainFrame } from "./globals/main-frame";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { LetStatement } from "./statements/let-statement";
import { Print } from "./statements/print";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { While } from "./statements/while";

export class LanguageElan implements Language {
  annotation(frame: Frame): string {
    return frame instanceof AbstractFrame ? "" : ""; //No frame-specific annotation needed for Elan
  }
  renderAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof MainFrame) {
      html = `<el-kw>main</el-kw>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `<el-kw>${this.callKeyword} </el-kw>${frame.proc.renderAsHtml()}<span>(</span>${frame.args.renderAsHtml()}<span>)</span>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.catchKeyword} ${this.exceptionKeyword} ${this.inKeyword} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.eachKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof Else) {
      const ifClause = frame.hasIf
        ? `<el-kw> ${this.ifKeyword} </kw> ${frame.condition.renderAsHtml()}`
        : ``;
      html = `<el-kw>${this.elseKeyword}</el-kw>${ifClause}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.fromKeyword} </el-kw>${frame.from.renderAsHtml()}<el-kw> ${this.toKeyword} </el-kw>${frame.to.renderAsHtml()}<el-kw> ${this.stepKeyword} </el-kw>${frame.step.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `<el-kw>${this.letKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.beKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-kw>${this.printKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `<el-kw>${this.setKeyword} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.toKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.throwKeyword} ${this.exceptionKeyword} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.tryKeyword} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }
  commentMarker(): string {
    return this.hash;
  }

  private abstractKeyword = "abstract";
  private andKeyword = "and";
  private asKeyword = "as";
  private assertKeyword = "assert";
  private beKeyword = "be";
  private callKeyword = "call";
  private catchKeyword = "catch";
  private classKeyword = "class";
  private constantKeyword = "constant";
  private constructorKeyword = "constructor";
  private copyKeyword = "copy";
  private divKeyword = "div";
  private eachKeyword = "each";
  private elseKeyword = "else";
  private emptyKeyword = "empty";
  private endKeyword = "end";
  private enumKeyword = "enum";
  private exceptionKeyword = "exception";
  private forKeyword = "for";
  private fromKeyword = "from";
  private functionKeyword = "function";
  private globalKeyword = "global";
  private ifKeyword = "if";
  private ignoreKeyword = "ignore"; // Not actively used since v1.7.0, retained pro tem, for backwards Elan code compatibility - now has the effect of ghosting
  private imageKeyword = "image";
  private importKeyword = "import";
  private inKeyword = "in";
  private inheritsKeyword = "inherits";
  private interfaceKeyword = "interface";
  private isKeyword = "is";
  private isntKeyword = "isnt";
  private lambdaKeyword = "lambda";
  private letKeyword = "let";
  private libraryKeyword = "library";
  private mainKeyword = "main";
  private modKeyword = "mod";
  private newKeyword = "new";
  private notKeyword = "not";
  private ofKeyword = "of";
  private orKeyword = "or";
  private outKeyword = "out";
  private printKeyword = "print";
  private privateKeyword = "private";
  private procedureKeyword = "procedure";
  private propertyKeyword = "property";
  private recordKeyword = "record";
  private refKeyword = "ref";
  private repeatKeyword = "repeat";
  private returnKeyword = "return";
  private returnsKeyword = "returns";
  private setKeyword = "set";
  private stepKeyword = "step";
  private testKeyword = "test";
  private thenKeyword = "then";
  private thisKeyword = "this";
  private throwKeyword = "throw";
  private toKeyword = "to";
  private tryKeyword = "try";
  private tupleKeyword = "tuple";
  private variableKeyword = "variable";
  private whileKeyword = "while";
  private withKeyword = "with";

  private hash = "#";
}
