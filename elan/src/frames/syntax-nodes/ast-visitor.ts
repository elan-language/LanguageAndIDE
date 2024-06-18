import { AbstractAlternatives } from "../parse-nodes/abstract-alternatives";
import { BinaryExpression } from "../parse-nodes/binary-expression";
import { LitInt } from "../parse-nodes/lit-int";
import { ParseNode } from "../parse-nodes/parse-node";
import { OperationSymbol } from "./operation-symbol";
import { AstNode } from "../interfaces/ast-node";
import { BinaryExprAsn } from "./binary-expr-asn";
import { UnaryExpression } from "../parse-nodes/unary-expression";
import { UnaryExprAsn } from "./unary-expr-asn";
import { LitBoolean } from "../parse-nodes/lit-boolean";
import { LiteralBoolAsn } from "./literal-bool-asn";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { IdAsn } from "./id-asn";
import { FunctionCallNode } from "../parse-nodes/function-call-node";
import { FuncCallAsn } from "./func-call-asn";
import { CSV } from "../parse-nodes/csv";
import { OptionalNode } from "../parse-nodes/optional-node";
import { Multiple } from "../parse-nodes/multiple";
import { LitFloat } from "../parse-nodes/lit-float";
import { LiteralFloatAsn } from "./literal-float-asn";
import { Sequence } from "../parse-nodes/sequence";
import { Lambda } from "../parse-nodes/lambda";
import { LambdaAsn } from "./lambda-asn";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParamDefAsn } from "./param-def-asn";
import { TypeAsn } from "./type-asn";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { EmptyTypeAsn } from "./empty-type-asn";
import { WithClause } from "../parse-nodes/with-clause";
import { WithAsn } from "./with-asn";
import { ImmutableListNode } from "../parse-nodes/immutable-list-node";
import { SetAsn } from "./set-asn";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { VarAsn } from "./var-asn";
import { SetClause } from "../parse-nodes/set-clause";
import { BracketedExpression } from "../parse-nodes/bracketed-expression";
import { BracketedAsn } from "./bracketed-asn";
import { LiteralStringAsn } from "./literal-string-asn";
import { globalKeyword, libraryKeyword, propertyKeyword, thisKeyword } from "../keywords";
import { IndexNode } from "../parse-nodes/index-node";
import { IndexAsn } from "./index-asn";
import { LiteralImmutableListAsn } from "./literal-immutable-list-asn";
import { NewInstance } from "../parse-nodes/new-instance";
import { NewAsn } from "./new-asn";
import { TypeSimpleNode } from "../parse-nodes/type-simple-node";
import { TupleNode } from "../parse-nodes/tuple-node";
import { LiteralTupleAsn } from "./literal-tuple-asn";
import { CommaNode } from "../parse-nodes/comma-node";
import { SpaceNode } from "../parse-nodes/space-node";
import { Scope } from "../interfaces/scope";
import { LambdaSigAsn } from "./lambda-sig-asn";
import { IfExpr } from "../parse-nodes/if-expr";
import { IfExprAsn } from "./if-expr-asn";
import { EnumVal } from "../parse-nodes/enum-val";
import { LiteralEnumAsn } from "./literal-enum-asn";
import { EnumType } from "../symbols/enum-type";
import { DictionaryNode } from "../parse-nodes/dictionary-node";
import { LitTuple } from "../parse-nodes/lit-tuple";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { RangeAsn } from "./range-asn";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedListAsn } from "./deconstructed-list-asn";
import { LiteralDictionaryAsn } from "./literal-dictionary-asn";
import { KVPnode } from "../parse-nodes/kvp-node";
import { KvpAsn } from "./kvp-asn";
import { VarRefCompound } from "../parse-nodes/var-ref-compound";
import { TermWith } from "../parse-nodes/term-with";
import { TypeTupleNode } from "../parse-nodes/type-tuple-node";
import { RangeNode } from "../parse-nodes/range-node";
import { Qualifier } from "../parse-nodes/qualifier";
import { InstanceNode } from "../parse-nodes/instanceNode";
import { LitStringEmpty } from "../parse-nodes/lit-string-empty";
import { LitStringNonEmpty } from "../parse-nodes/lit-string-non-empty";
import { StringInterpolation } from "../parse-nodes/string-interpolation";
import { InterpolatedAsn } from "./interpolated-asn";
import { RegExMatchNode } from "../parse-nodes/regex-match-node";
import { SegmentedStringAsn } from "./segmented-string-asn";
import { FuncTypeNode } from "../parse-nodes/func-type-node";
import { FixedIdAsn } from "./fixed-id-asn";
import { AssignableNode } from "../parse-nodes/assignable-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { CsvAsn } from "./csv-asn";
import { QualifierAsn } from "./qualifier-asn";
import { ThisAsn } from "./this-asn";
import { LiteralIntAsn } from "./literal-int-asn";
import { IdDefAsn } from "./id-def-asn";
import { IndexDouble } from "../parse-nodes/index-double";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { ExprAsn } from "./expr-asn";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { wrapScopeInScope } from "../symbols/symbol-helpers";
import { ArrayListNode } from "../parse-nodes/array-list-node";
import { LiteralArrayListAsn } from "./literal-array-list-asn";
import { ImmutableDictionaryNode } from "../parse-nodes/immutable-dictionary-node";
import { LiteralImmutableDictionaryAsn } from "./literal-immutable-dictionary-asn";
import { DeconstructedTupleAsn } from "./deconstructed-tuple-asn";
import { TypeGenericNode } from "../parse-nodes/type-generic-node";
import { TypeListNode } from "../parse-nodes/type-list-node";
import { TypeImmutableListNode } from "../parse-nodes/type-immutable-list-node";
import { TypeDictionaryNode } from "../parse-nodes/type-dictionary-node";
import { TypeImmutableDictionaryNode } from "../parse-nodes/type-immutable-dictionary-node";
import { EmptyAsn } from "./empty-asn";
import { EmptyOfTypeNode } from "../parse-nodes/empty-of-type-node";
import { SetStatement } from "../statements/set-statement";
import { IndexSingle } from "../parse-nodes/index-single";

