import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T34_ConcreteClasses', () => {

  ignore_test('Pass_Class_SimpleInstantiation_PropertyAccess_Methods', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  print x.p1
  print x.p2
  print x.asString()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 Int

  property p2 String

  function asString() as String
        return ""
  end function

end class`;

    const objectCode = `var system : any; export function _inject(l : any) { system = l; };
export async function main() {
  var x = new Foo();
  system.print(system.asString(x.p1));
  system.print(system.asString(x.p2));
  system.print(system.asString(x.asString()));
}

class Foo {
  constructor() {
    this.p1 = 5;
  }

  p1 : number;

  p2 : string;

  asString() : string {
    return "";
  }

}
`;

    const fileImpl = new FileImpl(() => "", true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "123");
  });

 

});