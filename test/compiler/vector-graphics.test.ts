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
  var svg set to new BaseVG()
end main`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["BaseVG must be concrete to new"]);
  });

  test("Pass_VectorGraphicsEmpty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  print vg.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
</svg>
`,
    );
  });

  test("Pass_AddDefaultObjects", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100%" cy="133.33333333333334%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ffff00" />
  <line x1="0%" y1="0%" x2="100%" y2="133.33333333333334%" stroke="#000000" stroke-width="0.3%" />
  <rect x="30%" y="53.333333333333336%" width="20%" height="13.333333333333334%" stroke="#000000" stroke-width="0.3%" fill="#0000ff" />
</svg>
`,
    );
  });

  test("Pass_FullySpecifiedObject", async () => {
    const code = `# FFFF Elan v1.0.0 valid

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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="90%" cy="93.33333333333333%" r="14.625%" stroke="#ff0000" stroke-width="0.6%" fill="#008000" />
</svg>
`,
    );
  });

  test("Pass_RemoveLast", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let line be new LineVG()
  let rect be new RectangleVG()
  let vg2 be vg.add(circ).add(line).add(rect)
  let vg3 be vg2.removeLast()
  print vg3.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const line = system.initialise(new _stdlib.LineVG());
  const rect = system.initialise(new _stdlib.RectangleVG());
  const vg2 = vg.add(circ).add(line).add(rect);
  const vg3 = vg2.removeLast();
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100%" cy="133.33333333333334%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ffff00" />
  <line x1="0%" y1="0%" x2="100%" y2="133.33333333333334%" stroke="#000000" stroke-width="0.3%" />
</svg>
`,
    );
  });

  test("Pass_Remove", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let line be new LineVG()
  let rect be new RectangleVG()
  let vg2 be vg.add(circ).add(line).add(rect)
  let vg3 be vg2.remove(line)
  print vg3.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const line = system.initialise(new _stdlib.LineVG());
  const rect = system.initialise(new _stdlib.RectangleVG());
  const vg2 = vg.add(circ).add(line).add(rect);
  const vg3 = vg2.remove(line);
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100%" cy="133.33333333333334%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#ffff00" />
  <rect x="30%" y="53.333333333333336%" width="20%" height="13.333333333333334%" stroke="#000000" stroke-width="0.3%" fill="#0000ff" />
</svg>
`,
    );
  });

  test("Pass_RemoveFirst", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let line be new LineVG()
  let rect be new RectangleVG()
  let vg2 be vg.add(circ).add(line).add(rect)
  let vg3 be vg2.remove(circ)
  print vg3.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const line = system.initialise(new _stdlib.LineVG());
  const rect = system.initialise(new _stdlib.RectangleVG());
  const vg2 = vg.add(circ).add(line).add(rect);
  const vg3 = vg2.remove(circ);
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <line x1="0%" y1="0%" x2="100%" y2="133.33333333333334%" stroke="#000000" stroke-width="0.3%" />
  <rect x="30%" y="53.333333333333336%" width="20%" height="13.333333333333334%" stroke="#000000" stroke-width="0.3%" fill="#0000ff" />
</svg>
`,
    );
  });

  test("Pass_Replace", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG()
  let line be new LineVG()
  let rect be new RectangleVG()
  let vg2 be vg.add(circ).add(line).add(rect)
  let circ2 be copy circ with fill to green
  let vg3 be vg2.replace(circ, circ2)
  print vg3.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = system.initialise(new _stdlib.CircleVG());
  const line = system.initialise(new _stdlib.LineVG());
  const rect = system.initialise(new _stdlib.RectangleVG());
  const vg2 = vg.add(circ).add(line).add(rect);
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100%" cy="133.33333333333334%" r="11.25%" stroke="#000000" stroke-width="0.3%" fill="#008000" />
  <line x1="0%" y1="0%" x2="100%" y2="133.33333333333334%" stroke="#000000" stroke-width="0.3%" />
  <rect x="30%" y="53.333333333333336%" width="20%" height="13.333333333333334%" stroke="#000000" stroke-width="0.3%" fill="#0000ff" />
</svg>
`,
    );
  });
  test("Pass_ReadPropertyOnObject", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let circ be new CircleVG()
  print circ.cx
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const circ = system.initialise(new _stdlib.CircleVG());
  system.printLine(_stdlib.asString(circ.cx));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, `100`);
  });

  test("Pass_TransparentFill", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG() with cx to 90, cy to 70, r to 13, stroke to red, strokeWidth to 2, fill to -1
  let vg2 be vg.add(circ)
  print vg2.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = (() => {const _a = {...system.initialise(new _stdlib.CircleVG())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new _stdlib.CircleVG()))); _a.cx = 90; _a.cy = 70; _a.r = 13; _a.stroke = _stdlib.red; _a.strokeWidth = 2; _a.fill = -1; return _a;})();
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
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <circle cx="90%" cy="93.33333333333333%" r="14.625%" stroke="#ff0000" stroke-width="0.6%" fill="none" />
</svg>
`,
    );
  });

  test("Pass_StrokeCannotBeNegative", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG() with stroke to -1
  let vg2 be vg.add(circ)
  print vg2.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = (() => {const _a = {...system.initialise(new _stdlib.CircleVG())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new _stdlib.CircleVG()))); _a.stroke = -1; return _a;})();
  const vg2 = vg.add(circ);
  system.printLine(_stdlib.asString(vg2.asHtml()));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeDoesNotExecute(
      fileImpl,
      `stroke colour cannot be negative (because a stroke cannot be transparent)`,
    );
  });
  test("Pass_ColourCannotBeLargerThanFFFFFF", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  let vg be new VectorGraphics()
  let circ be new CircleVG() with fill to 0x1000000
  let vg2 be vg.add(circ)
  print vg2.asHtml()
end main`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  const vg = system.initialise(new _stdlib.VectorGraphics());
  const circ = (() => {const _a = {...system.initialise(new _stdlib.CircleVG())}; Object.setPrototypeOf(_a, Object.getPrototypeOf(system.initialise(new _stdlib.CircleVG()))); _a.fill = 16777216; return _a;})();
  const vg2 = vg.add(circ);
  system.printLine(_stdlib.asString(vg2.asHtml()));
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