function mapOperation(op: string) {
  switch (op.trim()) {
    case "+":
      return OperationSymbol.Add;
    case "-":
      return OperationSymbol.Minus;
    case "*":
      return OperationSymbol.Multiply;
    case "<":
      return OperationSymbol.LT;
    case ">":
      return OperationSymbol.GT;
    case ">=":
      return OperationSymbol.GTE;
    case "<=":
      return OperationSymbol.LTE;
    case "and":
      return OperationSymbol.And;
    case "or":
      return OperationSymbol.Or;
    case "xor":
      return OperationSymbol.Xor;
    case "not":
      return OperationSymbol.Not;
    case "is":
      return OperationSymbol.Equals;
    case "is not":
      return OperationSymbol.NotEquals;
    case "div":
      return OperationSymbol.Div;
    case "mod":
      return OperationSymbol.Mod;
    case "/":
      return OperationSymbol.Divide;
    case "^":
      return OperationSymbol.Pow;
    default:
      throw new Error("Not implemented");
  }
}

export function asCsv(nodes: AstNode[], id: string, scope: Scope) {
  return new CsvAsn(nodes, id, scope);
}

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

  return new CsvAsn(asts, fieldId, scope);
}

export function transform(
  node: ParseNode | undefined,
  fieldId: string,
  scope: Scope,
): AstNode | undefined {
  if (node instanceof BracketedExpression) {
    return new BracketedAsn(transform(node.expr, fieldId, scope)!, fieldId, scope);
  }

  if (node instanceof UnaryExpression) {
    const op = mapOperation(node.unaryOp!.matchedText);
    const operand = transform(node.term, fieldId, scope) as ExprAsn;

    return new UnaryExprAsn(op, operand, fieldId, scope);
  }

  if (node instanceof BinaryExpression) {
    const lhs = transform(node.lhs, fieldId, scope) as ExprAsn;
    const rhs = transform(node.rhs, fieldId, scope) as ExprAsn;
    const op = mapOperation(node.op!.matchedText);

    return new BinaryExprAsn(op, lhs, rhs, fieldId, scope);
  }

  if (node instanceof LitInt) {
    return new LiteralIntAsn(node.matchedText, fieldId);
  }

  if (node instanceof LitBoolean) {
    return new LiteralBoolAsn(node.matchedText, fieldId);
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
      return new SegmentedStringAsn(ss, fieldId, scope);
    }

    return new LiteralStringAsn(node.matchedText, fieldId);
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

    return new IdAsn(node.matchedText, fieldId, scope);
  }

  if (node instanceof FunctionCallNode) {
    const qualifier = transform(node.qualifier, fieldId, scope);
    const id = node.name!.matchedText;
    const parameters = transformMany(node.args as CSV, fieldId, scope).items as Array<ExprAsn>;

    return new FuncCallAsn(id, qualifier, parameters, fieldId, scope);
  }

  if (node instanceof Lambda) {
    const parameters = transformMany(node.params as CSV, fieldId, scope)
      .items as Array<ParamDefAsn>;
    const sig = new LambdaSigAsn(parameters, fieldId, scope);
    // wrap sig scope in another scope to prevent looking up a symbol in current scope.
    const body = transform(node.expr, fieldId, wrapScopeInScope(sig)) as ExprAsn;

    return new LambdaAsn(sig, body, fieldId, scope);
  }

  if (node instanceof ParamDefNode) {
    const id = node.name!.matchedText;
    const type = transform(node.type, fieldId, scope) as AstIdNode;

    return new ParamDefAsn(id, type, fieldId, scope);
  }

  if (node instanceof TypeGenericNode) {
    const type = node.simpleType!.matchedText;
    const generic = node.generic;
    let gp = new Array<AstNode>();
    gp = transformMany(generic as Sequence, fieldId, scope).items;
    return new TypeAsn(type, gp, fieldId, scope);
  }

  if (node instanceof TypeListNode || node instanceof TypeImmutableListNode) {
    const type = node.simpleType!.matchedText;
    const gp = transform(node.generic, fieldId, scope)!;
    return new TypeAsn(type, [gp], fieldId, scope);
  }

  if (node instanceof TypeDictionaryNode || node instanceof TypeImmutableDictionaryNode) {
    const type = node.simpleType!.matchedText;
    const key = transform(node.keyType, fieldId, scope)!;
    const value = transform(node.valueType, fieldId, scope)!;
    return new TypeAsn(type, [key, value], fieldId, scope);
  }

  if (node instanceof FuncTypeNode) {
    const type = "Func";
    const inp = node.inputTypes ? transformMany(node.inputTypes, fieldId, scope).items : [];
    const oup = node.returnType ? [transform(node.returnType, fieldId, scope)!] : [];

    return new TypeAsn(type, inp.concat(oup), fieldId, scope);
  }

  if (node instanceof TypeSimpleNode) {
    const type = node.matchedText;

    return new TypeAsn(type, [], fieldId, scope);
  }

  if (node instanceof EmptyOfTypeNode) {
    const type = transform(node.type, fieldId, scope) as TypeAsn;
    return new EmptyTypeAsn(type, fieldId, scope);
  }

  if (node instanceof OptionalNode) {
    if (node.matchedNode) {
      return transform(node.matchedNode, fieldId, scope);
    }
    return undefined;
  }

  if (node instanceof VarRefNode) {
    return transform(node.bestMatch, fieldId, scope);
  }

  if (node instanceof SetClause) {
    const id = node.property!.matchedText;
    const to = transform(node.expr, fieldId, scope) as ExprAsn;

    return new SetAsn(id, to, fieldId, scope);
  }

  if (node instanceof SymbolNode) {
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
    if (node.fixedText === globalKeyword) {
      return new FixedIdAsn(globalKeyword, fieldId);
    }
    if (node.fixedText === libraryKeyword) {
      return new FixedIdAsn(libraryKeyword, fieldId);
    }
    if (node.fixedText === propertyKeyword || node.fixedText === thisKeyword) {
      return new ThisAsn(node.fixedText, fieldId, scope);
    }

    return undefined;
  }

  if (node instanceof AbstractAlternatives) {
    if (node.bestMatch) {
      return transform(node.bestMatch, fieldId, scope);
    }
    return new EmptyAsn(fieldId);
  }

  if (node instanceof ImmutableListNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralImmutableListAsn(items, fieldId, scope);
  }

  if (node instanceof ArrayListNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralArrayListAsn(items, fieldId, scope);
  }

  if (node instanceof DictionaryNode) {
    const items = transformMany(node.csv!, fieldId, scope);
    return new LiteralDictionaryAsn(items, fieldId, scope);
  }

  if (node instanceof ImmutableDictionaryNode) {
    const items = transformMany(node.csv!, fieldId, scope);
    return new LiteralImmutableDictionaryAsn(items, fieldId, scope);
  }

  if (node instanceof TupleNode) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralTupleAsn(items, fieldId, scope);
  }

  if (node instanceof LitTuple) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items;
    return new LiteralTupleAsn(items, fieldId, scope);
  }

  if (node instanceof DeconstructedTuple) {
    const items = transformMany(node.csv as CSV, fieldId, scope).items as AstIdNode[];
    return new DeconstructedTupleAsn(items, fieldId, scope);
  }

  if (node instanceof DeconstructedList) {
    const hd = node.head!.matchedText;
    const tl = node.tail!.matchedText;
    return new DeconstructedListAsn(hd, tl, fieldId, scope);
  }

  if (node instanceof WithClause) {
    return transform(node.changes, fieldId, scope);
  }

  if (node instanceof NewInstance) {
    const type = transform(node.type, fieldId, scope) as TypeAsn;
    const pp = transformMany(node.args as CSV, fieldId, scope).items;
    return new NewAsn(type, pp, fieldId, scope);
  }

  if (node instanceof VarRefCompound) {
    const q = transform(node.optQualifier, fieldId, scope) as AstQualifierNode | undefined;
    const id = node.simple!.matchedText;
    const index = transform(node.index, fieldId, scope);
    return new VarAsn(id, q, index, fieldId, scope);
  }

  if (node instanceof TermWith) {
    const obj = transform(node.term, fieldId, scope) as ExprAsn;
    const changes = transform(node.with, fieldId, scope) as LiteralImmutableListAsn;
    return new WithAsn(obj, changes, fieldId, scope);
  }

  if (node instanceof TypeTupleNode) {
    const gp = transformMany(node.types as CSV, fieldId, scope).items;
    return new TypeAsn("Tuple", gp, fieldId, scope);
  }

  if (node instanceof RangeNode) {
    const fromNode = node.fromIndex?.matchedNode;
    const from = fromNode ? transform(fromNode, fieldId, scope) : undefined;
    const toNode = node.toIndex?.matchedNode;
    const to = toNode ? transform(toNode, fieldId, scope) : undefined;
    return new RangeAsn(from, to, fieldId, scope);
  }

  if (node instanceof IndexDouble) {
    const indexOne = transform(node.indexOne, fieldId, scope) as ExprAsn;
    const indexTwo = transform(node.indexTwo, fieldId, scope) as ExprAsn;

    return new IndexAsn(indexOne, indexTwo, fieldId, scope);
  }

  if (node instanceof Qualifier) {
    const q = transform(node.qualifier, fieldId, scope) as AstIdNode;
    return new QualifierAsn(q, fieldId, scope);
  }

  if (node instanceof InstanceNode) {
    const id = node.variable!.matchedText;
    const index = transform(node.index, fieldId, scope);
    return new VarAsn(id, undefined, index, fieldId, scope);
  }

  if (node instanceof IfExpr) {
    const condition = transform(node.condition, fieldId, scope) as ExprAsn;
    const tr = transform(node.whenTrue, fieldId, scope) as ExprAsn;
    const fl = transform(node.whenFalse, fieldId, scope) as ExprAsn;
    return new IfExprAsn(condition, tr, fl, fieldId, scope);
  }

  if (node instanceof EnumVal) {
    const id = node.val!.matchedText;
    const type = new EnumType(node.type!.matchedText);

    return new LiteralEnumAsn(id, type, fieldId, scope);
  }

  if (node instanceof KVPnode) {
    const key = transform(node.key, fieldId, scope)!;
    const value = transform(node.value, fieldId, scope)!;

    return new KvpAsn(key, value, fieldId, scope);
  }

  if (node instanceof StringInterpolation) {
    const value = transform(node.expr, fieldId, scope)!;

    return new InterpolatedAsn(value, fieldId, scope);
  }

  if (node instanceof RegExMatchNode) {
    return new LiteralStringAsn(node.matchedText, fieldId);
  }

  if (node instanceof AssignableNode) {
    const q = transform(node.qualifier, fieldId, scope) as AstQualifierNode | undefined;
    const id = node.simple.matchedText;
    const index = transform(node.index, fieldId, scope);
    return new VarAsn(id, q, index, fieldId, scope);
  }

  if (node instanceof InstanceProcRef) {
    const q = transform(node.qualifier, fieldId, scope) as AstQualifierNode | undefined;
    const id = node.simple!.matchedText;
    return new VarAsn(id, q, undefined, fieldId, scope);
  }

  throw new Error("Not implemented " + (node ? node.constructor.name : "undefined"));
}
