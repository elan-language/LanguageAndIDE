import { ParserRuleContext } from "antlr4ng";
import { PythonParser } from "../../../generated/python/PythonParser";
import { RefLangParser } from "../../../generated/ref-lang/RefLangParser";
import { CodeSource } from "../frame-interfaces/code-source";

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
    public readToDelimiter: (source: CodeSource) => string,
    public initialText: string,
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
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);

export const argListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.argList,
  "<i>arguments</i>",
  "ArgListField", //TODO this should eventually be a list of the argument names obtained from symbol compiler
  "_args",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.argList(),
  (source: CodeSource) => source.readToNonMatchingCloseBracket(),
  "",
);

export const inputArgListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.argList,
  "<i>prompt message</i>",
  "ArgListField",
  "_args",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.argList(),
  (source: CodeSource) => source.readToNonMatchingCloseBracket(),
  "",
);

export const paramListFieldSpec: FieldSpec = new FieldSpec(
  FieldType.paramList,
  "<i>parameter definitions</i>",
  "ParamListField",
  "_params",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.paramList(),
  (source: CodeSource) => source.readToNonMatchingCloseBracket(),
  "",
);

export const identifierFieldSpec: FieldSpec = new FieldSpec(
  FieldType.identifier,
  "<i>name</i>",
  "IdentifierField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.identifierDef(),
  (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/),
  "",
);

export const testNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.identifier,
  "test_name",
  "IdentifierField",
  "_ident",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.testName(),
  (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/),
  "",
);

export const exceptionTypeFieldSpec: FieldSpec = new FieldSpec(
  FieldType.exceptionType,
  "<i>type e.g. ElanRuntimeError or CustomError</i>",
  "TypeField",
  "_type",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
  (source: CodeSource) => source.readUntil(/\s/),
  "CustomError",
);

export const exceptionMessageFieldSpec: FieldSpec = new FieldSpec(
  FieldType.exceptionMessage,
  "<i>message</i>",
  "ExceptionMessageField",
  "_msg",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.errorMessage(),
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);

export const typeNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.typeName,
  "<i>Name</i>",
  "TypeNameField",
  "_type",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
  (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/),
  "",
);

export const commentFieldSpec: FieldSpec = new FieldSpec(
  FieldType.comment,
  "# <i>comment</i>",
  "CommentField",
  "_comment",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.commentText(),
  (source: CodeSource) => source.readToEndOfLine(),
  "", //TODO: needs to start with the comment marker for the language
);

export const inheritsFromFieldSpec: FieldSpec = new FieldSpec(
  FieldType.inheritsFrom,
  "<i>inheritance</i>",
  "InheritsFromField",
  "_text",
  true,
  true,
  (parser: PythonParser | RefLangParser) => parser.typeName(),
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);

export const methodNameFieldSpec: FieldSpec = new FieldSpec(
  FieldType.methodName,
  "<i>name</i>",
  "MethodNameField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.methodName(),
  (source: CodeSource) => source.readUntil(/[^a-zA-Z0-9_]/),
  "",
);

export const procRefFieldSpec: FieldSpec = new FieldSpec(
  FieldType.procRef,
  "<i>procedureName</i>",
  "ProcRefField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.procRef(),
  (source: CodeSource) => source.readUntil(/\(/),
  "",
);

export const enumValuesFieldSpec: FieldSpec = new FieldSpec(
  FieldType.enumValues,
  "<i>values</i>",
  "AbstractField",
  "_enumVals",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.identifierList(),
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);

export const expressionFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.expression(),
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);

export const printExpressionFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.expression(),
  (source: CodeSource) => source.readUntil(/\)\r?\n/),
  "",
);

export const assertActualFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>actual (computed) value</i>",
  "AssertActualField",
  "", // not specified in Field ?
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.assertActual(),
  (source: CodeSource) => source.readUntil(/\sevaluates\sto\s/), // TODO: specific to RefLang
  "",
);

export const assertExpressionFieldSpec: FieldSpec = new FieldSpec(
  FieldType.expression,
  "<i>value or expression</i>",
  "ExpressionField",
  "_expr",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.expression(),
  (source: CodeSource) => source.readUntil(/\r|\n/),
  "",
);

export const assignableFieldSpec: FieldSpec = new FieldSpec(
  FieldType.assignable,
  "<i>variable</i>",
  "AssignableField",
  "_ident",
  true,
  false,
  (parser: PythonParser | RefLangParser) => parser.assignable(),
  (source: CodeSource) => source.readUntil(/\s/), //TODO: needs confirmation
  "",
);

export const constantValueFieldSpec: FieldSpec = new FieldSpec(
  FieldType.constantValue,
  "<i>literal</i>",
  "ConstantValueField",
  "_text",
  false,
  false,
  (parser: PythonParser | RefLangParser) => parser.constantValue(),
  (source: CodeSource) => source.readToEndOfLine(),
  "",
);
