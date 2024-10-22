import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Stack", () => {
  test("Pass_Stack", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  print st.length()
  call st.push("apple")
  call st.push("pear")
  print st.length()
  print st.peek()
  var fruit set to st.pop()
  print fruit
  set fruit to st.pop()
  print fruit
  print st.length()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.Stack());
  system.printLine(_stdlib.asString(st.length()));
  st.push("apple");
  st.push("pear");
  system.printLine(_stdlib.asString(st.length()));
  system.printLine(_stdlib.asString(st.peek()));
  var fruit = st.pop();
  system.printLine(_stdlib.asString(fruit));
  fruit = st.pop();
  system.printLine(_stdlib.asString(fruit));
  system.printLine(_stdlib.asString(st.length()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeExecutes(fileImpl, "02pearpearapple0");
  });

  test("Fail_Stack_adding_incompatible_type1", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  call st.push("apple")
  call st.push(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_Stack_adding_incompatible_type2", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  call st.push(3)
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_Stack_peek_incompatible_type", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  call st.push("apple")
  var a set to 1
  set a to st.peek()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types String to Int"]);
  });

  test("Fail_Stack_peek_empty_stack", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  print st.peek()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.Stack());
  system.printLine(_stdlib.asString(st.peek()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(fileImpl, "Cannot peek an empty Stack - check using length()");
  });

  test("Fail_Stack_pop_empty_stack", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack<of String>()
  print st.pop()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.Stack());
  system.printLine(_stdlib.asString(st.pop()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(fileImpl, "Cannot pop an empty Stack - check using length()");
  });

  test("Fail_StackWithoutGenericParm", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let st be new Stack()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["<of Type(s)> expected: 1 got: 0"]);
  });
});
