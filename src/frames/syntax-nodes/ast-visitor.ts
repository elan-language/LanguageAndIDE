import { ElanCompilerError } from "../../elan-compiler-error";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
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
import { PropertyRef } from "../parse-nodes/property-ref";
import { PunctuationNode } from "../parse-nodes/punctuation-node";
import { RegExMatchNode } from "../parse-nodes/regex-match-node";
import { Sequence } from "../parse-nodes/sequence";
import { SpaceNode } from "../parse-nodes/space-node";
import { TermChained } from "../parse-nodes/term-chained";
import { TermSimpleWithOptIndex } from "../parse-nodes/term-simple-with-opt-index";
import { ToClause } from "../parse-nodes/to-clause";
import { TupleNode } from "../parse-nodes/tuple-node";
import { TypeFuncNode } from "../parse-nodes/type-func-node";
import { TypeGenericNode } from "../parse-nodes/type-generic-node";
import { TypeSimpleNode } from "../parse-nodes/type-simple-node";
import { TypeTupleNode } from "../parse-nodes/type-tuple-node";
import { UnaryExpression } from "../parse-nodes/unary-expression";
import { WithClause } from "../parse-nodes/with-clause";
import { SetStatement } from "../statements/set-statement";
import { FuncName, ImageName, TupleName } from "../symbols/elan-type-names";
import { EnumType } from "../symbols/enum-type";
import { isAstIdNode, mapOperation } from "./ast-helpers";
import { BinaryExprAsn } from "./binary-expr-asn";
import { BracketedAsn } from "./bracketed-asn";
import { CommentAsn } from "./comment-asn";
import { CompositeAsn } from "./composite-asn";
import { CopyWithAsn } from "./copy-with-asn";
import { CsvAsn } from "./csv-asn";
import { DeconstructedListAsn } from "./deconstructed-list-asn";
import { DeconstructedTupleAsn } from "./deconstructed-tuple-asn";
import { DiscardAsn } from "./discard-asn";
import { EmptyAsn } from "./empty-asn";
import { EmptyTypeAsn } from "./empty-type-asn";
import { FixedIdAsn } from "./fixed-id-asn";
import { FuncCallAsn } from "./func-call-asn";
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
  node: ParseNode | undefined,
  fieldId: string,
  scope: Scope,
): AstNode | undefined {
  if (node instanceof BracketedExpression) {
    return new BracketedAsn(transform(node.expr, fieldId, scope)!, fieldId);
  }

  if (node instanceof UnaryExpression) {
    const op = mapOperation(node.unaryOp!.matchedText);
    const operand = transform(node.term, fieldId, scope) as AstNode;

    return new UnaryExprAsn(op, operand, fieldId);
  }

  if (node instanceof BinaryExpression) {
    const lhs = transform(node.lhs, fieldId, scope) as AstNode;
    const rhs = transform(node.rhs, fieldId, scope) as AstNode;
    const op = mapOperation(node.op!.matchedText);

    return new BinaryExprAsn(op, lhs, rhs, fieldId);
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
    // kludge - fix
    if (
      (fieldId.startsWith("var") ||
        fieldId.startsWith("ident") ||
        fieldId.startsWith("enumVals")) &&
      !(scope instanceof SetStatement) // to catch range value
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
      return new ParamDefAsn(id, type, out, fieldId);
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

  if (node instanceof TypeSimpleNode) {
    const type = node.matchedText;

    return new TypeAsn(type, [], fieldId, scope);
  }

  if (node instanceof InheritanceNode) {
    const types = transformMany(node.typeList as CSV, fieldId, scope).items;
    return new CsvAsn(types, fieldId);
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

  if (node instanceof ToClause) {
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
    return new DeconstructedListAsn(hd, tl, fieldId);
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
    return new RangeAsn(from, to, fieldId);
  }

  if (node instanceof IndexDouble) {
    const index1 = transform(node.index1, fieldId, scope) as AstCollectionNode;
    const index2 = transform(node.index2, fieldId, scope) as AstCollectionNode;
    return new IndexDoubleAsn(index1, index2, fieldId);
  }

  if (node instanceof Index) {
    const index = transform(node.contents, fieldId, scope) as AstCollectionNode;
    return new IndexAsn(index, fieldId);
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
    return new IfExprAsn(condition, trueExpression, falseExpression, fieldId);
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
    return new CommentAsn(node.matchedText, fieldId);
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
