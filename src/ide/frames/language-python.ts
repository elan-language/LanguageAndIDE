import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { selfType } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
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
import { ProcedureFrame } from "./globals/procedure-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { CSV } from "./parse-nodes/csv";
import { IdentifierDef } from "./parse-nodes/identifier-def";
import { ListNode } from "./parse-nodes/list-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PropertyRef } from "./parse-nodes/property-ref";
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
import { ParseStatus } from "./status-enums";
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "./symbols";

export class LanguagePython extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguagePython();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "python";
  languageFullName: string = "Python";
  defaultFileExtension: string = "py";
  defaultMimeType: string = "text/x-python";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ConstantGlobal ||
      frame instanceof ConstantStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement ||
      frame instanceof CatchStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `TBD`;
    } else if (frame instanceof AbstractProcedure) {
      html = `TBD`;
    } else if (frame instanceof AbstractProperty) {
      html = `TBD`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>self</el-kw>.<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.EXCEPT}</el-kw> ${frame.exceptionType.renderAsHtml()}:`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()} = ${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}</el-kw>:`;
    } else if (frame instanceof Enum) {
      html = `${frame.name.renderAsHtml()} = <el-type>Enum</el-type>('${frame.name.renderAsHtml()}', '${frame.values.renderAsHtml()}')`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.RAISE}</el-kw> ${frame.type.renderAsHtml()}("${frame.text.renderAsHtml()}")`;
    } else if (frame instanceof VariableStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.DEF} </el-kw>(<el-kw>${this.SELF}</el-kw>: ${selfType(frame)},${frame.params.renderAsHtml()}:<el-kw>none</el-kw>`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}:`;
    } else if (frame instanceof Enum) {
      html = ``;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.SELF}: ${selfType(frame)}, ${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.DEF} </el-kw><el-method>main</el-method>(): <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(<el-kw>${this.SELF}</el-kw>: ${selfType(frame)}, ${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof Property) {
      html = ``;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.DEF}</el-kw> <el-method>${frame.testName.renderAsHtml()}</el-method>(<el-kw>${this.SELF}</el-kw>) -> <el-kw>${this.NONE}:`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw>:`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}:`;
    }
    return html;
  }

  renderBottomAsHtml(_frame: Frame): string {
    return ""; // Python blocks have no textual ending;
  }

  private DEF = "def";
  private CLASS = "class";
  private ELIF = "elif";
  private ELSE = "else";
  private EXCEPT = "except";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private NONE = "None";
  private RAISE = "raise";
  private RETURN = "return";
  private SELF = "self";
  private TRY = "try";
  private WHILE = "while";

  private OPEN_SQUARE_BRACKET = "[";
  private CLOSE_SQUARE_BRACKET = "]";

  MOD: string = "%";
  EQUAL: string = "==";
  NOT_EQUAL: string = "!=";
  AND: string = "and";
  OR: string = "or";
  NOT: string = "not";

  COMMENT_MARKER = "#";
  LIST_START: string = "[";
  LIST_END: string = "]";
  INTERPOLATED_STRING_PREFIX: string = "f";
  NEW = ""; // i.e. there is no Python equivalent to 'new' keyword

  INT_NAME: string = "int";
  FLOAT_NAME: string = "float";
  BOOL_NAME: string = "bool";
  STRING_NAME: string = "str";
  LIST_NAME: string = "list";

  TRUE: string = "True";
  FALSE: string = "False";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  START_OF_GENERIC: string = "[";

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
    node.addElement(new PunctuationNode(node.file, COLON));
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

  paramDefAsHtml(node: ParamDefNode): string {
    return `${node.name?.renderAsHtml()}: ${node.type?.renderAsHtml()}`;
  }

  newInstanceAsHtml(node: NewInstance): string {
    return node.status === ParseStatus.valid
      ? `${node.type?.renderAsHtml()}(${node.args?.renderAsHtml()})`
      : node.matchedText;
  }

  addNodesForTypeGeneric(node: TypeGenericNode) {
    node.qualifiedName = new TypeNameQualifiedNode(node.file, node.tokenTypes);
    const typeConstr = () => new TypeNode(node.file, node.concreteAndAbstract);
    node.genericTypes = new CSV(node.file, typeConstr, 1);
    node.addElement(node.qualifiedName!);
    node.addElement(new PunctuationNode(node.file, this.OPEN_SQUARE_BRACKET));
    node.addElement(node.genericTypes);
    node.addElement(new PunctuationNode(node.file, this.CLOSE_SQUARE_BRACKET));
  }
  typeGenericAsHtml(node: TypeGenericNode): string {
    return `${node.qualifiedName?.renderAsHtml()}[${node.genericTypes?.renderAsHtml()}]`;
  }

  addNodesForNewInstance(node: NewInstance): void {
    this.addCommonElementsForNewInstance(node);
  }

  listNodeAsHtml(node: ListNode): string {
    return `[${node.csv?.renderAsHtml()}]`;
  }

  propertyRefAsHtml(node: PropertyRef): string {
    return `<el-kw>${this.SELF}</el-kw>.${node.name.renderAsHtml()}`;
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return this.default_litStringInterpolatedAsHtml(node);
  }
  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string {
    return this.default_standardiseInterpolatedString(node, text);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    node.types = new CSV(
      node.file,
      () =>
        new TypeNode(
          node.file,
          new Set<TokenType>([
            TokenType.type_concrete,
            TokenType.type_abstract,
            TokenType.type_notInheritable,
          ]),
        ),
      2,
    );
    node.addElement(new PunctuationNode(node.file, "tuple"));
    node.addElement(new PunctuationNode(node.file, OPEN_SQ_BRACKET));
    node.addElement(node.types);
    node.addElement(new PunctuationNode(node.file, CLOSE_SQ_BRACKET));
  }

  override typeTupleAsHtml(node: TypeTupleNode): string {
    return `<el-kw>tuple</el-kw>[${node.types?.renderAsHtml()}]`;
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  reservedWords: Set<string> = new Set<string>([
    `false`,
    `await`,
    `else`,
    `import`,
    `pass`,
    `none`,
    `break`,
    `except`,
    `in`,
    `raise`,
    `true`,
    `class`,
    `finally`,
    `is`,
    `return`,
    `and`,
    `continue`,
    `for`,
    `lambda`,
    `try`,
    `as`,
    `def`,
    `from`,
    `nonlocal`,
    `while`,
    `assert`,
    `del`,
    `global`,
    `not`,
    `with`,
    `async`,
    `elif`,
    `if`,
    `or`,
    `yield`,
    `str`,
    `int`,
    `float`,
    `complex`,
    `list`,
    `tuple`,
    `range`,
    `dict`,
    `set`,
    `frozenset`,
    `bool`,
    `bytes`,
    `bytearray`,
    `memoryview`,
    `nonetype`,
  ]);
}
