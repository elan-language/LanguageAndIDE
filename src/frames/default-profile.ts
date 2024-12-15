import { Profile } from "./interfaces/profile";
import {
  assertKeyword,
  callKeyword,
  caseKeyword,
  catchingKeyword,
  classKeyword,
  commentMarker,
  constantKeyword,
  defaultKeyword,
  doingKeyword,
  eachKeyword,
  elseKeyword,
  enumKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  letKeyword,
  mainKeyword,
  printKeyword,
  procedureKeyword,
  propertyKeyword,
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
    constantKeyword,
    enumKeyword,
    testKeyword,
    commentMarker,
  ];
  statements: string[] = [
    assertKeyword,
    callKeyword,
    caseKeyword,
    catchingKeyword,
    defaultKeyword,
    doingKeyword,
    eachKeyword,
    elseKeyword,
    forKeyword,
    ifKeyword,
    letKeyword,
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
    functionKeyword,
    procedureKeyword,
    propertyKeyword,
    "abstract function",
    "abstract procedure",
    "abstract property",
    commentMarker,
  ];
  include_profile_name_in_header: boolean = false;
  can_load_only_own_files: boolean = false;
}
