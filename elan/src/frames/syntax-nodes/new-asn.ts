import { ClassDefinitionType } from "../../symbols/class-definition-type";
import { ClassType } from "../../symbols/class-type";
import { CompileError } from "../compile-error";
import { mustBeConcreteClass, mustMatchParameters } from "../compile-rules";
import { Class } from "../globals/class";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class NewAsn extends AbstractAstNode implements AstNode {

    constructor(private readonly typeNode: TypeAsn, private readonly parameters: AstNode[], public readonly fieldId: string, private readonly scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.parameters) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(this.typeNode.aggregateCompileErrors()).concat(cc);
    }

    compile(): string {
        this.compileErrors = [];
        var gt = this.typeNode.genericParameters.map(p => `"${p.compile()}"`).join(", ");
        gt = gt ? `, [${gt}]` : "";
        const pp = this.parameters.map(p => p.compile()).join(", ");
        const t = this.typeNode.compile();
        if (this.typeNode.type === "Array") {
            return `system.initialise(system.array(new ${t}(${pp}))${gt})`;
        }

        if (this.typeNode.type === "List") {
            return `system.initialise(system.list(new ${t}(${pp}))${gt})`;
        }

        const cls = this.scope.resolveSymbol(this.typeNode.type, this.scope);
        
        if (cls?.symbolType instanceof ClassDefinitionType) {
            mustBeConcreteClass(cls.symbolType, this.compileErrors, this.fieldId);

            if (cls.symbolType.isAbstract === false) {
                // todo is this right - or should we resolve constructor on class scope and get constructor symbol ? 
                const parameterTypes = (cls as Class).getConstructor().params.symbolTypes;
                mustMatchParameters(this.parameters, parameterTypes, this.compileErrors, this.fieldId);
            }
        }

        return `system.initialise(new ${t}(${pp})${gt})`;
    }

    get symbolType() {
        return this.typeNode.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        return `new ${this.typeNode}(${pp})`;
    }
}