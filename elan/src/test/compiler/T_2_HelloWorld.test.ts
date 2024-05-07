import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";

suite('T_2_HelloWorld', () => {
    test('Pass_CommentsOnly', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

# comment 1
main # comment 2
    # comment 3 (indented)
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {

async function main() {


}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "");
    });

    ignore_test('Pass_PrintWithNoExpression', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print
  print
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString());
  system.print(_stdlib.asString());
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "\r\n\r\n");
    });

    test('Pass_StringLiteral', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print "Hello World!"
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString("Hello World!"));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "Hello World!");
    });

    test('Pass_BracketsMakeNoDifference', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print ("Hello World!")
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(("Hello World!")));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "Hello World!");
        
    });

    test('Pass_IntegerLiteral', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print 1
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(1));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "1");
    });

    test('Pass_NumberLiteral', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print 2.1
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(2.1));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "2.1");
    });

    test('Pass_NumberWithExponent', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1e4
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(21000));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "21000");
    });

    test('Pass_NumberWithExponent2', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1e100
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(2.1e+100));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "2.1e+100");
    });

    test('Pass_NumberWithExponent3', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1e-4
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(0.00021));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "0.00021");
    });

    test('Pass_CharLiteral', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print "%"
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString("%"));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "%");
    });

    test('Pass_BoolLiteral', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print true
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(true));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "true");
    });

    test('Pass_EmptyLine', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print ""
end main`;

        const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  system.print(_stdlib.asString(""));
}
return main;}`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "");
    });

    test('Fail_noMain', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

print "hello World!"`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });

    test('Fail_noEnd', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print "Hello World!"
`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });

    test('Fail_wrongCasing', async () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

MAIN
  print "Hello World!"
end main`;

        const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
        await fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });
});