import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertParses,
  assertStatusIsValid,
  assertWorkerCompiledObjectCodeIs,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Breakpoints", () => {
  test("Pass_Variable", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable a set to 3
  print a
end main`;

    const objectCode = `import { StdLib } from "/elan-api.js"; let system; let _stdlib; let _tests = []; async function program() { _stdlib = new StdLib(); system = _stdlib.system; system.stdlib = _stdlib  
const global = new class {};
async function main() {
  const _scopedIdsvar3 = [];
  await system.breakPoint(_scopedIdsvar3, "var3");
  let a = 3;
  await system.printLine(a);
}
return [main, _tests];}
onmessage = async (e) => {
  if (e.data.type === "start") {
    try {
      const [main, tests] = await program();
      await main();
      postMessage({type : "status", status : "finished"});
    }
    catch (e) {
      postMessage({type : "status", status : "error", error : e});
    }
  }
};`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertWorkerCompiledObjectCodeIs(fileImpl, objectCode, "var3");
  });
});
