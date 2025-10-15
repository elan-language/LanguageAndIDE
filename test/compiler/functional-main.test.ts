import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Functional Main", () => {
  test("Pass_Main", async () => {
    const code = `${testHeader}

function main(sys as FSystem) returns FSystem
  let a be sys.inputInt("First number:")
  let b be sys.inputInt("Second number:")
  let c be (a + b).asString()
  return sys.output(c)
end function
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const s = new FSystem();
  const it = _fmain(s);
  for (const ss of it) {
    await ss.evaluate();
  }
}

function* _fmain(s: FSystem) {
  const a = sys.inputInt("First number:");
  const b = sys.inputInt("Second number:");
  const c = (await _stdlib.asString((a + b)));
  return sys.output(c);
}
async function main() {

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("spike", async () => {
    class FSystem {
      write?: () => Promise<void> = undefined;
      read?: () => Promise<unknown> = undefined;
      result?: unknown;

      async evaluate() {
        this.result = this.read ? await this.read() : undefined;
        this.read = undefined;
      }

      async innerInputInt(prompt: string): Promise<number> {
        return 22;
      }

      async innerPrint(v: any): Promise<void> {}

      inputInt(prompt: string) {
        this.read = async () => await this.innerInputInt(prompt);
      }

      print(v: unknown) {
        this.write = async () => await this.innerPrint(v);
      }
    }

    async function main() {
      const s = new FSystem();
      const it = _fmain(s);

      for (const ss of it) {
        await ss.evaluate();
      }
    }

    function* _fmain(s: FSystem) {
      s.inputInt("First Number:");
      yield s;
      const a = s.result as number;

      s.inputInt("Second Number:");
      yield s;
      const b = s.result as number;

      s.print(a + b);

      yield s;
    }

    main();
  });
});
