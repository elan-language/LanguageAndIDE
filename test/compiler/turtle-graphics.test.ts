import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("Turtle", () => {
  test("Pass_MethodsUpdateTurtleState", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.turn(30)
  call t.move(40)
  print round(t.x, 2)
  print " "
  print round(t.y, 2)
  print " "
  print t.heading
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.turn(30);
  t.move(40);
  system.printLine(_stdlib.asString(_stdlib.round(t.x, 2)));
  system.printLine(_stdlib.asString(" "));
  system.printLine(_stdlib.asString(_stdlib.round(t.y, 2)));
  system.printLine(_stdlib.asString(" "));
  system.printLine(_stdlib.asString(t.heading));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);

    await assertObjectCodeExecutes(fileImpl, `70 2.86 30`);
  });

  test("Pass_HeadingNormalised", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.turn(90)
  call t.turn(1000)
  print t.heading
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.turn(90);
  t.turn(1000);
  system.printLine(_stdlib.asString(t.heading));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `10`);
  });
  test("Pass_HeadingNormalisedMinus", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.turn(90)
  call t.turn(-1000)
  print t.heading
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.turn(90);
  t.turn(-1000);
  system.printLine(_stdlib.asString(t.heading));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `170`);
  });
  test("Pass_StartPosition", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  print t.x
  print t.y
  print t.heading
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  system.printLine(_stdlib.asString(t.x));
  system.printLine(_stdlib.asString(t.y));
  system.printLine(_stdlib.asString(t.heading));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `5037.50`);
  });
  test("Pass_AsHtml", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.turn(90)
  call t.penWidth(3)
  call t.penColour(red)
  call t.move(10)
  print t.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.turn(90);
  t.penWidth(3);
  t.penColour(_stdlib.red);
  t.move(10);
  system.printLine(_stdlib.asString(t.asHtml()));
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
  <line x1="50%" y1="50%" x2="60%" y2="50%" stroke="#ff0000" stroke-width="0.8999999999999999%" />
</svg>
`,
    );
  });
  test("Pass_PenUpDown", async () => {
    const code = `# FFFF Elan Beta 3 valid

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

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.turn(90);
  t.move(10);
  t.penUp();
  t.move(5);
  t.penDown();
  t.move(10);
  system.printLine(_stdlib.asString(t.asHtml()));
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
  <line x1="50%" y1="50%" x2="60%" y2="50%" stroke="#000000" stroke-width="0.3%" />
  <line x1="65%" y1="50%" x2="75%" y2="50%" stroke="#000000" stroke-width="0.3%" />
</svg>
`,
    );
  });
  test("Pass_Show", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.show()
  call t.turn(90)
  call t.move(10)
  print t.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.show();
  t.turn(90);
  t.move(10);
  system.printLine(_stdlib.asString(t.asHtml()));
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
  <line x1="50%" y1="50%" x2="60%" y2="50%" stroke="#000000" stroke-width="0.3%" />
  <circle cx="60%" cy="50%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000" />
  <line x1="60%" y1="50%" x2="62%" y2="50%" stroke="#000000" stroke-width="0.6%" />
</svg>
`,
    );
  });
  test("Pass_Hide", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.show()
  call t.turn(90)
  call t.move(10)
  call t.hide()
  print t.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.show();
  t.turn(90);
  t.move(10);
  t.hide();
  system.printLine(_stdlib.asString(t.asHtml()));
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
  <line x1="50%" y1="50%" x2="60%" y2="50%" stroke="#000000" stroke-width="0.3%" />
</svg>
`,
    );
  });
  test("Pass_PlaceAt", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let t be new Turtle()
  call t.show()
  call t.placeAt(20, 30)
  print t.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const t = system.initialise(new _stdlib.Turtle());
  t.show();
  t.placeAt(20, 30);
  system.printLine(_stdlib.asString(t.asHtml()));
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
  <circle cx="20%" cy="40%" r="2.25%" stroke="#000000" stroke-width="0%" fill="#008000" />
  <line x1="20%" y1="40%" x2="20%" y2="37.333333333333336%" stroke="#000000" stroke-width="0.6%" />
</svg>
`,
    );
  });
});
