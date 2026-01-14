import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AstQualifierNode } from "../../compiler/compiler-interfaces/ast-qualifier-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { ElanCompilerError } from "../../compiler/elan-compiler-error";
import {
  globalKeyword,
  libraryKeyword,
  propertyKeyword,
  thisKeyword,
} from "../../compiler/keywords";
import { FuncName, ImageName, TupleName } from "../../compiler/symbols/elan-type-names";
import { EnumType } from "../../compiler/symbols/enum-type";
import { isAstIdNode } from "../../compiler/syntax-nodes/ast-helpers";
import { BinaryExprAsn } from "../../compiler/syntax-nodes/binary-expr-asn";
import { BracketedAsn } from "../../compiler/syntax-nodes/bracketed-asn";
import { AbstractFunctionAsn } from "../../compiler/syntax-nodes/class-members/abstract-function-asn";
import { AbstractProcedureAsn } from "../../compiler/syntax-nodes/class-members/abstract-procedure-asn";
import { AbstractPropertyAsn } from "../../compiler/syntax-nodes/class-members/abstract-property-asn";
import { ConstructorAsn } from "../../compiler/syntax-nodes/class-members/constructor-asn";
import { FunctionMethodAsn } from "../../compiler/syntax-nodes/class-members/function-method-asn";
import { ProcedureMethodAsn } from "../../compiler/syntax-nodes/class-members/procedure-method-asn";
import { PropertyAsn } from "../../compiler/syntax-nodes/class-members/property-asn";
import { CommentAsn } from "../../compiler/syntax-nodes/comment-asn";
import { CompositeAsn } from "../../compiler/syntax-nodes/composite-asn";
import { CopyWithAsn } from "../../compiler/syntax-nodes/copy-with-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { DeconstructedListAsn } from "../../compiler/syntax-nodes/deconstructed-list-asn";
import { DeconstructedTupleAsn } from "../../compiler/syntax-nodes/deconstructed-tuple-asn";
import { DiscardAsn } from "../../compiler/syntax-nodes/discard-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { EmptyTypeAsn } from "../../compiler/syntax-nodes/empty-type-asn";
import { EnumValuesAsn } from "../../compiler/syntax-nodes/fields/enum-values-asn";
import { InheritsFromAsn } from "../../compiler/syntax-nodes/fields/inherits-from-asn";
import { ParamListAsn } from "../../compiler/syntax-nodes/fields/param-list-asn";
import { TypeFieldAsn } from "../../compiler/syntax-nodes/fields/type-field-asn";
import { FileAsn } from "../../compiler/syntax-nodes/file-asn";
import { FixedIdAsn } from "../../compiler/syntax-nodes/fixed-id-asn";
import { FuncCallAsn } from "../../compiler/syntax-nodes/func-call-asn";
import { AbstractClassAsn } from "../../compiler/syntax-nodes/globals/abstract-class-asn";
import { ConcreteClassAsn } from "../../compiler/syntax-nodes/globals/concrete-class-asn";
import { ConstantAsn } from "../../compiler/syntax-nodes/globals/constant-asn";
import { EnumAsn } from "../../compiler/syntax-nodes/globals/enum-asn";
import { GlobalCommentAsn } from "../../compiler/syntax-nodes/globals/global-comment-asn";
import { GlobalFunctionAsn } from "../../compiler/syntax-nodes/globals/global-function-asn";
import { GlobalProcedureAsn } from "../../compiler/syntax-nodes/globals/global-procedure-asn";
import { InterfaceAsn } from "../../compiler/syntax-nodes/globals/interface-asn";
import { MainAsn } from "../../compiler/syntax-nodes/globals/main-asn";
import { RecordAsn } from "../../compiler/syntax-nodes/globals/record-asn";
import { TestAsn } from "../../compiler/syntax-nodes/globals/test-asn";
import { IdAsn } from "../../compiler/syntax-nodes/id-asn";
import { IdDefAsn } from "../../compiler/syntax-nodes/id-def-asn";
import { IfExprAsn } from "../../compiler/syntax-nodes/if-expr-asn";
import { IndexAsn } from "../../compiler/syntax-nodes/index-asn";
import { IndexDoubleAsn } from "../../compiler/syntax-nodes/index-double-asn";
import { InterpolatedAsn } from "../../compiler/syntax-nodes/interpolated-asn";
import { KvpAsn } from "../../compiler/syntax-nodes/kvp-asn";
import { LambdaAsn } from "../../compiler/syntax-nodes/lambda-asn";
import { LambdaSigAsn } from "../../compiler/syntax-nodes/lambda-sig-asn";
import { LiteralDictionaryAsn } from "../../compiler/syntax-nodes/literal-dictionary-asn";
import { LiteralDictionaryImmutableAsn } from "../../compiler/syntax-nodes/literal-dictionary-immutable-asn";
import { LiteralEnumAsn } from "../../compiler/syntax-nodes/literal-enum-asn";
import { LiteralFloatAsn } from "../../compiler/syntax-nodes/literal-float-asn";
import { LiteralIntAsn } from "../../compiler/syntax-nodes/literal-int-asn";
import { LiteralListAsn } from "../../compiler/syntax-nodes/literal-list-asn";
import { LiteralListImmutableAsn } from "../../compiler/syntax-nodes/literal-list-immutable-asn";
import { LiteralRegExAsn } from "../../compiler/syntax-nodes/literal-regex-asn";
import { LiteralStringAsn } from "../../compiler/syntax-nodes/literal-string-asn";
import { LiteralStringNonInterpAsn } from "../../compiler/syntax-nodes/literal-string-non-interp-asn";
import { LiteralTupleAsn } from "../../compiler/syntax-nodes/literal-tuple-asn";
import { NewAsn } from "../../compiler/syntax-nodes/new-asn";
import { ParamDefAsn } from "../../compiler/syntax-nodes/param-def-asn";
import { QualifierAsn } from "../../compiler/syntax-nodes/qualifier-asn";
import { RangeAsn } from "../../compiler/syntax-nodes/range-asn";
import { SegmentedStringAsn } from "../../compiler/syntax-nodes/segmented-string-asn";
import { AssertAsn } from "../../compiler/syntax-nodes/statements/assert-asn";
import { CallAsn } from "../../compiler/syntax-nodes/statements/call-asn";
import { CatchAsn } from "../../compiler/syntax-nodes/statements/catch-asn";
import { CommentStatementAsn } from "../../compiler/syntax-nodes/statements/comment-asn";
import { EachAsn } from "../../compiler/syntax-nodes/statements/each-asn";
import { ElseAsn } from "../../compiler/syntax-nodes/statements/else-asn";
import { ForAsn } from "../../compiler/syntax-nodes/statements/for-asn";
import { IfAsn } from "../../compiler/syntax-nodes/statements/if-asn";
import { LetAsn } from "../../compiler/syntax-nodes/statements/let-asn";
import { PrintAsn } from "../../compiler/syntax-nodes/statements/print-asn";
import { ReturnAsn } from "../../compiler/syntax-nodes/statements/return-asn";
import { SetAsn } from "../../compiler/syntax-nodes/statements/set-asn";
import { ThrowAsn } from "../../compiler/syntax-nodes/statements/throw-asn";
import { TryAsn } from "../../compiler/syntax-nodes/statements/try-asn";
import { VariableAsn } from "../../compiler/syntax-nodes/statements/variable-asn";
import { WhileAsn } from "../../compiler/syntax-nodes/statements/while-asn";
import { ThisAsn } from "../../compiler/syntax-nodes/this-asn";
import { ToAsn } from "../../compiler/syntax-nodes/to-asn";
import { TypeAsn } from "../../compiler/syntax-nodes/type-asn";
import { UnaryExprAsn } from "../../compiler/syntax-nodes/unary-expr-asn";
import { VarAsn } from "../../compiler/syntax-nodes/var-asn";
import { AbstractFrame } from "../frames/abstract-frame";
import { AbstractFunction } from "../frames/class-members/abstract-function";
import { AbstractProcedure } from "../frames/class-members/abstract-procedure";
import { AbstractProperty } from "../frames/class-members/abstract-property";
import { Constructor } from "../frames/class-members/constructor";
import { FunctionMethod } from "../frames/class-members/function-method";
import { ProcedureMethod } from "../frames/class-members/procedure-method";
import { Property } from "../frames/class-members/property";
import { AbstractField } from "../frames/fields/abstract-field";
import { ArgListField } from "../frames/fields/arg-list-field";
import { InheritsFromField } from "../frames/fields/inherits-from-field";
import { TypeField } from "../frames/fields/type-field";
import { FileImpl } from "../frames/file-impl";
import { isSelector } from "../frames/frame-helpers";
import { Field } from "../frames/frame-interfaces/field";
import { Frame } from "../frames/frame-interfaces/frame";
import { ParseNode } from "../frames/frame-interfaces/parse-node";
import { AbstractClass } from "../frames/globals/abstract-class";
import { ConcreteClass } from "../frames/globals/concrete-class";
import { Constant } from "../frames/globals/constant";
import { Enum } from "../frames/globals/enum";
import { GlobalComment } from "../frames/globals/global-comment";
import { GlobalFunction } from "../frames/globals/global-function";
import { GlobalProcedure } from "../frames/globals/global-procedure";
import { InterfaceFrame } from "../frames/globals/interface-frame";
import { MainFrame } from "../frames/globals/main-frame";
import { RecordFrame } from "../frames/globals/record-frame";
import { TestFrame } from "../frames/globals/test-frame";
import { Index } from "../frames/parse-nodes";
import { AbstractAlternatives } from "../frames/parse-nodes/abstract-alternatives";
import { ArgListNode } from "../frames/parse-nodes/arg-list-node";
import { BinaryExpression } from "../frames/parse-nodes/binary-expression";
import { BracketedExpression } from "../frames/parse-nodes/bracketed-expression";
import { CommaNode } from "../frames/parse-nodes/comma-node";
import { CommentNode } from "../frames/parse-nodes/comment-node";
import { CopyWith } from "../frames/parse-nodes/copy-with";
import { CSV } from "../frames/parse-nodes/csv";
import { DeconstructedList } from "../frames/parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../frames/parse-nodes/deconstructed-tuple";
import { DictionaryNode } from "../frames/parse-nodes/dictionary-node";
import { DotAfter } from "../frames/parse-nodes/dot-after";
import { DottedTerm } from "../frames/parse-nodes/dotted-term";
import { EmptyOfTypeNode } from "../frames/parse-nodes/empty-of-type-node";
import { EnumVal } from "../frames/parse-nodes/enum-val";
import { EnumValuesNode } from "../frames/parse-nodes/enum-values-node";
import { ExceptionMsgNode } from "../frames/parse-nodes/exception-msg-node";
import { FunctionRefNode } from "../frames/parse-nodes/function-ref-node";
import { IdentifierNode } from "../frames/parse-nodes/identifier-node";
import { IfExpr } from "../frames/parse-nodes/if-expr";
import { ImageNode } from "../frames/parse-nodes/image-node";
import { DictionaryImmutableNode } from "../frames/parse-nodes/immutable-dictionary-node";
import { IndexDouble } from "../frames/parse-nodes/index-double";
import { IndexRange } from "../frames/parse-nodes/index-range";
import { InheritanceNode } from "../frames/parse-nodes/inheritanceNode";
import { InstanceNode } from "../frames/parse-nodes/instanceNode";
import { InstanceProcRef } from "../frames/parse-nodes/instanceProcRef";
import { KeywordNode } from "../frames/parse-nodes/keyword-node";
import { KVPnode } from "../frames/parse-nodes/kvp-node";
import { Lambda } from "../frames/parse-nodes/lambda";
import { ListImmutableNode } from "../frames/parse-nodes/list-immutable-node";
import { ListNode } from "../frames/parse-nodes/list-node";
import { LitFloat } from "../frames/parse-nodes/lit-float";
import { LitInt } from "../frames/parse-nodes/lit-int";
import { LitRegExp } from "../frames/parse-nodes/lit-regExp";
import { LitStringDoubleQuotesEmpty } from "../frames/parse-nodes/lit-string-double-quotes-empty";
import { LitStringDoubleQuotesNonEmpty } from "../frames/parse-nodes/lit-string-double-quotes-non-empty";
import { LitStringInterpolation } from "../frames/parse-nodes/lit-string-interpolation";
import { LitStringSingleQuotes } from "../frames/parse-nodes/lit-string-single-quotes";
import { MethodCallNode } from "../frames/parse-nodes/method-call-node";
import { Multiple } from "../frames/parse-nodes/multiple";
import { NewInstance } from "../frames/parse-nodes/new-instance";
import { OptionalNode } from "../frames/parse-nodes/optional-node";
import { ParamDefNode } from "../frames/parse-nodes/param-def-node";
import { ParamListNode } from "../frames/parse-nodes/param-list-node";
import { PropertyRef } from "../frames/parse-nodes/property-ref";
import { PunctuationNode } from "../frames/parse-nodes/punctuation-node";
import { RegExMatchNode } from "../frames/parse-nodes/regex-match-node";
import { Sequence } from "../frames/parse-nodes/sequence";
import { SetToClause } from "../frames/parse-nodes/set-to-clause";
import { SpaceNode } from "../frames/parse-nodes/space-node";
import { TermChained } from "../frames/parse-nodes/term-chained";
import { TermSimpleWithOptIndex } from "../frames/parse-nodes/term-simple-with-opt-index";
import { TupleNode } from "../frames/parse-nodes/tuple-node";
import { TypeFuncNode } from "../frames/parse-nodes/type-func-node";
import { TypeGenericNode } from "../frames/parse-nodes/type-generic-node";
import { TypeNameNode } from "../frames/parse-nodes/type-name-node";
import { TypeTupleNode } from "../frames/parse-nodes/type-tuple-node";
import { UnaryExpression } from "../frames/parse-nodes/unary-expression";
import { WithClause } from "../frames/parse-nodes/with-clause";
import { AssertStatement } from "../frames/statements/assert-statement";
import { CallStatement } from "../frames/statements/call-statement";
import { CatchStatement } from "../frames/statements/catch-statement";
import { CommentStatement } from "../frames/statements/comment-statement";
import { ConstantStatement } from "../frames/statements/constant-statement";
import { Each } from "../frames/statements/each";
import { Elif } from "../frames/statements/elif";
import { Else } from "../frames/statements/else";
import { For } from "../frames/statements/for";
import { IfStatement } from "../frames/statements/if-statement";
import { Print } from "../frames/statements/print";
import { ReturnStatement } from "../frames/statements/return-statement";
import { SetStatement } from "../frames/statements/set-statement";
import { Throw } from "../frames/statements/throw";
import { TryStatement } from "../frames/statements/try";
import { VariableStatement } from "../frames/statements/variable-statement";
import { While } from "../frames/statements/while";
import { ParseStatus } from "../frames/status-enums";

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
  if (node instanceof AbstractFrame) {
    if (node.isGhostedOrWithinAGhostedFrame()) {
      return EmptyAsn.Instance;
    }
  }

  if (node instanceof FileImpl) {
    const astRoot = new FileAsn(node.libraryScope, node.getVersion());

    astRoot.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, "", astRoot)) as AstNode[];

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

  if (node instanceof ConstantStatement) {
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

  if (node instanceof Elif) {
    const elseAsn = new ElseAsn(node.getHtmlId(), scope);
    elseAsn.breakpointStatus = node.breakpointStatus;
    elseAsn.condition = transform(node.condition, node.getHtmlId(), elseAsn) ?? EmptyAsn.Instance;
    elseAsn.hasIf = true;
    return elseAsn;
  }

  if (node instanceof Else) {
    const elseAsn = new ElseAsn(node.getHtmlId(), scope);
    elseAsn.breakpointStatus = node.breakpointStatus;
    elseAsn.condition = EmptyAsn.Instance;
    elseAsn.hasIf = false;
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

  if (node instanceof BracketedExpression) {
    return new BracketedAsn(transform(node.expr, fieldId, scope)!, fieldId);
  }

  if (node instanceof UnaryExpression) {
    const op = node.unaryOp!.matchedText.trim();
    const operand = transform(node.term, fieldId, scope) as AstNode;

    return new UnaryExprAsn(op, operand, fieldId, scope);
  }

  if (node instanceof BinaryExpression) {
    const lhs = transform(node.lhs, fieldId, scope) as AstNode;
    const rhs = transform(node.rhs, fieldId, scope) as AstNode;
    const op = node.op!.matchedText.trim();

    return new BinaryExprAsn(op, lhs, rhs, fieldId, scope);
  }

  if (node instanceof LitInt) {
    return new LiteralIntAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitFloat) {
    return new LiteralFloatAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitStringSingleQuotes) {
    return new LiteralStringNonInterpAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitStringDoubleQuotesEmpty) {
    return new LiteralStringAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitStringDoubleQuotesNonEmpty) {
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
    const type = node.simpleType!.name!.matchedText;
    const qualifier =
      transform(node.simpleType?.libraryQualifier, fieldId, scope) ?? EmptyAsn.Instance;
    const generic = node.generic;
    let gp = new Array<AstNode>();
    gp = transformMany(generic as Sequence, fieldId, scope).items;
    return new TypeAsn(type, qualifier, gp, fieldId, scope);
  }

  if (node instanceof TypeFuncNode) {
    const inp = node.inputTypes?.matchedNode
      ? transformMany(node.inputTypes.matchedNode as CSV, fieldId, scope).items
      : [];

    const oup = node.returnType ? [transform(node.returnType, fieldId, scope)!] : [];

    return new TypeAsn(FuncName, EmptyAsn.Instance, inp.concat(oup), fieldId, scope);
  }

  if (node instanceof TypeNameNode) {
    const type = node.matchedText;

    return new TypeAsn(type, EmptyAsn.Instance, [], fieldId, scope);
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
    const imageType = new TypeAsn(ImageName, EmptyAsn.Instance, [], fieldId, scope);
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
    return new TypeAsn(TupleName, EmptyAsn.Instance, gp, fieldId, scope);
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

  if (node instanceof ArgListField) {
    const rn = node.getRootNode();
    if (rn) {
      return transform(rn, node.getHtmlId(), scope);
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

  throw new ElanCompilerError("Unsupported node " + (node ? node.constructor.name : "undefined"));
}

function checkMsg(msg: AstNode | undefined) {
  if (msg instanceof LiteralStringAsn) {
    msg.ensureNotEmpty();
  }
  return msg;
}
