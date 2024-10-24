import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("VectorGraphics", () => {
  test("Fail_CannotCreateAbstractClass", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  var svg set to new BaseVG()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["BaseVG must be concrete to new"]);
  });

  test("Pass_VectorGraphicsEmpty", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  print vg.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  system.printLine(_stdlib.asString(vg.asHtml()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="266" height="200" xmlns="http://www.w3.org/2000/svg">
</svg>
`,
    );
  });

  test("Pass_AddDefaultObjects", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let line be new LineVG()
  let rect be new RectangleVG()
  let vg2 be vg.add(circ).add(line).add(rect)
  print vg2.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const line = system.initialise(new _stdlib.LineVG());
  const rect = system.initialise(new _stdlib.RectangleVG());
  const vg2 = vg.add(circ).add(line).add(rect);
  system.printLine(_stdlib.asString(vg2.asHtml()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="266" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="10" stroke="#000000" stroke-width="1" fill="#ffff00" />
  <line x1="0" y1="0" x2="100" y2="100" stroke="#000000" stroke-width="1" />
  <rect x="30" y="40" width="20" height="10" stroke="#000000" stroke-width="1" fill="#0000ff" />
</svg>
`,
    );
  });
  test("Pass_FullySpecifiedObject", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG() with cx to 90, cy to 70, r to 13, stroke to red, strokeWidth to 2, fill to green
  let vg2 be vg.add(circ)
  print vg2.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = (() => {const _a = {...system.initialise(new _stdlib.CircleVG())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new _stdlib.CircleVG()))); _a.cx = 90; _a.cy = 70; _a.r = 13; _a.stroke = _stdlib.red; _a.strokeWidth = 2; _a.fill = _stdlib.green; return _a;})();
  const vg2 = vg.add(circ);
  system.printLine(_stdlib.asString(vg2.asHtml()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="266" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="90" cy="70" r="13" stroke="#ff0000" stroke-width="2" fill="#008000" />
</svg>
`,
    );
  });
  test("Pass_ReplaceObject", async () => {
    const code = `# FFFF Elan Beta 3 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let vg2 be vg.add(circ)
  let circ2 be copy circ with fill to green
  let vg3 be vg2.replace(circ, circ2)
  print vg3.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const vg2 = vg.add(circ);
  const circ2 = (() => {const _a = {...circ}; Object.setPrototypeOf(_a, Object.getPrototypeOf(circ)); _a.fill = _stdlib.green; return _a;})();
  const vg3 = vg2.replace(circ, circ2);
  system.printLine(_stdlib.asString(vg3.asHtml()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      `<svg width="266" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="10" stroke="#000000" stroke-width="1" fill="#008000" />
</svg>
`,
    );
  });
});
