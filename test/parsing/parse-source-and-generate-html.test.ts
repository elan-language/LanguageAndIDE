import { assertGeneratesHtmlSourceAndExportFiles } from "../testHelpers";

suite("Parse source and generate Html", () => {
  test("Burrow", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/burrow.elan`,
      ``,
      `./out/test/files/burrow.py`,
      `./out/test/files/burrow.vb`,
      `./out/test/files/burrow.cs`,
      `./out/test/files/burrow.java`,
    );
  });
  test("Bubbles", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/bubbles.elan`,
      ``,
      `./out/test/files/bubbles.py`,
      `./out/test/files/bubbles.vb`,
      `./out/test/files/bubbles.cs`,
      `./out/test/files/bubbles.java`,
    );
  });
  test("Ripple Sort", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/in-place-ripple-sort.elan`,
      ``,
      `./out/test/files/in-place-ripple-sort.py`,
      `./out/test/files/in-place-ripple-sort.vb`,
      `./out/test/files/in-place-ripple-sort.cs`,
      `./out/test/files/in-place-ripple-sort.java`,
    );
  });
  test("Binary Search", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/binary-search.elan`,
      ``,
      `./out/test/files/binary-search.py`,
      `./out/test/files/binary-search.vb`,
      `./out/test/files/binary-search.cs`,
      `./out/test/files/binary-search.java`,
    );
  });
  test("Collatz", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/collatz.elan`,
      ``,
      `./out/test/files/collatz.py`,
      `./out/test/files/collatz.vb`,
      `./out/test/files/collatz.cs`,
      `./out/test/files/collatz.java`,
    );
  });
  test("Life", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/life.elan`,
      ``,
      `./out/test/files/life.py`,
      `./out/test/files/life.vb`,
      `./out/test/files/life.cs`,
      `./out/test/files/life.java`,
    );
  });
  test("Pathfinder", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/pathfinder.elan`,
      ``,
      `./out/test/files/pathfinder.py`,
      `./out/test/files/pathfinder.vb`,
      `./out/test/files/pathfinder.cs`,
      `./out/test/files/pathfinder.java`,
    );
  });
  test("Roman Numerals Turing Machine", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/roman-numerals-turing-machine.elan`,
      ``,
      `./out/test/files/roman-numerals-turing-machine.py`,
      `./out/test/files/roman-numerals-turing-machine.vb`,
      `./out/test/files/roman-numerals-turing-machine.cs`,
      `./out/test/files/roman-numerals-turing-machine.java`,
    );
  });
  test("Snake OOP", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/snake-OOP.elan`,
      ``,
      `./out/test/files/snake-OOP.py`,
      `./out/test/files/snake-OOP.vb`,
      `./out/test/files/snake-OOP.cs`,
      `./out/test/files/snake-OOP.java`,
    );
  });
  test("Snake FP", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/snake_FP.elan`,
      ``,
      `./out/test/files/snake_FP.py`,
      `./out/test/files/snake_FP.vb`,
      `./out/test/files/snake_FP.cs`,
      `./out/test/files/snake_FP.java`,
    );
  });
  test("Date/Time", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/date-time.elan`,
      ``,
      `./out/test/files/date-time.py`,
      `./out/test/files/date-time.vb`,
      `./out/test/files/date-time.cs`,
      `./out/test/files/date-time.java`,
    );
  });
  test("Julia set", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/julia-set.elan`,
      ``,
      `./out/test/files/julia-set.py`,
      `./out/test/files/julia-set.vb`,
      `./out/test/files/julia-set.cs`,
      `./out/test/files/julia-set.java`,
    );
  });
  test("Life_FP", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/life_FP.elan`,
      ``,
      `./out/test/files/life_FP.py`,
      `./out/test/files/life_FP.vb`,
      `./out/test/files/life_FP.cs`,
      `./out/test/files/life_FP.java`,
    );
  });
  test("Fern", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/fern.elan`,
      ``,
      `./out/test/files/fern.py`,
      `./out/test/files/fern.vb`,
      `./out/test/files/fern.cs`,
      `./out/test/files/fern.java`,
    );
  });
  test("Wordle Solver", async () => {
    await assertGeneratesHtmlSourceAndExportFiles(
      `./out/test/files/wordle-solver.elan`,
      ``,
      `./out/test/files/wordle-solver.py`,
      `./out/test/files/wordle-solver.vb`,
      `./out/test/files/wordle-solver.cs`,
      `./out/test/files/wordle-solver.java`,
    );
  });
});
