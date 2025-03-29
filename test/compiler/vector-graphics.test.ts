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
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000"/>
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
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000"/>
</svg>
`,
    );
  });

  test("Pass_SetPropertyOnVG", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG(0, 0, 0, 0, 0, 0)
  call vg.append(circ)
  call circ.setRadius(20)
  call circ.setCentreX(30)
  call circ.setCentreY(40)
  call circ.setFillColour(blue)
  call circ.setStrokeColour(yellow)
  call circ.setStrokeWidth(2)
  let line be new LineVG(0, 0, 0, 0, 0, 0)
  call vg.append(line)
  call line.setX1(10)
  call line.setY1(15)
  call line.setX2(20)
  call line.setY2(30)
  call line.setStrokeColour(blue)
  call line.setStrokeWidth(3)
  let rect be new RectangleVG(0, 0, 0, 0, 0, 0, 0)
  call vg.append(rect)
  call rect.setX(10)
  call rect.setY(15)
  call rect.setWidth(20)
  call rect.setHeight(30)
  call rect.setFillColour(green)
  call rect.setStrokeColour(blue)
  call rect.setStrokeWidth(3)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise(0, 0, 0, 0, 0, 0));
  vg.append(circ);
  circ.setRadius(20);
  circ.setCentreX(30);
  circ.setCentreY(40);
  circ.setFillColour(_stdlib.blue);
  circ.setStrokeColour(_stdlib.yellow);
  circ.setStrokeWidth(2);
  const line = system.initialise(await new _stdlib.LineVG()._initialise(0, 0, 0, 0, 0, 0));
  vg.append(line);
  line.setX1(10);
  line.setY1(15);
  line.setX2(20);
  line.setY2(30);
  line.setStrokeColour(_stdlib.blue);
  line.setStrokeWidth(3);
  const rect = system.initialise(await new _stdlib.RectangleVG()._initialise(0, 0, 0, 0, 0, 0, 0));
  vg.append(rect);
  rect.setX(10);
  rect.setY(15);
  rect.setWidth(20);
  rect.setHeight(30);
  rect.setFillColour(_stdlib.green);
  rect.setStrokeColour(_stdlib.blue);
  rect.setStrokeWidth(3);
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
<circle cx="30%" cy="53.333333333333336%" r="22.5%" stroke="#ffff00" stroke-width="0.6%" fill="#0000ff"/>
<line x1="10%" y1="20%" x2="20%" y2="40%" stroke="#0000ff" stroke-width="0.8999999999999999%"/>
<rect x="10%" y="20%" width="20%" height="40%" stroke="#0000ff" stroke-width="0.8999999999999999%" fill="#008000"/>
</svg>
`,
    );
  });

  test("Pass_WithSetPropertyOnVG", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable vg set to new List<of VectorGraphic>()
  variable circ set to new CircleVG(0, 0, 0, 0, 0, 0)
  set circ to circ.withRadius(20)
  set circ to circ.withCentreX(30)
  set circ to circ.withCentreY(40)
  set circ to circ.withFillColour(blue)
  set circ to circ.withStrokeColour(yellow)
  set circ to circ.withStrokeWidth(2)
  set vg to vg.withAppend(circ)
  variable line set to new LineVG(0, 0, 0, 0, 0, 0)
  set line to line.withX1(10)
  set line to line.withY1(15)
  set line to line.withX2(20)
  set line to line.withY2(30)
  set line to line.withStrokeColour(blue)
  set line to line.withStrokeWidth(3)
  set vg to vg.withAppend(line)
  variable rect set to new RectangleVG(0, 0, 0, 0, 0, 0, 0)
  set rect to rect.withX(10)
  set rect to rect.withY(15)
  set rect to rect.withWidth(20)
  set rect to rect.withHeight(30)
  set rect to rect.withFillColour(green)
  set rect to rect.withStrokeColour(blue)
  set rect to rect.withStrokeWidth(3)
  set vg to vg.withAppend(rect)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = system.initialise(await new _stdlib.CircleVG()._initialise(0, 0, 0, 0, 0, 0));
  circ = circ.withRadius(20);
  circ = circ.withCentreX(30);
  circ = circ.withCentreY(40);
  circ = circ.withFillColour(_stdlib.blue);
  circ = circ.withStrokeColour(_stdlib.yellow);
  circ = circ.withStrokeWidth(2);
  vg = vg.withAppend(circ);
  let line = system.initialise(await new _stdlib.LineVG()._initialise(0, 0, 0, 0, 0, 0));
  line = line.withX1(10);
  line = line.withY1(15);
  line = line.withX2(20);
  line = line.withY2(30);
  line = line.withStrokeColour(_stdlib.blue);
  line = line.withStrokeWidth(3);
  vg = vg.withAppend(line);
  let rect = system.initialise(await new _stdlib.RectangleVG()._initialise(0, 0, 0, 0, 0, 0, 0));
  rect = rect.withX(10);
  rect = rect.withY(15);
  rect = rect.withWidth(20);
  rect = rect.withHeight(30);
  rect = rect.withFillColour(_stdlib.green);
  rect = rect.withStrokeColour(_stdlib.blue);
  rect = rect.withStrokeWidth(3);
  vg = vg.withAppend(rect);
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
<circle cx="30%" cy="53.333333333333336%" r="22.5%" stroke="#ffff00" stroke-width="0.6%" fill="#0000ff"/>
<line x1="10%" y1="20%" x2="20%" y2="40%" stroke="#0000ff" stroke-width="0.8999999999999999%"/>
<rect x="10%" y="20%" width="20%" height="40%" stroke="#0000ff" stroke-width="0.8999999999999999%" fill="#008000"/>
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
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="none"/>
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
