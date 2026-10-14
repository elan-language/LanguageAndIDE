import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { ElanCompilerError } from "../../compiler/elan-compiler-error";
import { AbstractFunctionAsn } from "../../compiler/syntax-nodes/class-members/abstract-function-asn";
import { AbstractProcedureAsn } from "../../compiler/syntax-nodes/class-members/abstract-procedure-asn";
import { ConstructorAsn } from "../../compiler/syntax-nodes/class-members/constructor-asn";
import { FunctionMethodAsn } from "../../compiler/syntax-nodes/class-members/function-method-asn";
import { ProcedureMethodAsn } from "../../compiler/syntax-nodes/class-members/procedure-method-asn";
import { PropertyAsn } from "../../compiler/syntax-nodes/class-members/property-asn";
import { CsvAsn } from "../../compiler/syntax-nodes/csv-asn";
import { EmptyAsn } from "../../compiler/syntax-nodes/empty-asn";
import { InheritsFromAsn } from "../../compiler/syntax-nodes/fields/inherits-from-asn";
import { TypeFieldAsn } from "../../compiler/syntax-nodes/fields/type-field-asn";
import { FileAsn } from "../../compiler/syntax-nodes/file-asn";
import { FuncCallAsn } from "../../compiler/syntax-nodes/func-call-asn";
import { AbstractClassAsn } from "../../compiler/syntax-nodes/globals/abstract-class-asn";
import { ConcreteClassAsn } from "../../compiler/syntax-nodes/globals/concrete-class-asn";
import { EnumAsn } from "../../compiler/syntax-nodes/globals/enum-asn";
import { GlobalConstantAsn } from "../../compiler/syntax-nodes/globals/global-constant-asn";
import { GlobalFunctionAsn } from "../../compiler/syntax-nodes/globals/global-function-asn";
import { GlobalProcedureAsn } from "../../compiler/syntax-nodes/globals/global-procedure-asn";
import { MainAsn } from "../../compiler/syntax-nodes/globals/main-asn";
import { TestAsn } from "../../compiler/syntax-nodes/globals/test-asn";
import { AssertAsn } from "../../compiler/syntax-nodes/statements/assert-asn";
import { CallAsn } from "../../compiler/syntax-nodes/statements/call-asn";
import { CatchCaseAsn } from "../../compiler/syntax-nodes/statements/catch-case-asn";
import { CommentStatementAsn } from "../../compiler/syntax-nodes/statements/comment-asn";
import { EachAsn } from "../../compiler/syntax-nodes/statements/each-asn";
import { ElseAsn } from "../../compiler/syntax-nodes/statements/else-asn";
import { IfAsn } from "../../compiler/syntax-nodes/statements/if-asn";
import { PrintAsn } from "../../compiler/syntax-nodes/statements/print-asn";
import { ReturnAsn } from "../../compiler/syntax-nodes/statements/return-asn";
import { SetAsn } from "../../compiler/syntax-nodes/statements/set-asn";
import { ThrowAsn } from "../../compiler/syntax-nodes/statements/throw-asn";
import { TryAsn } from "../../compiler/syntax-nodes/statements/try-asn";
import { VariableAsn } from "../../compiler/syntax-nodes/statements/variable-asn";
import { WhileAsn } from "../../compiler/syntax-nodes/statements/while-asn";
import { AbstractFrame } from "../frames/abstract-frame";
import { AbstractFunction } from "../frames/class-members/abstract-function";
import { AbstractProcedure } from "../frames/class-members/abstract-procedure";
import { Constructor } from "../frames/class-members/constructor";
import { FunctionMethod } from "../frames/class-members/function-method";
import { ProcedureMethod } from "../frames/class-members/procedure-method";
import { Property } from "../frames/class-members/property";
import { CommentFrame } from "../frames/comment-frame";
import { FieldImpl, FieldType } from "../frames/fields/field-impl";
import { FileImpl } from "../frames/file-impl";
import { isSelector } from "../frames/frame-helpers";
import { Field } from "../frames/frame-interfaces/field";
import { Frame } from "../frames/frame-interfaces/frame";
import { AbstractClass } from "../frames/globals/abstract-class";
import { ConcreteClass } from "../frames/globals/concrete-class";
import { ConstantGlobal } from "../frames/globals/constant-global";
import { Enum } from "../frames/globals/enum";
import { GlobalFunction } from "../frames/globals/global-function";
import { GlobalProcedure } from "../frames/globals/global-procedure";
import { MainRoutine } from "../frames/globals/main-routine";
import { TestFrame } from "../frames/globals/test-frame";
import { AssertStatement } from "../frames/statements/assert-statement";
import { Assignment } from "../frames/statements/assignment";
import { CatchStatement } from "../frames/statements/catch-statement";
import { ElseClause } from "../frames/statements/else-clause";
import { ElseIfClause } from "../frames/statements/elseIf-clause";
import { ForLoop } from "../frames/statements/forLoop";
import { IfStatement } from "../frames/statements/if-statement";
import { InputStatement } from "../frames/statements/input-statement";
import { PrintStatement } from "../frames/statements/print-statement";
import { ProcedureCall } from "../frames/statements/procedureCall";
import { ReturnStatement } from "../frames/statements/return-statement";
import { ThrowStatement } from "../frames/statements/throw-statement";
import { TryStatement } from "../frames/statements/try-statement";
import { VariableStatement } from "../frames/statements/variable-statement";
import { WhileLoop } from "../frames/statements/whileLoop";
import { getVisitorCompilerByLanguage } from "./parser-helpers";

