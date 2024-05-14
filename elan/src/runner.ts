import { System } from "./system";

export function runTests(system : System, tests : [[string, () => void]]) {
    system.print("Test Runner...\n");
    for (const t of tests) {
        var outcome = ``;
        try {
            t[1]();
            outcome = `pass`;
        }
        catch (e) {
            outcome = `fail - ${(e as any).message}`;
        }
        system.print(`${t[0]}: ${outcome}\n`);
    }

    // clear tests each time or the tests array in the program gets duplicates
    (tests as any).length = 0;

    return system;
}