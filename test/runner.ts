import { AssertOutcome } from "../src/assert-outcome";
import { StdLib } from "../src/compiler/standard-library/std-lib";
import { TestStatus } from "../src/frames/status-enums";
import { System } from "../src/system";
import { encodeCode } from "../src/web/web-helpers";

export async function runTests(tests: [string, (_outcomes: AssertOutcome[]) => Promise<void>][]) {
  const allOutcomes: [string, AssertOutcome[]][] = [];

  for (const t of tests) {
    const outcomes: AssertOutcome[] = [];
    const testId = t[0];
    try {
      await t[1](outcomes);
    } catch (e) {
      const msg = (e as Error).message || "Test threw error";
      outcomes.push(new AssertOutcome(TestStatus.error, msg, "", "", e as Error));
    }
    allOutcomes.push([testId, outcomes]);
  }

  // clear tests each time or the tests array in the program gets duplicates
  tests.length = 0;

  return allOutcomes;
}

export function doImport(str: string) {
  const url = encodeCode(str);
  return import(url);
}

async function testRunner(jsCode: string, system: System, stdlib: StdLib) {
  return doImport(jsCode).then(async (elan) => {
    if (elan.program) {
      elan._inject(system, stdlib);
      const [, tests] = await elan.program();
      if (tests && tests.length > 0) {
        return await runTests(tests);
      }
    }
    return [];
  });
}

export async function getTestRunner(system: System, stdlib: StdLib) {
  return async (jsCode: string) => await testRunner(jsCode, system, stdlib);
}
