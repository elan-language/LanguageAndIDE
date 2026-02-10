import { testElanProgram } from "./testHelpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    await testElanProgram("demo_programs\\best-fit.elan");
  });
  test("test binary-search", async () => {
    await testElanProgram("demo_programs\\binary-search.elan");
  });
  test("test bubbles", async () => {
    await testElanProgram("demo_programs\\bubbles.elan");
  });
  test("test burrow", async () => {
    await testElanProgram("demo_programs\\burrow.elan");
  });
  test("test collatz", async () => {
    await testElanProgram("demo_programs\\collatz.elan");
  });
  test("test fern", async () => {
    await testElanProgram("demo_programs\\fern.elan");
  });
  test("test fern-params", async () => {
    await testElanProgram("demo_programs\\fern-params.elan");
  });
  test("test in-place-ripple-sort", async () => {
    await testElanProgram("demo_programs\\in-place-ripple-sort.elan");
  });
  test("test julia-set", async () => {
    await testElanProgram("demo_programs\\julia-set.elan");
  });
  test("test kaleidoscope", async () => {
    await testElanProgram("demo_programs\\kaleidoscope.elan");
  });
  test("test life", async () => {
    await testElanProgram("demo_programs\\life.elan");
  });
  test("test maze-generator", async () => {
    await testElanProgram("demo_programs\\maze-generator.elan");
  });
  test("test password-generator", async () => {
    await testElanProgram("demo_programs\\password-generator.elan");
  });
  test("test pathfinder", async () => {
    await testElanProgram("demo_programs\\pathfinder.elan");
  });
  test("test roman-numerals-turing-machine.elan", async () => {
    await testElanProgram("demo_programs\\roman-numerals-turing-machine.elan");
  });
  /*   test("test snake_FP", async () => {
    await testElanProgram("demo_programs\\snake_FP.elan");
  }); */
  test("test snake_OOP", async () => {
    await testElanProgram("demo_programs\\snake_OOP.elan");
  });
  test("test snake_PP", async () => {
    await testElanProgram("demo_programs\\snake_PP.elan");
  });
  test("test turtle-snowflake", async () => {
    await testElanProgram("demo_programs\\turtle-snowflake.elan");
  });
  test("test turtle-spiral", async () => {
    await testElanProgram("demo_programs\\turtle-spiral.elan");
  });
  test("test wordle-solver", async () => {
    await testElanProgram("demo_programs\\wordle-solver.elan");
  });
  test("test wordle-demo", async () => {
    await testElanProgram("demo_programs\\wordle-demo.elan");
  });
  test("test hodgepodge", async () => {
    await testElanProgram("demo_programs\\hodgepodge.elan");
  });
  test("test turtle_dragon", async () => {
    await testElanProgram("demo_programs\\turtle_dragon.elan");
  });
  test("test date-time", async () => {
    await testElanProgram("demo_programs\\date-time.elan");
  });
  //Worksheet loaded code
  test("test blackjack 1", async () => {
    await testElanProgram("documentation\\worksheets\\blackjack\\blackjack_1begin.elan");
  });
  test("test blackjack 2", async () => {
    await testElanProgram("documentation\\worksheets\\blackjack\\blackjack_2begin.elan");
  });
  test("test wordle 1", async () => {
    await testElanProgram("documentation\\worksheets\\wordle\\wordle_1begin.elan");
  });
  test("test wordle 2", async () => {
    await testElanProgram("documentation\\worksheets\\wordle\\wordle_2begin.elan");
  });
  test("test wordle 3", async () => {
    await testElanProgram("documentation\\worksheets\\wordle\\wordle_3begin.elan");
  });
});
