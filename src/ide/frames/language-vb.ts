import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { modifierAsHtml } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
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
import { KeywordNode } from "./parse-nodes/keyword-node";
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
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "./symbols";

export class LanguageVB extends LanguageAbstract {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageVB();

  commentRegex(): RegExp {
    return /' [^\r\n]*/;
  }
  languageHtmlClass = "vb";
  languageFullName: string = "VB.NET";
  defaultFileExtension: string = "vb";
  defaultMimeType: string = "text/plain";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>)<el-punc>`;
    } else if (frame instanceof CatchStatement) {
      //Catch e As DivideByZeroException
      html = `<el-kw>${this.CATCH}</el-kw> ${frame.variable.renderAsHtml()} <el-kw>${this.AS}</el-kw> ${frame.exceptionType.renderAsHtml()}`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.SINGLE_QUOTE} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw>${frame.name.renderAsHtml()}<el-kw></el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELSEIF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.SINGLE_QUOTE} <el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.CONST} <el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.PROPERTY} </el-kw>${frame.name.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW} ${this.NEW} </el-kw>${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.DIM} </el-kw>${frame.name.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} ${this.FUNCTION} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.SUB} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof AbstractProperty) {
      html = ``;
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.PUBLIC} ${this.SUB} ${this.NEW}</el-kw><el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} ${this.EACH} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}`;
    } else if (frame instanceof FunctionMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.FUNCTION} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc><el-kw> ${this.AS} </el-kw>${frame.returnType.renderAsHtml()}`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}<el-kw> ${this.THEN}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.SUB}</el-kw> <el-method>main</el-method><el-punc>()</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${modifierAsHtml(frame)}<el-kw>${this.SUB} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>)</el-punc>`;
    } else if (frame instanceof TestFrame) {
      html = `&lt;<el-type>TestMethod</el-type>&gt; <el-kw>${this.SUB} </el-kw>${frame.testName.renderAsHtml()}()`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY} </el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}`;
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.END} ${this.CLASS}</el-kw>`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.END} ${this.CLASS}</el-kw>`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.NEXT}</el-kw> <el-id>${frame.variable.renderAsElanSource()}</el-id>`;
    } else if (frame instanceof FunctionMethod) {
      html = `<el-kw>${this.END} ${this.FUNCTION}</el-kw>`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.END} ${this.FUNCTION}</el-kw>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.END} ${this.IF}</el-kw>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.END} ${this.INTERFACE}</el-kw>`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.END} ${this.SUB}</el-kw>`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.END} ${this.TRY}</el-kw>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.END} ${this.WHILE}</el-kw>`;
    }
    return html;
  }

  getFields(node: Frame): Field[] {
    return node ? [] : [];
  }

  private ABSTRACT = "abstract";
  private AS = "As";
  private CATCH = "Catch";
  private CLASS = "Class";
  private CONST = "Const";
  private DIM = "Dim";
  private EACH = "Each";
  private ELSEIF = "ElseIf";
  private ELSE = "Else";
  private END = "End";
  private ENUM = "Enum";
  private FOR = "For";
  private FUNCTION = "Function";
  private IF = "If";
  private IN = "In";
  private INHERITS = "Inherits";
  private INTERFACE = "Interface";
  private IS = "Is";
  private ME = "Me";
  private NEXT = "Next";
  private OF = "Of";
  private PRIVATE = "Private";
  private PROPERTY = "Property";
  private PUBLIC = "Public";
  private RETURN = "Return";
  private STEP = "Step";
  private SUB = "Sub";
  private THEN = "Then";
  private THROW = "Throw";
  private TO = "To";
  private TRY = "Try";
  private WHILE = "While";

  private SINGLE_QUOTE = "'";

  EQUAL: string = "=";
  NOT_EQUAL: string = "<>";
  MOD = "Mod";
  AND = "And";
  OR = "Or";
  NOT = "Not";

  COMMENT_MARKER: string = this.SINGLE_QUOTE;
  LIST_START: string = "{";
  LIST_END: string = "}";
  INTERPOLATED_STRING_PREFIX: string = "$";

  INT_NAME: string = "Integer";
  FLOAT_NAME: string = "Double";
  BOOL_NAME: string = "Boolean";
  STRING_NAME: string = "String";
  LIST_NAME: string = "List";
  NEW = "New";

  TRUE: string = "True";
  FALSE: string = "False";
  BINARY_PREFIX: string = "&B";
  HEX_PREFIX: string = "&H";

  START_OF_GENERIC: string = `(${this.OF} `;

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
    node.addElement(new SpaceNode(node.file, Space.required));
    node.addElement(new PunctuationNode(node.file, this.AS));
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
    return `${node.name?.renderAsHtml()}<el-kw> ${this.AS} </el-kw>${node.type?.renderAsHtml()}`;
  }

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  addNodesForTypeGeneric(node: TypeGenericNode) {
    node.qualifiedName = new TypeNameQualifiedNode(node.file, node.tokenTypes);
    const typeConstr = () => new TypeNode(node.file, node.concreteAndAbstract);
    node.genericTypes = new CSV(node.file, typeConstr, 1);

    node.addElement(node.qualifiedName!);
    node.addElement(new PunctuationNode(node.file, OPEN_BRACKET));
    node.addElement(new KeywordNode(node.file, this.OF));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.addElement(node.genericTypes);
    node.addElement(new PunctuationNode(node.file, CLOSE_BRACKET));
  }

  typeGenericAsHtml(node: TypeGenericNode): string {
    return `${node.qualifiedName?.renderAsHtml()}(<el-kw>${this.OF}</el-kw> ${node.genericTypes?.renderAsHtml()})`;
  }

  propertyRefAsHtml(node: PropertyRef): string {
    return `<el-kw>${this.ME}</el-kw>.${node.name.renderAsHtml()}`;
  }

  newInstanceAsHtml(node: NewInstance): string {
    return `<el-kw>${this.NEW} ${node.type?.renderAsHtml()}(${node.args?.renderAsHtml()})</el-kw>`;
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return this.default_litStringInterpolatedAsHtml(node);
  }
  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string {
    return this.default_standardiseInterpolatedString(node, text);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    this.addCommonElementsForTypeTuple(node);
  }

  typeTupleAsHtml(node: TypeTupleNode): string {
    return this.default_typeTupleAsHtml(node);
  }

  reservedWords: Set<string> = new Set<string>([
    `addhandler`,
    `addressof`,
    `alias`,
    `and`,
    `andalso`,
    `as`,
    `boolean`,
    `byref`,
    `byte`,
    `byval`,
    `call`,
    `case`,
    `catch`,
    `cbool`,
    `cbyte`,
    `cchar`,
    `cdate`,
    `cdbl`,
    `cdec`,
    `char`,
    `cint`,
    `class`,
    `class`,
    `clng`,
    `cobj`,
    `const`,
    `constraint`,
    `continue`,
    `csbyte`,
    `cshort`,
    `csng`,
    `cstr`,
    `ctype`,
    `cuint`,
    `culng`,
    `cushort`,
    `date`,
    `decimal`,
    `declare`,
    `default`,
    `delegate`,
    `dim`,
    `directcast`,
    `do`,
    `double`,
    `each`,
    `else`,
    `elseif`,
    `end`,
    `endif`,
    `enum`,
    `erase`,
    `error`,
    `event`,
    `exit`,
    `false`,
    `finally`,
    `for`,
    `for`,
    `friend`,
    `function`,
    `get`,
    `gettype`,
    `getxmlnamespace`,
    `global`,
    `gosub`,
    `goto`,
    `handles`,
    `if`,
    `implements`,
    `imports`,
    `in`,
    `inherits`,
    `integer`,
    `interface`,
    `is`,
    `isnot`,
    `let`,
    `lib`,
    `like`,
    `long`,
    `loop`,
    `me`,
    `mod`,
    `module`,
    `mustinherit`,
    `mustoverride`,
    `mybase`,
    `myclass`,
    `nameof`,
    `namespace`,
    `narrowing`,
    `new`,
    `next`,
    `not`,
    `nothing`,
    `notinheritable`,
    `notoverridable`,
    `object`,
    `of`,
    `on`,
    `operator`,
    `option`,
    `optional`,
    `or`,
    `orelse`,
    `out`,
    `overloads`,
    `overridable`,
    `overrides`,
    `paramarray`,
    `partial`,
    `private`,
    `property`,
    `protected`,
    `public`,
    `raiseevent`,
    `readonly`,
    `redim`,
    `rem`,
    `removehandler`,
    `resume`,
    `return`,
    `sbyte`,
    `select`,
    `set`,
    `shadows`,
    `shared`,
    `short`,
    `single`,
    `static`,
    `step`,
    `stop`,
    `string`,
    `structure`,
    `sub`,
    `synclock`,
    `then`,
    `throw`,
    `to`,
    `true`,
    `try`,
    `trycast`,
    `typeof`,
    `uinteger`,
    `ulong`,
    `ushort`,
    `using`,
    `variant`,
    `wend`,
    `when`,
    `while`,
    `widening`,
    `with`,
    `withevents`,
    `writeonly`,
    `xor`,
  ]);
}
