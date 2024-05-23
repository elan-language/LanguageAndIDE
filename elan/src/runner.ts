import { StdLib } from "./std-lib";
import { AssertOutcome, System } from "./system";

export function runTests(
  tests: [string, (_outcomes: AssertOutcome[]) => void][],
) {
  const allOutcomes: [string, AssertOutcome[]][] = [];

  for (const t of tests) {
    const outcomes: AssertOutcome[] = [];
    t[1](outcomes);
    allOutcomes.push([t[0], outcomes]);
  }

  // clear tests each time or the tests array in the program gets duplicates
  tests.length = 0;

  return allOutcomes;
}

export function doImport(str: string) {
  const url = "data:text/javascript;base64," + btoa(str);
  return import(url);
}

function testRunner(jsCode: string, system: System, stdlib: StdLib) {
  return doImport(jsCode).then(async (elan) => {
    if (elan.program) {
      elan._inject(system, stdlib);
      const [, tests] = await elan.program();
      if (tests && tests.length > 0) {
        return runTests(tests);
      }
    }
    return [];
  });
}

export function getTestRunner(system: System, stdlib: StdLib) {
  return (jsCode: string) => testRunner(jsCode, system, stdlib);
}
