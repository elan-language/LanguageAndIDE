import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("VectorGraphics", () => {
  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable svg set to new VectorGraphic()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["VectorGraphic must be concrete to new"]);
  });

  test("Pass_VectorGraphicsEmpty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  print vg.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.VectorGraphics()._initialise());
  await system.printLine(vg.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
</svg>
`,
    );
  });

  test("Pass_AppendUsingFunction", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, red, black, 1)
  let vg2 be vg.withAppend(circ)
  print vg2.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.black, 1));
  const vg2 = vg.withAppend(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000" />
</svg>
`,
    );
  });

  test("Pass_AppendUsingProcedure", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, red, black, 1)
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.black, 1));
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000" />
</svg>
`,
    );
  });

  test("Pass_SetPropertyOnVG", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, red, black, 1)
  call vg.append(circ)
  call circ.setRadius(20)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.black, 1));
  vg.append(circ);
  circ.setRadius(20);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="22.5%" stroke="#000000" stroke-width="0.3%" fill="#ff0000" />
</svg>
`,
    );
  });

  test("Pass_WithSetPropertyOnVG", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, red, black, 1)
  let vg2 be vg.withAppend(circ)
  let circ2 be circ.withFillColour(blue)
  let vg3 be vg2.withRemoveFirst(circ)
  let vg4 be vg3.withAppend(circ2)
  print vg4.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.black, 1));
  const vg2 = vg.withAppend(circ);
  const circ2 = circ.withFillColour(_stdlib.blue);
  const vg3 = vg2.withRemoveFirst(circ);
  const vg4 = vg3.withAppend(circ2);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg4));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#0000ff" />
</svg>
`,
    );
  });
  test("Pass_ReadPropertyOnObject", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let circ be new CircleVG(50, 50, 10, red, black, 1)
  print circ.centreX
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.black, 1));
  await system.printLine(circ.centreX);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `50`);
  });

  test("Pass_TransparentFill", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, transparent, black, 1)
  let vg2 be vg.withAppend(circ)
  print vg2.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.transparent, _stdlib.black, 1));
  const vg2 = vg.withAppend(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="none" />
</svg>
`,
    );
  });

  test("Pass_StrokeCannotBeTransparent", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, red, transparent, 1)
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.red, _stdlib.transparent, 1));
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `stroke (colour) cannot be negative because a stroke cannot be transparent`,
    );
  });

  test("Pass_colourCannotBeLargerThanFFFFFF", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(50, 50, 10, white + 1, black, 1)
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(50, 50, 10, _stdlib.white + 1, _stdlib.black, 1));
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `colour must be in the range 0x0 to 0xffffff (0 to 16777215)`,
    );
  });
});
