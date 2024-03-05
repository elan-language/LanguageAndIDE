import { Done } from "mocha";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";

suite('T_2_HelloWorld', () => {
    ignore_test('Pass_CommentsOnly', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

# comment 1
main # comment 2
    # comment 3 (indented)
end main`;

        const objectCode = `export async function main(system : any) {
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "", done!);
    });

    ignore_test('Pass_PrintWithNoExpression', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print
    print
end main`;

        const objectCode = `export async function main(system : any) {
  system.print ();
  system.print ();
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "\r\n\r\n", done);
    });

    test('Pass_StringLiteral', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print "Hello World!"
end main`;

        const objectCode = `export async function main(system : any) {
  system.print ("Hello World!");
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "Hello World!", done);
    });

    test('Pass_BracketsMakeNoDifference', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print ("Hello World!")
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (("Hello World!"));
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "Hello World!", done);
    });

    test('Pass_IntegerLiteral', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print 1
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (1);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, 1, done);
    });

    test('Pass_FloatLiteral', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print 2.1
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (2.1);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, 2.1, done);
    });

    test('Pass_FloatWithExponent', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1E4
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (2.1E4);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, 21000, done);
    });

    test('Pass_FloatWithExponent2', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1E100
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (2.1E100);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, 2.1E+100, done);
    });

    test('Pass_FloatWithExponent3', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print 2.1e-4
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (2.1e-4);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, 0.00021, done);
    });

    test('Pass_CharLiteral', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print '%'
end main`;

        const objectCode = `export async function main(system : any) {
  system.print ('%');
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, '%', done);
    });

    test('Pass_BoolLiteral', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print true
end main`;

        const objectCode = `export async function main(system : any) {
  system.print (true);
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, true, done);
    });

    test('Pass_EmptyLine', (done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    print ""
end main`;

        const objectCode = `export async function main(system : any) {
  system.print ("");
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "", done);
    });

    test('Fail_noMain', () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

print "hello World!"`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });

    test('Fail_noEnd', () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  print "Hello World!"
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });

    test('Fail_wrongCasing', () => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

MAIN
  print "Hello World!"
end main`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertDoesNotParse(fileImpl);
    });
});