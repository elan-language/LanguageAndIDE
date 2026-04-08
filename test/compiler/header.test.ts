import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Profile } from "../../src/ide/frames/profile";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import {
  assertDoesNotParseWithMessage,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  transforms,
} from "./compiler-test-helpers";

// Tests ignored pending moving up to full release 2.0
suite("Header", () => {
  ignore_test("Pass_hash", async () => {
    const code = `# e43d5d0bf6773a8624f5fea4e88072965e9003f747aaee775fe35bcaebfcda14 Elan 2.0.0-alpha1 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "guest",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Pass_versionSame", async () => {
    const code = `# e43d5d0bf6773a8624f5fea4e88072965e9003f747aaee775fe35bcaebfcda14 Elan 2.0.0-alpha1 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Pass_versionPatch1", async () => {
    const code = `# 059b98f737252eb25aef520a8ebaeb7b649dc31f1d3d129ebe43992f7df5bbf3 Elan 1.0.100 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Pass_versionPatch2", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 100, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Pass_versionMinor", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 1, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Pass_user", async () => {
    const code = `# 4949493ed4278e580a9ce6c85933365009324ed49b9a92437d04b027e4613522 Elan 1.0.0 aUser default_profile valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "aUser",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Fail_versionMajor1", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(2, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1",
    );
  });

  ignore_test("Fail_versionMajor2", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(0, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1",
    );
  });

  ignore_test("Fail_versionMinor", async () => {
    const code = `# 4999398e974acfe969ceb831f0f85efc31fb873bb0b7f09d6cd365f547365492 Elan 1.1.0 valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1.1",
    );
  });

  ignore_test("Pass_preRelease", async () => {
    const code = `# 2096eb1fe5463ded352b7d4546b570abccbf5486ff08c57c32e75bbb287fba15 Elan 1.1.0-Beta valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await _stdlib.printNoLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "aUser",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 1, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  ignore_test("Fail_preReleaseBadSemver", async () => {
    const code = `# 2096eb1fe5463ded352b7d4546b570abccbf5486ff08c57c32e75bbb287fba15 Elan 1.1.0-Beta valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new Profile(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
    );
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1.1",
    );
  });
});
