import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import { hash } from "../../src/util";
import {
  assertDoesNotParse,
  assertDoesNotParseWithMessage,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHeader,
  testHeaderVersion,
  transforms,
} from "./compiler-test-helpers";

suite("Header", () => {
  test("Pass_hash", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_versionSame", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_versionPatch1", async () => {
    const code = `# 6122381bef25517049ba4628e4e7e1d0ddd8ca072cfd3bb5e44d4e18cf4a5ed9 Elan 1.0.100 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_versionPatch2", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 100, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Pass_versionMinor", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {

  await system.printLine("Hello World!");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 1, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Hello World!");
  });

  test("Fail_versionMajor1", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(2, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1",
    );
  });

  test("Fail_versionMajor2", async () => {
    const code = `# 5904cbdc7b13419a3719705bf8fa16ba218060e9dd1ba274b4af2d3d7d303d74 Elan 1.0.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(0, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1",
    );
  });

  test("Fail_versionMinor", async () => {
    const code = `# d8a5c891665b4f3437fc68104c0a967bb9d95ac26d83f2c906ea3913938ba452 Elan 1.1.0 valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 0, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it must be loaded into an Elan IDE version 1.1",
    );
  });

  test("Fail_preRelease", async () => {
    const code = `# 7110aed3a8d6014e80c179c34c9c19dcb2b291df9f216505927a38d95dda099a Elan 1.1.0-Beta valid

main
  # My first program
  print "Hello World!"
end main`;

    const fileImpl = new FileImpl(hash, new DefaultProfile(), transforms());
    fileImpl.setIsProduction(true);
    fileImpl.setVersion(1, 1, 0, "");
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParseWithMessage(
      fileImpl,
      "Cannot load file: it was created in a pre-release version of Elan IDE",
    );
  });
});
