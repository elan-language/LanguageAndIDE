import { AbstractAlternatives } from "../parse-nodes/abstract-alternatives";
import { BinaryExpression } from "../parse-nodes/binary-expression";
import { LitInt } from "../parse-nodes/lit-int";
import { ParseNode } from "../parse-nodes/parse-node";
import { OperationSymbol } from "./operation-symbol";
import { AstNode } from "./ast-node";
import { BinaryExprAsn } from "./binary-expr-asn";
import { ExprAsn } from "./expr-asn";
import { LiteralIntAsn } from "./literal-int-asn";
import { UnaryExpression } from "../parse-nodes/unary-expression";
import { UnaryExprAsn } from "./unary-expr-asn";
import { LitBool } from "../parse-nodes/lit-bool";
import { LiteralBoolAsn } from "./literal-bool-asn";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { IdAsn } from "./id-asn";
import { Field } from "../interfaces/field";
import { FunctionCallNode } from "../parse-nodes/function-call-node";
import { FuncCallAsn } from "./func-call-asn";
import { CSV } from "../parse-nodes/csv";
import { OptionalNode } from "../parse-nodes/optional-node";
import { Multiple } from "../parse-nodes/multiple";
import { LitFloat } from "../parse-nodes/lit-float";
import { LiteralFloatAsn } from "./literal-float-asn";
import { Sequence } from "../parse-nodes/sequence";
import { Comma } from "../parse-nodes/comma";
import { Lambda } from "../parse-nodes/lambda";
import { LambdaAsn } from "./lambda-asn";
import { ParamDefNode } from "../parse-nodes/param-def-node";
import { ParamDefAsn } from "./param-def-asn";
import { TypeWithOptGenerics } from "../parse-nodes/type-with-opt-generics";
import { TypeAsn } from "./type-asn";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { KeywordNode } from "../parse-nodes/keyword-node";
import { DefaultOfTypeNode } from "../parse-nodes/default-of-type-node";
import { DefaultTypeAsn } from "./default-type-asn";
import { WithClause } from "../parse-nodes/with-clause";
import { WithAsn } from "./with-asn";
import { List } from "../parse-nodes/list";
import { SetAsn } from "./set-asn";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { VarAsn } from "./var-asn";
import { SetClause } from "../parse-nodes/set-clause";
import { LitChar } from "../parse-nodes/lit-char";
import { LiteralCharAsn } from "./literal-char-asn";
import { BracketedExpression } from "../parse-nodes/bracketed-expression";
import { BracketedAsn } from "./bracketed-asn";
import { LitString } from "../parse-nodes/lit-string";
import { LiteralStringAsn } from "./literal-string-asn";
import { Alternatives } from "../parse-nodes/alternatives";

function mapOperation(op: string) {
    switch (op.trim()) {
        case "+": return OperationSymbol.Add;
        case "-": return OperationSymbol.Minus;
        case "*": return OperationSymbol.Multiply;
        case "and": return OperationSymbol.And;
        case "not": return OperationSymbol.Not;
        default: throw new Error("Not implemented");
    }
}

function transformMany(node: CSV | Multiple | Sequence | List, field: Field): Array<AstNode> {
    const ast = new Array<AstNode>();

    for (const elem of node.elements) {
        if (elem instanceof Multiple || elem instanceof CSV || elem instanceof Sequence || elem instanceof List) {
            const asns = transformMany(elem, field);

            for (const asn of asns) {
                if (asn) {
                    ast.push(asn);
                }
            }
        }
        else {
            const asn = transform(elem, field);
            if (asn) {
                ast.push(asn);
            }
        }
    }

    return ast;
}


