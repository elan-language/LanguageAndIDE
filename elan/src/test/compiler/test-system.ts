import { System } from "../../system";

export function getTestSystem() {

    var system = new System();

    (system as any)['printed'] = "";
    (system as any)['inputed'] = "";
    system.print = (s : string) => {
        (system as any).printed = (system as any).printed + s;
    };
    
    system.input = () => {
        return Promise.resolve((system as any).inputed);
    };

    return system;
}