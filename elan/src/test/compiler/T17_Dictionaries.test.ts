import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T17_Dictionaries", () => {
  test("Pass_LiteralConstantAndPrinting", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(a));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test("Pass_AccessByKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a["z"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(a["z"]));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "10");
  });

  test("Pass_keys", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a.keys()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.keys(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [a, b, z]");
  });

  test("Pass_hasKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a.hasKey("b")
  print a.hasKey("d")
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.hasKey(a, "b")));
  system.print(_stdlib.asString(_stdlib.hasKey(a, "d")));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truefalse");
  });

  test("Pass_values", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a.values()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  system.print(_stdlib.asString(_stdlib.values(a)));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ImmutableList [1, 3, 10]");
  });

  test("Pass_set", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.setItem("b", 4)
  var c set to b.setItem("d", 2)
  print a
  print c
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.setItem(a, "b", 4);
  var c = _stdlib.setItem(b, "d", 2);
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(c));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "Dictionary [a:1, b:3, z:10]Dictionary [a:1, b:4, z:10, d:2]",
    );
  });

  test("Pass_removeEntry", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.removeItem("b")
  print a
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.removeItem(a, "b");
  system.print(_stdlib.asString(a));
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "Dictionary [a:1, b:3, z:10]Dictionary [a:1, z:10]",
    );
  });

  test("Pass_removeInvalidKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.removeItem("c")
  print b
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const a = {"a" : 1, "b" : 3, "z" : 10};

async function main() {
  var b = _stdlib.removeItem(a, "c");
  system.print(_stdlib.asString(b));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Dictionary [a:1, b:3, z:10]");
  });

  test("Pass_CreateEmptyDictionary", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to new Dictionary<of String, Int>()
  var b set to a.setItem("Foo", 1)
  set b to b.setItem("Bar", 3)
  var k set to b.keys()
  print k.length()
  print b["Foo"]
  print b["Bar"]
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var a = system.initialise(new Object(), ["String", "Int"]);
  var b = _stdlib.setItem(a, "Foo", 1);
  b = _stdlib.setItem(b, "Bar", 3);
  var k = _stdlib.keys(b);
  system.print(_stdlib.asString(_stdlib.length(k)));
  system.print(_stdlib.asString(b["Foo"]));
  system.print(_stdlib.asString(b["Bar"]));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "213");
  });

  test("Fail_RepeatedKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "a":10]
main
  print a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Duplicate Dictionary key(s)"]);
  });

  test("Fail_InconsistentTypes1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3.1, "c":10]
main
  print a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_InconsistentTypes2", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, 10:10]
main
  print a
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Int to String"]);
  });

  test("Fail_AccessByInvalidKey", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  print a["c"]
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Out of range error");
  });

  test("Fail_RemoveInvalidKeyType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.removeItem(10)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Failed");
  });

  test("Fail_SetInvalidKeyType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.setItem(10, 4)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    await assertObjectCodeDoesNotExecute(fileImpl, "Failed");
  });

  ignore_test("Fail_SetInvalidValueType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

constant a set to ["a":1, "b":3, "z":10]
main
  var b set to a.setItem("b", 3.1)
end main
`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      transforms(),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [""]);
  });
});
