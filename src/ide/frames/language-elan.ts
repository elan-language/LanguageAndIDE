import {
  abstractKeyword,
  asKeyword,
  assertKeyword,
  assignKeyword,
  beKeyword,
  callKeyword,
  catchKeyword,
  classKeyword,
  constantKeyword,
  constructorKeyword,
  elifKeyword,
  elseKeyword,
  endKeyword,
  enumKeyword,
  evaluatesKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  inheritsKeyword,
  inKeyword,
  inputKeyword,
  interfaceKeyword,
  lambdaKeyword,
  letKeyword,
  mainKeyword,
  newKeyword,
  ofKeyword,
  powKeyword,
  printKeyword,
  privateKeyword,
  procedureKeyword,
  propertyKeyword,
  returnKeyword,
  returnsKeyword,
  setKeyword,
  stepKeyword,
  testKeyword,
  thenKeyword,
  thisKeyword,
  throwKeyword,
  toKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
} from "../../compiler/elan-keywords";
import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { EnumValuesField } from "./fields/enum-values-field";
import { InheritsFromField } from "./fields/inherits-from-field";
import { FileImpl } from "./file-impl";
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
import { MainRoutine } from "./globals/main-routine";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { languageHelper_enumValuesList, LineFormat } from "./language-helpers";
import { CSV } from "./parse-nodes/csv";
import { ExprNode } from "./parse-nodes/expr-node";
import { IdentifierNode } from "./parse-nodes/identifier-node";
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
import { Assignment } from "./statements/assignment";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { ElseClause } from "./statements/else-clause";
import { ElseIfClause } from "./statements/elseIf-clause";
import { ForLoop } from "./statements/forLoop";
import { IfStatement } from "./statements/if-statement";
import { InputStatement } from "./statements/input-statement";
import { LetStatement } from "./statements/let-statement";
import { PrintStatement } from "./statements/print-statement";
import { ProcedureCall } from "./statements/procedureCall";
import { ReturnStatement } from "./statements/return-statement";
import { ThrowStatement } from "./statements/throw-statement";
import { TryStatement } from "./statements/try-statement";
import { VariableStatement } from "./statements/variable-statement";
import { WhileLoop } from "./statements/whileLoop";
import { TokenType } from "./symbol-completion-helpers";
import { ARROW, GT, LT } from "./symbols";

