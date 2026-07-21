// Elan source keywords
export const abstractKeyword = "abstract";
export const andKeyword = "and";
export const asKeyword = "as";
export const assertKeyword = "assert";
export const assignKeyword = "assign";
export const beKeyword = "be";
export const callKeyword = "call";
export const catchKeyword = "catch";
export const classKeyword = "class";
export const constantKeyword = "constant";
export const constructorKeyword = "constructor";
export const copyKeyword = "copy";
export const elifKeyword = "elif";
export const elseKeyword = "else";
export const endKeyword = "end";
export const enumKeyword = "enum";
export const evaluatesKeyword = "evaluates";
export const forKeyword = "for";
export const fromKeyword = "from";
export const functionKeyword = "function";
export const ifKeyword = "if";
export const inKeyword = "in";
export const inheritsKeyword = "inherits";
export const inputKeyword = "input";
export const interfaceKeyword = "interface";
export const isKeyword = "is";
export const isntKeyword = "isnt";
export const lambdaKeyword = "lambda";
export const letKeyword = "let";
export const mainKeyword = "main";
export const modKeyword = "mod";
export const newKeyword = "new";
export const notKeyword = "not";
export const ofKeyword = "of";
export const orKeyword = "or";
export const printKeyword = "print";
export const privateKeyword = "private";
export const procedureKeyword = "procedure";
export const propertyKeyword = "property";
export const powKeyword = "pow";
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

const elanKeywords: string[] = [
  abstractKeyword,
  andKeyword,
  asKeyword,
  assertKeyword,
  assignKeyword,
  beKeyword,
  callKeyword,
  catchKeyword,
  classKeyword,
  constantKeyword,
  constructorKeyword,
  copyKeyword,
  elifKeyword,
  elseKeyword,
  evaluatesKeyword,
  endKeyword,
  enumKeyword,
  forKeyword,
  fromKeyword,
  functionKeyword,
  ifKeyword,
  inKeyword,
  inheritsKeyword,
  inputKeyword,
  interfaceKeyword,
  isKeyword,
  isntKeyword,
  lambdaKeyword,
  letKeyword,
  mainKeyword,
  modKeyword,
  newKeyword,
  notKeyword,
  ofKeyword,
  orKeyword,
  printKeyword,
  privateKeyword,
  procedureKeyword,
  propertyKeyword,
  powKeyword,
  assignKeyword,
  returnKeyword,
  returnsKeyword,
  stepKeyword,
  stepKeyword,
  testKeyword,
  thenKeyword,
  thisKeyword,
  throwKeyword,
  toKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
];

export const ghostedAnnotation = "ghosted";

export const sourceAnnotations = [ghostedAnnotation];
