import { ElanCompilerError } from "../../elan-compiler-error";
import { AbstractFunction } from "../class-members/abstract-function";
import { AbstractProcedure } from "../class-members/abstract-procedure";
import { AbstractProperty } from "../class-members/abstract-property";
import { Constructor } from "../class-members/constructor";
import { FunctionMethod } from "../class-members/function-method";
import { ProcedureMethod } from "../class-members/procedure-method";
import { Property } from "../class-members/property";
import { AbstractField } from "../fields/abstract-field";
import { InheritsFromField } from "../fields/inherits-from-field";
import { TypeField } from "../fields/type-field";
import { FileImpl } from "../file-impl";
import { isSelector } from "../frame-helpers";
import { AbstractClass } from "../globals/abstract-class";
import { ConcreteClass } from "../globals/concrete-class";
import { Constant } from "../globals/constant";
import { Enum } from "../globals/enum";
import { GlobalComment } from "../globals/global-comment";
import { GlobalFunction } from "../globals/global-function";
import { GlobalProcedure } from "../globals/global-procedure";
import { InterfaceFrame } from "../globals/interface-frame";
import { MainFrame } from "../globals/main-frame";
import { RecordFrame } from "../globals/record-frame";
import { TestFrame } from "../globals/test-frame";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../interfaces/parse-node";
import { Scope } from "../interfaces/scope";
import { globalKeyword, libraryKeyword, propertyKeyword, thisKeyword } from "../keywords";
import { Index } from "../parse-nodes";
import { AbstractAlternatives } from "../parse-nodes/abstract-alternatives";
import { ArgListNode } from "../parse-nodes/arg-list-node";
import { BinaryExpression } from "../parse-nodes/binary-expression";
import { BracketedExpression } from "../parse-nodes/bracketed-expression";
import { CommaNode } from "../parse-nodes/comma-node";
import { CommentNode } from "../parse-nodes/comment-node";
import { CopyWith } from "../parse-nodes/copy-with";
import { CSV } from "../parse-nodes/csv";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { DictionaryNode } from "../parse-nodes/dictionary-node";
import { DotAfter } from "../parse-nodes/dot-after";
import { DottedTerm } from "../parse-nodes/dotted-term";
import { EmptyOfTypeNode } from "../parse-nodes/empty-of-type-node";
import { EnumVal } from "../parse-nodes/enum-val";
import { EnumValuesNode } from "../parse-nodes/enum-values-node";
import { ExceptionMsgNode } from "../parse-nodes/exception-msg-node";
import { FunctionRefNode } from "../parse-nodes/function-ref-node";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { IfExpr } from "../parse-nodes/if-expr";
import { ImageNode } from "../parse-nodes/image-node";
import { DictionaryImmutableNode } from "../parse-nodes/immutable-dictionary-node";
import { IndexDouble } from "../parse-nodes/index-double";
import { IndexRange } from "../parse-nodes/index-range";
import { InheritanceNode } from "../parse-nodes/inheritanceNode";
import { InstanceNode } from "../parse-nodes/instanceNode";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { KVPnode } from "../parse-nodes/kvp-node";
import { Lambda } from "../parse-nodes/lambda";
import { ListImmutableNode } from "../parse-nodes/list-immutable-node";
import { ListNode } from "../parse-nodes/list-node";
import { LitFloat } from "../parse-nodes/lit-float";
import { LitInt } from "../parse-nodes/lit-int";
import { LitRegExp } from "../parse-nodes/lit-regExp";
import { LitStringEmpty } from "../parse-nodes/lit-string-empty";
import { LitStringInterpolation } from "../parse-nodes/lit-string-interpolation";
import { LitStringNonEmpty } from "../parse-nodes/lit-string-non-empty";
import { MethodCallNode } from "../parse-nodes/method-call-node";
import { Multiple } from "../parse-nodes/multiple";
import { NewInstance } from "../parse-nodes/new-instance";
import { OptionalNode } from "../parse-nodes/optional-node";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParamListNode } from "../parse-nodes/param-list-node";
import { PropertyRef } from "../parse-nodes/property-ref";
import { PunctuationNode } from "../parse-nodes/punctuation-node";
import { RegExMatchNode } from "../parse-nodes/regex-match-node";
import { Sequence } from "../parse-nodes/sequence";
import { SetToClause } from "../parse-nodes/set-to-clause";
import { SpaceNode } from "../parse-nodes/space-node";
import { TermChained } from "../parse-nodes/term-chained";
import { TermSimpleWithOptIndex } from "../parse-nodes/term-simple-with-opt-index";
import { TupleNode } from "../parse-nodes/tuple-node";
import { TypeFuncNode } from "../parse-nodes/type-func-node";
import { TypeGenericNode } from "../parse-nodes/type-generic-node";
import { TypeNameNode } from "../parse-nodes/type-name-node";
import { TypeTupleNode } from "../parse-nodes/type-tuple-node";
import { UnaryExpression } from "../parse-nodes/unary-expression";
import { WithClause } from "../parse-nodes/with-clause";
import { AssertStatement } from "../statements/assert-statement";
import { CallStatement } from "../statements/call-statement";
import { CatchStatement } from "../statements/catch-statement";
import { CommentStatement } from "../statements/comment-statement";
import { Each } from "../statements/each";
import { Else } from "../statements/else";
import { For } from "../statements/for";
import { IfStatement } from "../statements/if-statement";
import { LetStatement } from "../statements/let-statement";
import { Print } from "../statements/print";
import { Repeat } from "../statements/repeat";
import { ReturnStatement } from "../statements/return-statement";
import { SetStatement } from "../statements/set-statement";
import { Throw } from "../statements/throw";
import { TryStatement } from "../statements/try";
import { VariableStatement } from "../statements/variable-statement";
import { While } from "../statements/while";
import { ParseStatus } from "../status-enums";
import { FuncName, ImageName, TupleName } from "../symbols/elan-type-names";
import { EnumType } from "../symbols/enum-type";
import { isAstIdNode, mapOperation } from "./ast-helpers";
import { BinaryExprAsn } from "./binary-expr-asn";
import { BracketedAsn } from "./bracketed-asn";
import { AbstractFunctionAsn } from "./class-members/abstract-function-asn";
import { AbstractProcedureAsn } from "./class-members/abstract-procedure-asn";
import { AbstractPropertyAsn } from "./class-members/abstract-property-asn";
import { ConstructorAsn } from "./class-members/constructor-asn";
import { FunctionMethodAsn } from "./class-members/function-method-asn";
import { ProcedureMethodAsn } from "./class-members/procedure-method-asn";
import { PropertyAsn } from "./class-members/property-asn";
import { CommentAsn } from "./comment-asn";
import { CompositeAsn } from "./composite-asn";
import { CopyWithAsn } from "./copy-with-asn";
import { CsvAsn } from "./csv-asn";
import { DeconstructedListAsn } from "./deconstructed-list-asn";
import { DeconstructedTupleAsn } from "./deconstructed-tuple-asn";
import { DiscardAsn } from "./discard-asn";
import { EmptyAsn } from "./empty-asn";
import { EmptyTypeAsn } from "./empty-type-asn";
import { EnumValuesAsn } from "./fields/enum-values-asn";
import { InheritsFromAsn } from "./fields/inherits-from-asn";
import { ParamListAsn } from "./fields/param-list-asn";
import { TypeFieldAsn } from "./fields/type-field-asn";
import { FileAsn } from "./file-asn";
import { FixedIdAsn } from "./fixed-id-asn";
import { FuncCallAsn } from "./func-call-asn";
import { AbstractClassAsn } from "./globals/abstract-class-asn";
import { ConcreteClassAsn } from "./globals/concrete-class-asn";
import { ConstantAsn } from "./globals/constant-asn";
import { EnumAsn } from "./globals/enum-asn";
import { GlobalCommentAsn } from "./globals/global-comment-asn";
import { GlobalFunctionAsn } from "./globals/global-function-asn";
import { GlobalProcedureAsn } from "./globals/global-procedure-asn";
import { InterfaceAsn } from "./globals/interface-asn";
import { MainAsn } from "./globals/main-asn";
import { RecordAsn } from "./globals/record-asn";
import { TestAsn } from "./globals/test-asn";
import { IdAsn } from "./id-asn";
import { IdDefAsn } from "./id-def-asn";
import { IfExprAsn } from "./if-expr-asn";
import { IndexAsn } from "./index-asn";
import { IndexDoubleAsn } from "./index-double-asn";
import { InterpolatedAsn } from "./interpolated-asn";
import { KvpAsn } from "./kvp-asn";
import { LambdaAsn } from "./lambda-asn";
import { LambdaSigAsn } from "./lambda-sig-asn";
import { LiteralDictionaryAsn } from "./literal-dictionary-asn";
import { LiteralDictionaryImmutableAsn } from "./literal-dictionary-immutable-asn";
import { LiteralEnumAsn } from "./literal-enum-asn";
import { LiteralFloatAsn } from "./literal-float-asn";
import { LiteralIntAsn } from "./literal-int-asn";
import { LiteralListAsn } from "./literal-list-asn";
import { LiteralListImmutableAsn } from "./literal-list-immutable-asn";
import { LiteralRegExAsn } from "./literal-regex-asn";
import { LiteralStringAsn } from "./literal-string-asn";
import { LiteralTupleAsn } from "./literal-tuple-asn";
import { NewAsn } from "./new-asn";
import { ParamDefAsn } from "./param-def-asn";
import { QualifierAsn } from "./qualifier-asn";
import { RangeAsn } from "./range-asn";
import { SegmentedStringAsn } from "./segmented-string-asn";
import { AssertAsn } from "./statements/assert-asn";
import { CallAsn } from "./statements/call-asn";
import { CatchAsn } from "./statements/catch-asn";
import { CommentStatementAsn } from "./statements/comment-asn";
import { EachAsn } from "./statements/each-asn";
import { ElseAsn } from "./statements/else-asn";
import { ForAsn } from "./statements/for-asn";
import { IfAsn } from "./statements/if-asn";
import { LetAsn } from "./statements/let-asn";
import { PrintAsn } from "./statements/print-asn";
import { RepeatAsn } from "./statements/repeat-asn";
import { ReturnAsn } from "./statements/return-asn";
import { SetAsn } from "./statements/set-asn";
import { ThrowAsn } from "./statements/throw-asn";
import { TryAsn } from "./statements/try-asn";
import { VariableAsn } from "./statements/variable-asn";
import { WhileAsn } from "./statements/while-asn";
import { ThisAsn } from "./this-asn";
import { ToAsn } from "./to-asn";
import { TypeAsn } from "./type-asn";
import { UnaryExprAsn } from "./unary-expr-asn";
import { VarAsn } from "./var-asn";

