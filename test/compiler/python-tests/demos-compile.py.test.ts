import { testPythonFile } from "../../testHelpers";
import { ignore_test } from "../compiler-test-helpers";

suite("Python Demo compile", () => {
  ignore_test("test best-fit", async () => {
    await testPythonFile("best-fit");
  });

  ignore_test("test binary-search", async () => {
    await testPythonFile("binary-search");
  });

  ignore_test("test blackjack", async () => {
    await testPythonFile("blackjack");
  });

  ignore_test("test bubbles", async () => {
    await testPythonFile("bubbles");
  });

  ignore_test("test burrow", async () => {
    await testPythonFile("burrow");
  });

  ignore_test("test collatz", async () => {
    await testPythonFile("collatz");
  });

  ignore_test("test fern", async () => {
    await testPythonFile("fern");
  });

  ignore_test("test fern-params", async () => {
    // Not high enough value to warrant the long time that this test takes*/
    await testPythonFile(`fern-params.elan`);
  });

  ignore_test("test in-place-ripple-sort", async () => {
    await testPythonFile("in-place-ripple-sort");
  });

  ignore_test("test julia-set", async () => {
    await testPythonFile("julia-set");
  });

  ignore_test("test kaleidoscope", async () => {
    await testPythonFile("kaleidoscope");
  });

  ignore_test("test life", async () => {
    await testPythonFile("life");
  });

  ignore_test("test life_FP", async () => {
    await testPythonFile("life_FP");
  });

  ignore_test("test map-filter-reduce", async () => {
    await testPythonFile("map-filter-reduce");
  });

  ignore_test("test maze-generator", async () => {
    await testPythonFile("maze-generator");
  });

  ignore_test("test merge-sort", async () => {
    await testPythonFile("merge-sort");
  });

  ignore_test("test pathfinder", async () => {
    await testPythonFile("pathfinder");
  });

  ignore_test("test recursive-functions", async () => {
    await testPythonFile("recursive-functions");
  });

  ignore_test("test roman-numerals-turing-machine.elan", async () => {
    await testPythonFile("roman-numerals-turing-machine");
  });

  ignore_test("test snake_FP", async () => {
    await testPythonFile("snake_FP");
  });

  ignore_test("test snake_OOP", async () => {
    await testPythonFile("snake_OOP");
  });

  ignore_test("test snake_PP", async () => {
    await testPythonFile("snake_PP");
  });

  ignore_test("test tower-of-hanoi", async () => {
    await testPythonFile("tower-of-hanoi");
  });

  ignore_test("test tower-of-hanoi-recursive", async () => {
    await testPythonFile("tower-of-hanoi-recursive");
  });

  ignore_test("test turtle-snowflake", async () => {
    await testPythonFile("turtle-snowflake");
  });

  ignore_test("test turtle-spiral", async () => {
    await testPythonFile("turtle-spiral");
  });

  // Ignored just becasuse these are very slow tests
  ignore_test("test wordle-solver", async () => {
    await testPythonFile("wordle-solver");
  });

  ignore_test("test hodgepodge", async () => {
    await testPythonFile("hodgepodge");
  });

  ignore_test("test turtle_dragon", async () => {
    await testPythonFile("turtle_dragon");
  });

  ignore_test("test date-time", async () => {
    await testPythonFile("date-time");
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
