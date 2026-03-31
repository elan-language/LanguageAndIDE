import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { selfTypeAsHtml } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
import { ConcreteClass } from "./globals/concrete-class";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { LanguageAbstract } from "./language-abstract";
import { CSV } from "./parse-nodes/csv";
import { IdentifierDef } from "./parse-nodes/identifier-def";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNameQualifiedNode } from "./parse-nodes/type-name-qualified-node";
import { TypeNode } from "./parse-nodes/type-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
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

export abstract class LanguageCfamily extends LanguageAbstract {
  protected constructor() {
    super();
  }

  common_commentRegex(): RegExp {
    return /\/\/ [^\r\n]*/;
  }
  abstract languageFullName: string;
  abstract defaultFileExtension: string;
  abstract defaultMimeType: string;

  common_Annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof ProcedureFrame ||
      frame instanceof FunctionFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement ||
      frame instanceof Property ||
      frame instanceof AbstractProperty ||
      frame instanceof AbstractProcedure ||
      frame instanceof AbstractFunction
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  common_renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}<el-punc>(</el-punc>${frame.args.renderAsHtml()}<el-punc>);</el-punc>`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-punc>}</el-punc> <el-kw>${this.CATCH}</el-kw> (${frame.exceptionType.renderAsHtml()} ${frame.variable.renderAsHtml()}) {`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-punc>} </el-punc><el-kw>${this.ELSE} ${this.IF} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof Else) {
      html = `<el-punc>} </el-punc><el-kw>${this.ELSE}<el-punc> {</el-punc>`;
    } else if (frame instanceof Enum) {
      html = `<el-kw>${this.ENUM} </el-kw>${frame.name.renderAsHtml()} ${frame.values.renderAsHtml()}`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()};`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()}<el-kw><el-punc> = </el-punc></el-kw>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.THROW} ${this.NEW_INSTANCE_PREFIX}</el-kw> ${frame.type.renderAsHtml()}(${frame.text.renderAsHtml()})`;
    } else if (frame instanceof VariableStatement) {
      html = `<el-kw>${this.VAR} </el-kw>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else if (frame instanceof AbstractFunction) {
      html = `<el-kw>${this.ABSTRACT} </el-kw>${frame.returnType.renderAsHtml()} <el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()});`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-kw>${this.ABSTRACT} ${this.VOID} </el-kw><el-method>${frame.name.renderAsHtml()}</el-method>(${frame.params.renderAsHtml()});`;
    }
    return html;
  }

  protected modifierAsHtml(member: MemberFrame): string {
    let modifier = "";
    if (member.isPrivate && member.isOnAbstractClass()) {
      modifier = this.PROTECTED;
    } else if (member.isPrivate) {
      modifier = this.PRIVATE;
    } else {
      modifier = this.PUBLIC;
    }
    return modifier === "" ? "" : `<el-kw>${modifier} </el-kw>`;
  }

  common_renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for this frame`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.ABSTRACT} ${this.CLASS} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof ConcreteClass) {
      html = `<el-kw>${this.CLASS} </el-kw>${frame.name.renderAsHtml()}${frame.inheritanceAsHtml()} {`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.PUBLIC} ${selfTypeAsHtml(frame)}(${frame.params.renderAsHtml()}) {`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOREACH} </el-kw></el-kw><el-punc>(</el-punc>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}</el-kw><el-punc>) {</el-punc>`;
    } else if (frame instanceof FunctionMethod) {
      html = `${this.modifierAsHtml(frame)}${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.STATIC} </el-kw>${frame.returnType.renderAsHtml()} ${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw><el-punc>(</el-punc>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.INTERFACE} </el-kw>${frame.name.renderAsHtml()} ${frame.inheritanceAsHtml()}`;
    } else if (frame instanceof MainFrame) {
      html = `<el-kw>${this.STATIC} ${this.VOID}</el-kw> <el-method>main</el-method><el-punc>() {</el-punc>`;
    } else if (frame instanceof ProcedureMethod) {
      html = `${this.modifierAsHtml(frame)}<el-kw>${this.VOID} </el-kw>${frame.name.renderAsHtml()}<el-punc>(</el-punc>${frame.params.renderAsHtml()}<el-punc>) {</el-punc>`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw><el-punc> {</el-punc>`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE}<el-punc> (</el-punc></el-kw>${frame.condition.renderAsHtml()}<el-punc>) {</el-punc>`;
    }
    return html;
  }

  common_renderBottomAsHtml(frame: Frame): string {
    return frame ? `<el-punc>}<el-punc>` : ``;
  }

  common_functionFrameFields(frame: FunctionFrame): Field[] {
    return [frame.returnType, frame.name, frame.params];
  }

  common_assertStatementFields(frame: AssertStatement): Field[] {
    return [frame.expected, frame.actual];
  }

  protected ABSTRACT = "abstract";
  protected CATCH = "catch";
  protected CLASS = "class";
  protected CONST = "const";
  protected FOREACH = "foreach";
  protected ELSE = "else";
  protected ENUM = "enum";
  protected FOR = "for";
  protected IF = "if";
  protected IN = "in";
  protected INHERITS = "inherits";
  protected INTERFACE = "interface";
  protected PRIVATE = "private";
  protected PROTECTED = "protected";
  protected PUBLIC = "public";
  protected RETURN = "return";
  protected STATIC = "static";
  protected THIS = "this";
  protected THROW = "throw";
  protected TRY = "try";
  protected VAR = "var";
  protected VOID = "void";
  protected WHILE = "while";

  EQUAL: string = "==";
  NOT_EQUAL: string = "!=";
  MOD = "%";
  AND = "&&";
  OR = "||";
  NOT = "!";

  COMMENT_MARKER: string = "//";
  LIST_START: string = "[";
  LIST_END: string = "]";

  INT_NAME: string = "int";
  FLOAT_NAME: string = "double";
  BOOL_NAME: string = "bool";
  STRING_NAME: string = "string";
  LIST_NAME: string = "List";
  NEW_INSTANCE_PREFIX = "new";

  TRUE: string = "true";
  FALSE: string = "false";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  START_OF_GENERIC: string = "<";
  THIS_INSTANCE: string = this.THIS;

  c_langs_addNodesForParamDef(node: ParamDefNode): void {
    node.type = new TypeNode(
      node.file,
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    node.addElement(node.type);
    node.addElement(new SpaceNode(node.file, Space.required));
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
  }

  c_langs_paramDefAsHtml(node: ParamDefNode): string {
    return `${node.type?.renderAsHtml()} ${node.name?.renderAsHtml()}`;
  }

  c_langs_addNodesForTypeGeneric(node: TypeGenericNode): void {
    node.qualifiedName = new TypeNameQualifiedNode(node.file, node.tokenTypes);
    const typeConstr = () => new TypeNode(node.file, node.concreteAndAbstract);
    node.genericTypes = new CSV(node.file, typeConstr, 1);
    node.addElement(node.qualifiedName!);
    node.addElement(new PunctuationNode(node.file, LT));
    node.addElement(node.genericTypes);
    node.addElement(new PunctuationNode(node.file, GT));
  }
  c_langs_typeGenericAsHtml(node: TypeGenericNode): string {
    return `${node.qualifiedName?.renderAsHtml()}&lt;${node.genericTypes?.renderAsHtml()}&gt;`;
  }

  c_langs_newInstanceAsHtml(node: NewInstance): string {
    return `<el-kw>${this.NEW_INSTANCE_PREFIX} ${node.type?.renderAsHtml()}(${node.args?.renderAsHtml()})</el-kw>`;
  }
}
