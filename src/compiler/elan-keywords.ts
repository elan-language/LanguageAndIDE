// Elan source keywords
export const abstractKeyword = "abstract";
export const andKeyword = "and";
export const asKeyword = "as";
export const assertKeyword = "assert";
export const beKeyword = "be";
export const callKeyword = "call";
export const catchKeyword = "catch";
export const classKeyword = "class";
export const constantKeyword = "constant";
export const constructorKeyword = "constructor";
export const copyKeyword = "copy";
export const divKeyword = "div";
export const eachKeyword = "each";
export const elifKeyword = "elif";
export const elseKeyword = "else";
export const emptyKeyword = "empty";
export const endKeyword = "end";
export const enumKeyword = "enum";
export const exceptionKeyword = "exception";
export const forKeyword = "for";
export const fromKeyword = "from";
export const functionKeyword = "function";
export const globalKeyword = "global";
export const ifKeyword = "if";
export const imageKeyword = "image";
export const importKeyword = "import";
export const inKeyword = "in";
export const inheritsKeyword = "inherits";
export const interfaceKeyword = "interface";
export const isKeyword = "is";
export const isntKeyword = "isnt";
export const lambdaKeyword = "lambda";
export const letKeyword = "let";
export const libraryKeyword = "library";
export const mainKeyword = "main";
export const modKeyword = "mod";
export const newKeyword = "new";
export const notKeyword = "not";
export const ofKeyword = "of";
export const orKeyword = "or";
export const privateKeyword = "private";
export const procedureKeyword = "procedure";
export const propertyKeyword = "property";
export const recordKeyword = "record";
export const refKeyword = "ref";
export const returnKeyword = "return";
export const returnsKeyword = "returns";
export const setKeyword = "set";
export const stepKeyword = "step";
export const testKeyword = "test";
export const thenKeyword = "then";
export const thisKeyword = "this";
export const throwKeyword = "throw";
export const toKeyword = "to";
export const tryKeyword = "try";
export const tupleKeyword = "tuple";
export const variableKeyword = "variable";
export const whileKeyword = "while";
export const withKeyword = "with";

//Not added to allKeywords
export const abstractPropertyKeywords = abstractKeyword + " " + propertyKeyword;
export const abstractProcedureKeywords = abstractKeyword + " " + procedureKeyword;
export const abstractFunctionKeywords = abstractKeyword + " " + functionKeyword;
export const privatePropertyKeywords = privateKeyword + " " + propertyKeyword;
export const privateProcedureKeywords = privateKeyword + " " + procedureKeyword;
export const privateFunctionKeywords = privateKeyword + " " + functionKeyword;
export const abstractClassKeywords = abstractKeyword + " " + classKeyword;

export const commentMarker = "#";

export function matchesElanKeyword(target: string): boolean {
  return elanKeywords.includes(target);
}

export function allElanKeywordsUC(): Set<string> {
  const kws = new Set<string>();
  elanKeywords.forEach((item) => kws.add(item.toUpperCase()));
  elanReservedWords.forEach((item) => kws.add(item.toUpperCase()));
  return kws;
}

const elanKeywords: string[] = [
  abstractKeyword,
  andKeyword,
  asKeyword,
  assertKeyword,
  beKeyword,
  callKeyword,
  catchKeyword,
  classKeyword,
  constantKeyword,
  constructorKeyword,
  copyKeyword,
  divKeyword,
  eachKeyword,
  elifKeyword,
  elseKeyword,
  emptyKeyword,
  endKeyword,
  enumKeyword,
  exceptionKeyword,
  forKeyword,
  fromKeyword,
  functionKeyword,
  globalKeyword,
  ifKeyword,
  imageKeyword,
  importKeyword,
  inKeyword,
  inheritsKeyword,
  interfaceKeyword,
  isKeyword,
  isntKeyword,
  lambdaKeyword,
  letKeyword,
  libraryKeyword,
  mainKeyword,
  modKeyword,
  newKeyword,
  notKeyword,
  ofKeyword,
  orKeyword,
  privateKeyword,
  procedureKeyword,
  propertyKeyword,
  recordKeyword,
  refKeyword,
  returnKeyword,
  returnsKeyword,
  setKeyword,
  stepKeyword,
  testKeyword,
  thenKeyword,
  thisKeyword,
  throwKeyword,
  toKeyword,
  tryKeyword,
  tupleKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
];

const elanReservedWords = [
  "action",
  "arguments",
  "array",
  "async",
  "await",
  "boolean",
  "break",
  "by",
  "byte",
  "case",
  "catch",
  "char",
  "const",
  "continue",
  "curry",
  "debugger",
  "default",
  "delete",
  "dictionary",
  "do",
  "double",
  "eval",
  "export",
  "extends",
  "final",
  "finally",
  "float",
  "goto",
  "implements",
  "instanceof",
  "int",
  "into",
  "list",
  "long",
  "match",
  "mock",
  "namespace",
  "native",
  "null",
  "on",
  "optional",
  "otherwise",
  "package",
  "partial",
  "pattern",
  "protected",
  "public",
  "scenario",
  "short",
  "static",
  "stdlib", // Used for injected property
  "string",
  "super",
  "switch",
  "system",
  "synchronized",
  "throws",
  "transient",
  "typeof",
  "void",
  "volatile",
  "var",
  "when",
  "yield",
];

export const ghostedAnnotation = "ghosted";

export const sourceAnnotations = [ghostedAnnotation];
