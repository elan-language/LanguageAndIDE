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

function mapOperation(op: string) {
    switch (op.trim()) {
        case "+": return OperationSymbol.Add;
        case "-": return OperationSymbol.Minus;
        case "not": return OperationSymbol.Not;
        default: throw new Error("Not implemented");
    }
}


export function transform(node : ParseNode | undefined, field : Field) : AstNode | undefined {
   
    if (node instanceof UnaryExpression){
        const op = mapOperation(node.elements[0].matchedText);
        const operand = transform(node.elements[1], field) as ExprAsn;

        return new UnaryExprAsn(op, operand, field);
    }

    if (node instanceof BinaryExpression){
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

    if (node instanceof IdentifierNode){
        return new IdAsn(node.matchedText, field);
    }

    if (node instanceof AbstractAlternatives){
        return transform(node.bestMatch, field);
    }

    return undefined;
}