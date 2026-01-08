import {
  CollapseAll,
  ExpandAll,
  SelectMainById,
  SelectStatementById,
} from "./model-generating-functions";
import { assertEffectOfActionNew, assertGeneratesHtmlandSameSourceNew } from "./testHelpers";

suite("Parse source and generate Html", () => {
  test("Test Empty File", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T00_emptyFile.elan`,
      `${__dirname}\\files\\T00_emptyFile.html`,
    );
  });

  test("Test Hello World", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T01_helloWorld.elan`,
      `${__dirname}\\files\\T01_helloWorld.html`,
    );
  });

  test("Test Comments", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T02_comments.elan`,
      `${__dirname}\\files\\T02_comments.html`,
    );
  });

  test("Test Main With All Statements", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T03_mainWithAllStatements.elan`,
      `${__dirname}\\files\\T03_mainWithAllStatements.html`,
    );
  });

  test("Test All Globals Except Class", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T04_allGlobalsExceptClass.elan`,
      `${__dirname}\\files\\T04_allGlobalsExceptClass.html`,
    );
  });

  test("Test Classes", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\T05_classes.elan`,
      `${__dirname}\\files\\T05_classes.html`,
    );
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

  test("#702 - last line is a comment", async () => {
    await assertEffectOfActionNew(
      `${__dirname}\\files\\test702.elan`,
      CollapseAll,
      `${__dirname}\\files\\test702.html`,
    );
  });

  test("Test Newline in literal string", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\test1762newlineInString.elan`,
      `${__dirname}\\files\\test1762newlineInString.html`,
    );
  });
  test("Ghosting", async () => {
    await assertGeneratesHtmlandSameSourceNew(
      `${__dirname}\\files\\ghosted.elan`,
      `${__dirname}\\files\\ghosted.html`,
    );
  });
});
