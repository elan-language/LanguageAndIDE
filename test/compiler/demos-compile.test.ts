import { testElanFile } from "../testHelpers";
import { ignore_test } from "./compiler-test-helpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    await testElanFile("best-fit");
  });

  test("test binary-search", async () => {
    await testElanFile("binary-search");
  });

  test("test bubbles", async () => {
    await testElanFile("bubbles");
  });

  test("test burrow", async () => {
    await testElanFile("burrow");
  });

  test("test collatz", async () => {
    await testElanFile("collatz");
  });

  test("test fern", async () => {
    await testElanFile("fern");
  });

 ignore_test("test fern-params", async () => { // Not high enough value to warrant the long time that this test takes*/
    await testElanFile(`fern-params.elan`);
  }); 

  test("test in-place-ripple-sort", async () => {
    await testElanFile("in-place-ripple-sort");
  });

  test("test julia-set", async () => {
    await testElanFile("julia-set");
  });

  test("test kaleidoscope", async () => {
    await testElanFile("kaleidoscope");
  });

  test("test life", async () => {
    await testElanFile("life");
  });

  test("test life_FP", async () => {
    await testElanFile("life_FP");
  });

  test("test map-filter-reduce", async () => {
    await testElanFile("map-filter-reduce");
  });

  test("test maze-generator", async () => {
    await testElanFile("maze-generator");
  });

  test("test merge-sort", async () => {
    await testElanFile("merge-sort");
  });

  test("test password-generator", async () => {
    await testElanFile("password-generator");
  });

  test("test pathfinder", async () => {
    await testElanFile("pathfinder");
  });

  test("test recursive-functions", async () => {
    await testElanFile("recursive-functions");
  });

  test("test roman-numerals-turing-machine.elan", async () => {
    await testElanFile("roman-numerals-turing-machine");
  });

  test("test snake_FP", async () => {
    await testElanFile("snake_FP");
  });

  test("test snake_OOP", async () => {
    await testElanFile("snake_OOP");
  });

  test("test snake_PP", async () => {
    await testElanFile("snake_PP");
  });

  test("test turtle-snowflake", async () => {
    await testElanFile("turtle-snowflake");
  });

  test("test turtle-spiral", async () => {
    await testElanFile("turtle-spiral");
  });

  // Ignored just becasuse these are very slow tests
  test("test wordle-solver", async () => {
    await testElanFile("wordle-solver");
  });

  test("test hodgepodge", async () => {
    await testElanFile("hodgepodge");
  });

  test("test turtle_dragon", async () => {
    await testElanFile("turtle_dragon");
  });

  test("test date-time", async () => {
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