export class LanguageElan extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageElan();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "elan";
  languageFullName: string = "Reference Language";
  defaultFileExtension: string = "elan";
  defaultMimeType: string = "text/plain";

  annotation(_frame: Frame): string {
    return "";
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-kw>${this.ASSERT} </el-kw>${frame.actual.renderAsHtml()}<el-kw> ${this.EVALUATES} ${this.TO} </el-kw>${frame.expected.renderAsHtml()}`;
    } else if (frame instanceof ProcedureCall) {
      html = `<el-kw>${this.CALL} </el-kw>${frame.proc.renderAsHtml()}(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.CATCH} ${frame.variable.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONSTANT} </el-kw>${frame.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ElseIfClause) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof ElseClause) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof InputStatement) {
      html = `<el-kw>${this.INPUT} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw><el-method>inputString</el-method>(${frame.prompt.renderAsHtml()})`;
    } else if (frame instanceof LetStatement) {
      html = `<el-kw>${this.LET} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.BE} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof PrintStatement) {
      html = `<el-kw>${this.PRINT}</el-kw>(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Assignment) {
      html = `<el-kw>${this.ASSIGN} </el-kw>${frame.assignable.renderAsHtml()}<el-kw> ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof ThrowStatement) {
      html = `<el-kw>${this.THROW}</el-kw> ${frame.type.renderAsHtml()} ${frame.text.renderAsHtml()}`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VARIABLE} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.SET} ${this.TO} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.PROCEDURE} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()})`;
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
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.CONSTRUCTOR}</el-kw>(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof ForLoop) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})<el-kw> ${this.RETURNS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.PROCEDURE} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()})`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritance.renderAsHtml()}`;
    } else if (frame instanceof MainRoutine) {
      html = `<el-kw>${this.MAIN}</el-kw>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.TEST} </el-kw>${frame.testName.renderAsHtml()}`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof WhileLoop) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  inheritsFromTextAsHtml(field: InheritsFromField): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit()
      ? ` <el-kw>${this.INHERITS}</el-kw> ${field.default_renderasHtml()}`
      : ``;
  }

  renderTopAsExport(_frame: Frame): string {
    return ""; // At least for the time being, there is no reason to export a file being presented as Elan
  }

  renderBottomAsHtml(frame: Frame): string {
    return `<el-kw>${this.END} ${frame.initialKeywords()}</el-kw>`;
  }

  renderFileImportsAsHtml(): string {
    return "";
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "";
  }

  translateExpression(expr: string): string {
    return expr;
  }

  postProcessHtml(html: string): string {
    return html;
  }

  private ABSTRACT = abstractKeyword;
  private AS = asKeyword;
  private ASSERT = assertKeyword;
  private ASSIGN = assignKeyword;
  private BE = beKeyword;
  private CALL = callKeyword;
  private CATCH = catchKeyword;
  private CLASS = classKeyword;
  private CONSTANT = constantKeyword;
  private CONSTRUCTOR = constructorKeyword;
  private ELIF = elifKeyword;
  private ELSE = elseKeyword;
  private END = endKeyword;
  private ENUM = enumKeyword;
  private EVALUATES = evaluatesKeyword;
  private FOR = forKeyword;
  private FUNCTION = functionKeyword;
  private IF = ifKeyword;
  private IN = inKeyword;
  private INHERITS = inheritsKeyword;
  private INPUT = inputKeyword;
  private INTERFACE = interfaceKeyword;
  private lambdaKeyword = lambdaKeyword;
  private LET = letKeyword;
  private MAIN = mainKeyword;
  private NEW = newKeyword;
  private OF = ofKeyword;
  private PRINT = printKeyword;
  private PRIVATE = privateKeyword;
  private PROCEDURE = procedureKeyword;
  private PROPERTY = propertyKeyword;
  private POW = powKeyword;
  private RETURN = returnKeyword;
  private RETURNS = returnsKeyword;
  private SET = setKeyword;
  private STEP = stepKeyword;
  private TEST = testKeyword;
  private THEN = thenKeyword;
  private THIS = thisKeyword;
  private THROW = throwKeyword;
  private TO = toKeyword;
  private TRY = tryKeyword;
  private VARIABLE = variableKeyword;
  private WHILE = whileKeyword;
  private WITH = withKeyword;

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
  END_OF_GENERIC: string = `>`;
  THIS_INSTANCE: string = this.THIS;
  OVERRIDES = "";
  IMPLEMENTS = "";

  EXPRESSION_KEYWORDS: string[] = [this.NEW, this.IF, this.lambdaKeyword, this.THIS, this.NOT];
  DISALLOWED_IDENTIFIERS: string[] = [
    this.NEW,
    this.lambdaKeyword,
    this.THIS,
    this.NOT,
    this.TRUE,
    this.FALSE,
  ];

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW_INSTANCE_PREFIX));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierNode(node.file);
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
    node.qualifiedName = new TypeNameUse(node.file, node.tokenTypes);
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

  addNodesForLambda(node: Lambda): void {
    node.addElement(new KeywordNode(node.file, lambdaKeyword));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.params = new CSV(node.file, () => new ParamDefNode(node.file), 0);
    node.addElement(node.params);
    node.addElement(new SpaceNode(node.file, Space.added));
    node.addElement(new PunctuationNode(node.file, ARROW));
    node.addElement(new SpaceNode(node.file, Space.added));
    node.expr = new ExprNode(node.file);
    node.addElement(node.expr);
  }

  lambdaAsHtml(node: Lambda): string {
    return `<el-kw>${lambdaKeyword}</el-kw> ${node.params!.renderAsHtml()} ${ARROW} ${node.expr!.renderAsHtml()}`;
  }

  addNodesForList(node: ListNode): void {
    this.default_addNodesForList(node);
  }

  parseInterpolatedString(node: LitStringInterpolated, text: string): void {
    return this.default_parseInterpolatedString(node, this.INTERPOLATED_STRING_PREFIX, text);
  }

  listAsHtml(node: ListNode): string {
    return this.default_listAsHtml(node);
  }

  enumValuesListAsHtml(field: EnumValuesField): string {
    return languageHelper_enumValuesList(field, LineFormat.inline, 0, "");
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
    `if_`,
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
    `record`,
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
