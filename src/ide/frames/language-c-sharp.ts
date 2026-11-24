import { getConstantType } from "../compile-api/parser-helpers";
import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { CommentFrame } from "./comment-frame";
import { FieldImpl } from "./fields/field-impl";
import { FileImpl } from "./file-impl";
import { selfTypeAsHtml, selfTypeAsSource } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { FrameType } from "./frame-type";
import { AbstractClass } from "./globals/abstract-class";
import { ClassFrame } from "./globals/class-frame";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { MainRoutine } from "./globals/main-routine";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { AssertStatement } from "./statements/assert-statement";
import { Assignment } from "./statements/assignment";
import { CatchClause } from "./statements/catch-clause";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ReturnStatement } from "./statements/return-statement";
import { ThenClause } from "./statements/then-clause";
import { ThrowStatement } from "./statements/throw-statement";
import { TryClause } from "./statements/try-clause";
import { TryStatement } from "./statements/try-statement";
import { VariableDefinition } from "./statements/variable-definition";
import { WhileLoop } from "./statements/whileLoop";

export class LanguageCSharp extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageCSharp();

  languageHtmlClass = "cs";
  languageFullName: string = "C#";
  defaultFileExtension: string = "cs";
  defaultMimeType: string = "text/plain";

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof ProcedureCall) {
      html = `${frame.procRef.renderAsHtml()};`;
    } else if (frame instanceof CommentFrame) {
      html = frame.text.renderAsHtml();
    } else if (frame instanceof ElseIfClause) {
      html = `} <el-kw>else if </el-kw>(${frame.condition.renderAsHtml()}) {`;
    } else if (frame instanceof ElseClause) {
      html = `} <el-kw>else {`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>enum </el-kw>${frame.name.renderAsHtml()} {${frame.values.renderAsHtml()}}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>return </el-kw>${frame.expr.renderAsHtml()};`;
    } else if (frame instanceof Assignment) {
      html = `${frame.assignable.renderAsHtml()}<el-kw> = </el-kw>${frame.expr.renderAsHtml()};`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>throw new</el-kw> ${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()});`;
    } else if (frame instanceof VariableDefinition) {
      html = `<el-kw>var </el-kw>${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()};`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>abstract </el-kw>${frame.returnType.renderAsHtml()} <el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()});`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>abstract void </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()});`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()});`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>const </el-kw><el-type>${getConstantType(frame.value.text, this)} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()};`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}${frame.type.renderAsHtml()} ${frame.name.renderAsHtml()} {<el-kw>get</el-kw>; <el-kw>private set</el-kw>;}`;
    }
    return html;
  }

  private modifierAsHtml(member: MemberFrame): string {
    const modifier = this.modifierAsSource(member);
    return modifier === "" ? "" : `<el-kw>${modifier} </el-kw>`;
  }

  renderSingleLineAsSource(frame: Frame): string {
    let source = "";
    if (frame instanceof AssertStatement) {
      source = `Assert.AreEqual(${frame.expected.renderAsSource()}, ${frame.actual.renderAsSource()});`;
    } else if (frame instanceof ConstantGlobal) {
      source = `const ${getConstantType(frame.value.text, this)} ${frame.name.renderAsSource()} = ${frame.value.renderAsSource()};`;
    } else if (frame instanceof Property) {
      source = `${this.modifierAsSource(frame)}${frame.type.renderAsSource()} ${frame.name.renderAsSource()} {get; private set;}`;
    } else if (frame instanceof ProcedureCall) {
      source = `${frame.procRef.renderAsSource()};`;
    } else if (frame instanceof CommentFrame) {
      source = frame.text.renderAsSource();
    } else if (frame instanceof ElseIfClause) {
      source = `} else if (${frame.condition.renderAsSource()}) {`;
    } else if (frame instanceof ElseClause) {
      source = `} else {`;
    } else if (frame instanceof Enum) {
      source = `enum ${frame.name.renderAsSource()} {${frame.values.renderAsSource()}}`;
    } else if (frame instanceof ReturnStatement) {
      source = `return ${frame.expr.renderAsSource()};`;
    } else if (frame instanceof Assignment) {
      source = `${frame.assignable.renderAsSource()} = ${frame.expr.renderAsSource()};`;
    } else if (frame instanceof ThrowStatement) {
      source = `throw new ${frame.type.renderAsSource()}(${frame.text.renderAsSource()});`;
    } else if (frame instanceof VariableDefinition) {
      source = `var ${frame.name.renderAsSource()} = ${frame.expr.renderAsSource()};`;
    } else if (frame instanceof AbstractFunction) {
      source = `abstract ${frame.returnType.renderAsSource()} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()});`;
    } else if (frame instanceof AbstractProcedure) {
      source = `abstract void ${frame.name.renderAsSource()}(${frame.params.renderAsSource()});`;
    }
    return source;
  }

  private modifierAsSource(member: MemberFrame): string {
    let modifier = "";
    if (member.isPrivate && member.isOnAbstractClass()) {
      modifier = "protected";
    } else if (member.isPrivate) {
      modifier = "private";
    } else {
      modifier = "public";
    }
    return modifier === "" ? "" : `${modifier} `;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `[<el-type>TestClass</el-type>] <el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)}<br>[<el-type>TestMethod</el-type>] <el-kw>static void </el-kw>${frame.testName.renderAsHtml()}() {`;
    } else if (frame instanceof AbstractClass) {
      html = `<el-kw>abstract class </el-kw>${frame.name.renderAsHtml()}${frame.inheritance.renderAsHtml()} {`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>class </el-kw>${frame.name.renderAsHtml()}${frame.inheritance.renderAsHtml()} {`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>public ${selfTypeAsHtml(frame)}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof CatchClause) {
      html = `} <el-kw>catch</el-kw> (${frame.exceptionType.renderAsHtml()} ${frame.variable.renderAsHtml()}) {`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}${this.overrides(frame)}<el-kw></el-kw>${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}${this.overrides(frame)}<el-kw>void </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>foreach </el-kw>(<el-kw>var</el-kw> ${frame.variable.renderAsHtml()}<el-kw> in </el-kw>${frame.iter.renderAsHtml()}</el-kw>) {`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>static </el-kw>${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>static void </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>if </el-kw>(${frame.condition.renderAsHtml()}) {`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>static void</el-kw> <el-method>main</el-method>() {`;
    } else if (frame instanceof ThenClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      html = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>try</el-kw> {`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>while (</el-kw>${frame.condition.renderAsHtml()}) {`;
    }
    return html;
  }

  renderTopAsSource(frame: Frame): string {
    let source = "";
    if (frame instanceof TestFrame) {
      source = `[TestClass] class ${this.testClassNameAsSource(frame)}\n[TestMethod] static void ${frame.testName.renderAsSource()}() {`;
    } else if (frame instanceof AbstractClass) {
      source = `abstract class ${frame.name.renderAsSource()}${frame.inheritance.renderAsSource()} {`;
    } else if (frame instanceof ConcreteClass) {
      source = `class ${frame.name.renderAsSource()}${frame.inheritance.renderAsSource()} {`;
    } else if (frame instanceof Constructor) {
      source = `public ${selfTypeAsSource(frame)}(${frame.params.renderAsSource()}) {`;
    } else if (frame instanceof CatchClause) {
      source = `} catch (${frame.exceptionType.renderAsSource()} ${frame.variable.renderAsSource()}) {`;
    } else if (frame instanceof FunctionMethod) {
      source = `${this.modifierAsSource(frame)}${this.overrides(frame)}${frame.returnType.renderAsSource()} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) {`;
    } else if (frame instanceof ProcedureMethod) {
      source = `${this.modifierAsSource(frame)}${this.overrides(frame)}void ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) {`;
    } else if (frame instanceof ForLoop) {
      source = `foreach var ${frame.variable.renderAsSource()} in ${frame.iter.renderAsSource()}) {`;
    } else if (frame instanceof GlobalFunction) {
      source = `static ${frame.returnType.renderAsSource()} ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) {`;
    } else if (frame instanceof GlobalProcedure) {
      source = `static void ${frame.name.renderAsSource()}(${frame.params.renderAsSource()}) {`;
    } else if (frame instanceof IfStatement) {
      source = `if (${frame.condition.renderAsSource()}) {`;
    } else if (frame instanceof MainRoutine) {
      source = `static void main() {`;
    } else if (frame instanceof ThenClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryClause) {
      source = ``; // no top to ThenClause
    } else if (frame instanceof TryStatement) {
      source = `try {`;
    } else if (frame instanceof WhileLoop) {
      source = `while (${frame.condition.renderAsSource()}) {`;
    }
    return source;
  }

  inheritsFromTextAsHtml(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? `: ${field.renderAsHtml()}` : ``;
  }

  inheritsFromTextAsSource(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? `: ${field.renderAsSource()}` : ``;
  }

  renderBottomAsHtml(_frame: Frame): string {
    return `<el-punc>}</el-punc>`;
  }

  renderBottomAsSource(_frame: Frame): string {
    return "}";
  }

  renderFileImportsAsHtml(): string {
    return "";
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderSpecificHeaderAsSource(_f: FileImpl): string {
    return "";
  }

  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsSource(_f: FileImpl): string {
    return "";
  }

  postProcessHtml(html: string): string {
    return html;
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return [frame.returnType, frame.name, frame.params];
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return [frame.expected, frame.actual];
  }

  customiseStatementOptions(_options: [FrameType, string, string, boolean][]): void {
    // does nothing
  }

  INTERPOLATED_STRING_PREFIX = "$";
  BOOL_NAME = "bool";
  FUNC_NAME = "Func";
  OVERRIDES = "override";
  IMPLEMENTS = ""; // not used

  COMMENT_MARKER: string = "//";

  INT_NAME: string = "int";
  FLOAT_NAME: string = "double";
  STRING_NAME: string = "string";
  LIST_NAME: string = "List";
  DICT_NAME: string = "Dictionary";
}
