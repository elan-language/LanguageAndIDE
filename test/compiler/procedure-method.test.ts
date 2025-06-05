import { DefaultProfile } from "../../src/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Procedure Method", () => {
  test("Pass_HappyCase", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.p1
  call f.setP1(7)
  print f.p1
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor
    property p1 as Float
    procedure setP1(value as Float)
        set property.p1 to value
    end procedure
    function asString() returns String
         return ""
    end function
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine(f.p1);
  await f.setP1(7);
  await system.printLine(f.p1);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async setP1(value) {
    this.p1 = value;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "57");
  });

  test("Pass_ProcedureCanContainSystemCall", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call f.display()
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Float

  procedure display()
      print property.p1
  end procedure

  function asString() returns String
    return ""
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await f.display();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async display() {
    await system.printLine(this.p1);
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "5");
  });

  test("Pass_ProcedureMethodMayCallOtherClassProcedureMethod", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  variable b set to new Bar()
  call f.times(b)
end main

class Foo
    constructor()
        set property.p1 to 5
    end constructor

    property p1 as Float

    procedure times(out b as Bar)
        call b.p1PlusOne()
        call p1PlusOne()
        set property.p1 to property.p1 + b.p1
        print property.p1
    end procedure

    procedure p1PlusOne()
        set property.p1 to property.p1 + 1
    end procedure

    function asString() returns String
         return ""
    end function

end class

class Bar
    constructor()
        set property.p1 to 1
    end constructor

    property p1 as Float

    procedure p1PlusOne()
        set property.p1 to property.p1 + 1
    end procedure

    function asString() returns String
         return ""
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  let b = system.initialise(await new Bar()._initialise());
  let _b81 = [b];
  await f.times(_b81);
  b = _b81[0];
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 5;
    return this;
  }

  p1 = 0;

  async times(b) {
    await b[0].p1PlusOne();
    await this.p1PlusOne();
    this.p1 = this.p1 + b[0].p1;
    await system.printLine(this.p1);
  }

  async p1PlusOne() {
    this.p1 = this.p1 + 1;
  }

  async asString() {
    return "";
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, [["p1", 0]]);};

  async _initialise() {
    this.p1 = 1;
    return this;
  }

  p1 = 0;

  async p1PlusOne() {
    this.p1 = this.p1 + 1;
  }

  async asString() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "8");
  });

  test("Fail_ProcedureMethodCannotBeCalledDirectly", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  call show(f)
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor

  property p1 as Float

  procedure show()
    print p1
  end procedure

  function asString() returns String
    return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'show' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_CallUnknownMethodOnInstance", async () => {
    const code = `${testHeader}

main
  variable x set to new Foo()
  call x.calculate()
end main

class Foo
  constructor()
      set property.p1 to 5
  end constructor
  property p1 as Int

  property p2 as String

  function asString() returns String
    return ""
  end function

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'calculate' is not defined for type 'Foo'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterUnknownType", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  procedure changeValue(a as Bar)

  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["'Bar' is not defined.LangRef.html#compile_error"]);
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  procedure if(a as Int)

  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' is a keyword, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  procedure break(a as Int)

  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_NotUniqueParameterName", async () => {
    const code = `${testHeader}

main

end main
    
class Foo
  constructor()
  end constructor
  
  procedure foo(a as Int, b as String, a as Int)
   
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, ["Name 'a' not unique in scope.LangRef.html#compile_error"]);
  });

  test("Fail_SetPropertyWithoutPrefix", async () => {
    const code = `${testHeader}

main

end main
    
class Foo
  constructor()
  end constructor
  
  procedure foo()
    set p1 to 4
  end procedure

  property p1 as Int
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_ParameterListOfMutableType", async () => {
    const code = `${testHeader}

class Foo
  procedure p1(a as ListImmutable<of List<of Int>>)
    
  end procedure
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "ListImmutable cannot be of mutable type 'List<of Int>'.LangRef.html#compile_error",
    ]);
  });
});
