import { ignore_test } from "./compiler/compiler-test-helpers";
import {
  CollapseAll,
  ExpandAll,
  SelectMainById,
  SelectStatementById,
} from "./model-generating-functions.";
import { assertEffectOfActionNew, assertGeneratesHtmlandSameSourceNew } from "./testHelpers";

suite("Parse source and generate Html", () => {
  ignore_test("Test Empty File", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T00_emptyFile.elan`,
      `${__dirname}\\files\\T00_emptyFile.html`,
    );
  });

  ignore_test("Test Hello World", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T01_helloWorld.elan`,
      `${__dirname}\\files\\T01_helloWorld.html`,
    );
  });

  ignore_test("Test Comments", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T02_comments.elan`,
      `${__dirname}\\files\\T02_comments.html`,
    );
  });

  ignore_test("Test Main With All Statements", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      `${__dirname}\\files\\T03_mainWithAllStatements.html`,
    );
  });

  ignore_test("Test All Globals Except Class", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T04_allGlobalsExceptClass.elan`,
      `${__dirname}\\files\\T04_allGlobalsExceptClass.html`,
    );
  });

  ignore_test("Test Classes", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T05_classes.elan`,
      `${__dirname}\\files\\T05_classes.html`,
    );
  });

  ignore_test("Test Select Main By Id", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      SelectMainById,
      `${__dirname}\\files\\T07_mainSelected.html`,
    );
  });

  ignore_test("Test Select Statement By Id", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      SelectStatementById,
      `${__dirname}\\files\\T07_statementSelected.html`,
    );
  });

  //-------------------
  ignore_test("ExpandAll", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      ExpandAll,
      `${__dirname}\\files\\T08_expandAll.html`,
    );
  });

  ignore_test("CollapseAll", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      CollapseAll,
      `${__dirname}\\files\\T08_collapseAll.html`,
    );
  });
});
