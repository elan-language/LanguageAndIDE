import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Printing Symbols", () => {
  test("Pass_PrintWithNoArgument", async () => {
    const code = `${testHeader}

main
  print 
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine("");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });
  test("Pass_CommonSymbolsAccessibleFromUKKeyboard", async () => {
    const code = `${testHeader}

main
  print "¬!£$%^&*()@~#|<>'"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine("¬!£$%^&*()@~#|<>'");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "¬!£$%^&*()@~#|<>'");
  });

  test("Pass_printEscape", async () => {
    const code = `${testHeader}

main
  print "\\b\\n"
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine("\\\\b\\n");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "\\b\n");
  });

  test("Pass_CallPrintTab", async () => {
    const code = `${testHeader}

main
  call printTab(5, "Foo")
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await _stdlib.printTab(5, "Foo");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "     Foo");
  });
  test("Pass_CallClearPrintedText", async () => {
    const code = `${testHeader}

main
  print "Foo"
  call clearPrintedText()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine("Foo");
  await _stdlib.clearPrintedText();
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_PrintImage", async () => {
    const code = `${testHeader}

main
  let i be new ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") with width set to 50, height set to 50, title set to "foo", alt set to "bar"
  print i
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const i = await (async () => {const _a = {...system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png"))}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png")))); _a.width = 50; _a.height = 50; _a.title = "foo"; _a.alt = "bar"; return _a;})();
  await system.printLine(i);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<img src='https://elan-language.github.io/LanguageAndIDE/images/Debug.png' width='50' height='50' title='foo' alt='bar'>`,
    );
  });
  test("Pass_PrintUncloseHtmlTag", async () => {
    const code = `${testHeader}

main
  print "<3"
  print "a < b "
  print "c <d> "
  print "e <f "
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  await system.printLine("<3");
  await system.printLine("a < b ");
  await system.printLine("c <d> ");
  await system.printLine("e <f ");
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(fileImpl, `Unclosed HTML tag in printed text 'e &lt;f '`);
  });
});
