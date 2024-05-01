import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotCompile, assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T43_Inheritance', () => {

  test('Pass_DefineAbstractClassAndInheritFromIt', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
  var l set to new List<of Foo>() + x
  print x.p1
  print x.p2
  print x.product()
  call x.setP1(4)
  print x.product()
end main

abstract class Foo
  abstract property p1 as Int
  abstract property p2 as Int 
  abstract procedure setP1(v as Int)
  abstract function product() return Int
end class

class Bar inherits Foo
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Int
    property p2 as Int

    procedure setP1(p1 as Int)
        set property.p1 to p1
    end procedure

    function product() return Int
        return p1 * p2
    end function

    function asString() return String 
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  var l = system.concat(system.initialise(system.list(new Array()), ["Foo"]), x);
  system.print(_stdlib.asString(x.p1));
  system.print(_stdlib.asString(x.p2));
  system.print(_stdlib.asString(x.product()));
  x.setP1(4);
  system.print(_stdlib.asString(x.product()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"], ["p2", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  get p2() {
    return 0;
  }
  set p2(p2) {
  }

  setP1(v) {
  }

  product() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"], ["p2", "Int"]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = 4;
  }

  p1 = 0;

  p2 = 0;

  setP1(p1) {
    this.p1 = p1;
  }

  product() {
    return this.p1 * this.p2;
  }

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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test('Pass_InheritFromMoreThanOneAbstractClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
  var l set to new List<of Foo>() + x
  print x.p1
  print x.p2
  print x.product()
  call x.setP1(4)
  print x.product()
end main

abstract class Foo
  abstract property p1 as Int
  abstract property p2 as Int 
end class

abstract class Yon
  abstract procedure setP1(v as Int)
  abstract function product() return Int
end class

class Bar inherits Foo, Yon
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Int
    property p2 as Int

    procedure setP1(p1 as Int)
        set property.p1 to p1
    end procedure

    function product() return Int
        return p1 * p2
    end function

    function asString() return String 
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  var l = system.concat(system.initialise(system.list(new Array()), ["Foo"]), x);
  system.print(_stdlib.asString(x.p1));
  system.print(_stdlib.asString(x.p2));
  system.print(_stdlib.asString(x.product()));
  x.setP1(4);
  system.print(_stdlib.asString(x.product()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"], ["p2", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  get p2() {
    return 0;
  }
  set p2(p2) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Yon {
  static defaultInstance() { return system.defaultClass(Yon, []);};
  setP1(v) {
  }

  product() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"], ["p2", "Int"]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = 4;
  }

  p1 = 0;

  p2 = 0;

  setP1(p1) {
    this.p1 = p1;
  }

  product() {
    return this.p1 * this.p2;
  }

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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });

  test('Pass_SuperclassesCanDefineSameMember', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
  var l set to new List<of Foo>() + x
  print x.p1
  print x.p2
  print x.product()
  call x.setP1(4)
  print x.product()
end main

abstract class Foo
  abstract property p1 as Int
  abstract property p2 as Int 
end class

abstract class Yon
  abstract property p1 as Int 
  abstract procedure setP1(v as Int)
  abstract function product() return Int
end class

class Bar inherits Foo, Yon
    constructor()
        set p1 to 3
        set p2 to 4
    end constructor
    property p1 as Int
    property p2 as Int

    procedure setP1(p1 as Int)
        set property.p1 to p1
    end procedure

    function product() return Int
        return p1 * p2
    end function

    function asString() return String 
        return ""
    end function
end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var x = system.initialise(new Bar());
  var l = system.concat(system.initialise(system.list(new Array()), ["Foo"]), x);
  system.print(_stdlib.asString(x.p1));
  system.print(_stdlib.asString(x.p2));
  system.print(_stdlib.asString(x.product()));
  x.setP1(4);
  system.print(_stdlib.asString(x.product()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["p1", "Int"], ["p2", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  get p2() {
    return 0;
  }
  set p2(p2) {
  }

  asString() {
    return "empty Abstract Class Foo";
  }
}

class Yon {
  static defaultInstance() { return system.defaultClass(Yon, [["p1", "Int"]]);};
  get p1() {
    return 0;
  }
  set p1(p1) {
  }

  setP1(v) {
  }

  product() {
    return 0;
  }

  asString() {
    return "empty Abstract Class Yon";
  }
}

class Bar {
  static defaultInstance() { return system.defaultClass(Bar, [["p1", "Int"], ["p2", "Int"]]);};
  constructor() {
    this.p1 = 3;
    this.p2 = 4;
  }

  p1 = 0;

  p2 = 0;

  setP1(p1) {
    this.p1 = p1;
  }

  product() {
    return this.p1 * this.p2;
  }

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
    await assertObjectCodeExecutes(fileImpl, "341216");
  });


  test('Fail_CannotInheritFromConcreteClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
end main

class Foo
    constructor()
    end constructor

    property p1 as Int

    property p2 as Int

end class

class Bar inherits Foo
    constructor()
    end constructor

    property p1 as Int

    property p2 as Int

end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass Class Foo must be abstract"]);
  });

  test('Fail_AbstractClassCannotInheritFromConcreteClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
end main

class Foo
    constructor()
    end constructor

    property p1 as Int
  
    property p2 as Int

    function asString() return String 
        return ""
    end function
end class

abstract class Bar inherits Foo
    abstract property p1 as Int
    abstract property p2 as Int
end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Superclass Class Foo must be abstract"]);
  });

  test('Fail_MustImplementAllInheritedMethods', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as Int

    abstract procedure setP1(v as Int)

    abstract function product() return Int
end class

class Bar inherits Foo
    constructor()
      set p1 to 3
    end constructor

    property p1 as Int

    function asString() return String 
        return ""
    end function
end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Class Bar must implement Class Foo.p2",
      "Class Bar must implement Class Foo.setP1",
      "Class Bar must implement Class Foo.product"]);
  });

  test('Fail_MustCorrectlyImplementAllInheritedMethods', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var x set to new Bar()
end main

abstract class Foo
    abstract property p1 as Int
    abstract property p2 as Int

    abstract procedure setP1(v as Int)

    abstract function product() return Int
end class

class Bar inherits Foo
    constructor()
      set p1 to 3
    end constructor

    property p1 as Int
    property p2 as String

    procedure setP1(v as String)
    end procedure

    function product() return String
      return ""
    end function

    function asString() return String 
        return ""
    end function
end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Expression must be Int",
      "Expression must be Procedure (Int)",
      "Expression must be Function () : Int"]);
  });









  test('Fail_CannotInstantiateAbstractClass', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
    var a set to new Bar()
end main

abstract class Bar
    abstract property p1 as Int
    abstract property p2 as Int
end class`;



    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["Class Bar must be concrete to new"]);
  });


});