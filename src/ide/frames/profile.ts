import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
  assertKeyword,
  callKeyword,
  catchKeyword,
  classKeyword,
  constantKeyword,
  constructorKeyword,
  elifKeyword,
  elseKeyword,
  enumKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  interfaceKeyword,
  mainKeyword,
  procedureKeyword,
  propertyKeyword,
  setKeyword,
  testKeyword,
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
} from "../../compiler/elan-keywords";

export const defaultUsername = "guest";

export class Profile {
  constructor(prof: string) {
    if (prof === "1.0") {
      this.globals = this.globals1_0;
      this.statements = this.statements1_0;
    } else if (prof === "1.1") {
      this.globals = this.globals1_1;
      this.statements = this.statements1_1;
    } else if (prof === "1.2") {
      this.globals = this.globals1_2;
      this.statements = this.statements1_2;
    } else if (prof === "1.3") {
      this.globals = this.globals1_3;
      this.statements = this.statements1_3;
    } else if (prof === "1.4") {
      this.globals = this.globals1_4;
      this.statements = this.statements1_4;
    } else if (prof === "2.0") {
      this.globals = this.globals2_0;
      this.statements = this.statements2_0;
      this.class_members = this.class_members2_0;
    } else if (prof === "2.1") {
      this.globals = this.globals2_1;
      this.statements = this.statements2_1;
      this.class_members = this.class_members2_1;
    } else if (prof === "2.2") {
      this.globals = this.globals2_2;
      this.statements = this.statements2_2;
      this.class_members = this.class_members2_2;
    } else {
      this.globals = this.globals3_0;
      this.statements = this.statements3_0;
      this.class_members = this.class_members3_0;
    }
  }

  globals: string[] = [];
  statements: string[] = [];
  class_members: string[] = [];

  private globals1_0 = ["print", mainKeyword];
  private globals1_1 = this.globals1_0;
  private globals1_2 = this.globals1_0.concat([functionKeyword, testKeyword, constantKeyword]);
  private globals1_3 = this.globals1_2.concat([procedureKeyword]);
  private globals1_4 = this.globals1_3.concat([enumKeyword]);
  private globals2_0 = this.globals1_4.concat([classKeyword]);
  private globals2_1 = this.globals2_0.concat([abstractKeyword]);
  private globals2_2 = this.globals2_1.concat([interfaceKeyword]);
  private globals3_0 = this.globals2_2;

  private statements1_0 = ["print", constantKeyword, variableKeyword, setKeyword];
  private statements1_1 = this.statements1_0.concat([ifKeyword, elifKeyword, elseKeyword, whileKeyword, forKeyword, callKeyword]);
  private statements1_2 = [assertKeyword].concat(this.statements1_1); // to put assert at front, (shown only when within a test)
  private statements1_3 = this.statements1_2;
  private statements1_4 = this.statements1_3.concat([tryKeyword, catchKeyword, throwKeyword]);
  private statements2_0 = this.statements1_4;
  private statements2_1 = this.statements2_0;
  private statements2_2 = this.statements2_1;
  private statements3_0 = this.statements2_0;  // TODO add 'with' frame when implemented

  private class_members2_0: string[] = [
    constructorKeyword, // Can be removed when it is added to template
    functionKeyword,
    procedureKeyword,
    propertyKeyword,
  ];
  private class_members2_1: string[] = this.class_members2_0.concat(
    [abstractFunctionKeywords,
    abstractProcedureKeywords,
    abstractPropertyKeywords,]);

  private class_members2_2 = this.class_members2_1;

  private class_members3_0 = this.class_members2_2;
  
  name: string = "default_profile";
  require_log_on: boolean = false;
  can_load_only_own_files: boolean = false;
  show_user_and_profile: boolean = false;
}
