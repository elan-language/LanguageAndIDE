import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T_3_Header', () => {

    function hash(toHash : string) {
        const hash = createHash('sha256');
        hash.update(toHash);
        return  hash.digest('hex');
    }

    ignore_test('Pass_hash', async () => {
        const code = `# fe7d4129310ebd088b815518559c4ac512b0e67da256e912bed669756817e4f4 Elan v0.1 valid

main
  # My first program
  print ""Hello World!""
end main`;

        const objectCode = `export async function main(system : any) {
  system.print ("Hello World!");
}
`;

        const fileImpl = new FileImpl(hash, new DefaultProfile());
        fileImpl.parseFrom(new CodeSourceFromString(code));

        assertParses(fileImpl);
        assertStatusIsValid(fileImpl);
        assertObjectCodeIs(fileImpl, objectCode);
        await assertObjectCodeExecutes(fileImpl, "Hello World!");
    });
});