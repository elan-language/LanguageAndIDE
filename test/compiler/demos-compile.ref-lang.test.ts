import { testElanFile } from "../testHelpers";
import { ignore_test } from "./compiler-test-helpers";

suite("Demo compile", () => {
  ignore_test("test best-fit", async () => {
    await testElanFile("best-fit");
  });

  ignore_test("test binary-search", async () => {
    await testElanFile("binary-search");
  });

  ignore_test("test blackjack", async () => {
    await testElanFile("blackjack");
  });

  ignore_test("test bubbles", async () => {
    await testElanFile("bubbles");
  });

  ignore_test("test burrow", async () => {
    await testElanFile("burrow");
  });

  ignore_test("test collatz", async () => {
    await testElanFile("collatz");
  });

  ignore_test("test fern", async () => {
    await testElanFile("fern");
  });

  ignore_test("test fern-params", async () => {
    // Not high enough value to warrant the long time that this test takes*/
    await testElanFile(`fern-params.elan`);
  });

  ignore_test("test in-place-ripple-sort", async () => {
    await testElanFile("in-place-ripple-sort");
  });

  ignore_test("test julia-set", async () => {
    await testElanFile("julia-set");
  });

  ignore_test("test kaleidoscope", async () => {
    await testElanFile("kaleidoscope");
  });

  ignore_test("test life", async () => {
    await testElanFile("life");
  });

  ignore_test("test life_FP", async () => {
    await testElanFile("life_FP");
  });

  ignore_test("test map-filter-reduce", async () => {
    await testElanFile("map-filter-reduce");
  });

  ignore_test("test maze-generator", async () => {
    await testElanFile("maze-generator");
  });

  ignore_test("test merge-sort", async () => {
    await testElanFile("merge-sort");
  });

  ignore_test("test pathfinder", async () => {
    await testElanFile("pathfinder");
  });

  ignore_test("test recursive-functions", async () => {
    await testElanFile("recursive-functions");
  });

  ignore_test("test roman-numerals-turing-machine.elan", async () => {
    await testElanFile("roman-numerals-turing-machine");
  });

  ignore_test("test snake_FP", async () => {
    await testElanFile("snake_FP");
  });

  ignore_test("test snake_OOP", async () => {
    await testElanFile("snake_OOP");
  });

  ignore_test("test snake_PP", async () => {
    await testElanFile("snake_PP");
  });

  ignore_test("test tower-of-hanoi", async () => {
    await testElanFile("tower-of-hanoi");
  });

  ignore_test("test tower-of-hanoi-recursive", async () => {
    await testElanFile("tower-of-hanoi-recursive");
  });

  ignore_test("test turtle-snowflake", async () => {
    await testElanFile("turtle-snowflake");
  });

  ignore_test("test turtle-spiral", async () => {
    await testElanFile("turtle-spiral");
  });

  // Ignored just becasuse these are very slow tests
  ignore_test("test wordle-solver", async () => {
    await testElanFile("wordle-solver");
  });

  ignore_test("test hodgepodge", async () => {
    await testElanFile("hodgepodge");
  });

  ignore_test("test turtle_dragon", async () => {
    await testElanFile("turtle_dragon");
  });

  ignore_test("test date-time", async () => {
    await testElanFile("date-time");
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
