import assert from "assert";
import { Done } from "mocha";
import { FileImpl } from "../../src/frames/file-impl";
import { Field } from "../../src/frames/interfaces/field";
import { Frame } from "../../src/frames/interfaces/frame";
import { ParseStatus } from "../../src/frames/status-enums";
import { transform, transformMany } from "../../src/frames/syntax-nodes/ast-visitor";
import { Transforms } from "../../src/frames/syntax-nodes/transforms";
import { runTests } from "../../src/runner";
import { StdLib } from "../../src/standard-library/std-lib";
import { AssertOutcome } from "../../src/system";
import { TestInputOutput } from "./test-input-output";
import { getTestSystem } from "./test-system";
import { AbstractFrame } from "../../src/frames/abstract-frame";

export function assertParses(file: FileImpl) {
  assert.strictEqual(file.parseError, undefined, "Unexpected parse error: " + file.parseError);
}

export function assertDoesNotParse(file: FileImpl) {
  assert.ok(file.parseError);
}

export function assertStatusIsValid(file: FileImpl) {
  assert.strictEqual(file.readParseStatus(), ParseStatus.valid);
}

export function assertStatusIsIncomplete(file: FileImpl) {
  assert.strictEqual(file.readParseStatus(), ParseStatus.valid);
}

export function assertStatusIsInvalid(file: FileImpl) {
  assert.strictEqual(file.readParseStatus(), ParseStatus.valid);
}

export function assertObjectCodeIs(file: FileImpl, objectCode: string) {
  const actual = file.compile().replaceAll("\r", "");
  const expected = objectCode.replaceAll("\r", "");
  const errors = file.aggregateCompileErrors();
  assert.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));
  assert.strictEqual(actual, expected);
}

export function assertDoesNotCompile(file: FileImpl, msgs: string[]) {
  file.compile();

  const errors = file.aggregateCompileErrors();

  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i];
    const e = errors[i];
    const id = e.locationId; // to help test migration
    assert.strictEqual(e.message, m);
  }
}

export function assertDoesNotCompileWithId(file: FileImpl, id: string, msgs: string[]) {
  file.compile();

  const hasErrors = file.getById(id) as Frame | Field;
  const errors = hasErrors.aggregateCompileErrors();

  for (let i = 0; i < msgs.length; i++) {
    const m = msgs[i];
    const e = errors[i];
    assert.strictEqual(e.message, m);
  }
}

function doImport(str: string) {
  const url = "data:text/javascript;base64," + btoa(str);
  return import(url);
}

function executeCode(file: FileImpl, input?: string) {
  const jsCode = file.compile();
  const errors = file.aggregateCompileErrors();
  assert.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));

  const system = getTestSystem(input ?? "");
  const stdlib = new StdLib();
  stdlib.system = system;
  system.stdlib = stdlib;

  return doImport(jsCode).then(async (elan) => {
    if (elan.program) {
      elan._inject(system, stdlib);
      const [main] = await elan.program();
      await main();
      return system;
    }
    return undefined;
  });
}

export async function executeTestCode(file: FileImpl, input?: string) {
  const jsCode = file.compile();
  const errors = file.aggregateCompileErrors();
  assert.strictEqual(errors.length, 0, errors.map((e) => e.message).join(", "));

  const system = getTestSystem(input ?? "");
  const stdlib = new StdLib();
  stdlib.system = system;

  return doImport(jsCode).then(async (elan) => {
    if (elan.program) {
      elan._inject(system, stdlib);
      const [, tests] = await elan.program();
      return await runTests(tests);
    }
    return [];
  });
}

export async function assertObjectCodeExecutes(file: FileImpl, output: string, input?: string) {
  let actual;

  try {
    const sl = await executeCode(file, input);
    actual = (sl?.elanInputOutput as TestInputOutput).printed;
  } catch (e) {
    assert.fail((e as { message: string }).message ?? "");
  }
  assert.strictEqual(actual, output);
}

export async function assertTestObjectCodeExecutes(
  file: FileImpl,
  expectedOutcomes: [string, AssertOutcome[]][],
) {
  let actualOutcomes: [string, AssertOutcome[]][];

  try {
    actualOutcomes = await executeTestCode(file, "");
  } catch (e) {
    assert.fail((e as { message: string }).message ?? "");
  }

  assert.strictEqual(actualOutcomes.length, expectedOutcomes.length, "mismatched all outcomes");

  for (let i = 0; i < expectedOutcomes.length; i++) {
    const ao = actualOutcomes[i];
    const eo = expectedOutcomes[i];

    assert.strictEqual(ao[0], eo[0], "mismatched test names");
    assert.strictEqual(ao[1].length, eo[1].length, "mismatched outcomes");

    for (let j = 0; j < ao[1].length; j++) {
      const a = ao[1][j];
      const e = eo[1][j];

      assert.strictEqual(a.status, e.status);
      assert.strictEqual(a.actual, e.actual);
      assert.strictEqual(a.expected, e.expected);
      assert.strictEqual(a.htmlId, e.htmlId);
    }
  }
}

export async function assertGraphicsContains(file: FileImpl, offset: number, snippet: string) {
  let graphics;

  try {
    const sl = await executeCode(file, "");
    graphics = (sl?.elanInputOutput as TestInputOutput).drawn;
  } catch (e) {
    assert.fail((e as { message: string }).message ?? "");
  }
  const divs = graphics.split("</div>");

  if (divs.length > offset) {
    assert.strictEqual(divs[offset], snippet);
  } else {
    assert.fail("no offset");
  }
}

export async function assertObjectCodeDoesNotExecute(file: FileImpl, msg?: string) {
  try {
    await executeCode(file);
    assert.fail();
  } catch (e) {
    if (msg) {
      if (e instanceof Error) {
        assert.strictEqual(e.message, msg);
      } else {
        assert.fail();
      }
    }
    // ok
  }
}

export function ignore_test(name: string, test: (done: Done) => void) {}

export function testHash(s: string) {
  return Promise.resolve("");
}

export function transforms() {
  return {
    transform: transform,
    transformMany: transformMany,
  } as Transforms;
}
