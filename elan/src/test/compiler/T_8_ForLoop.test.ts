import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_8_ForLoop', () => {

  ignore_test('Pass_minimal', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 1) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "55");
  });

  test('Pass_withStep', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
var tot set to 0
for i from 1 to 10 step 2
  set tot to tot + i
end for
print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var tot = 0;
  for (var i = 1; i <= 10; i = i + 2) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  ignore_test('Pass_negativeStep', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 10 to 3 step -1
    set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var tot = 0;
  for (var i = 10; i >= 3; i = i - 1) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "52");
  });

  test('Pass_innerLoop', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1
      set tot to tot + 1
    end for
  end for
  print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var tot = 0;
  for (var i = 1; i <= 3; i = i + 1) {
    for (var j = 1; j <= 4; j = j + 1) {
      tot = tot + 1;
    }
  }
  system.print(system.asString(tot));
}
`;
    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "12");
  });

  test('Pass_canUseExistingVariablesOfRightType', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var lower set to 1
  var upper set to 10
  var tot set to 0
  for i from lower to upper step 2 
      set tot to tot + i
  end for
  print tot
end main`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var lower = 1;
  var upper = 10;
  var tot = 0;
  for (var i = lower; i <= upper; i = i + 2) {
    tot = tot + i;
  }
  system.print(system.asString(tot));
}
`;
    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "25");
  });

  ignore_test('Fail_useOfFloat', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1.5 to 10 step 1
    set tot to tot + i
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_modifyingCounter', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set i to 10
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_missingEnd', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 3 step 1
    for j from 1 to 4 step 1
      set tot to tot + 1
    end for
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_nextVariable', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10
    set tot to tot + i
  next i
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_break', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
    break
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_continue', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var tot set to 0
  for i from 1 to 10 step 1
    set tot to tot + i
    continue
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});