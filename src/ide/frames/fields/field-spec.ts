import { ParserRuleContext } from "antlr4ng";
import { PythonParser } from "../../../generated/python/PythonParser";
import { RefLangParser } from "../../../generated/ref-lang/RefLangParser";

export enum FieldType {
  argList,
  assertActual,
  assignable,
  comment,
  constantValue,
  enumValues,
  exceptionMessage,
  exceptionType,
  expression,
  identifier,
  inheritsFrom,
  methodName,
  procRef,
  paramList,
  testName,
  type,
  typeName,
}

export class FieldSpec {
  public getRuleContextByField: (parser: PythonParser | RefLangParser) => ParserRuleContext;

  constructor(
    public fieldType: FieldType,
    public placeholder: string,
    public helpId: string,
    public idPrefix: string,
    public symbolCompletion: boolean,
    public optional: boolean,
    getRuleContextByField: (parser: PythonParser | RefLangParser) => ParserRuleContext,
  ) {
    this.getRuleContextByField = getRuleContextByField;
  }
}

export const typeFieldSpec: FieldSpec = new FieldSpec(
  FieldType.type,
  "<i>Type</i>",
  "TypeField",
  "_type",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.type_(),
);

export const argListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.argList,
  "<i>arguments</i>",
  "ArgListField", //TODO this should eventually be a list of the argument names obtained from symbol compiler
  "_args",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.argList(),
);

export const inputArgListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.argList,
  "<i>prompt message</i>",
  "ArgListField",
  "_args",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.argList(),
);

export const paramListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.paramList,
  "<i>parameter definitions</i>",
  "ParamListField",
  "_params",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.paramList(),
);

export const identifierFieldSpec: FieldSpec = new FieldSpec(
  FieldType.identifier,
  "<i>name</i>",
  "IdentifierField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.identifierDef(),
);

export const testNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.identifier,
  "test_name",
  "IdentifierField",
  "_ident",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.testName(),
);

export const exceptionTypeFieldSpec: FieldSpec = new FieldSpec(
  FieldType.exceptionType,
  "<i>type e.g. ElanRuntimeError or CustomError</i>",
  "TypeField",
  "_type",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
);

export const exceptionMessageFieldSpec: FieldSpec = new FieldSpec(
  FieldType.exceptionMessage,
  "<i>message</i>",
  "ExceptionMessageField",
  "_msg",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.errorMessage(),
);

export const typeNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.typeName,
  "<i>Name</i>",
  "TypeNameField",
  "_type",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
);

export const commentFieldSpec: FieldSpec = new FieldSpec(
  FieldType.comment,
  "# <i>comment</i>",
  "CommentField",
  "_comment",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.commentText(),
);

export const inheritsFromFieldSpec: FieldSpec = new FieldSpec(
  FieldType.inheritsFrom,
  "<i>inheritance</i>",
  "InheritsFromField",
  "_text",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
);

export const methodNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.methodName,
  "<i>name</i>",
  "MethodNameField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.methodName(),
);

export const procRefFieldSpec: FieldSpec = new FieldSpec(
  FieldType.procRef,
  "<i>procedureCall</i>",
  "ProcRefField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.term(),
);

export const enumValuesFieldSpec: FieldSpec = new FieldSpec(
  FieldType.enumValues,
  "<i>values</i>",
  "AbstractField",
  "_enumVals",
  false,
  false,
  (parser: PythonParser | RefLangParser) => {
    return parser instanceof PythonParser ? parser.enumList() : parser.identifierList();
  },
);

export const expressionFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.expression(),
);

export const printExpressionFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.expression(),
);

export const assertActualFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>actual (computed) value</i>",
  "AssertActualField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.assertActual(),
);

export const assertExpectedFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>expected value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.assertExpected(),
);

export const assignableFieldSpec: FieldSpec = new FieldSpec(
  FieldType.assignable,
  "<i>variable</i>",
  "AssignableField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.assignable(),
);

export const constantValueFieldSpec: FieldSpec = new FieldSpec(
  FieldType.constantValue,
  "<i>literal</i>",
  "ConstantValueField",
  "_text",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.constantValue(),
);