export function transform(
  node: FileImpl | Frame | Field | undefined,
  fieldId: string,
  scope: Scope,
): AstNode | undefined {
  if (node instanceof AbstractFrame) {
    if (node.isGhostedOrWithinAGhostedFrame()) {
      return EmptyAsn.Instance;
    }
  }

  if (node instanceof FileImpl) {
    const astRoot = new FileAsn(node.libraryScope, node.getVersion(), node.language());

    astRoot.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, "", astRoot)) as AstNode[];

    return astRoot;
  }

  if (node instanceof MainRoutine) {
    const mainAsn = new MainAsn(node.getHtmlId(), scope);
    mainAsn.breakpointStatus = node.breakpointStatus;

    mainAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), mainAsn)) as AstNode[];

    return mainAsn;
  }

  if (node instanceof TestFrame) {
    const testAsn = new TestAsn(node.testName.text, node.getHtmlId(), scope);
    testAsn.breakpointStatus = node.breakpointStatus;

    testAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), testAsn)) as AstNode[];

    return testAsn;
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

  if (node instanceof Property) {
    const propertyAsn = new PropertyAsn(node.getHtmlId(), scope);
    propertyAsn.breakpointStatus = node.breakpointStatus;

    propertyAsn.name = transform(node.name, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;
    propertyAsn.type = transform(node.type, node.getHtmlId(), propertyAsn) ?? EmptyAsn.Instance;
    propertyAsn.private = node.isPrivate;

    return propertyAsn;
  }

  if (node instanceof VariableStatement) {
    const varAsn = new VariableAsn(node.getHtmlId(), scope);
    varAsn.breakpointStatus = node.breakpointStatus;

    varAsn.name = transform(node.name, node.getHtmlId(), varAsn) ?? EmptyAsn.Instance;
    varAsn.expr = transform(node.expr, node.getHtmlId(), varAsn) ?? EmptyAsn.Instance;

    return varAsn;
  }

  if (node instanceof Assignment) {
    const setAsn = new SetAsn(node.getHtmlId(), scope);
    setAsn.breakpointStatus = node.breakpointStatus;

    setAsn.assignable = transform(node.assignable, node.getHtmlId(), setAsn) ?? EmptyAsn.Instance;
    setAsn.expr = transform(node.expr, node.getHtmlId(), setAsn) ?? EmptyAsn.Instance;

    return setAsn;
  }

  if (node instanceof InputStatement) {
    const varAsn = new VariableAsn(node.getHtmlId(), scope);
    varAsn.breakpointStatus = node.breakpointStatus;

    varAsn.name = transform(node.name, node.getHtmlId(), varAsn) ?? EmptyAsn.Instance;

    const id = "input"; // Hard coded method name
    const parameter = transform(node.prompt, fieldId, scope)!;
    varAsn.expr = new FuncCallAsn(id, [parameter], fieldId, scope);
    return varAsn;
  }

  if (node instanceof PrintStatement) {
    const printAsn = new PrintAsn(node.getHtmlId(), scope);
    printAsn.breakpointStatus = node.breakpointStatus;
    printAsn.expr = transform(node.arg, node.getHtmlId(), printAsn) ?? EmptyAsn.Instance;
    return printAsn;
  }

  if (node instanceof ProcedureCall) {
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

  if (node instanceof CommentFrame) {
    const commentAsn = new CommentStatementAsn(node.getHtmlId(), scope);
    commentAsn.text =
      transform(node.textIncludingMarkerSymboAndSpace, node.getHtmlId(), commentAsn) ??
      EmptyAsn.Instance;
    return commentAsn;
  }

  if (node instanceof Enum) {
    const enumAsn = new EnumAsn(node.getHtmlId(), scope);
    enumAsn.breakpointStatus = node.breakpointStatus;

    enumAsn.name = transform(node.name, node.getHtmlId(), enumAsn) ?? EmptyAsn.Instance;
    enumAsn.values = transform(node.values, node.getHtmlId(), enumAsn) ?? EmptyAsn.Instance;

    return enumAsn;
  }

  if (node instanceof ConstantGlobal) {
    const constantAsn = new GlobalConstantAsn(node.getHtmlId(), scope);
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
    functionAsn.private = node.isPrivate;

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
    procedureAsn.private = node.isPrivate;

    procedureAsn.name = transform(node.name, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;
    procedureAsn.params =
      transform(node.params, node.getHtmlId(), procedureAsn) ?? EmptyAsn.Instance;

    procedureAsn.children = node
      .getChildren()
      .filter((f) => !isSelector(f))
      .map((f) => transform(f, f.getHtmlId(), procedureAsn)) as AstNode[];

    return procedureAsn;
  }

  if (node instanceof ForLoop) {
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

  if (node instanceof WhileLoop) {
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

  if (node instanceof ElseIfClause) {
    const elseAsn = new ElseAsn(node.getHtmlId(), scope);
    elseAsn.breakpointStatus = node.breakpointStatus;
    elseAsn.condition = transform(node.condition, node.getHtmlId(), elseAsn) ?? EmptyAsn.Instance;
    elseAsn.hasIf = true;
    return elseAsn;
  }

  if (node instanceof ElseClause) {
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
    const type = node.exceptionType.text;

    const catchAsn = new CatchCaseAsn(type!, node.getHtmlId(), scope);
    catchAsn.breakpointStatus = node.breakpointStatus;

    catchAsn.variable = transform(node.variable, node.getHtmlId(), catchAsn) ?? EmptyAsn.Instance;
    return catchAsn;
  }

  if (node instanceof ThrowStatement) {
    const type = node.type.text;
    const msg = transform(node.text, node.getHtmlId(), scope)!;

    const throwAsn = new ThrowAsn(type, msg, node.getHtmlId(), scope);
    throwAsn.breakpointStatus = node.breakpointStatus;
    return throwAsn;
  }

  if (node instanceof AssertStatement) {
    const assertAsn = new AssertAsn(node.getHtmlId(), scope);
    assertAsn.breakpointStatus = node.breakpointStatus;
    assertAsn.expected = transform(node.expected, node.getHtmlId(), assertAsn) ?? EmptyAsn.Instance;
    assertAsn.actual = transform(node.actual, node.getHtmlId(), assertAsn) ?? EmptyAsn.Instance;

    return assertAsn;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.type) {
    const ctx = node.context;

    if (ctx) {
      const typeAsn = new TypeFieldAsn(node.getHtmlId());
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      const type = ctx.accept(visitor)!;
      typeAsn.type = type;
      return typeAsn;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.paramList) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      const paramList = ctx.accept(visitor)!;
      return paramList;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.argList) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      const argList = ctx.accept(visitor)!;
      return argList;
    }
    return EmptyAsn.Instance;
  }

  if (
    node instanceof FieldImpl &&
    (node.fieldSpec?.fieldType === FieldType.identifier ||
      node.fieldSpec?.fieldType === FieldType.methodName)
  ) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      const id = ctx.accept(visitor)!;
      return id;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.expression) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.procRef) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.assignable) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.constantValue) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.typeName) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.exceptionMessage) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.inheritsFrom) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      const type = ctx.accept(visitor);

      if (type) {
        const inheritsFrom = new InheritsFromAsn(fieldId);
        inheritsFrom.inheritance = new CsvAsn([type], fieldId);
        return inheritsFrom;
      }
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.enumValues) {
    const ctx = node.context;

    if (ctx) {
      const visitor = getVisitorCompilerByLanguage(node.language(), node.getHtmlId(), scope);
      return ctx.accept(visitor)!;
    }
    return EmptyAsn.Instance;
  }

  if (node instanceof FieldImpl && node.fieldSpec?.fieldType === FieldType.comment) {
    return EmptyAsn.Instance;
  }

  throw new ElanCompilerError("Unsupported node " + (node ? node.constructor.name : "undefined"));
}
