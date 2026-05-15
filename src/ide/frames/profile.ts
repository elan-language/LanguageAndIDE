import {
  abstractFunctionKeywords,
  abstractKeyword,
  abstractProcedureKeywords,
  abstractPropertyKeywords,
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
  throwKeyword,
  tryKeyword,
  variableKeyword,
  whileKeyword,
  withKeyword,
} from "../../compiler/elan-keywords";

export const defaultUsername = "guest";

export class Profile {
  constructor(prof: string) {
    this.name = prof;
    if (prof === "oop") {
      this.globals = this.globals_oop;
      this.members = this.members_oop;
      this.statements = this.statements_oop;
      this.statementsInFunction = this.statementsInFunction_oop;
      this.statementsInTest = this.statementsInTest_oop;
    } else if (prof === "functional") {
      this.globals = this.globals_functional;
      this.members = this.members_functional;
      this.statements = this.statements_functional;
      this.statementsInFunction = this.statementsInFunction_functional;
      this.statementsInTest = this.statementsInTest_functional;
    } else if (prof === "all") {
      this.globals = this.globals_all;
      this.members = this.members_all;
      this.statements = this.statements_all;
      this.statementsInFunction = this.statementsInFunction_all;
      this.statementsInTest = this.statementsInTest_all;
    } else {
      this.globals = this.globals_procedural;
      this.statements = this.statements_procedural;
      this.members = this.members_procedural;
      this.statementsInFunction = this.statementsInFunction_procedural;
      this.statementsInTest = this.statementsInTest_procedural;
    }
  }

  name: string;

  globals: string[] = [];
  statements: string[] = [];
  statementsInFunction: string[] = [];
  statementsInTest: string[] = [];
  members: string[] = [];

  private globals_procedural = [
    mainKeyword,
    "print",
    functionKeyword,
    testKeyword,
    constantKeyword,
    procedureKeyword,
    tryKeyword,
    throwKeyword,
  ];
  private globals_oop = this.globals_procedural.concat([
    classKeyword,
    abstractKeyword,
    interfaceKeyword,
    enumKeyword,
  ]);
  private globals_functional = this.globals_oop;
  private globals_all = this.globals_oop;

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
    callKeyword,
    tryKeyword,
    throwKeyword,
  ];
  private statements_oop = this.statements_procedural;
  private statements_functional = this.statements_procedural.concat([letKeyword]);
  private statements_all = this.statements_functional;

  private statementsInFunction_procedural = [
    variableKeyword,
    setKeyword,
    ifKeyword,
    elifKeyword,
    elseKeyword,
    whileKeyword,
    forKeyword,
    tryKeyword,
    throwKeyword,
  ];
  private statementsInFunction_oop = this.statementsInFunction_procedural;
  private statementsInFunction_functional = [letKeyword];
  private statementsInFunction_all = this.statements_procedural.concat([letKeyword]);

  private statementsInTest_procedural = [assertKeyword, variableKeyword];
  private statementsInTest_oop = this.statementsInTest_procedural;
  private statementsInTest_functional = [assertKeyword, letKeyword];
  private statementsInTest_all = this.statements_procedural.concat([letKeyword]);;

  private members_procedural: string[] = [];
  private members_oop: string[] = [
    functionKeyword,
    procedureKeyword,
    propertyKeyword,
    abstractFunctionKeywords,
    abstractProcedureKeywords,
    abstractPropertyKeywords,
  ];
  private members_functional: string[] = [functionKeyword, propertyKeyword, withKeyword];
  private members_all: string[] = this.members_oop.concat([withKeyword]);
}
