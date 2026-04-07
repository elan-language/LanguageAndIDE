import { ignore_test } from "./compiler/compiler-test-helpers";
import {
  CollapseAll,
  ExpandAll,
  SelectMainById,
  SelectStatementById,
} from "./model-generating-functions";
import { assertEffectOfActionNew, assertGeneratesHtmlSourceAndExportFiles } from "./testHelpers";

suite("Parse source and generate Html", () => {
  test("Test Empty File", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T00_emptyFile.elan`,
      `.\\out\\test\\files\\T00_emptyFile.html`,
    );
  });

  test("Test Hello World", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T01_helloWorld.elan`,
      `.\\out\\test\\files\\T01_helloWorld.html`,
    );
  });

  test("Test Comments", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T02_comments.elan`,
      `.\\out\\test\\files\\T02_comments.html`,
    );
  });

  test("Test Main With All Statements", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T03_mainWithAllStatements.elan`,
      `.\\out\\test\\files\\T03_mainWithAllStatements.html`,
    );
  });

  test("Test All Globals Except Class", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T04_allGlobalsExceptClass.elan`,
      `.\\out\\test\\files\\T04_allGlobalsExceptClass.html`,
    );
  });

  test("Test Classes", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\T05_classes.elan`,
      `.\\out\\test\\files\\T05_classes.html`,
    );
  });

  test("Test Select Main By Id", async () => {
    await assertEffectOfActionNew(
      `.\\out\\test\\files\\T03_mainWithAllStatements.elan`,
      SelectMainById,
      `.\\out\\test\\files\\T07_mainSelected.html`,
    );
  });

  test("Test Select Statement By Id", async () => {
    await assertEffectOfActionNew(
      `.\\out\\test\\files\\T03_mainWithAllStatements.elan`,
      SelectStatementById,
      `.\\out\\test\\files\\T07_statementSelected.html`,
    );
  });

  //-------------------
  test("ExpandAll", async () => {
    await assertEffectOfActionNew(
      `.\\out\\test\\files\\T03_mainWithAllStatements.elan`,
      ExpandAll,
      `.\\out\\test\\files\\T08_expandAll.html`,
    );
  });

  test("CollapseAll", async () => {
    await assertEffectOfActionNew(
      `.\\out\\test\\files\\T03_mainWithAllStatements.elan`,
      CollapseAll,
      `.\\out\\test\\files\\T08_collapseAll.html`,
    );
  });

  test("#702 - last line is a comment", async () => {
    await assertEffectOfActionNew(
      `.\\out\\test\\files\\test702.elan`,
      CollapseAll,
      `.\\out\\test\\files\\test702.html`,
    );
  });

  ignore_test("Test Newline in literal string", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\test1762newlineInString.elan`,
      `.\\out\\test\\files\\test1762newlineInString.html`,
    );
  });
  test("Ghosting", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\ghosted.elan`,
      `.\\out\\test\\files\\ghosted.html`,
    );
  });
  test("Burrow", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\burrow.elan`,
      ``,
      `.\\out\\test\\files\\burrow.py`,
      `.\\out\\test\\files\\burrow.vb`,
      `.\\out\\test\\files\\burrow.cs`,
      `.\\out\\test\\files\\burrow.java`,
    );
  });
  test("Bubbles", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\bubbles.elan`,
      ``,
      `.\\out\\test\\files\\bubbles.py`,
      `.\\out\\test\\files\\bubbles.vb`,
      `.\\out\\test\\files\\bubbles.cs`,
      `.\\out\\test\\files\\bubbles.java`,
    );
  });
  test("Ripple Sort", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\in-place-ripple-sort.elan`,
      ``,
      `.\\out\\test\\files\\in-place-ripple-sort.py`,
      `.\\out\\test\\files\\in-place-ripple-sort.vb`,
      `.\\out\\test\\files\\in-place-ripple-sort.cs`,
      `.\\out\\test\\files\\in-place-ripple-sort.java`,
    );
  });
  test("Binary Search", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\binary-search.elan`,
      ``,
      `.\\out\\test\\files\\binary-search.py`,
      `.\\out\\test\\files\\binary-search.vb`,
      `.\\out\\test\\files\\binary-search.cs`,
      `.\\out\\test\\files\\binary-search.java`,
    );
  });
  test("Collatz", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\collatz.elan`,
      ``,
      `.\\out\\test\\files\\collatz.py`,
      `.\\out\\test\\files\\collatz.vb`,
      `.\\out\\test\\files\\collatz.cs`,
      `.\\out\\test\\files\\collatz.java`,
    );
  });
  ignore_test("Wordle Demo", async () => {
    // ignored only because it is slow for a test due to size
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\wordle-demo.elan`,
      ``,
      `.\\out\\test\\files\\wordle-demo.py`,
      `.\\out\\test\\files\\wordle-demo.vb`,
      `.\\out\\test\\files\\wordle-demo.cs`,
      //`.\\out\\test\\files\\wordle-demo.java`,   Works live, but not in test!
    );
  });
  test("Life", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\life.elan`,
      ``,
      `.\\out\\test\\files\\life.py`,
      `.\\out\\test\\files\\life.vb`,
      `.\\out\\test\\files\\life.cs`,
      `.\\out\\test\\files\\life.java`,
    );
  });
  test("Pathfinder", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\pathfinder.elan`,
      ``,
      `.\\out\\test\\files\\pathfinder.py`,
      `.\\out\\test\\files\\pathfinder.vb`,
      `.\\out\\test\\files\\pathfinder.cs`,
      `.\\out\\test\\files\\pathfinder.java`,
    );
  });
  test("Roman Numerals Turing Machine", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\roman-numerals-turing-machine.elan`,
      ``,
      `.\\out\\test\\files\\roman-numerals-turing-machine.py`,
      `.\\out\\test\\files\\roman-numerals-turing-machine.vb`,
      `.\\out\\test\\files\\roman-numerals-turing-machine.cs`,
      `.\\out\\test\\files\\roman-numerals-turing-machine.java`,
    );
  });
  test("Snake OOP", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `.\\out\\test\\files\\snake-oop.elan`,
      ``,
      `.\\out\\test\\files\\snake-oop.py`,
      `.\\out\\test\\files\\snake-oop.vb`,
      `.\\out\\test\\files\\snake-oop.cs`,
      `.\\out\\test\\files\\snake-oop.java`,
    );
    test("Snake FP", async () => {
      await assertGeneratesHtmlSourceAndExportFiles(
        `.\\out\\test\\files\\snake-fp.elan`,
        ``,
        `.\\out\\test\\files\\snake-fp.py`,
        `.\\out\\test\\files\\snake-fp.vb`,
        `.\\out\\test\\files\\snake-fp.cs`,
        `.\\out\\test\\files\\snake-fp.java`,
      );
    });
    test("Date/Time", async () => {
      await assertGeneratesHtmlSourceAndExportFiles(
        `.\\out\\test\\files\\date-time.elan`,
        ``,
        `.\\out\\test\\files\\date-time.py`,
        `.\\out\\test\\files\\date-time.vb`,
        `.\\out\\test\\files\\date-time.cs`,
        `.\\out\\test\\files\\date-time.java`,
      );
    });
    test("Julia set", async () => {
      await assertGeneratesHtmlSourceAndExportFiles(
        `.\\out\\test\\files\\julia-set.elan`,
        ``,
        `.\\out\\test\\files\\julia-set.py`,
        `.\\out\\test\\files\\julia-set.vb`,
        `.\\out\\test\\files\\julia-set.cs`,
        `.\\out\\test\\files\\julia-set.java`,
      );
    });
  });
});
