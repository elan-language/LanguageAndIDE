import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Standard Data Structures", () => {
  test("Pass_Stack", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new Stack()
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

  test("Fail_Stack_adding_incompatible_type", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new Stack()
  call st.push("apple")
  call st.push(3)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.Stack());
  st.push("apple");
  st.push(3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(
      fileImpl,
      "Attempting to push an incompatible type onto a non-empty Stack",
    );
  });

  test("Fail_Stack_peek_empty_stack", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new Stack()
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
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new Stack()
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

  test("Pass_ImmutableStack", async () => {
    //  THIS IS INCOMPLETE - NOT YET TESTING POP (not yet implemented fully)
    const code = `# FFFF Elan Beta 2 valid

main
  var st set to new ImmutableStack()
  print st.length()
  set st to st.push("apple")
  print st.length()
  print st.peek()
  set st to st.push("pear")
  print st.length()
  print st.peek()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st = system.initialise(new _stdlib.ImmutableStack());
  system.printLine(_stdlib.asString(st.length()));
  st = st.push("apple");
  system.printLine(_stdlib.asString(st.length()));
  system.printLine(_stdlib.asString(st.peek()));
  st = st.push("pear");
  system.printLine(_stdlib.asString(st.length()));
  system.printLine(_stdlib.asString(st.peek()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(fileImpl, "xxx");
  });
  test("Fail_ImmutableStack_adding_incompatible_type", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  var st set to new ImmutableStack()
  set st to st.push("apple")
  set st to st.push(3)
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st = system.initialise(new _stdlib.ImmutableStack());
  st = st.push("apple");
  st = st.push(3);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(
      fileImpl,
      "Attempting to push an incompatible type onto a non-empty ImmutableStack",
    );
  });
  test("Fail_ImmutableStack_peek_empty_stack", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  let st be new ImmutableStack()
  print st.peek()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const st = system.initialise(new _stdlib.ImmutableStack());
  system.printLine(_stdlib.asString(st.peek()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(
      fileImpl,
      "Cannot peek an empty ImmutableStack - check using length()",
    );
  });

  //pop is not yet implemented for ImmutableStack
  ignore_test("Fail_ImmutableStack_pop_empty_stack", async () => {
    const code = `# FFFF Elan Beta 2 valid

main
  var st set to new ImmutableStack()
  set st to st.pop()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var st = system.initialise(new _stdlib.ImmutableStack());
  st = _stdlib.asString(st.pop()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    assertObjectCodeDoesNotExecute(
      fileImpl,
      "Cannot pop an empty ImmutableStack - check using length()",
    );
  });
});
function ignore_test(arg0: string, arg1: () => Promise<void>) {
  throw new Error("Function not implemented.");
}
