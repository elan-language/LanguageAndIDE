import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeDoesNotExecute,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Vector Graphics", () => {
  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  a = ((((3)))) # variable definition
  printNoLine(a) # procedure call
# end main

def main() -> None:
  svg = VectorGraphic() # variable definition
# end main

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "VectorGraphic must be concrete to create instance.ErrorMessages.html#compile_error",
    ]);
  });

  test("Pass_useCreateVectorGraphics", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  svg = VectorGraphic() # variable definition
# end main

def main() -> None:
  vg = createVectorGraphics() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = (await _stdlib.createVectorGraphics());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.red).withStrokeWidth(1);
  let vg2 = vg.withAppend(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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

  test("Pass_AppendUsingFunction", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  vg = createVectorGraphics() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.red).withStrokeWidth(1);
  let vg2 = vg.withAppend(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.red).withStrokeWidth(1);
  vg.append(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = CircleVG() # variable definition
  vg.append(circ) # procedure call
  circ.setRadius(20) # procedure call
  circ.setCentreX(30) # procedure call
  circ.setCentreY(40) # procedure call
  circ.setFillColour(blue) # procedure call
  circ.setStrokeColour(yellow) # procedure call
  circ.setStrokeWidth(2) # procedure call
  line = LineVG() # variable definition
  vg.append(line) # procedure call
  line.setX1(10) # procedure call
  line.setY1(15) # procedure call
  line.setX2(20) # procedure call
  line.setY2(30) # procedure call
  line.setStrokeColour(blue) # procedure call
  line.setStrokeWidth(3) # procedure call
  rect = RectangleVG() # variable definition
  vg.append(rect) # procedure call
  rect.setX(10) # procedure call
  rect.setY(15) # procedure call
  rect.setWidth(20) # procedure call
  rect.setHeight(30) # procedure call
  rect.setFillColour(green) # procedure call
  rect.setStrokeColour(blue) # procedure call
  rect.setStrokeWidth(3) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = system.initialise(await new _stdlib.CircleVG()._initialise());
  vg.append(circ);
  circ.setRadius(20);
  circ.setCentreX(30);
  circ.setCentreY(40);
  circ.setFillColour(_stdlib.blue);
  circ.setStrokeColour(_stdlib.yellow);
  circ.setStrokeWidth(2);
  let line = system.initialise(await new _stdlib.LineVG()._initialise());
  vg.append(line);
  line.setX1(10);
  line.setY1(15);
  line.setX2(20);
  line.setY2(30);
  line.setStrokeColour(_stdlib.blue);
  line.setStrokeWidth(3);
  let rect = system.initialise(await new _stdlib.RectangleVG()._initialise());
  vg.append(rect);
  rect.setX(10);
  rect.setY(15);
  rect.setWidth(20);
  rect.setHeight(30);
  rect.setFillColour(_stdlib.green);
  rect.setStrokeColour(_stdlib.blue);
  rect.setStrokeWidth(3);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = CircleVG() # variable definition
  vg.append(circ) # procedure call
  circ.setRadius(20) # procedure call
  circ.setCentreX(30) # procedure call
  circ.setCentreY(40) # procedure call
  circ.setFillColour(blue) # procedure call
  circ.setStrokeColour(yellow) # procedure call
  circ.setStrokeWidth(2) # procedure call
  line = LineVG() # variable definition
  vg.append(line) # procedure call
  line.setX1(10) # procedure call
  line.setY1(15) # procedure call
  line.setX2(20) # procedure call
  line.setY2(30) # procedure call
  line.setStrokeColour(blue) # procedure call
  line.setStrokeWidth(3) # procedure call
  rect = RectangleVG() # variable definition
  vg.append(rect) # procedure call
  rect.setX(10) # procedure call
  rect.setY(15) # procedure call
  rect.setWidth(20) # procedure call
  rect.setHeight(30) # procedure call
  rect.setFillColour(green) # procedure call
  rect.setStrokeColour(blue) # procedure call
  rect.setStrokeWidth(3) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = CircleVG() # variable definition
  circ = circ.withRadius(20) # assignment
  circ = circ.withCentreX(30) # assignment
  circ = circ.withCentreY(40) # assignment
  circ = circ.withFillColour(blue) # assignment
  circ = circ.withStrokeColour(yellow) # assignment
  circ = circ.withStrokeWidth(2) # assignment
  vg = vg.withAppend(circ) # assignment
  line = LineVG() # variable definition
  line = line.withX1(10) # assignment
  line = line.withY1(15) # assignment
  line = line.withX2(20) # assignment
  line = line.withY2(30) # assignment
  line = line.withStrokeColour(blue) # assignment
  line = line.withStrokeWidth(3) # assignment
  vg = vg.withAppend(line) # assignment
  rect = RectangleVG() # variable definition
  rect = rect.withX(10) # assignment
  rect = rect.withY(15) # assignment
  rect = rect.withWidth(20) # assignment
  rect = rect.withHeight(30) # assignment
  rect = rect.withFillColour(green) # assignment
  rect = rect.withStrokeColour(blue) # assignment
  rect = rect.withStrokeWidth(3) # assignment
  vg = vg.withAppend(rect) # assignment
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

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
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = CircleVG() # variable definition
  circ = circ.withRadius(20) # assignment
  circ = circ.withCentreX(30) # assignment
  circ = circ.withCentreY(40) # assignment
  circ = circ.withFillColour(blue) # assignment
  circ = circ.withStrokeColour(yellow) # assignment
  circ = circ.withStrokeWidth(2) # assignment
  vg = vg.withAppend(circ) # assignment
  line = LineVG() # variable definition
  line = line.withX1(10) # assignment
  line = line.withY1(15) # assignment
  line = line.withX2(20) # assignment
  line = line.withY2(30) # assignment
  line = line.withStrokeColour(blue) # assignment
  line = line.withStrokeWidth(3) # assignment
  vg = vg.withAppend(line) # assignment
  rect = RectangleVG() # variable definition
  rect = rect.withX(10) # assignment
  rect = rect.withY(15) # assignment
  rect = rect.withWidth(20) # assignment
  rect = rect.withHeight(30) # assignment
  rect = rect.withFillColour(green) # assignment
  rect = rect.withStrokeColour(blue) # assignment
  rect = rect.withStrokeWidth(3) # assignment
  vg = vg.withAppend(rect) # assignment
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withFillColour(black).withStrokeWidth(1) # variable definition
  printNoLine(circ.centreX) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.red).withFillColour(_stdlib.black).withStrokeWidth(1);
  await _stdlib.printNoLine(circ.centreX);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `50`);
  });

  test("Pass_TransparentFill", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(red).withFillColour(black).withStrokeWidth(1) # variable definition
  printNoLine(circ.centreX) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(transparent).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.transparent).withStrokeWidth(1);
  let vg2 = vg.withAppend(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg2));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(transparent).withStrokeWidth(1) # variable definition
  vg2 = vg.withAppend(circ) # variable definition
  printNoLine(vg2.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withStrokeColour(transparent).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withStrokeColour(_stdlib.transparent).withStrokeWidth(1);
  vg.append(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withStrokeColour(transparent).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(white + 1).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let circ = (system.initialise(await new _stdlib.CircleVG()._initialise())).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(_stdlib.white + 1).withStrokeWidth(1);
  vg.append(circ);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  circ = (CircleVG()).withCentreX(50).withCentreY(50).withRadius(10).withFillColour(white + 1).withStrokeWidth(1) # variable definition
  vg.append(circ) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  i = ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") # variable definition
  i = i.withX(50).withY(50).withWidth(50).withHeight(50) # assignment
  vg.append(i) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let vg = system.initialise(await new _stdlib.List()._initialise());
  let i = system.initialise(await new _stdlib.ImageVG()._initialise("https://elan-language.github.io/LanguageAndIDE/images/Debug.png"));
  i = i.withX(50).withY(50).withWidth(50).withHeight(50);
  vg.append(i);
  await _stdlib.printNoLine(_stdlib.vectorGraphicsAsHtml(vg));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
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
    const code = `${testPythonHeader}

def main() -> None:
  vg = list[VectorGraphic]() # variable definition
  i = ImageVG("https://elan-language.github.io/LanguageAndIDE/images/Debug.png") # variable definition
  i = i.withX(50).withY(50).withWidth(50).withHeight(50) # assignment
  vg.append(i) # procedure call
  printNoLine(vg.vectorGraphicsAsHtml()) # procedure call
# end main

def main() -> None:
  c = CircleVG() # variable definition
  x = c.centreX # variable definition
  printNoLine(x) # procedure call
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let c = system.initialise(await new _stdlib.CircleVG()._initialise());
  let x = c.centreX;
  await _stdlib.printNoLine(x);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `50`);
  });
});
