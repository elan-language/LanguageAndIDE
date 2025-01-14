import { Profile } from "./interfaces/profile";
import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
  assertKeyword,
  callKeyword,
  classKeyword,
  commentMarker,
  constantKeyword,
  constructorKeyword,
  doingKeyword,
  eachKeyword,
  elseKeyword,
  enumKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  interfaceKeyword,
  letKeyword,
  mainKeyword,
  matchKeyword,
  otherwiseKeyword,
  printKeyword,
  privateFunctionKeywords,
  privateProcedureKeywords,
  privatePropertyKeywords,
  procedureKeyword,
  propertyKeyword,
  recordKeyword,
  repeatKeyword,
  returnKeyword,
  setKeyword,
  switchKeyword,
  testKeyword,
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
} from "./keywords";

export class DefaultProfile implements Profile {
  name: string = "default profile";
  globals: string[] = [
    mainKeyword,
    procedureKeyword,
    functionKeyword,
    classKeyword,
    abstractKeyword,
    interfaceKeyword,
    recordKeyword,
    constantKeyword,
    enumKeyword,
    testKeyword,
    commentMarker,
  ];
  statements: string[] = [
    assertKeyword,
    callKeyword,
    doingKeyword,
    eachKeyword,
    elseKeyword,
    forKeyword,
    ifKeyword,
    letKeyword,
    matchKeyword,
    otherwiseKeyword,
    printKeyword,
    repeatKeyword,
    returnKeyword,
    setKeyword,
    switchKeyword,
    throwKeyword,
    tryKeyword,
    variableKeyword,
    whileKeyword,
    commentMarker,
  ];
  class_members: string[] = [
    constructorKeyword,
    functionKeyword,
    procedureKeyword,
    propertyKeyword,
    abstractFunctionKeywords,
    abstractProcedureKeywords,
    abstractPropertyKeywords,
    privateFunctionKeywords,
    privateProcedureKeywords,
    privatePropertyKeywords,
    commentMarker,
  ];
  include_profile_name_in_header: boolean = false;
  can_load_only_own_files: boolean = false;
}
