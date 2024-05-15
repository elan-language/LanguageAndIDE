import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash, transforms } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T51_ProcedureMethods', () => {

  test('Pass_HappyCase', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.p1
  call f.setP1(7)
  print f.p1
end main

class Foo
    constructor()
        set p1 to 5
    end constructor
    property p1 as Float
    procedure setP1(value as Float)
        set p1 to value
    end procedure
    function asString() return String
         return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.p1));
  f.setP1(7);
  system.print(_stdlib.asString(f.p1));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  setP1(value) {
    this.p1 = value;
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "57");
  });

  test('Pass_ProcedureCanContainSystemCall', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call f.display()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Float

  procedure display()
      print p1
  end procedure

  function asString() return String
    return ""
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  f.display();
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  display() {
    system.print(_stdlib.asString(this.p1));
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test('Pass_CallGlobalProcedure', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call f.setP1(7)
end main

class Foo
    constructor()
        set p1 to 5
    end constructor
    property p1 as Float
    procedure setP1(value as Float)
        set p1 to value
        call global.setP1(value)
    end procedure
    function asString() return String
         return ""
    end function
end class

procedure setP1(value as Float)
  print value
end procedure`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  f.setP1(7);
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  setP1(value) {
    this.p1 = value;
    setP1(value);
  }

  asString() {
    return "";
  }

}

function setP1(value) {
  system.print(_stdlib.asString(value));
}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "7");
  });

  test('Pass_ProcedureMethodMayCallOtherClassProcedureMethod', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  var b set to new Bar()
  call f.times(b)
end main

class Foo
    constructor()
        set p1 to 5
    end constructor

    property p1 as Float

    procedure times(b as Bar)
        call b.p1PlusOne()
        call p1PlusOne()
        set p1 to p1 + b.p1
        print p1
    end procedure

    procedure p1PlusOne()
        set p1 to p1 + 1
    end procedure

    function asString() return String
         return ""
    end function

end class

class Bar
    constructor()
        set p1 to 1
    end constructor

    property p1 as Float

    procedure p1PlusOne()
        set p1 to p1 + 1
    end procedure

    function asString() return String
         return ""
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  var b = system.initialise(new Bar());
  f.times(b);
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 5;
  }

  p1 = 0;

  times(b) {
    b.p1PlusOne();
    this.p1PlusOne();
    this.p1 = this.p1 + b.p1;
    system.print(_stdlib.asString(this.p1));
  }

  p1PlusOne() {
    this.p1 = this.p1 + 1;
  }

  asString() {
    return "";
  }

}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Float"]]);};
  constructor() {
    this.p1 = 1;
  }

  p1 = 0;

  p1PlusOne() {
    this.p1 = this.p1 + 1;
  }

  asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "8");
  });

  test('Fail_ProcedureMethodCannotBeCalledDirectly', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  call display(f)
end main

class Foo
  constructor()
      set p1 to 5
  end constructor

  property p1 as Float

  procedure display()
    print p1
  end procedure

  function asString() return String
    return ""
  end function

end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);
  });

  test('Fail_CallUnknownMethodOnInstance', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Foo()
  call x.calculate()
end main

class Foo
  constructor()
      set p1 to 5
  end constructor
  property p1 as Int

  property p2 as String

  function asString() return String
    return ""
  end function

end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Undeclared id"]);
  });

});