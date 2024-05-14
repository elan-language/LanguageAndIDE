import { System } from "./system";

export function runTests(system : System, tests : [[string, () => void]]) {
    system.print("Test Runner:");
    for (const t of tests) {
        try {
            system.print(`\n${t[0]}:`);
            t[1]();
            system.print(` pass`);
        }
        catch (e) {
            system.print(` fail`);
            system.print(`- ${(e as any).message}`);
        }
    }

    // clear tests each time or the tests array in the program gets duplicates
    (tests as any).length = 0;

    return system;
}