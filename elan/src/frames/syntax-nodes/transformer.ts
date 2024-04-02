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

function mapOperation(op: string) {
    switch (op.trim()) {
        case "+": return OperationSymbol.Add;
        case "-": return OperationSymbol.Minus;
        case "*": return OperationSymbol.Multiply;
        case "not": return OperationSymbol.Not;
        default: throw new Error("Not implemented");
    }
}

function transformMany(node : CSV | Multiple | Sequence, field: Field) : Array<AstNode> {
    const ast = new Array<AstNode>();

    for (const elem of node.elements) {
        if (elem instanceof Multiple || elem instanceof CSV || elem instanceof Sequence) {
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

    if (node instanceof LitFloat) {
        return new LiteralFloatAsn(node.matchedText);
    }

    if (node instanceof IdentifierNode){
        return new IdAsn(node.matchedText, field);
    }

    if (node instanceof FunctionCallNode){
        const id = node.elements[1].matchedText;
        const parameters = transformMany(node.elements[3] as CSV, field) as Array<ExprAsn>;

        return new FuncCallAsn(id, parameters, field);
    }

    if (node instanceof Lambda){
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

    if (node instanceof OptionalNode) {
        if (node.matchedNode) {
            return transform(node.matchedNode, field);
        }
        return undefined;
    }

    if (node instanceof SymbolNode || node instanceof KeywordNode) {
        return undefined;
    }

    if (node instanceof AbstractAlternatives){
        return transform(node.bestMatch, field);
    }

    throw new Error("Not implemented " + typeof node);
}