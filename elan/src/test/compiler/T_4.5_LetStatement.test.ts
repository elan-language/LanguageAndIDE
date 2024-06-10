import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { MainFrame } from "../../frames/globals/main-frame";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T_4.5_LetStatement", () => {
  test("Pass_normal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let y be x + 3
  print x + y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {
    var _cache;
    return () => _cache ??= 3;
  })();
  var y = (() => {
    var _cache;
    return () => _cache ??= x() + 3;
  })();
  system.print(_stdlib.asString(x() + y()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "9");
  });

  test("Pass_proveCached", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be new Foo()
  let y be x
  call y.setP1(10)
  print x.p1
  print y.p1
end main

class Foo
  constructor()
  end constructor

  property p1 as Int

  procedure setP1(i as Int)
    set p1 to i
  end procedure
end class
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {
    var _cache;
    return () => _cache ??= system.initialise(new Foo());
  })();
  var y = (() => {
    var _cache;
    return () => _cache ??= x();
  })();
  y().setP1(10);
  system.print(_stdlib.asString(x().p1));
  system.print(_stdlib.asString(y().p1));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", "Int"]]);};
  constructor() {

  }

  p1 = 0;

  setP1(i) {
    this.p1 = i;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1010");
  });

  test("Pass_proveLazilyEvaluated", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be  1 / 0
  let y be 4
  print y
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = (() => {
    var _cache;
    return () => _cache ??= 1 / 0;
  })();
  var y = (() => {
    var _cache;
    return () => _cache ??= 4;
  })();
  system.print(_stdlib.asString(y()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "4"); //i.e. does not generate a division by zero error from the first let (are we testing that it DOES for a var/set!)
  });

  test("Fail_cannotRedefine ", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  let x be 4
  print x + y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not reassign x"]);
  });

  test("Fail_cannotAssign", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be 3
  set x to 4
  print x + y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["May not mutate x"]);
  });

  test("Fail_RecursiveDefinition", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  let x be x + 1
  print x
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Incompatible types Unknown to Float or Int",
      "x is not defined",
    ]);
  });

  ignore_test("Fail_RecursiveDefinition1", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to 1
  let y be x.y
  print y
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Unknown to Float", "x is not defined"]);
  });
});
