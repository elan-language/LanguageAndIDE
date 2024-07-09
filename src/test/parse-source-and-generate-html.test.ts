import * as vscode from "vscode";
import {
  CollapseAll,
  ExpandAll,
  SelectMainById,
  SelectStatementById,
} from "./model-generating-functions.";
import { assertEffectOfActionNew, assertGeneratesHtmlandSameSource } from "./testHelpers";

suite("Parse source and generate Html", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Test Empty File", async () => {
    await assertGeneratesHtmlandSameSource("T00_emptyFile.elan", "T00_emptyFile.html");
  });

  test("Test Hello World", async () => {
    await assertGeneratesHtmlandSameSource("T01_helloWorld.elan", "T01_helloWorld.html");
  });

  test("Test Comments", async () => {
    await assertGeneratesHtmlandSameSource("T02_comments.elan", "T02_comments.html");
  });

  test("Test Main With All Statements", async () => {
    await assertGeneratesHtmlandSameSource(
      "T03_mainWithAllStatements.elan",
      "T03_mainWithAllStatements.html",
    );
  });

  test("Test All Globals Except Class", async () => {
    await assertGeneratesHtmlandSameSource(
      "T04_allGlobalsExceptClass.elan",
      "T04_allGlobalsExceptClass.html",
    );
  });

  test("Test Classes", async () => {
    await assertGeneratesHtmlandSameSource("T05_classes.elan", "T05_classes.html");
  });

  test("Test Select Main By Id", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      SelectMainById,
      `${__dirname}\\files\\T07_mainSelected.html`,
    );
  });

  test("Test Select Statement By Id", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      SelectStatementById,
      `${__dirname}\\files\\T07_statementSelected.html`,
    );
  });

  //-------------------
  test("ExpandAll", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      ExpandAll,
      `${__dirname}\\files\\T08_expandAll.html`,
    );
  });

  test("CollapseAll", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      CollapseAll,
      `${__dirname}\\files\\T08_collapseAll.html`,
    );
  });
});
