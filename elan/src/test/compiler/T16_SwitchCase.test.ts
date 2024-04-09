import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T16_SwitchCase', () => {

  test('Pass_minimal', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print 'a'
      case 2
        print 'b'
      case 3
        print 'c'
      default
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i) {
      case 1:
        system.print(system.asString('a'));
        break;
      case 2:
        system.print(system.asString('b'));
        break;
      case 3:
        system.print(system.asString('c'));
        break;
      default:

        break;
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abc");
  });

  test('Pass_bracketsIgnored', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch (i)
      case 1
        print 'a'
      case 2
        print 'b'
      case 3
        print 'c'
      default
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch ((i)) {
      case 1:
        system.print(system.asString('a'));
        break;
      case 2:
        system.print(system.asString('b'));
        break;
      case 3:
        system.print(system.asString('c'));
        break;
      default:

        break;
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abc");
  });

  ignore_test('Pass_DefaultIsUsed', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
          print 'a'
      default
          print 'b'      
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i) {
      case 1:
        system.print(system.asString('a'));
        break;
      default:
        system.print(system.asString('b'));
        break;
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "abb");
  });

  ignore_test('Pass_switchOnExpression', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i + 1
      case 1
        print 'a'
      case 2
        print 'b'
      default
        print 'c'
    end switch
  end for
end main`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; };
export async function main() {
  for (var i = 1; i <= 3; i = i + 1) {
    switch (i + 1) {
      case 1:
        system.print(system.asString('a'));
        break;
      case 2:
        system.print(system.asString('b'));
        break;
      default:
        system.print(system.asString('c'));
        break;
    }
  }
}
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "bcc");
  });

  test('Fail_NoDefault', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
    switch i
      case 1
        print 'a'
      case 2
        print 'b'
      case 3
        print 'c'   
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_NoCase', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
      switch i
        default
          print 'a' 
      end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  ignore_test('Fail_IncompatibleCaseType', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print 'a'
      case 2
        print 'b'
      case 3.1
        print 'c' 
      default
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_UseOfVariableForCase', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var a set to 2
  for i from 1 to 3 step 1
      switch i
        case 1
          print 'a'
        case a
          print 'b'
        case 3
          print 'c'        
      end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_UseOfExpression', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print 'a'
      case 1 + 1
        print 'b'
      case 3
        print 'c'        
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_CaseAfterDefault', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1
        print 'a'
      default
        print 'b'
      case 3
        print 'c'        
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_WithColons', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 4 step 1
    switch i
      case 1:
        print 'a'
      case 2:
        print 'b'
      case 3:
        print 'c'        
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_actionOnSameLineAsCase', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch i
      case 1 print 'a'
      case 2 print 'b'       
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_missingExpression', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch
      case 1 
        print 'a'
      case 2 
        print 'b'       
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test('Fail_caseValueMissing', () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  for i from 1 to 3 step 1
    switch
      case
          print 'a'
      case 2 
          print 'b'       
    end switch
  end for
end main
`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });


});