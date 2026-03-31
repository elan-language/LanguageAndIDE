import { asKeyword, ofKeyword } from "../../compiler/elan-keywords";
import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { CSV } from "./parse-nodes/csv";
import { IdentifierDef } from "./parse-nodes/identifier-def";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNameQualifiedNode } from "./parse-nodes/type-name-qualified-node";
import { TypeNode } from "./parse-nodes/type-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { ConstantStatement } from "./statements/constant-statement";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";
import { TokenType } from "./symbol-completion-helpers";
import { GT, LT } from "./symbols";

export class LanguageElan extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageElan();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "elan";
  languageFullName: string = "Elan";
  defaultFileExtension: string = "elan";
  defaultMimeType: string = "text/plain";

  annotation(_frame: Frame): string {
    return "";
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>assert </el-kw>${frame.actual.renderAsHtml()}<el-kw> is </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof CallStatement) {
      html = `<el-kw>${this.CALL} </el-kw>${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.CATCH} ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `<el-kw>${this.SET} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW}</el-kw> ${frame.type.renderAsHtml()} ${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VARIABLE} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.PROCEDURE} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof AbstractProperty) {
      html = `<el-kw>${this.ABSTRACT} ${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    }
    return html;
  }

  renderSingleLineAsExport(_frame: Frame): string {
    return ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.CONSTRUCTOR}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.MAIN}</el-kw>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.TEST} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsExport(_frame: Frame): string {
    return ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderBottomAsHtml(frame: Frame): string {
    return `<el-kw>${this.END} ${frame.initialKeywords()}</el-kw>`;
  }

  private ABSTRACT = "abstract";
  private AS = "as";
  private ASSERT = "assert";
  private BE = "be";
  private CALL = "call";
  private CATCH = "catch";
  private CLASS = "class";
  private CONSTANT = "constant";
  private CONSTRUCTOR = "constructor";
  private COPY = "copy";
  private DIV = "div";
  private EACH = "each";
  private ELIF = "elif";
  private ELSE = "else";
  private EMPTY = "empty";
  private END = "end";
  private ENUM = "enum";
  private EXCEPTION = "exception";
  private FOR = "for";
  private FROM = "from";
  private FUNCTION = "function";
  private GLOBAL = "global";
  private IF = "if";
  private IMPORT = "import";
  private IN = "in";
  private INHERITS = "inherits";
  private INTERFACE = "interface";
  private lambdaKeyword = "lambda";
  private letKeyword = "let";
  private LIBRARY = "library";
  private MAIN = "main";
  private NEW = "new";
  private OF = "of";
  private OUT = "out";
  private PRINT = "print";
  private PRIVATE = "private";
  private PROCEDURE = "procedure";
  private PROPERTY = "property";
  private RECORD = "record";
  private RETURN = "return";
  private RETURNS = "returns";
  private SET = "set";
  private STEP = "step";
  private TEST = "test";
  private THEN = "then";
  private THIS = "this";
  private THROW = "throw";
  private TO = "to";
  private TRY = "try";
  private VARIABLE = "variable";
  private WHILE = "while";
  private WITH = "with";

  POWER: string = "^";
  EQUAL: string = "is";
  NOT_EQUAL: string = "isnt";
  MOD = "mod";
  AND = "and";
  OR = "or";
  NOT = "not";

  COMMENT_MARKER = "#";
  LIST_START: string = "[";
  LIST_END: string = "]";
  INTERPOLATED_STRING_PREFIX: string = "$";
  NEW_INSTANCE_PREFIX = this.NEW;

  INT_NAME: string = "Int";
  FLOAT_NAME: string = "Float";
  BOOL_NAME: string = "Boolean";
  STRING_NAME: string = "String";
  LIST_NAME: string = "List";

  TRUE: string = "true";
  FALSE: string = "false";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  START_OF_GENERIC: string = `<${this.OF} `;
  THIS_INSTANCE: string = this.THIS;
  OVERRIDES = "";
  IMPLEMENTS = "";

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW_INSTANCE_PREFIX));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
    node.addElement(new SpaceNode(node.file, Space.required));
    node.addElement(new KeywordNode(node.file, asKeyword));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.type = new TypeNode(
      node.file,
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    node.addElement(node.type);
  }

  addNodesForTypeGeneric(node: TypeGenericNode): void {
    node.qualifiedName = new TypeNameQualifiedNode(node.file, node.tokenTypes);
    const typeConstr = () => new TypeNode(node.file, node.concreteAndAbstract);
    node.genericTypes = new CSV(node.file, typeConstr, 1);

    node.addElement(node.qualifiedName!);
    node.addElement(new PunctuationNode(node.file, LT));
    node.addElement(new KeywordNode(node.file, ofKeyword));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.addElement(node.genericTypes);
    node.addElement(new PunctuationNode(node.file, GT));
  }
  paramDefAsHtml(node: ParamDefNode): string {
    return `${node.name?.renderAsHtml()} <el-kw>as</el-kw> ${node.type?.renderAsHtml()}`;
  }

  typeGenericAsHtml(node: TypeGenericNode): string {
    return `${node.qualifiedName?.renderAsHtml()}&lt;<el-kw>of</el-kw> ${node.genericTypes?.renderAsHtml()}&gt;`;
  }

  newInstanceAsHtml(node: NewInstance): string {
    return `<el-kw>${this.NEW_INSTANCE_PREFIX}</el-kw> ${node.type?.renderAsHtml()}(${node.args?.renderAsHtml()})`;
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    this.addCommonElementsForTypeTuple(node);
  }
  typeTupleAsHtml(node: TypeTupleNode): string {
    return this.default_typeTupleAsHtml(node);
  }

  standardiseInterpolatedString(_node: LitStringInterpolated, text: string): string {
    return text; //If valid, it will already be in standard form
  }
  litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return this.default_litStringInterpolatedAsHtml(node);
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  private modifierAsHtml(member: MemberFrame): string {
    return member.isPrivate ? `<el-kw>${this.PRIVATE} </el-kw>` : "";
  }

  // Elan keywords followed by JavaScript keywords
  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `and`,
    `as`,
    `assert`,
    `be`,
    `call`,
    `catch`,
    `class`,
    `constant`,
    `constructor`,
    `each`,
    `elif`,
    `else`,
    `end`,
    `enum`,
    `exception`,
    `for`,
    `from`,
    `function`,
    `global`,
    `if`,
    `in`,
    `inherits`,
    `interface`,
    `is`,
    `isnt`,
    `lambda`,
    `library`,
    `main`,
    `mod`,
    `new`,
    `not`,
    `of`,
    `or`,
    `private`,
    `procedure`,
    `property`,
    `return`,
    `returns`,
    `set`,
    `step`,
    `test`,
    `then`,
    `this`,
    `throw`,
    `to`,
    `try`,
    `variable`,
    `while`,
    `action`,
    `arguments`,
    `array`,
    `async`,
    `await`,
    `boolean`,
    `break`,
    `by`,
    `byte`,
    `case`,
    `catch`,
    `char`,
    `const`,
    `continue`,
    `debugger`,
    `default`,
    `delete`,
    `do`,
    `double`,
    `eval`,
    `export`,
    `extends`,
    `final`,
    `finally`,
    `float`,
    `goto`,
    `implements`,
    `instanceof`,
    `int`,
    `into`,
    `list`,
    `long`,
    `match`,
    `mock`,
    `namespace`,
    `native`,
    `null`,
    `on`,
    `otherwise`,
    `package`,
    `partial`,
    `pattern`,
    `protected`,
    `public`,
    `scenario`,
    `short`,
    `static`,
    `stdlib`,
    `string`,
    `super`,
    `switch`,
    `system`,
    `synchronized`,
    `throws`,
    `transient`,
    `typeof`,
    `void`,
    `volatile`,
    `var`,
    `when`,
    `yield`,
  ]);
}