export function transformMany(
  node: CSV | Multiple | Sequence,
  fieldId: string,
  scope: Scope,
): AstCollectionNode {
  const asts = new Array<AstNode>();

  for (const elem of node.getElements()) {
    if (elem instanceof Multiple || elem instanceof CSV || elem instanceof Sequence) {
      const asns = transformMany(elem, fieldId, scope).items;

      for (const asn of asns) {
        if (asn) {
          asts.push(asn);
        }
      }
    } else {
      const asn = transform(elem, fieldId, scope);
      if (asn) {
        asts.push(asn);
      }
    }
  }

  return new CsvAsn(asts, fieldId);
}

export function transform(
  node: ParseNode | FileImpl | Frame | Field | undefined,
  fieldId: string,
  scope: Scope,
): AstNode | undefined {
  if (node instanceof FileImpl) {
    const astRoot = new FileAsn(node.getSymbols(), node.getVersion());

    astRoot.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, "", astRoot as unknown as Scope)) as AstNode[];

    return astRoot;
  }

  if (node instanceof MainFrame) {
    const mainAsn = new MainAsn(node.getHtmlId(), scope);
    mainAsn.breakpointStatus = node.breakpointStatus;

    mainAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), mainAsn)) as AstNode[];

    return mainAsn;
  }

  if (node instanceof TestFrame) {
    const testAsn = new TestAsn(node.getHtmlId(), scope);
    testAsn.breakpointStatus = node.breakpointStatus;
    testAsn.ignored = node.ignored;

    testAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), testAsn)) as AstNode[];

    return testAsn;
  }

  if (node instanceof GlobalComment) {
    const commentAsn = new GlobalCommentAsn(node.getHtmlId(), scope);

    commentAsn.text = transform(node.text, node.getHtmlId(), commentAsn) ?? EmptyAsn.Instance;

    return commentAsn;
  }

  if (node instanceof ConcreteClass) {
    const classAsn = new ConcreteClassAsn(node.getHtmlId(), scope);
    classAsn.breakpointStatus = node.breakpointStatus;

    classAsn.name = transform(node.name, node.getHtmlId(), classAsn) ?? EmptyAsn.Instance;
    classAsn.inheritance =
      transform(node.inheritance, node.getHtmlId(), classAsn) ?? EmptyAsn.Instance;

    classAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), classAsn)) as AstNode[];

    return classAsn;
  }

  if (node instanceof AbstractClass) {
    const classAsn = new AbstractClassAsn(node.getHtmlId(), scope);
    classAsn.breakpointStatus = node.breakpointStatus;

    classAsn.name = transform(node.name, node.getHtmlId(), classAsn) ?? EmptyAsn.Instance;
    classAsn.inheritance =
      transform(node.inheritance, node.getHtmlId(), classAsn) ?? EmptyAsn.Instance;

    classAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), classAsn)) as AstNode[];

    return classAsn;
  }

  if (node instanceof RecordFrame) {
    const recordAsn = new RecordAsn(node.getHtmlId(), scope);
    recordAsn.breakpointStatus = node.breakpointStatus;

    recordAsn.name = transform(node.name, node.getHtmlId(), recordAsn) ?? EmptyAsn.Instance;
    recordAsn.inheritance =
      transform(node.inheritance, node.getHtmlId(), recordAsn) ?? EmptyAsn.Instance;

    recordAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), recordAsn)) as AstNode[];

    return recordAsn;
  }

  if (node instanceof InterfaceFrame) {
    const recordAsn = new InterfaceAsn(node.getHtmlId(), scope);
    recordAsn.breakpointStatus = node.breakpointStatus;

    recordAsn.name = transform(node.name, node.getHtmlId(), recordAsn) ?? EmptyAsn.Instance;
    recordAsn.inheritance =
      transform(node.inheritance, node.getHtmlId(), recordAsn) ?? EmptyAsn.Instance;

    recordAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), recordAsn)) as AstNode[];

    return recordAsn;
  }

  if (node instanceof Constructor) {
    const constructorAsn = new ConstructorAsn(node.getHtmlId(), scope);
    constructorAsn.breakpointStatus = node.breakpointStatus;

    constructorAsn.params =
      transform(node.params, node.getHtmlId(), constructorAsn) ?? EmptyAsn.Instance;

    constructorAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), constructorAsn)) as AstNode[];

    return constructorAsn;
  }

  if (node instanceof AbstractProperty) {
    const propertyAsn = new AbstractPropertyAsn(node.getHtmlId(), scope);
    propertyAsn.breakpointStatus = node.breakpointStatus;

    propertyAsn.name = transform(node.name, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;
    propertyAsn.type = transform(node.type, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;

    return propertyAsn;
  }

  if (node instanceof Property) {
    const propertyAsn = new PropertyAsn(node.getHtmlId(), scope);
    propertyAsn.breakpointStatus = node.breakpointStatus;

    propertyAsn.name = transform(node.name, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;
    propertyAsn.type = transform(node.type, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;
    propertyAsn.private = node.private;

    return propertyAsn;
  }

  if (node instanceof VariableStatement) {
    const varAsn = new VariableAsn(node.getHtmlId(), scope);
    varAsn.breakpointStatus = node.breakpointStatus;

    varAsn.name = transform(node.name, node.getHtmlId(), varAsn) ?? EmptyAsn.Instance;
    varAsn.expr = transform(node.expr, node.getHtmlId(), varAsn) ?? EmptyAsn.Instance;

    return varAsn;
  }

  if (node instanceof LetStatement) {
    const letAsn = new LetAsn(node.getHtmlId(), scope);
    letAsn.breakpointStatus = node.breakpointStatus;

    letAsn.name = transform(node.name, node.getHtmlId(), letAsn) ?? EmptyAsn.Instance;
    letAsn.expr = transform(node.expr, node.getHtmlId(), letAsn) ?? EmptyAsn.Instance;

    return letAsn;
  }

  if (node instanceof SetStatement) {
    const setAsn = new SetAsn(node.getHtmlId(), scope);
    setAsn.breakpointStatus = node.breakpointStatus;

    setAsn.assignable = transform(node.assignable, node.getHtmlId(), setAsn) ?? EmptyAsn.Instance;
    setAsn.expr = transform(node.expr, node.getHtmlId(), setAsn) ?? EmptyAsn.Instance;

    return setAsn;
  }

  if (node instanceof CallStatement) {
    const callAsn = new CallAsn(node.getHtmlId(), scope);
    callAsn.breakpointStatus = node.breakpointStatus;

    callAsn.proc = transform(node.proc, node.getHtmlId(), callAsn) ?? EmptyAsn.Instance;
    callAsn.args = transform(node.args, node.getHtmlId(), callAsn) ?? EmptyAsn.Instance;

    return callAsn;
  }

  if (node instanceof ReturnStatement) {
    const returnAsn = new ReturnAsn(node.getHtmlId(), scope);
    returnAsn.breakpointStatus = node.breakpointStatus;
    returnAsn.expr = transform(node.expr, node.getHtmlId(), returnAsn) ?? EmptyAsn.Instance;
    return returnAsn;
  }

  if (node instanceof CommentStatement) {
    const commentAsn = new CommentStatementAsn(node.getHtmlId(), scope);
    commentAsn.text = transform(node.text, node.getHtmlId(), commentAsn) ?? EmptyAsn.Instance;
    return commentAsn;
  }

  if (node instanceof Enum) {
    const enumAsn = new EnumAsn(node.getHtmlId(), scope);
    enumAsn.breakpointStatus = node.breakpointStatus;

    enumAsn.name = transform(node.name, node.getHtmlId(), enumAsn) ?? EmptyAsn.Instance;
    enumAsn.values = transform(node.values, node.getHtmlId(), enumAsn) ?? EmptyAsn.Instance;

    return enumAsn;
  }

  if (node instanceof EnumValuesNode) {
    const enumValues = new EnumValuesAsn(fieldId, scope);

    enumValues.values = transformMany(node, fieldId, scope);

    return enumValues;
  }

  if (node instanceof Constant) {
    const constantAsn = new ConstantAsn(node.getHtmlId(), scope);
    constantAsn.breakpointStatus = node.breakpointStatus;

    constantAsn.name = transform(node.name, node.getHtmlId(), constantAsn) ?? EmptyAsn.Instance;
    constantAsn.value = transform(node.value, node.getHtmlId(), constantAsn) ?? EmptyAsn.Instance;

    return constantAsn;
  }

  if (node instanceof AbstractFunction) {
    const functionAsn = new AbstractFunctionAsn(node.getHtmlId(), scope);
    functionAsn.breakpointStatus = node.breakpointStatus;

    functionAsn.name = transform(node.name, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.params = transform(node.params, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.returnType =
      transform(node.returnType, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;

    return functionAsn;
  }

  if (node instanceof AbstractProcedure) {
    const procedureAsn = new AbstractProcedureAsn(node.getHtmlId(), scope);
    procedureAsn.breakpointStatus = node.breakpointStatus;

    procedureAsn.name = transform(node.name, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;
    procedureAsn.params =
      transform(node.params, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;

    return procedureAsn;
  }

  if (node instanceof GlobalFunction) {
    const functionAsn = new GlobalFunctionAsn(node.getHtmlId(), scope);
    functionAsn.breakpointStatus = node.breakpointStatus;

    functionAsn.name = transform(node.name, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.params = transform(node.params, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.returnType =
      transform(node.returnType, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;

    functionAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), functionAsn)) as AstNode[];

    return functionAsn;
  }

  if (node instanceof GlobalProcedure) {
    const procedureAsn = new GlobalProcedureAsn(node.getHtmlId(), scope);
    procedureAsn.breakpointStatus = node.breakpointStatus;

    procedureAsn.name = transform(node.name, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;
    procedureAsn.params =
      transform(node.params, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;

    procedureAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), procedureAsn)) as AstNode[];

    return procedureAsn;
  }

  if (node instanceof FunctionMethod) {
    const functionAsn = new FunctionMethodAsn(node.getHtmlId(), scope);
    functionAsn.breakpointStatus = node.breakpointStatus;
    functionAsn.private = node.private;

    functionAsn.name = transform(node.name, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.params = transform(node.params, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;
    functionAsn.returnType =
      transform(node.returnType, node.getHtmlId(), functionAsn) ?? EmptyAsn.Instance;

    functionAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), functionAsn)) as AstNode[];

    return functionAsn;
  }

  if (node instanceof ProcedureMethod) {
    const procedureAsn = new ProcedureMethodAsn(node.getHtmlId(), scope);
    procedureAsn.breakpointStatus = node.breakpointStatus;
    procedureAsn.private = node.private;

    procedureAsn.name = transform(node.name, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;
    procedureAsn.params =
      transform(node.params, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;

    procedureAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), procedureAsn)) as AstNode[];

    return procedureAsn;
  }

  if (node instanceof Print) {
    const printAsn = new PrintAsn(node.getHtmlId(), scope);
    printAsn.breakpointStatus = node.breakpointStatus;
    printAsn.expr = transform(node.expr, node.getHtmlId(), printAsn) ?? EmptyAsn.Instance;
    return printAsn;
  }

  if (node instanceof Each) {
    const eachAsn = new EachAsn(node.getHtmlId(), scope);
    eachAsn.breakpointStatus = node.breakpointStatus;
    eachAsn.variable = transform(node.variable, node.getHtmlId(), eachAsn) ?? EmptyAsn.Instance;
    eachAsn.iter = transform(node.iter, node.getHtmlId(), eachAsn) ?? EmptyAsn.Instance;

    eachAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), eachAsn)) as AstNode[];

    return eachAsn;
  }

  if (node instanceof While) {
    const whileAsn = new WhileAsn(node.getHtmlId(), scope);
    whileAsn.breakpointStatus = node.breakpointStatus;
    whileAsn.condition = transform(node.condition, node.getHtmlId(), whileAsn) ?? EmptyAsn.Instance;

    whileAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), whileAsn)) as AstNode[];

    return whileAsn;
  }

  if (node instanceof Repeat) {
    const repeatAsn = new RepeatAsn(node.getHtmlId(), scope);
    repeatAsn.breakpointStatus = node.breakpointStatus;
    repeatAsn.condition =
      transform(node.condition, node.getHtmlId(), repeatAsn) ?? EmptyAsn.Instance;

    repeatAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), repeatAsn)) as AstNode[];

    return repeatAsn;
  }

  if (node instanceof IfStatement) {
    const ifAsn = new IfAsn(node.getHtmlId(), scope);
    ifAsn.breakpointStatus = node.breakpointStatus;
    ifAsn.condition = transform(node.condition, node.getHtmlId(), ifAsn) ?? EmptyAsn.Instance;

    ifAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), ifAsn)) as AstNode[];

    return ifAsn;
  }

  if (node instanceof Else) {
    const elseAsn = new ElseAsn(node.getHtmlId(), scope);
    elseAsn.breakpointStatus = node.breakpointStatus;
    elseAsn.condition = transform(node.condition, node.getHtmlId(), elseAsn) ?? EmptyAsn.Instance;
    elseAsn.hasIf = node.hasIf;
    return elseAsn;
  }

  if (node instanceof TryStatement) {
    const tryAsn = new TryAsn(node.getHtmlId(), scope);
    tryAsn.breakpointStatus = node.breakpointStatus;

    tryAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), tryAsn)) as AstNode[];

    return tryAsn;
  }

  if (node instanceof CatchStatement) {
    const catchAsn = new CatchAsn(node.getHtmlId(), scope);
    catchAsn.breakpointStatus = node.breakpointStatus;

    catchAsn.variable = transform(node.variable, node.getHtmlId(), catchAsn) ?? EmptyAsn.Instance;

    catchAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), catchAsn)) as AstNode[];

    return catchAsn;
  }

  if (node instanceof Throw) {
    const throwAsn = new ThrowAsn(node.getHtmlId(), scope);
    throwAsn.breakpointStatus = node.breakpointStatus;
    throwAsn.text = transform(node.text, node.getHtmlId(), throwAsn) ?? EmptyAsn.Instance;
    return throwAsn;
  }

  if (node instanceof For) {
    const forAsn = new ForAsn(node.getHtmlId(), scope);
    forAsn.breakpointStatus = node.breakpointStatus;
    forAsn.variable = transform(node.variable, node.getHtmlId(), forAsn) ?? EmptyAsn.Instance;
    forAsn.from = transform(node.from, node.getHtmlId(), forAsn) ?? EmptyAsn.Instance;
    forAsn.to = transform(node.to, node.getHtmlId(), forAsn) ?? EmptyAsn.Instance;
    forAsn.step = transform(node.step, node.getHtmlId(), forAsn) ?? EmptyAsn.Instance;

    forAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), forAsn)) as AstNode[];

    return forAsn;
  }

  if (node instanceof AssertStatement) {
    const assertAsn = new AssertAsn(node.getHtmlId(), scope);
    assertAsn.breakpointStatus = node.breakpointStatus;
    assertAsn.expected = transform(node.expected, node.getHtmlId(), assertAsn) ?? EmptyAsn.Instance;
    assertAsn.actual = transform(node.actual, node.getHtmlId(), assertAsn) ?? EmptyAsn.Instance;

    return assertAsn;
  }

  if (node instanceof ParamListNode) {
    const paramsAsn = new ParamListAsn(fieldId, scope);

    paramsAsn.parms = transformMany(node, fieldId, scope);

    return paramsAsn;
  }

  if (node instanceof InheritsFromField) {
    const rn = node.getRootNode();
    if (rn && rn.status === ParseStatus.valid) {
      const inheritsAsn = new InheritsFromAsn(node.getHtmlId());

      inheritsAsn.inheritance =
        transform(node.getRootNode(), node.getHtmlId(), scope) ?? EmptyAsn.Instance;

      return inheritsAsn;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof TypeField) {
    const rn = node.getRootNode();
    if (rn && rn.status === ParseStatus.valid) {
      const typeAsn = new TypeFieldAsn(node.getHtmlId());

      typeAsn.type = transform(node.getRootNode(), node.getHtmlId(), scope) ?? EmptyAsn.Instance;
      return typeAsn;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof AbstractField) {
    const rn = node.getRootNode();
    if (rn && rn.status === ParseStatus.valid) {
      return transform(rn, node.getHtmlId(), scope);
    }

    return EmptyAsn.Instance;
  }

  if (node instanceof BracketedExpression) {
    return new BracketedAsn(transform(node.expr, fieldId, scope)!, fieldId);
  }

  if (node instanceof UnaryExpression) {
    const op = mapOperation(node.unaryOp!.matchedText);
    const operand = transform(node.term, fieldId, scope) as AstNode;

    return new UnaryExprAsn(op, operand, fieldId, scope);
  }

  if (node instanceof BinaryExpression) {
    const lhs = transform(node.lhs, fieldId, scope) as AstNode;
    const rhs = transform(node.rhs, fieldId, scope) as AstNode;
    const op = mapOperation(node.op!.matchedText);

    return new BinaryExprAsn(op, lhs, rhs, fieldId, scope);
  }

  if (node instanceof LitInt) {
    return new LiteralIntAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitFloat) {
    return new LiteralFloatAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitStringEmpty) {
    return new LiteralStringAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitStringNonEmpty) {
    const ss = node.segments ? transformMany(node.segments, fieldId, scope).items : [];

    if (ss.map((i) => i instanceof InterpolatedAsn).reduce((i, s) => i || s)) {
      return new SegmentedStringAsn(ss, fieldId);
    }

    return new LiteralStringAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitRegExp) {
    return new LiteralRegExAsn(node.matchedText, fieldId);
  }

  if (node instanceof IdentifierNode) {
    // todo kludge - fix
    if (
      (fieldId.startsWith("var") ||
        fieldId.startsWith("ident") ||
        fieldId.startsWith("enumVals")) &&
      !(scope instanceof SetAsn) // to catch range value
    ) {
      return new IdDefAsn(node.matchedText, fieldId, scope);
    }

    return new IdAsn(node.matchedText, fieldId, false, scope);
  }

  if (node instanceof MethodCallNode) {
    const id = node.name!.matchedText;
    const parameters = transformMany(node.args as CSV, fieldId, scope).items as Array<AstNode>;

    return new FuncCallAsn(id, parameters, fieldId, scope);
  }

  if (node instanceof Lambda) {
    let parameters: ParamDefAsn[] = [];

    if (node.params?.matchedNode) {
      parameters = transformMany(
        (node.params.matchedNode as Sequence).getElements()[0] as CSV,
        fieldId,
        scope,
      ).items as Array<ParamDefAsn>;
    }

    const sig = new LambdaSigAsn(parameters, fieldId, scope);
    const body = transform(node.expr, fieldId, sig) as AstNode;

    return new LambdaAsn(sig, body, fieldId);
  }

  if (node instanceof ParamDefNode) {
    const id = node.name?.matchedText ?? "";
    const type = transform(node.type, fieldId, scope);
    const out = !!node.out?.matchedNode;

    if (isAstIdNode(type)) {
      return new ParamDefAsn(id, type, out, fieldId, scope);
    }

    return undefined;
  }

  if (node instanceof TypeGenericNode) {
    const type = node.simpleType!.matchedText;
    const generic = node.generic;
    let gp = new Array<AstNode>();
    gp = transformMany(generic as Sequence, fieldId, scope).items;
    return new TypeAsn(type, gp, fieldId, scope);
  }

  if (node instanceof TypeFuncNode) {
    const inp = node.inputTypes?.matchedNode
      ? transformMany(node.inputTypes.matchedNode as CSV, fieldId, scope).items
      : [];

    const oup = node.returnType ? [transform(node.returnType, fieldId, scope)!] : [];

    return new TypeAsn(FuncName, inp.concat(oup), fieldId, scope);
  }

  if (node instanceof TypeNameNode) {
    const type = node.matchedText;

    return new TypeAsn(type, [], fieldId, scope);
  }

  if (node instanceof InheritanceNode) {
    if (node.typeList instanceof CSV) {
      const types = transformMany(node.typeList, fieldId, scope).items;
      return new CsvAsn(types, fieldId);
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof EmptyOfTypeNode) {
    const type = transform(node.type, fieldId, scope) as TypeAsn;
    return new EmptyTypeAsn(type, fieldId);
  }

  if (node instanceof OptionalNode) {
    if (node.matchedNode) {
      return transform(node.matchedNode, fieldId, scope);
    }
    return undefined;
  }

  if (node instanceof WithClause) {
    return transformMany(node.toClauses as CSV, fieldId, scope);
  }

  if (node instanceof ArgListNode) {
    return transformMany(node as CSV, fieldId, scope);
  }

  if (node instanceof SetToClause) {
    const id = node.property!.matchedText;
    const to = transform(node.expr, fieldId, scope) as AstNode;

    return new ToAsn(id, to, fieldId);
  }

  if (node instanceof PunctuationNode) {
    if (node.fixedText === "_") {
      return new DiscardAsn("", fieldId);
    }
    return undefined;
  }

  if (node instanceof CommaNode) {
    return undefined;
  }

  if (node instanceof SpaceNode) {
    return undefined;
  }

  if (node instanceof KeywordNode) {
    // todo decouple this from js
    if (node.fixedText === libraryKeyword) {
      return new FixedIdAsn(libraryKeyword, fieldId);
    }
    if (node.fixedText === globalKeyword) {
      return new FixedIdAsn(globalKeyword, fieldId);
    }
    if (node.fixedText === propertyKeyword || node.fixedText === thisKeyword) {
      return new ThisAsn(node.fixedText, fieldId, scope);
    }

    return undefined;
  }

  if (node instanceof ExceptionMsgNode) {
    if (node.bestMatch) {
      return checkMsg(transform(node.bestMatch, fieldId, scope));
    }

    return EmptyAsn.Instance;
  }

  if (node instanceof AbstractAlternatives) {
    if (node.bestMatch) {
      return transform(node.bestMatch, fieldId, scope);
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof ListImmutableNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralListImmutableAsn(items, fieldId, scope);
  }

  if (node instanceof ListNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralListAsn(items, fieldId, scope);
  }

  if (node instanceof DictionaryNode) {
    const items = transformMany(node.csv!, fieldId, scope);
    return new LiteralDictionaryAsn(items, fieldId, scope);
  }

  if (node instanceof DictionaryImmutableNode) {
    const items = transformMany(node.csv!, fieldId, scope);
    return new LiteralDictionaryImmutableAsn(items, fieldId, scope);
  }

  if (node instanceof TupleNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralTupleAsn(items, fieldId);
  }

  if (node instanceof DeconstructedTuple) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items.filter((i) =>
      isAstIdNode(i),
    );
    return new DeconstructedTupleAsn(items, fieldId);
  }

  if (node instanceof DeconstructedList) {
    const hd = transform(node.head, fieldId, scope)!;
    const tl = transform(node.tail, fieldId, scope)!;
    return new DeconstructedListAsn(hd, tl, fieldId, scope);
  }

  if (node instanceof NewInstance) {
    const type = transform(node.type, fieldId, scope) as TypeAsn;
    const pp = transformMany(node.args as CSV, fieldId, scope).items;
    const withClause = transform(node.withClause, fieldId, scope) as AstCollectionNode;

    const obj = new NewAsn(type, pp, fieldId, scope);
    if (withClause) {
      return new CopyWithAsn(obj, withClause, fieldId, scope);
    }
    return obj;
  }

  if (node instanceof ImageNode) {
    const imageType = new TypeAsn(ImageName, [], fieldId, scope);
    const url = new LiteralStringAsn(`"${node.url?.matchedText ?? ""}"`, fieldId);
    const obj = new NewAsn(imageType, [url], fieldId, scope);
    const withClause = transform(node.withClause, fieldId, scope) as AstCollectionNode;
    if (withClause) {
      return new CopyWithAsn(obj, withClause, fieldId, scope);
    }
    return obj;
  }

  if (node instanceof TermSimpleWithOptIndex) {
    const termSimple = transform(node.termSimple, fieldId, scope) as AstNode;
    const index = transform(node.optIndex, fieldId, scope) as IndexAsn | undefined;
    if (index) {
      index.updateScopeAndChain(scope, termSimple);
      return index;
    }
    return termSimple;
  }

  if (node instanceof TermChained) {
    const expr1 = transform(node.chainedHead, fieldId, scope) as AstNode;
    const expr2 = transformMany(node.tail!, fieldId, scope);
    return new CompositeAsn(expr1, expr2, fieldId, scope);
  }

  if (node instanceof DottedTerm) {
    return transform(node.term, fieldId, scope);
  }

  if (node instanceof CopyWith) {
    const obj = transform(node.original, fieldId, scope) as AstNode;
    const withClause = transform(node.withClause!, fieldId, scope) as AstCollectionNode;
    return new CopyWithAsn(obj, withClause, fieldId, scope);
  }

  if (node instanceof TypeTupleNode) {
    const gp = transformMany(node.types as CSV, fieldId, scope).items;
    return new TypeAsn(TupleName, gp, fieldId, scope);
  }

  if (node instanceof IndexRange) {
    const fromNode = node.fromIndex?.matchedNode;
    const from = fromNode ? (transform(fromNode, fieldId, scope) as AstNode) : EmptyAsn.Instance;
    const toNode = node.toIndex?.matchedNode;
    const to = toNode ? (transform(toNode, fieldId, scope) as AstNode) : EmptyAsn.Instance;
    return new RangeAsn(from, to, fieldId, scope);
  }

  if (node instanceof IndexDouble) {
    const index1 = transform(node.index1, fieldId, scope) as AstCollectionNode;
    const index2 = transform(node.index2, fieldId, scope) as AstCollectionNode;
    return new IndexDoubleAsn(index1, index2, fieldId, scope);
  }

  if (node instanceof Index) {
    const index = transform(node.contents, fieldId, scope) as AstCollectionNode;
    return new IndexAsn(index, fieldId, scope);
  }

  if (node instanceof DotAfter) {
    const q = transform(node.node, fieldId, scope)!;
    return new QualifierAsn(q, fieldId, scope);
  }

  if (node instanceof InstanceNode) {
    const id = node.variable!.matchedText;
    const index =
      (transform(node.index, fieldId, scope) as IndexAsn | undefined) ?? EmptyAsn.Instance;
    return new VarAsn(id, false, EmptyAsn.Instance, index, fieldId, scope);
  }

  if (node instanceof IfExpr) {
    const condition = transform(node.condition, fieldId, scope) as AstNode;
    const trueExpression = transform(node.whenTrue, fieldId, scope) as AstNode;
    const falseExpression = transform(node.whenFalse, fieldId, scope) as AstNode;
    return new IfExprAsn(condition, trueExpression, falseExpression, fieldId, scope);
  }

  if (node instanceof EnumVal) {
    const id = node.val!.matchedText;
    const type = new EnumType(node.type!.matchedText);

    return new LiteralEnumAsn(id, type, fieldId, scope);
  }

  if (node instanceof KVPnode) {
    const key = transform(node.key, fieldId, scope)!;
    const value = transform(node.value, fieldId, scope)!;

    return new KvpAsn(key, value, fieldId);
  }

  if (node instanceof LitStringInterpolation) {
    const value = transform(node.expr, fieldId, scope)!;

    return new InterpolatedAsn(value, fieldId);
  }

  if (node instanceof CommentNode) {
    return new CommentAsn(node.matchedText, fieldId, scope);
  }

  if (node instanceof RegExMatchNode) {
    return new LiteralStringAsn(node.matchedText, fieldId);
  }

  if (node instanceof PropertyRef) {
    const qualifier = transform(node.qualifier, fieldId, scope) as AstQualifierNode;
    const name = transform(node.name, fieldId, scope) as AstIdNode;
    return new VarAsn(name.id, true, qualifier, EmptyAsn.Instance, fieldId, scope);
  }

  if (node instanceof InstanceProcRef) {
    const q =
      (transform(node.prefix, fieldId, scope) as AstQualifierNode | undefined) ?? EmptyAsn.Instance;
    const id = node.procName!.matchedText;
    return new VarAsn(id, false, q, EmptyAsn.Instance, fieldId, scope);
  }

  if (node instanceof FunctionRefNode) {
    return new IdAsn(node.name?.matchedText ?? "", fieldId, true, scope);
  }

  throw new ElanCompilerError("Unsupported node " + (node ? node.constructor.name : "undefined"));
}

function checkMsg(msg: AstNode | undefined) {
  if (msg instanceof LiteralStringAsn) {
    msg.ensureNotEmpty();
  }
  return msg;
}
