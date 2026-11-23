import { LanguageRefLang } from "../../../src/ide/frames/language-ref-lang";
import { testFile } from "../../testHelpers";
import { ignore_test } from "../compiler-test-helpers";

suite("RefLang Demo compile", () => {
  ignore_test("test best-fit", async () => {
    await testFile("best-fit", LanguageRefLang.Instance);
  });

  ignore_test("test binary-search", async () => {
    await testFile("binary-search", LanguageRefLang.Instance);
  });

  ignore_test("test blackjack", async () => {
    await testFile("blackjack", LanguageRefLang.Instance);
  });

  test("test bubbles", async () => {
    await testFile("bubbles", LanguageRefLang.Instance);
  });

  test("test burrow", async () => {
    await testFile("burrow", LanguageRefLang.Instance);
  });

  test("test collatz", async () => {
    await testFile("collatz", LanguageRefLang.Instance);
  });

  ignore_test("test fern", async () => {
    await testFile("fern", LanguageRefLang.Instance);
  });

  ignore_test("test fern-params", async () => {
    // Not high enough value to warrant the long time that this test takes*/
    await testFile("fern-params.elan", LanguageRefLang.Instance);
  });

  test("test in-place-ripple-sort", async () => {
    await testFile("in-place-ripple-sort", LanguageRefLang.Instance);
  });

  ignore_test("test julia-set", async () => {
    await testFile("julia-set", LanguageRefLang.Instance);
  });

  ignore_test("test kaleidoscope", async () => {
    await testFile("kaleidoscope", LanguageRefLang.Instance);
  });

  test("test life", async () => {
    await testFile("life", LanguageRefLang.Instance);
  });

  ignore_test("test life_FP", async () => {
    await testFile("life_FP", LanguageRefLang.Instance);
  });

  ignore_test("test map-filter-reduce", async () => {
    await testFile("map-filter-reduce", LanguageRefLang.Instance);
  });

  ignore_test("test maze-generator", async () => {
    await testFile("maze-generator", LanguageRefLang.Instance);
  });

  ignore_test("test merge-sort", async () => {
    await testFile("merge-sort", LanguageRefLang.Instance);
  });

  ignore_test("test pathfinder", async () => {
    await testFile("pathfinder", LanguageRefLang.Instance);
  });

  ignore_test("test recursive-functions", async () => {
    await testFile("recursive-functions", LanguageRefLang.Instance);
  });

  ignore_test("test roman-numerals-turing-machine.elan", async () => {
    await testFile("roman-numerals-turing-machine", LanguageRefLang.Instance);
  });

  ignore_test("test snake_FP", async () => {
    await testFile("snake_FP", LanguageRefLang.Instance);
  });

  ignore_test("test snake_OOP", async () => {
    await testFile("snake_OOP", LanguageRefLang.Instance);
  });

  test("test snake_PP", async () => {
    await testFile("snake_PP", LanguageRefLang.Instance);
  });

  test("test tower-of-hanoi", async () => {
    await testFile("tower-of-hanoi", LanguageRefLang.Instance);
  });

  test("test tower-of-hanoi-recursive", async () => {
    await testFile("tower-of-hanoi-recursive", LanguageRefLang.Instance);
  });

  test("test turtle-snowflake", async () => {
    await testFile("turtle-snowflake", LanguageRefLang.Instance);
  });

  test("test turtle-spiral", async () => {
    await testFile("turtle-spiral", LanguageRefLang.Instance);
  });

  // Ignored just becasuse these are very slow tests
  ignore_test("test wordle-solver", async () => {
    await testFile("wordle-solver", LanguageRefLang.Instance);
  });

  ignore_test("test hodgepodge", async () => {
    await testFile("hodgepodge", LanguageRefLang.Instance);
  });

  test("test turtle_dragon", async () => {
    await testFile("turtle_dragon", LanguageRefLang.Instance);
  });

  ignore_test("test date-time", async () => {
    await testFile("date-time", LanguageRefLang.Instance);
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
