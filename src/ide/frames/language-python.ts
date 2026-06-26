import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { EnumValuesField } from "./fields/enum-values-field";
import { InheritsFromField } from "./fields/inherits-from-field";
import { ParamListField } from "./fields/param-list-field";
import { FileImpl } from "./file-impl";
import { selfTypeAsHtml } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
import { ClassFrame } from "./globals/class-frame";
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
import { LanguageExportHelpers } from "./language-export-helpers";
import { LanguageExportPython } from "./language-export-python";
import { LineFormat, languageHelper_enumValuesList } from "./language-helpers";
import { CSV } from "./parse-nodes/csv";
import { ExprNode } from "./parse-nodes/expr-node";
import { IdentifierDef } from "./parse-nodes/identifier-def";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { Lambda } from "./parse-nodes/lambda";
import { ListNode } from "./parse-nodes/list-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNameUse } from "./parse-nodes/type-name-use";
import { TypeNode } from "./parse-nodes/type-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Else } from "./statements/else";
import { ElseIf } from "./statements/elseIf";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { InputStatement } from "./statements/input-statement";
import { LetStatement } from "./statements/let-statement";
import { PrintStatement } from "./statements/print-statement";
import { ReAssignVariable } from "./statements/reassign-variable";
import { ReturnStatement } from "./statements/return-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";
import { ParseStatus } from "./status-enums";
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "./symbols";

export class LanguagePython extends LanguageAbstract {
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
      frame instanceof LetStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ElseIf ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof ReAssignVariable ||
      frame instanceof CatchStatement ||
      frame instanceof ConcreteClass ||
      frame instanceof AbstractClass ||
      frame instanceof InterfaceFrame ||
      frame instanceof Property ||
      frame instanceof FunctionMethod ||
      frame instanceof ProcedureMethod ||
      frame instanceof AbstractFunction ||
      frame instanceof AbstractProcedure ||
      frame instanceof AbstractProperty ||
      frame instanceof InputStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `<el-comment>@abstractmethod</el-comment><br>${frame.indent()}<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:<br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-comment>@abstractmethod</el-comment><br>${frame.indent()}<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw><br>${frame.indent()}&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>self</el-kw>.<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.EXCEPT}</el-kw> ${frame.exceptionType.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.variable.renderAsHtml()}:`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()}</el-top> = ${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ElseIf) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}</el-kw>:`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.CLASS}</el-kw> ${frame.name.renderAsHtml()}(<el-type>Enum</el-type>):${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof InputStatement) {
      html = `${frame.name.renderAsHtml()} = <el-method>input</el-method>(${frame.prompt.renderAsHtml()})`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof PrintStatement) {
      html = `<el-method>print</el-method>(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ReAssignVariable) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.RAISE}</el-kw> ${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritance.renderAsHtml()}:`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritance.renderAsHtml()}:`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.DEF}</el-kw> <el-method>__init__</el-method>(${this.paramsListAsHtml(frame, frame.params)}) -> <el-kw>None</el-kw>:`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}:`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${frame.inheritance.renderAsHtml()}:`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.DEF} </el-kw><el-method>main</el-method>() -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramsListAsHtml(frame, frame.params)}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramsListAsHtml(frame, frame.params)}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)}(<el-id>unittest<el-id>.<el-type>TestCase</el-type>):<br>&nbsp;<el-kw>${this.DEF}</el-kw> ${this.testMethodNameAsHtml(frame)}(<el-kw>${this.SELF}</el-kw>) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw>:`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}:`;
    }
    return html;
  }

  paramsListAsHtml(frame: MemberFrame, field: ParamListField): string {
    const self: string = `<el-kw>${this.SELF}</el-kw>: ${selfTypeAsHtml(frame)}`;
    return field.text === "" ? self : `${self}, ${field.renderAsHtml()}`;
  }

  override enumValuesListAsHtml(field: EnumValuesField): string {
    return languageHelper_enumValuesList(field, LineFormat.multiline, 1, "");
  }

  inheritsFromTextAsHtml(field: InheritsFromField): string {
    let result = "";
    const frame = field.getHolder() as ClassFrame;
    if (frame.doesInherit()) {
      result = `(${field.default_renderasHtml()})`;
    } else if (frame.isAbstract) {
      result = `(<el-type>ABC</el-type>)`;
    }
    return result;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = "<el-comment># end ";
    if (frame instanceof AbstractClass || frame instanceof ConcreteClass) {
      html += this.CLASS;
    } else if (frame instanceof Constructor) {
      html += "constructor";
    } else if (frame instanceof FunctionMethod) {
      html += "function method";
    } else if (frame instanceof ProcedureMethod) {
      html += "procedure method";
    } else if (frame instanceof For) {
      html += this.FOR;
    } else if (frame instanceof GlobalFunction) {
      html += "function";
    } else if (frame instanceof GlobalProcedure) {
      html += "procedure";
    } else if (frame instanceof IfStatement) {
      html += "if";
    } else if (frame instanceof MainFrame) {
      html += "main";
    } else if (frame instanceof TryStatement) {
      html += this.TRY;
    } else if (frame instanceof While) {
      html += this.WHILE;
    } else if (frame instanceof TestFrame) {
      html += "test";
    }
    return html + "</el-comment>";
  }

  renderFileImportsAsHtml(): string {
    return this.languageExportHelpers.renderFileImportsAsHtml();
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(f: FileImpl): string {
    return f.containsMain() ? "\n\n<el-method>main</el-method>()" : "";
  }

  // make instances of the two classes needed for export of expressions
  private languageExportHelpers = new LanguageExportHelpers(new LanguageExportPython());

  // translate the library functions in an expression
  // Note that this translation may be turned off by a master flag in LanguageExportHelpers
  translateExpression(expr: string): string {
    return this.languageExportHelpers.translateExpression(expr);
  }

  postProcessHtml(html: string): string {
    return html;
  }

  private AS = "as";
  private DEF = "def";
  private CLASS = "class";
  private ELIF = "elif";
  private ELSE = "else";
  private EXCEPT = "except";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private LAMBDA = "lambda";
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
  NEW_INSTANCE_PREFIX = ""; // i.e. there is no Python equivalent to 'new' keyword

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
  END_OF_GENERIC: string = "]";
  THIS_INSTANCE: string = this.SELF;
  OVERRIDES = "";
  IMPLEMENTS = "";

  EXPRESSION_KEYWORDS: string[] = [this.LAMBDA, this.SELF, this.NOT];

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
    node.addElement(new PunctuationNode(node.file, COLON));
    node.addElement(new SpaceNode(node.file, Space.added));
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
    node.qualifiedName = new TypeNameUse(node.file, node.tokenTypes);
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

  addNodesForLambda(node: Lambda): void {
    node.addElement(new KeywordNode(node.file, this.LAMBDA));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.params = new CSV(node.file, () => new ParamDefNode(node.file), 0);
    node.addElement(node.params);
    node.addElement(new PunctuationNode(node.file, COLON));
    node.addElement(new SpaceNode(node.file, Space.added));
    node.expr = new ExprNode(node.file);
    node.addElement(node.expr);
  }

  addNodesForList(node: ListNode): void {
    this.default_addNodesForList(node);
  }

  listAsHtml(node: ListNode): string {
    return this.default_listAsHtml(node);
  }

  lambdaAsHtml(node: Lambda): string {
    return `<el-kw>${this.LAMBDA}</el-kw> ${node.params!.renderAsHtml()}${COLON} ${node.expr!.renderAsHtml()}`;
  }

  listNodeAsHtml(node: ListNode): string {
    return `[${node.csv?.renderAsHtml()}]`;
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
