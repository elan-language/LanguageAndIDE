import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { modifierAsHtml } from "./frame-helpers";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ParseNode } from "./frame-interfaces/parse-node";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { Constant } from "./globals/constant";
import { Enum } from "./globals/enum";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { RecordFrame } from "./globals/record-frame";
import { TestFrame } from "./globals/test-frame";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Each } from "./statements/each";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { Print } from "./statements/print";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";

export class LanguageCS implements Language {
  languageFullName: string = "C#";

  annotation(frame: Frame): string {
    return frame.frameSpecificAnnotation();
  }

  commentMarker(): string {
    return this.doubleSlash;
  }
  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>);</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.catchKeyword} ${this.exceptionKeyword} ${this.inKeyword} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.doubleSlash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Constant) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.constKeyword} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.elseKeyword} ${this.ifKeyword} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.elseKeyword}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.enumKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.doubleSlash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `<el-kw>${this.varKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof Print) {
      html = `<el-kw>${this.printKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.propertyKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.asKeyword} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.throwKeyword} ${this.exceptionKeyword} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.varKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.abstractKeyword} ${this.functionKeyword} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.returnsKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.abstractKeyword} ${this.procedureKeyword} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof AbstractProperty) {
      html = ``;
    }
    return html;
  }

  renderSingleLineAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.abstractKeyword} ${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.constructorKeyword}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.foreachKeyword} </el-kw></el-kw><el-punc>(</el-punc>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}</el-kw><el-punc>) {</el-punc>`;
    } else if (frame instanceof For) {
      const v = frame.variable.renderAsHtml();
      html = `<el-kw>${this.forKeyword} </el-kw><el-punc>(</el-punc>${v}<el-punc> = </el-punc>${frame.from.renderAsHtml()}<el-punc>; </el-punc>${v} <el-punc>&lt;=</el-punc>${frame.to.renderAsHtml()}<el-punc>; </el-punc>${v}<el-punc> = </el-punc>${v}<el-punc> + </el-punc>${frame.step.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)} ${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalFunction) {
      html = `${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.voidKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.ifKeyword} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.interfaceKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.voidKeyword}</el-kw> <el-method>main</el-method><el-punc>() {</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.voidKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.recordKeyword} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html =
        html = `<el-kw>${this.voidKeyword} </el-kw>${frame.testName.renderAsHtml()}<el-punc>() {</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.tryKeyword}</el-kw><el-punc> {</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword}<el-punc> (</el-punc></el-kw>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    }
    return html;
  }

  renderTopAsExport(frame: Frame): string {
    return frame ? "" : ""; // TODO
  }

  renderBottomAsHtml(frame: Frame): string {
    return frame ? `<el-punc>}<el-punc>` : ``;
  }

  renderBottomAsExport(frame: Frame): string {
    return frame ? "" : ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderNodeAsHtml(node: ParseNode): string {
    let html = ""; // If "" returned the node will use its own generic implementation
    if (node instanceof TypeGenericNode) {
      html = `${node.simpleType?.renderAsHtml()}${node.generic?.renderAsHtml()}`;
    }
    return html;
  }

  // Not yet used - for illustration only
  grammarForNode(node: ParseNode): string {
    return node ? "" : "";
  }

  // Not yet used - for illustration only
  lexer(): string {
    return `
IS:           'is';
PLUS:         '+';
`; //etc.
  }

  private abstractKeyword = "abstract";
  private andKeyword = "and";
  private asKeyword = "as";
  private assertKeyword = "assert";
  private beKeyword = "be";
  private callKeyword = "call";
  private catchKeyword = "catch";
  private classKeyword = "class";
  private constKeyword = "const";
  private constructorKeyword = "constructor";
  private copyKeyword = "copy";
  private divKeyword = "div";
  private foreachKeyword = "foreach";
  private elifKeyword = "elif";
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
  private returnKeyword = "return";
  private returnsKeyword = "returns";
  private setKeyword = "set";
  private staticKeyword = "static";
  private stepKeyword = "step";
  private testKeyword = "test";
  private thenKeyword = "then";
  private thisKeyword = "this";
  private throwKeyword = "throw";
  private toKeyword = "to";
  private tryKeyword = "try";
  private tupleKeyword = "tuple";
  private varKeyword = "var";
  private voidKeyword = "void";
  private whileKeyword = "while";
  private withKeyword = "with";

  private doubleSlash = "//";
}
