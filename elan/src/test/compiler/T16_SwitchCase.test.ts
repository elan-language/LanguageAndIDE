import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T16_SwitchCase", () => {
  test("Pass_minimal", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print "a"
      case 2
        print "b"
      case 3
        print "c"
      default
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i) {
      case 1:
        system.printLine(_stdlib.asString("a"));
        break;
      case 2:
        system.printLine(_stdlib.asString("b"));
        break;
      case 3:
        system.printLine(_stdlib.asString("c"));
        break;
      default:

        break;
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abc");
  });

  test("Pass_bracketsIgnored", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch (i)
      case 1
        print "a"
      case 2
        print "b"
      case 3
        print "c"
      default
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch ((i)) {
      case 1:
        system.printLine(_stdlib.asString("a"));
        break;
      case 2:
        system.printLine(_stdlib.asString("b"));
        break;
      case 3:
        system.printLine(_stdlib.asString("c"));
        break;
      default:

        break;
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abc");
  });

  test("Pass_DefaultIsUsed", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
          print "a"
      default
          print "b"
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i) {
      case 1:
        system.printLine(_stdlib.asString("a"));
        break;
      default:
        system.printLine(_stdlib.asString("b"));
        break;
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abb");
  });

  test("Pass_switchOnExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i + 1
      case 1
        print "a"
      case 2
        print "b"
      default
        print "c"
        
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i + 1) {
      case 1:
        system.printLine(_stdlib.asString("a"));
        break;
      case 2:
        system.printLine(_stdlib.asString("b"));
        break;
      default:
        system.printLine(_stdlib.asString("c"));
        break;
    }
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bcc");
  });

  test("Pass_CompatibleCaseType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  switch 3.1
    case 1
      print "a"
    case 2
      print "b"
    case 3.1
      print "c"
    default
  end switch
end main
`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  switch (3.1) {
    case 1:
      system.printLine(_stdlib.asString("a"));
      break;
    case 2:
      system.printLine(_stdlib.asString("b"));
      break;
    case 3.1:
      system.printLine(_stdlib.asString("c"));
      break;
    default:

      break;
  }
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "c");
  });

  test("Pass_NoDefault", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
    switch i
      case 1
        print "a"
      case 2
        print "b"
      case 3
        print "c"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
  });

  test("Fail_NoCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
      switch i
        default
          print "a" 
      end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_IncompatibleCaseType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print "a"
      case 2
        print "b"
      case 3.1
        print "c"
      default
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Incompatible types Float to Int"]);
  });

  test("Fail_UseOfVariableForCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  for i from 1 to 3 step 1
      switch i
        case 1
          print "a"
        case a
          print "b"
        case 3
          print "c"
      end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print "a"
      case 1 + 1
        print "b"
      case 3
        print "c"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Pass_CaseAfterDefault", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print "a"
      default
        print "b"
      case 3
        print "c"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));
    assertParses(fileImpl);
  });

  test("Fail_WithColons", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
    switch i
      case 1:
        print "a"
      case 2:
        print "b"
      case 3:
        print "c"
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_actionOnSameLineAsCase", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1 print "a"
      case 2 print "b"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_missingExpression", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch
      case 1 
        print "a"
      case 2 
        print "b"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_caseValueMissing", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch
      case
          print "a"
      case 2 
          print "b"
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });
});
