import {
  abstractKeyword,
  assertKeyword,
  callKeyword,
  classKeyword,
  constantKeyword,
  elifKeyword,
  elseKeyword,
  enumKeyword,
  forKeyword,
  functionKeyword,
  ifKeyword,
  interfaceKeyword,
  letKeyword,
  mainKeyword,
  procedureKeyword,
  propertyKeyword,
  setKeyword,
  testKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
} from "../../compiler/elan-keywords";

export const defaultUsername = "guest";

export class Profile {
  constructor(prof: string) {
    if (prof === "oop") {
      this.globals = this.globals_oop;
      this.members = this.members_oop;
      this.statements = this.statements_oop;
      this.statementsInFunction = this.statementsInFunction_oop;
    } else if (prof === "functional") {
      this.globals = this.globals_functional;
      this.members = this.members_functional;
      this.statements = this.statements_functional;
      this.statementsInFunction = this.statementsInFunction_functional;
    } else {
      this.globals = this.globals_procedural;
      this.statements = this.statements_procedural;
      this.members = this.members_procedural;
      this.statementsInFunction = this.statementsInFunction_procedural;
    }
  }

  globals: string[] = [];
  statements: string[] = [];
  statementsInFunction: string[] = [];
  members: string[] = [];

  private globals_procedural = [mainKeyword, "print", functionKeyword, testKeyword, constantKeyword, procedureKeyword];
  private globals_oop = this.globals_procedural.concat([classKeyword, abstractKeyword, interfaceKeyword, enumKeyword]);
  private globals_functional = this.globals_oop;

  private statements_procedural = [
    assertKeyword,
    "print", 
    variableKeyword, 
    setKeyword, 
    ifKeyword,
    elifKeyword,
    elseKeyword,
    whileKeyword,
    forKeyword,
    callKeyword
  ];
  private statements_oop = this.statements_procedural;
  private statements_functional = this.statements_procedural.concat([letKeyword]);

  private statementsInFunction_procedural = [
    variableKeyword, 
    setKeyword, 
    ifKeyword,
    elifKeyword,
    elseKeyword,
    whileKeyword,
    forKeyword,
  ];
  private statementsInFunction_oop = this.statementsInFunction_procedural;
  private statementsInFunction_functional = [letKeyword];
  
  private members_procedural: string[] = [];
  private members_oop: string[] = [
    functionKeyword,
    procedureKeyword,
    propertyKeyword,
  ];
  private members_functional: string[] = [
    functionKeyword,
    propertyKeyword,
    withKeyword
  ];
}
