import { StdLib } from "../../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../../src/ide/frames/file-impl";
import { Paradigm } from "../../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../../src/ide/stub-input-output";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "../compiler-test-helpers";

suite("Python Turtle Graphics", () => {
  test("Pass_MethodsUpdateTurtleState", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.turn(30) 
  t.move(40) 
  printNoLine(t.x.round(2)) 
  printNoLine(" ") 
  printNoLine(t.y.round(2)) 
  printNoLine(" ") 
  printNoLine(t.heading) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(30);
  await t.move(40);
  await _stdlib.printNoLine(_stdlib.round(t.x, 2));
  await _stdlib.printNoLine(" ");
  await _stdlib.printNoLine(_stdlib.round(t.y, 2));
  await _stdlib.printNoLine(" ");
  await _stdlib.printNoLine(t.heading);
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

    await assertObjectCodeExecutes(fileImpl, `20 34.64 30`);
  });

  test("Pass_HeadingNormalised", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.turn(90) 
  t.turn(1000) 
  printNoLine(t.heading) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.turn(1000);
  await _stdlib.printNoLine(t.heading);
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
    await assertObjectCodeExecutes(fileImpl, `10`);
  });
  test("Pass_HeadingNormalisedMinus", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.turn(90) 
  t.turn(-1000) 
  printNoLine(t.heading) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.turn((-1000));
  await _stdlib.printNoLine(t.heading);
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
    await assertObjectCodeExecutes(fileImpl, `170`);
  });
  test("Pass_StartPosition", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  printNoLine(t.x) 
  printNoLine(t.y) 
  printNoLine(t.heading) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await _stdlib.printNoLine(t.x);
  await _stdlib.printNoLine(t.y);
  await _stdlib.printNoLine(t.heading);
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
    await assertObjectCodeExecutes(fileImpl, `000`);
  });
  test("Pass_AsHtml", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.turn(90) 
  t.penWidth(3) 
  t.penColour(red) 
  t.move(10) 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  t.penWidth(3);
  t.penColour(_stdlib.red);
  await t.move(10);
  await _stdlib.printNoLine(t.asHtml());
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
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#ff0000" stroke-width="0.8999999999999999%"/>
<circle cx="55%" cy="50%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="55%" y1="50%" x2="56%" y2="50%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_PenUpDown", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.turn(90) 
  t.move(10) 
  t.penUp() 
  t.move(5) 
  t.penDown() 
  t.move(10) 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.move(10);
  t.penUp();
  await t.move(5);
  t.penDown();
  await t.move(10);
  await _stdlib.printNoLine(t.asHtml());
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
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<line x1="57.5%" y1="50%" x2="62.5%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="62.5%" cy="50%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="62.5%" y1="50%" x2="63.5%" y2="50%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_Show", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.show() 
  t.turn(90) 
  t.move(10) 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.turn(90);
  await t.move(10);
  await _stdlib.printNoLine(t.asHtml());
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
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="55%" cy="50%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="55%" y1="50%" x2="56%" y2="50%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_Hide", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.show() 
  t.turn(90) 
  t.move(10) 
  t.hide() 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.turn(90);
  await t.move(10);
  await t.hide();
  await _stdlib.printNoLine(t.asHtml());
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
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
</svg>
`,
    );
  });
  test("Pass_PlaceAt", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.show() 
  t.placeAt(20, 30) 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.placeAt(20, 30);
  await _stdlib.printNoLine(t.asHtml());
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
<circle cx="60%" cy="30%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="60%" y1="30%" x2="60%" y2="28.666666666666668%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_moveTo", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  t = Turtle() # variable definition
  t.show() 
  t.moveTo(20, 30) 
  printNoLine(t.asHtml()) 
# end main

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.moveTo(20, 30);
  await _stdlib.printNoLine(t.asHtml());
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
<line x1="50%" y1="50%" x2="60%" y2="30%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="60%" cy="30%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="60%" y1="30%" x2="60%" y2="28.666666666666668%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
});
