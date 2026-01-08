import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString } from "../../src/ide/frames/code-source-from-string";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
    assertDoesNotCompile,
    assertDoesNotParse,
    assertObjectCodeExecutes,
    assertObjectCodeIs,
    assertParses,
    assertStatusIsValid,
    testHash,
    testHeader,
    transforms,
} from "./compiler-test-helpers";

suite("Image", () => {
  test("Pass_Simple", async () => {
    const code = `${testHeader}

main
  variable c set to image http://website.image.png
  print c.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.ImageVG()._initialise("http://website.image.png"));
  await system.print(c.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<img src='http://website.image.png' width='13.2' height='13.2' title='' alt=''>`,
    );
  });

  test("Pass_With", async () => {
    const code = `${testHeader}

main
  variable c set to image http://website.image.png with width set to 100, height set to 200
  print c.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = await (async () => {const _a = {...system.initialise(await new _stdlib.ImageVG()._initialise("http://website.image.png"))}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.ImageVG()._initialise("http://website.image.png")))); _a.width = 100; _a.height = 200; return _a;})();
  await system.print(c.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<img src='http://website.image.png' width='100' height='200' title='' alt=''>`,
    );
  });

  test("Fail_invalidUrl", async () => {
    const code = `${testHeader}

main
  variable c set to image website.image.png
  print c
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_With", async () => {
    const code = `${testHeader}

main
  variable c set to image http://website.image.png with z set to 100
  print c
end main`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'z' is not defined.LangRef.html#compile_error"]);
  });
});
