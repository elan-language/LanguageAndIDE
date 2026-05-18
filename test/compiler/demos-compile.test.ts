import {
  assertExportsAll,
  assertGeneratesHtml,
  assertGeneratesSameElanSource,
  assertParsesAndCompilesAndTests,
  getFile,
} from "../testHelpers";
import { ignore_test } from "./compiler-test-helpers";

suite("Demo compile", () => {
  test("test best-fit", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("best-fit");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test binary-search", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("binary-search");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test bubbles", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("bubbles");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test burrow", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("burrow");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test collatz", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("collatz");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test fern", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("fern");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  /*   test("test fern-params", async () => {
    await testElanProgram(`./out/test/demo_programs/fern-params.elan`);
  }); Not high enough value to warrant the long time that this test takes*/

  test("test in-place-ripple-sort", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("in-place-ripple-sort");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test julia-set", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("julia-set");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test kaleidoscope", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("kaleidoscope");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test life", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("life");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test life_FP", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("life_FP");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test maze-generator", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("maze-generator");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test password-generator", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("password-generator");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test pathfinder", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("pathfinder");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test roman-numerals-turing-machine.elan", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("roman-numerals-turing-machine");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test snake_FP", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("snake_FP");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test snake_OOP", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("snake_OOP");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test snake_PP", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("snake_PP");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test turtle-snowflake", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("turtle-snowflake");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test turtle-spiral", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("turtle-spiral");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  // Ignored just becasuse these are very slow tests
  ignore_test("test wordle-solver", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("wordle-solver");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  ignore_test("test wordle-demo", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("wordle-demo");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test hodgepodge", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("hodgepodge");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test turtle_dragon", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("turtle_dragon");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
  });

  test("test date-time", async () => {
    const [fl, source, sourceFile, testPath] = await getFile("date-time");
    await assertParsesAndCompilesAndTests(fl);
    await assertGeneratesSameElanSource(fl, source, sourceFile);
    await assertGeneratesHtml(fl, testPath);
    await assertExportsAll(fl, testPath);
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
