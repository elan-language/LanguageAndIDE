import { Done } from "mocha";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";

suite('T_2_HelloWorld', () => {
    ignore_test('Pass_CommentsOnly', (done : Done) => {
        const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid
# comment 1
main # comment 2
    # comment 3 (indented)
end main`;

        const objectCode = `export function main() {
}
`;

        const fileImpl = new FileImpl(() => "", true);
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        assertObjectCodeExecutes(fileImpl, "", done);
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
});