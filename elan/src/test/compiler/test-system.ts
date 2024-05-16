import { System } from "../../system";

class TestSystem extends System {
    printed: string = "";
    inputed: string = "";
}

export function getTestSystem() {

    const system = new TestSystem();

    system.print = (s: string) => {
        system.printed = system.printed + s;
    };

    system.input = () => {
        return Promise.resolve(system.inputed);
    };

    return system;
}