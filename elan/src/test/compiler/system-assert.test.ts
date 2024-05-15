import { System } from "../../system";
import assert from "assert";

suite('assert-tests', () => {
    test('Passes', async () => {
        const system = new System();

        system.assert(1, 1, "");
        system.assert(1.0, 1.0, "");
        system.assert("str", "str", ""); 
    });

    function assertFailHelper(system: System, actual : any, expected : any, message : string) {
        try {
            system.assert(actual, expected, "");
            assert.fail("expect exception");
        }
        catch (e) {
            assert.strictEqual((e as any).message, message);
        }
    }
});