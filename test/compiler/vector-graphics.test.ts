import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Vector Graphics", () => {
  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `${testHeader}

main
  variable svg set to new VectorGraphic()
end main`;

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
    assertDoesNotCompile(fileImpl, [
      "VectorGraphic must be concrete to new.LangRef.html#compile_error",
    ]);
  });

  test("Pass_AppendUsingFunction", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to red, strokeColour set to black, strokeWidth set to 1
  let vg2 be vg.withAppend(circ)
  print vg2.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.red; _a.strokeColour = _stdlib.black; _a.strokeWidth = 1; return _a;})();
  const vg2 = vg.withAppend(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg2));
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
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000"/>
</svg>
`,
    );
  });

  test("Pass_AppendUsingProcedure", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to red, strokeColour set to black, strokeWidth set to 1
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.red; _a.strokeColour = _stdlib.black; _a.strokeWidth = 1; return _a;})();
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
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
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ff0000"/>
</svg>
`,
    );
  });

  test("Pass_SetPropertyOnVG", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG()
  call vg.append(circ)
  call circ.setRadius(20)
  call circ.setCentreX(30)
  call circ.setCentreY(40)
  call circ.setFillColour(blue)
  call circ.setStrokeColour(yellow)
  call circ.setStrokeWidth(2)
  let line be new LineVG()
  call vg.append(line)
  call line.setX1(10)
  call line.setY1(15)
  call line.setX2(20)
  call line.setY2(30)
  call line.setStrokeColour(blue)
  call line.setStrokeWidth(3)
  let rect be new RectangleVG()
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
  const circ = system.initialise(await new _stdlib.CircleVG()._initialise());
  vg.append(circ);
  circ.setRadius(20);
  circ.setCentreX(30);
  circ.setCentreY(40);
  circ.setFillColour(_stdlib.blue);
  circ.setStrokeColour(_stdlib.yellow);
  circ.setStrokeWidth(2);
  const line = system.initialise(await new _stdlib.LineVG()._initialise());
  vg.append(line);
  line.setX1(10);
  line.setY1(15);
  line.setX2(20);
  line.setY2(30);
  line.setStrokeColour(_stdlib.blue);
  line.setStrokeWidth(3);
  const rect = system.initialise(await new _stdlib.RectangleVG()._initialise());
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
    const code = `${testHeader}

main
  variable vg set to new List<of VectorGraphic>()
  variable circ set to new CircleVG()
  set circ to circ.withRadius(20)
  set circ to circ.withCentreX(30)
  set circ to circ.withCentreY(40)
  set circ to circ.withFillColour(blue)
  set circ to circ.withStrokeColour(yellow)
  set circ to circ.withStrokeWidth(2)
  set vg to vg.withAppend(circ)
  variable line set to new LineVG()
  set line to line.withX1(10)
  set line to line.withY1(15)
  set line to line.withX2(20)
  set line to line.withY2(30)
  set line to line.withStrokeColour(blue)
  set line to line.withStrokeWidth(3)
  set vg to vg.withAppend(line)
  variable rect set to new RectangleVG()
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
  let circ = system.initialise(await new _stdlib.CircleVG()._initialise());
  circ = circ.withRadius(20);
  circ = circ.withCentreX(30);
  circ = circ.withCentreY(40);
  circ = circ.withFillColour(_stdlib.blue);
  circ = circ.withStrokeColour(_stdlib.yellow);
  circ = circ.withStrokeWidth(2);
  vg = vg.withAppend(circ);
  let line = system.initialise(await new _stdlib.LineVG()._initialise());
  line = line.withX1(10);
  line = line.withY1(15);
  line = line.withX2(20);
  line = line.withY2(30);
  line = line.withStrokeColour(_stdlib.blue);
  line = line.withStrokeWidth(3);
  vg = vg.withAppend(line);
  let rect = system.initialise(await new _stdlib.RectangleVG()._initialise());
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
    const code = `${testHeader}

main
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to red, strokeColour set to black, strokeWidth set to 1
  print circ.centreX
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.red; _a.strokeColour = _stdlib.black; _a.strokeWidth = 1; return _a;})();
  await system.printLine(circ.centreX);
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
    await assertObjectCodeExecutes(fileImpl, `50`);
  });

  test("Pass_TransparentFill", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to transparent, strokeColour set to black, strokeWidth set to 1
  let vg2 be vg.withAppend(circ)
  print vg2.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.transparent; _a.strokeColour = _stdlib.black; _a.strokeWidth = 1; return _a;})();
  const vg2 = vg.withAppend(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg2));
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
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="50%" cy="66.66666666666667%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="none"/>
</svg>
`,
    );
  });

  test("Pass_StrokeCannotBeTransparent", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to transparent, strokeColour set to transparent, strokeWidth set to 1
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.transparent; _a.strokeColour = _stdlib.transparent; _a.strokeWidth = 1; return _a;})();
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `strokeColour cannot be transparent (negative value)`,
    );
  });

  test("Pass_colourCannotBeLargerThanFFFFFF", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let circ be new CircleVG() with centreX set to 50, centreY set to 50, radius set to 10, fillColour set to white + 1, strokeColour set to black, strokeWidth set to 1
  call vg.append(circ)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const circ = await (async () => {const _a = {...system.initialise(await new _stdlib.CircleVG()._initialise())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.CircleVG()._initialise()))); _a.centreX = 50; _a.centreY = 50; _a.radius = 10; _a.fillColour = _stdlib.white + 1; _a.strokeColour = _stdlib.black; _a.strokeWidth = 1; return _a;})();
  vg.append(circ);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
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
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `colour must be in the range 0x0 to 0xffffff (0 to 16777215)`,
    );
  });
  test("Pass_Image", async () => {
    const code = `${testHeader}

main
  let vg be new List<of VectorGraphic>()
  let i be new ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") with x set to 50, y set to 50, width set to 50, height set to 50
  call vg.append(i)
  print vg.vectorGraphicsAsHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const vg = system.initialise(await new _stdlib.List()._initialise());
  const i = await (async () => {const _a = {...system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png"))}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png")))); _a.x = 50; _a.y = 50; _a.width = 50; _a.height = 50; return _a;})();
  vg.append(i);
  await system.printLine(_stdlib.vectorGraphicsAsHtml(vg));
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
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<image x="50%" y="66.66666666666667%" width="50" height="66.66666666666667" href="https://elan-language.github.io/LanguageAndIDE/images/Debug.png" title="" alt=""/>
</svg>
`,
    );
  });

  test("Pass_propertyAccess", async () => {
    const code = `${testHeader}

main
  let c be new CircleVG()
  let x be c.centreX
  print x
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const c = system.initialise(await new _stdlib.CircleVG()._initialise());
  const x = c.centreX;
  await system.printLine(x);
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
    await assertObjectCodeExecutes(fileImpl, `50`);
  });
});
