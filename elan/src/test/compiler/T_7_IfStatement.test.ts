import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_7_IfStatement', () => {
  test('Pass_1', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = true;
  if (a) {
    system.print(system.asString("yes"));
    } else {
      system.print(system.asString("no"));
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  test('Pass_2', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to false
  if a
    print "yes"
  else
    print "no"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = false;
  if (a) {
    system.print(system.asString("yes"));
    } else {
      system.print(system.asString("no"));
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "no");
  });

  ignore_test('Pass_3', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = 2;
  if (a === 1) {
    system.print(system.asString("one"));
    } else if (a === 2) {
      system.print(system.asString("two"));
    } else {
      system.print(system.asString("neither"));
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "two");
  });

  ignore_test('Pass_4', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = 3;
  if (a === 1) {
    system.print(system.asString("one"));
    } else if (a === 2) {
      system.print(system.asString("two"));
    } else {
      system.print(system.asString("neither"));
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "neither");
  });

  test('Pass_5', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = true;
  if (a) {
    system.print(system.asString("yes"));
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "yes");
  });

  ignore_test('Pass_6', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else if a is 2
    print "two"
  else if a is 3
    print "three"
  else
    print "neither"
  end if
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var a = 3;
  if (a === 1) {
    system.print(system.asString("one"));
    } else if (a === 2) {
      system.print(system.asString("two"));
    } else if (a === 3) {
      system.print(system.asString("three"));
    } else {
      system.print(system.asString("neither"));
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "three");
  });

  test('Fail_noEndIf', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to true
  if a
    print "yes"
end main`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
});

ignore_test('Fail_ElseIfAfterElse', () => {
  const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 3
  if a is 1
    print "one"
  else
    print "not one"
  else if a is 2
    print "two"
  end if
end main`;

  const fileImpl = new FileImpl(() => "", true);
  fileImpl.parseFrom(new CodeSourceFromString(code));

  assertDoesNotParse(fileImpl);
});


});