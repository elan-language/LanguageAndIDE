import { LanguagePython } from "../../../src/ide/frames/language-python";
import { testFile } from "../../testHelpers";
import { ignore_test } from "../compiler-test-helpers";

suite("Python Demo compile", () => {
  ignore_test("test best-fit", async () => {
    await testFile("best-fit", LanguagePython.Instance);
  });

  test("test binary-search", async () => {
    await testFile("binary-search", LanguagePython.Instance);
  });

  ignore_test("test blackjack", async () => {
    await testFile("blackjack", LanguagePython.Instance);
  });

  test("test bubbles", async () => {
    await testFile("bubbles", LanguagePython.Instance);
  });

  test("test burrow", async () => {
    await testFile("burrow", LanguagePython.Instance);
  });

  test("test collatz", async () => {
    await testFile("collatz", LanguagePython.Instance);
  });

  ignore_test("test fern", async () => {
    await testFile("fern", LanguagePython.Instance);
  });

  test("test in-place-ripple-sort", async () => {
    await testFile("in-place-ripple-sort", LanguagePython.Instance);
  });

  ignore_test("test julia-set", async () => {
    await testFile("julia-set", LanguagePython.Instance);
  });

  test("test kaleidoscope", async () => {
    await testFile("kaleidoscope", LanguagePython.Instance);
  });

  test("test life", async () => {
    await testFile("life", LanguagePython.Instance);
  });

  ignore_test("test life_FP", async () => {
    await testFile("life_FP", LanguagePython.Instance);
  });

  ignore_test("test map-filter-reduce", async () => {
    await testFile("map-filter-reduce", LanguagePython.Instance);
  });

  ignore_test("test maze-generator", async () => {
    await testFile("maze-generator", LanguagePython.Instance);
  });

  ignore_test("test merge-sort", async () => {
    await testFile("merge-sort", LanguagePython.Instance);
  });

  ignore_test("test pathfinder", async () => {
    await testFile("pathfinder", LanguagePython.Instance);
  });

  ignore_test("test recursive-functions", async () => {
    await testFile("recursive-functions", LanguagePython.Instance);
  });

  ignore_test("test roman-numerals-turing-machine.elan", async () => {
    await testFile("roman-numerals-turing-machine", LanguagePython.Instance);
  });

  ignore_test("test snake_FP", async () => {
    await testFile("snake_FP", LanguagePython.Instance);
  });

  ignore_test("test snake_OOP", async () => {
    await testFile("snake_OOP", LanguagePython.Instance);
  });

  test("test snake_PP", async () => {
    await testFile("snake_PP", LanguagePython.Instance);
  });

  test("test tower-of-hanoi", async () => {
    await testFile("tower-of-hanoi", LanguagePython.Instance);
  });

  test("test tower-of-hanoi-recursive", async () => {
    await testFile("tower-of-hanoi-recursive", LanguagePython.Instance);
  });

  test("test turtle-snowflake", async () => {
    await testFile("turtle-snowflake", LanguagePython.Instance);
  });

  test("test turtle-spiral", async () => {
    await testFile("turtle-spiral", LanguagePython.Instance);
  });

  // Ignored just becasuse these are very slow tests
  ignore_test("test wordle-solver", async () => {
    await testFile("wordle-solver", LanguagePython.Instance);
  });

  ignore_test("test hodgepodge", async () => {
    await testFile("hodgepodge", LanguagePython.Instance);
  });

  test("test turtle_dragon", async () => {
    await testFile("turtle_dragon", LanguagePython.Instance);
  });

  ignore_test("test date-time", async () => {
    await testFile("date-time", LanguagePython.Instance);
  });

  //Worksheet loaded code
  // test("test blackjack 1", async () => {
  //   await testElanProgram("documentation\\worksheets\\blackjack\\blackjack_1begin.elan`);
  // });
  // test("test blackjack 2", async () => {
  //   await testElanProgram("documentation\\worksheets\\blackjack\\blackjack_2begin.elan`);
  // });
  // test("test wordle 1", async () => {
  //   await testElanProgram("documentation\\worksheets\\wordle\\wordle_1begin.elan`);
  // });
  // test("test wordle 2", async () => {
  //   await testElanProgram("documentation\\worksheets\\wordle\\wordle_2begin.elan`);
  // });
  // test("test wordle 3", async () => {
  //   await testElanProgram("documentation\\worksheets\\wordle\\wordle_3begin.elan`);
  // });
});
