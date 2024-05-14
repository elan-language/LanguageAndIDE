import { System } from "../../system";
import assert from "assert";

suite('assert-tests', () => {
    test('Passes', async () => {
        const system = new System();

        system.assert(1, 1);
        system.assert(1.0, 1.0);
        system.assert("str", "str"); 
        system.assert(1.325, 1.3); 
        system.assert(1.39, 1.4); 
    });

    function assertFailHelper(system: System, actual : any, expected : any, message : string) {
        try {
            system.assert(actual, expected);
            assert.fail("expect exception");
        }
        catch (e) {
            assert.strictEqual((e as any).message, message);
        }
    }

    test('Fails', async () => {
        const system = new System();
        assertFailHelper(system, 1, 1.1, "actual 1.0, expected 1.1" );
    });
});