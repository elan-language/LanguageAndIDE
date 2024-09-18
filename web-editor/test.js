import { StubInputOutput } from "./stub-input-output";
import { System } from "./system";
import { StdLib } from "./std-lib";
var system;
var _stdlib;
var _tests = [];

async function program() { 
    system = new System(new StubInputOutput());
    _stdlib = new StdLib(system);
    async function main() {
      var a = 1;
      system.printLine(_stdlib.asString(a));
    }
    return [main, _tests];
}

self.onmessage = async (e) => {
  const [main, tests] = await program();
  await main();
};