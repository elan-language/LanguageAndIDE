import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import { hash } from "../../src/ide/util";
import {
  assertDoesNotParseWithMessage,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  transforms,
} from "./compiler-test-helpers";

suite("Header", () => {
  test("Pass_hash", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

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
      new DefaultProfile(),
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

  test("Pass_versionSame", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

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
      new DefaultProfile(),
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

  test("Pass_versionPatch1", async () => {
    const code = `# 059b98f737252eb25aef520a8ebaeb7b649dc31f1d3d129ebe43992f7df5bbf3 Elan 1.0.100 guest default_profile valid

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
      new DefaultProfile(),
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

  test("Pass_versionPatch2", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

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
      new DefaultProfile(),
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

  test("Pass_versionMinor", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

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
      new DefaultProfile(),
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

  test("Pass_user", async () => {
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
      new DefaultProfile(),
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

  test("Fail_versionMajor1", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
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

  test("Fail_versionMajor2", async () => {
    const code = `# ff8601fdd724f6654ef14bee767d21a616485dbe53823b5a9df490f2b4cf2c35 Elan 1.0.0 guest default_profile valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
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

  test("Fail_versionMinor", async () => {
    const code = `# 4999398e974acfe969ceb831f0f85efc31fb873bb0b7f09d6cd365f547365492 Elan 1.1.0 guest default_profile valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
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

  test("Pass_preRelease", async () => {
    const code = `# 2096eb1fe5463ded352b7d4546b570abccbf5486ff08c57c32e75bbb287fba15 Elan 1.1.0-Beta guest default_profile valid

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
      new DefaultProfile(),
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

  test("Fail_preReleaseBadSemver", async () => {
    const code = `# 2096eb1fe5463ded352b7d4546b570abccbf5486ff08c57c32e75bbb287fba15 Elan 1.1.0-Beta guest default_profile valid

main
  # My first program
  call printNoLine("Hello World!")
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
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
