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
export const eachKeyword = "each";
export const elifKeyword = "elif";
export const elseKeyword = "else";
export const endKeyword = "end";
export const enumKeyword = "enum";
export const exceptionKeyword = "exception";
export const forKeyword = "for";
export const fromKeyword = "from";
export const functionKeyword = "function";
export const globalKeyword = "global";
export const ifKeyword = "if";
export const inKeyword = "in";
export const inheritsKeyword = "inherits";
export const interfaceKeyword = "interface";
export const isKeyword = "is";
export const isntKeyword = "isnt";
export const lambdaKeyword = "lambda";
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
  eachKeyword,
  elifKeyword,
  elseKeyword,
  endKeyword,
  enumKeyword,
  exceptionKeyword,
  forKeyword,
  fromKeyword,
  functionKeyword,
  globalKeyword,
  ifKeyword,
  inKeyword,
  inheritsKeyword,
  interfaceKeyword,
  isKeyword,
  isntKeyword,
  lambdaKeyword,
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
];

export const ghostedAnnotation = "ghosted";

export const sourceAnnotations = [ghostedAnnotation];
