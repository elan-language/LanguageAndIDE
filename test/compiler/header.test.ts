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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "guest",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 93c8c544e1e7e741cc1ecc570ac797c4d0095d4f7e9edbdbdb003d812e504537 Elan 1.0.100 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 0887656cae717264197a75bbc3f0c8c2b737eb0e48854ae2399ea76331822755 Elan 1.0.0 aUser default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "aUser",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 14dddb83fe745f514d078c6035905da8f1dfbf7da06483ddd8c1f8ce8e5e4b05 Elan 1.0.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# da01be00d946912fec86405112300c347b38ea560d11e4992db91681093ef049 Elan 1.1.0 guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 775d96007a883395a4cb0cf72b418c81c5288b76b6387c8da49ca376834c1a04 Elan 1.1.0-Beta guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.print("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "aUser",
      transforms(),
      new StdLib(new StubInputOutput()),
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
    const code = `# 775d96007a883395a4cb0cf72b418c81c5288b76b6387c8da49ca376834c1a04 Elan 1.1.0-Beta guest default_profile valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(
      hash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
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
