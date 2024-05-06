import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T53_PrivateProperties', () => {

  ignore_test('Pass_PrivatePropertyCanBeDeclared', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
end main

class Foo
    constructor()
        set p1 to 5
        set p2 to "Apple"
    end constructor

    property p1 as Number

    private property p2 as String

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Foo());
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Number"], ["p2", "String"]]);};
  constructor() {
    this.p1 = 5;
    this.p2 = "Apple";
  }

  p1 = 0;

  #p2 = "";

  asString() {
    return "";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });



});
