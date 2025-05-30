import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Turtle Graphics", () => {
  test("Pass_MethodsUpdateTurtleState", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.turn(30)
  call t.move(40)
  print t.x.round(2)
  print " "
  print t.y.round(2)
  print " "
  print t.heading
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(30);
  await t.move(40);
  await system.printLine(_stdlib.round(t.x, 2));
  await system.printLine(" ");
  await system.printLine(_stdlib.round(t.y, 2));
  await system.printLine(" ");
  await system.printLine(t.heading);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);

    await assertObjectCodeExecutes(fileImpl, `20 34.64 30`);
  });

  test("Pass_HeadingNormalised", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.turn(90)
  call t.turn(1000)
  print t.heading
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.turn(1000);
  await system.printLine(t.heading);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `10`);
  });
  test("Pass_HeadingNormalisedMinus", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.turn(90)
  call t.turn(-1000)
  print t.heading
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.turn((-1000));
  await system.printLine(t.heading);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `170`);
  });
  test("Pass_StartPosition", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  print t.x
  print t.y
  print t.heading
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await system.printLine(t.x);
  await system.printLine(t.y);
  await system.printLine(t.heading);
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `000`);
  });
  test("Pass_AsHtml", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.turn(90)
  call t.penWidth(3)
  call t.penColour(red)
  call t.move(10)
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  t.penWidth(3);
  t.penColour(_stdlib.red);
  await t.move(10);
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#ff0000" stroke-width="0.8999999999999999%"/>
<circle cx="10%" cy="8.164311994315688e-16%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="10%" y1="8.164311994315688e-16%" x2="12%" y2="9.797174393178826e-16%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_PenUpDown", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.turn(90)
  call t.move(10)
  call t.penUp()
  call t.move(5)
  call t.penDown()
  call t.move(10)
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.turn(90);
  await t.move(10);
  t.penUp();
  await t.move(5);
  t.penDown();
  await t.move(10);
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<line x1="57.5%" y1="50%" x2="62.5%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="25%" cy="2.0410779985789223e-15%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="25%" y1="2.0410779985789223e-15%" x2="27%" y2="2.2043642384652362e-15%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_Show", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.show()
  call t.turn(90)
  call t.move(10)
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.turn(90);
  await t.move(10);
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="50%" y1="50%" x2="55%" y2="50%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="10%" cy="8.164311994315688e-16%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="10%" y1="8.164311994315688e-16%" x2="12%" y2="9.797174393178826e-16%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_Hide", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.show()
  call t.turn(90)
  call t.move(10)
  call t.hide()
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.turn(90);
  await t.move(10);
  await t.hide();
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
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
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.show()
  call t.placeAt(20, 30)
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.placeAt(20, 30);
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<circle cx="20%" cy="40%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="20%" y1="40%" x2="20%" y2="42.666666666666664%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
  test("Pass_moveTo", async () => {
    const code = `${testHeader}

main
  let t be new Turtle()
  call t.show()
  call t.moveTo(20, 30)
  print t.asHtml()
end main`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  const t = system.initialise(await new _stdlib.Turtle()._initialise());
  await t.show();
  await t.moveTo(20, 30);
  await system.printLine(t.asHtml());
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
<line x1="50%" y1="50%" x2="60%" y2="30%" stroke="#000000" stroke-width="0.3%"/>
<circle cx="20%" cy="40%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000"/>
<line x1="20%" y1="40%" x2="20%" y2="42.666666666666664%" stroke="#000000" stroke-width="0.6%"/>
</svg>
`,
    );
  });
});
