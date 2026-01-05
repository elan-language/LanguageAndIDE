import { AbstractFrame } from "./abstract-frame";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
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

export class LanguageElan implements Language {
  annotation(frame: Frame): string {
    return frame instanceof AbstractFrame ? "" : ""; //No *frame-specific* annotation needed for Elan
  }
  commentMarker(): string {
    return this.hash;
  }
  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `<el-kw>${this.callKeyword} </el-kw>${frame.proc.renderAsHtml()}<span>(</span>${frame.args.renderAsHtml()}<span>)</span>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.catchKeyword} ${this.exceptionKeyword} ${this.inKeyword} </el-kw>${frame.variable.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Constant) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.constantKeyword} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.isImported() ? "" : frame.value.renderAsHtml()}`;
    } else if (frame instanceof Else) {
      const ifClause = frame.hasIf
        ? `<el-kw> ${this.ifKeyword} </kw> ${frame.condition.renderAsHtml()}`
        : ``;
      html = `<el-kw>${this.elseKeyword}</el-kw>${ifClause}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.enumKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.hash} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `<el-kw>${this.letKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.beKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Print) {
      html = `<el-kw>${this.printKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `<el-kw>${this.propertyKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.asKeyword} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.returnKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `<el-kw>${this.setKeyword} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.toKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.throwKeyword} ${this.exceptionKeyword} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.variableKeyword} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.setKeyword} ${this.toKeyword} </el-kw>${frame.expr.renderAsHtml()}`;
    }
    return html;
  }
  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.abstractKeyword} ${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.classKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.constructorKeyword}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof Each) {
      html = `<el-kw>${this.eachKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.inKeyword} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.forKeyword} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.fromKeyword} </el-kw>${frame.from.renderAsHtml()}<el-kw> ${this.toKeyword} </el-kw>${frame.to.renderAsHtml()}<el-kw> ${this.stepKeyword} </el-kw>${frame.step.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.functionKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.returnsKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.functionKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.returnsKeyword} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.procedureKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.ifKeyword} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.thenKeyword}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.interfaceKeyword} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.mainKeyword}</el-kw>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.procedureKeyword} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof RecordFrame) {
      html = `<el-kw>${this.recordKeyword} </el-kw>${frame.name.renderAsHtml()}`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.testKeyword} </el-kw>${frame.testDescription.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.tryKeyword} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.whileKeyword} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = this.end(this.classKeyword);
    } else if (frame instanceof ConcreteClass) {
      html = this.end(this.classKeyword);
    } else if (frame instanceof Constructor) {
      html = this.end(this.constructorKeyword);
    } else if (frame instanceof Each) {
      html = this.end(this.eachKeyword);
    } else if (frame instanceof For) {
      html = this.end(this.forKeyword);
    } else if (frame instanceof FunctionMethod) {
      html = this.end(this.functionKeyword);
    } else if (frame instanceof GlobalFunction) {
      html = this.end(this.functionKeyword);
    } else if (frame instanceof GlobalProcedure) {
      html = this.end(this.procedureKeyword);
    } else if (frame instanceof IfStatement) {
      html = this.end(this.ifKeyword);
    } else if (frame instanceof InterfaceFrame) {
      html = this.end(this.interfaceKeyword);
    } else if (frame instanceof MainFrame) {
      html = this.end(this.mainKeyword);
    } else if (frame instanceof ProcedureMethod) {
      html = this.end(this.procedureKeyword);
    } else if (frame instanceof RecordFrame) {
      html = this.end(this.recordKeyword);
    } else if (frame instanceof TestFrame) {
      html = this.end(this.testKeyword);
    } else if (frame instanceof TryStatement) {
      html = this.end(this.tryKeyword);
    } else if (frame instanceof While) {
      html = this.end(this.whileKeyword);
    }
    return html;
  }

  //TODO: not yet used
  renderNodeAsHtml(node: ParseNode): string {
    let html = "";
    if (node instanceof TypeGenericNode) {
      html = `${node.simpleType?.renderAsHtml()}&lt;<el-kw>of</el-kw> ${node.generic?.renderAsHtml}&gt;`;
    }
    return html;
  }

  private end(kw: string) {
    return `<el-kw>${this.endKeyword} ${kw}</el-kw>`;
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