export function transform(node: ParseNode | undefined, field: Field): AstNode | undefined {

    if (node instanceof BracketedExpression) {
        return new BracketedAsn(transform(node.elements[1], field)!, field);
    }

    if (node instanceof UnaryExpression) {
        const op = mapOperation(node.elements[0].matchedText);
        const operand = transform(node.elements[1], field) as ExprAsn;

        return new UnaryExprAsn(op, operand, field);
    }

    if (node instanceof BinaryExpression) {
        const lhs = transform(node.elements[0], field) as ExprAsn;
        const rhs = transform(node.elements[2], field) as ExprAsn;
        const op = mapOperation(node.elements[1].matchedText);

        return new BinaryExprAsn(op, lhs, rhs, field);
    }

    if (node instanceof LitInt) {
        return new LiteralIntAsn(node.matchedText);
    }

    if (node instanceof LitBool) {
        return new LiteralBoolAsn(node.matchedText);
    }

    if (node instanceof LitFloat) {
        return new LiteralFloatAsn(node.matchedText);
    }

    if (node instanceof LitChar) {
        return new LiteralCharAsn(node.matchedText);
    }

    if (node instanceof LitString) {
        return new LiteralStringAsn(node.matchedText);
    }

    if (node instanceof IdentifierNode) {
        return new IdAsn(node.matchedText, field);
    }

    if (node instanceof FunctionCallNode) {
        var qualifier : AstNode[] | undefined;
        const qualNode = (node.elements[0] as OptionalNode).matchedNode;
        if (qualNode instanceof Sequence) {
            if (qualNode.elements[0] instanceof Alternatives) {
                const prefixNode = qualNode.elements[0].bestMatch;
                if (prefixNode instanceof Sequence) {
                    qualifier = transformMany(prefixNode, field);
                }
                else if (prefixNode instanceof IdentifierNode){
                    qualifier = [transform(prefixNode, field)!];
                }
            }
        }

        const id = node.elements[1].matchedText;
        const parameters = transformMany(node.elements[3] as CSV, field) as Array<ExprAsn>;

        return new FuncCallAsn(id, qualifier, parameters, field);
    }

    if (node instanceof Lambda) {
        const parameters = transformMany(node.elements[1] as CSV, field) as Array<ExprAsn>;
        const body = transform(node.elements[3], field) as ExprAsn;

        return new LambdaAsn(parameters, body, field);
    }

    if (node instanceof ParamDefNode) {
        const id = node.elements[0].matchedText;
        const type = transform(node.elements[2], field)!;

        return new ParamDefAsn(id, type, field);
    }

    if (node instanceof TypeWithOptGenerics) {
        const type = node.elements[0].matchedText;
        const opt = (node.elements[1] as OptionalNode).matchedNode;
        var gp = new Array<AstNode>();

        if (opt) {
            gp = transformMany(opt as Sequence, field)!;
        }

        return new TypeAsn(type, gp, field);
    }

    if (node instanceof DefaultOfTypeNode) {
        const type = transform(node.elements[1], field)!;
        return new DefaultTypeAsn(type, field);
    }

    if (node instanceof OptionalNode) {
        if (node.matchedNode) {
            return transform(node.matchedNode, field);
        }
        return undefined;
    }

    if (node instanceof VarRefNode) {
        if (node.bestMatch instanceof Sequence) {
            const q = node.bestMatch.elements[0].matchedText;
            const id = node.bestMatch.elements[1].matchedText;

            return new VarAsn(id, q, field);
        }

        if (node.bestMatch instanceof IdentifierNode) {
            const id = node.bestMatch.matchedText;

            return new VarAsn(id, "", field);
        }

        return undefined;
    }

    if (node instanceof SetClause) {
        const id = node.elements[0].matchedText;
        const to = transform(node.elements[3], field) as ExprAsn;

        return new SetAsn(id, to, field);
    }

    if (node instanceof SymbolNode || node instanceof KeywordNode) {
        return undefined;
    }

    if (node instanceof AbstractAlternatives) {
        return transform(node.bestMatch, field);
    }

    if (node instanceof Sequence) {
        if (node.elements[1] instanceof WithClause) {
            const obj = transform(node.elements[0], field) as ExprAsn;
            const changes = transformMany(node.elements[1].elements[1] as List, field);

            return new WithAsn(obj, changes, field);
        }

        if (node.elements[1] instanceof IdentifierNode) {
            const id = node.elements[0].matchedText;
            const to = transform(node.elements[3], field) as ExprAsn;

            return new SetAsn(id, to, field);
        }
    }

    throw new Error("Not implemented " + typeof node);
}