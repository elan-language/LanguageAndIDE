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

suite("Associations and Defaults", () => {
  test("Pass_CanHavePropertiesThatAreDataStructuresOrObjects", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  print g.p2
  print g.p1
  print g.previousScores
end main

class Game
    constructor()
      set property.p2 to new Player("Chloe")
      set property.p1 to new Player("Joe")
      set property.previousScores to {5, 2, 4}
    end constructor

    property p1 as Player
    property p2 as Player

    property previousScores as List<of Int>

    function asString() returns String
        return "A game"
    end function

end class

class Player
    constructor(name as String)
        set property.name to name
    end constructor

    property name as String

    function asString() returns String
        return property.name
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  system.printLine(g.p2);
  system.printLine(g.p1);
  system.printLine(g.previousScores);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["previousScores", system.emptyImmutableList()]]);};
  constructor() {
    this.p2 = system.initialise(new Player("Chloe"));
    this.p1 = system.initialise(new Player("Joe"));
    this.previousScores = system.list([5, 2, 4]);
  }

  _p1;
  get p1() {
    return this._p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.emptyInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  previousScores = system.emptyImmutableList();

  asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ChloeJoe{5, 2, 4}");
  });

  test("Pass_AssignProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Foo()
  print g.p1
  print g.p2
end main

class Foo
    constructor()
      set property.p2 to 1
      set property.p1 to property.p2
    end constructor

    property p1 as Int
    property p2 as Int
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Foo());
  system.printLine(g.p1);
  system.printLine(g.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0]]);};
  constructor() {
    this.p2 = 1;
    this.p1 = this.p2;
  }

  p1 = 0;

  p2 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_PropertiesOfAllStandardTypesHaveDefaultValues", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  print g.i
  print g.f
  print g.b
  print g.s
  print g.li
  print g.ds
  print g.dsi
  print g.ai
  print g.t
  print g.ff("a", "b")
  print "aa".matchesRegExp(g.r)
end main

class Game
    constructor()
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property s as String
    property li as List<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as DictionaryImmutable<of String, Int>
    property ai as Array<of Int>
    property t as Tuple<of Int, String, List<of Int>>
    property ff as Func<of String, String => Int>
    property r as RegExp

    function asString() returns String
        return "A game"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  system.printLine(g.i);
  system.printLine(g.f);
  system.printLine(g.b);
  system.printLine(g.s);
  system.printLine(g.li);
  system.printLine(g.ds);
  system.printLine(g.dsi);
  system.printLine(g.ai);
  system.printLine(g.t);
  system.printLine(g.ff("a", "b"));
  system.printLine(_stdlib.matchesRegExp("aa", g.r));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.emptyImmutableList()], ["ds", system.emptyDictionary()], ["dsi", system.emptyDictionaryImmutable()], ["ai", system.emptyArray()], ["t", system.emptyTuple([0, "", system.emptyImmutableList()])], ["ff", system.emptyFunc(0)], ["r", system.emptyRegExp()]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.emptyImmutableList();

  ds = system.emptyDictionary();

  dsi = system.emptyDictionaryImmutable();

  ai = system.emptyArray();

  t = system.emptyTuple([0, "", system.emptyImmutableList()]);

  ff = system.emptyFunc(0);

  r = system.emptyRegExp();

  asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false{}[]{}[](0, , {})0true");
  });

  test("Pass_DefaultValuesOnEmptyClass", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable p set to new Player()
  variable g set to p.g
  print g.i
  print g.f
  print g.b
  print g.s
  print g.li
  print g.ds
  print g.dsi
  print g.ai
  print g.t
  print g.r
end main

class Player
    constructor()
    end constructor

    property g as Game
end class

class Game
    constructor()
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property s as String
    property li as List<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as DictionaryImmutable<of String, Int>
    property ai as Array<of Int>
    property t as Tuple<of Int, String, List<of Int>>
    property r as RegExp

    function asString() returns String
        return "A game"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let p = system.initialise(new Player());
  let g = p.g;
  system.printLine(g.i);
  system.printLine(g.f);
  system.printLine(g.b);
  system.printLine(g.s);
  system.printLine(g.li);
  system.printLine(g.ds);
  system.printLine(g.dsi);
  system.printLine(g.ai);
  system.printLine(g.t);
  system.printLine(g.r);
}

class Player {
  static emptyInstance() { return system.emptyClass(Player, []);};
  constructor() {

  }

  _g;
  get g() {
    return this._g ??= Game.emptyInstance();
  }
  set g(g) {
    this._g = g;
  }

}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.emptyImmutableList()], ["ds", system.emptyDictionary()], ["dsi", system.emptyDictionaryImmutable()], ["ai", system.emptyArray()], ["t", system.emptyTuple([0, "", system.emptyImmutableList()])], ["r", system.emptyRegExp()]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.emptyImmutableList();

  ds = system.emptyDictionary();

  dsi = system.emptyDictionaryImmutable();

  ai = system.emptyArray();

  t = system.emptyTuple([0, "", system.emptyImmutableList()]);

  r = system.emptyRegExp();

  asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false{}[]{}[](0, , {})A RegExp");
  });

  test("Pass_DefaultValuesNotPickedUpFromDefaultConstructor", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to empty Game
  print g.i
end main

class Game
    constructor()
      set property.i to 100
    end constructor

    property i as Float

    function asString() returns String
        return "A game"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = Game.emptyInstance();
  system.printLine(g.i);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0]]);};
  constructor() {
    this.i = 100;
  }

  i = 0;

  asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_PropertiesOfClassTypesHaveDefaultValues", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  print g.p1
  print g.previousGame
end main

class Game
  constructor()
  end constructor

  property p1 as Player
  property previousGame as Game

  function asString() returns String
    return "A game"
  end function

end class

class Player
  constructor(name as String)
    set property.name to name
  end constructor

  property name as String

  function asString() returns String
    return property.name
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  system.printLine(g.p1);
  system.printLine(g.previousGame);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _previousGame;
  get previousGame() {
    return this._previousGame ??= Game.emptyInstance();
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A game");
  });

  test("Pass_defaultKeywordToTestValue", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  print g.p1 is empty Player
  print g.p2 is empty Player
  print g.previousGame is empty Game
  print g.previousScores is empty List<of Int>
  print g.score is empty Int
  print g.best is empty Int
  print g.r is empty RegExp
end main

class Game
  constructor()
    set property.score to 1
  end constructor

  property score as Float
  property best as Float

  property p1 as Player
  property p2 as Player

  property previousGame as Game

  property previousScores as List<of Int>

  property r as RegExp

  function asString() returns String
    return "A game"
  end function

end class

class Player
  constructor(name as String)
    set property.name to name
  end constructor

  property name as String

  function asString() returns String
    return property.name
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  system.printLine(system.objectEquals(g.p1, Player.emptyInstance()));
  system.printLine(system.objectEquals(g.p2, Player.emptyInstance()));
  system.printLine(system.objectEquals(g.previousGame, Game.emptyInstance()));
  system.printLine(system.objectEquals(g.previousScores, system.emptyImmutableList()));
  system.printLine(g.score === 0);
  system.printLine(g.best === 0);
  system.printLine(g.r === system.emptyRegExp());
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.emptyImmutableList()], ["r", system.emptyRegExp()]]);};
  constructor() {
    this.score = 1;
  }

  score = 0;

  best = 0;

  _p1;
  get p1() {
    return this._p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.emptyInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  _previousGame;
  get previousGame() {
    return this._previousGame ??= Game.emptyInstance();
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  previousScores = system.emptyImmutableList();

  r = system.emptyRegExp();

  asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetruetrue");
  });

  test("Pass_defaultValueCanBeAssigned", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  print g.score
  call g.setScore(empty Int)
  print g.score
end main

class Game
  constructor()
    set property.score to 10
  end constructor

  property score as Int
  property best as Int

  property p1 as Player
  property p2 as Player

  procedure setScore(newScore as Int)
    set property.score to newScore
  end procedure

  property previousGame as Game

  property previousScores as List<of Int>

  function asString() returns String
    return "A game"
  end function

end class

class Player
    constructor(name as String)
      set property.name to name
    end constructor

    property name as String

    function asString() returns String
      return property.name
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  system.printLine(g.score);
  await g.setScore(0);
  system.printLine(g.score);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.emptyImmutableList()]]);};
  constructor() {
    this.score = 10;
  }

  score = 0;

  best = 0;

  _p1;
  get p1() {
    return this._p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.emptyInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  async setScore(newScore) {
    this.score = newScore;
  }

  _previousGame;
  get previousGame() {
    return this._previousGame ??= Game.emptyInstance();
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  previousScores = system.emptyImmutableList();

  asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100");
  });

  test("Pass_defaultForStandardDataStructures", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable f set to new Foo()
  print f.a
  print f.b
  print f.c
  print f.d
  print f.a is empty List<of Int>
  print f.b is empty String
  print f.c is empty Dictionary<of String,Int>
  print f.d is empty Array<of Int>
end main

class Foo
  constructor()
  end constructor

  property a as List<of Int>
  property b as String
  property c as Dictionary<of String, Int>
  property d as Array<of Int>

  function asString() returns String
    return "A Foo"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(new Foo());
  system.printLine(f.a);
  system.printLine(f.b);
  system.printLine(f.c);
  system.printLine(f.d);
  system.printLine(system.objectEquals(f.a, system.emptyImmutableList()));
  system.printLine(f.b === "");
  system.printLine(system.objectEquals(f.c, system.emptyDictionary()));
  system.printLine(system.objectEquals(f.d, system.emptyArray()));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""], ["c", system.emptyDictionary()], ["d", system.emptyArray()]]);};
  constructor() {

  }

  a = system.emptyImmutableList();

  b = "";

  c = system.emptyDictionary();

  d = system.emptyArray();

  asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}[][]truetruetruetrue");
  });

  test("Pass_PropertyOfAbstractType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  variable p set to g.p1
  print p.ucName()
end main

class Game
  constructor()
  end constructor

  property p1 as Player
  property p2 as Player

  function asString() returns String
    return "A game"
  end function

end class

abstract class Player
    abstract property name as String
    abstract function ucName() returns String
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  let p = g.p1;
  system.printLine(p.ucName());
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.emptyInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};
  get name() {
    return "";
  }
  set name(name) {
  }

  ucName() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_PropertyOfArrayType", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable g set to new Game()
  call g.something()
end main

class Game
  constructor()
    set property.p1 to [1,2,3]
  end constructor

  property p1 as Array<of Int>

  procedure something()
    variable a set to 1
    set a to property.p1[0]
    print a
  end procedure

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(new Game());
  await g.something();
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["p1", system.emptyArray()]]);};
  constructor() {
    this.p1 = system.literalArray([1, 2, 3]);
  }

  p1 = system.emptyArray();

  async something() {
    let a = 1;
    a = system.safeIndex(this.p1, 0);
    system.printLine(a);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_CallProcedureOnProperty", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bar set to new Bar()
  call bar.p()
end main

class Foo
  
  procedure pp()
    print 1
  end procedure

end class

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  procedure p()
    call property.p1.pp()
  end procedure

  property p1 as Foo
end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = system.initialise(new Bar());
  await bar.p();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async pp() {
    system.printLine(1);
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};
  constructor() {
    this.p1 = system.initialise(new Foo());
  }

  async p() {
    await this.p1.pp();
  }

  _p1;
  get p1() {
    return this._p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  property if as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["'if' is a keyword, and may not be used as an identifier"]);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  property break as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier",
    ]);
  });

  test("Fail_MissingPropertyKeyword1", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
    set property.p1 to p2
  end constructor

  property p1 as Int
  property p2 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword2", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
    set property.p2 to [0]
    set property.p1 to p2[0]
  end constructor

  property p1 as Int
  property p2 as Array<of Int>

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  property p1 as Int
  property p2 as Array<of Int>

  procedure foo()
    if property.p1 is 0 then
      set p2 to [0]
    end if
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword3", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
 
end main

class Foo
  constructor()
  end constructor

  property p1 as Int
  property p2 as Array<of Int>

  procedure foo()
    set property.p2 to [0]
    set p1 to property.p2[0]
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword4", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bar set to new Bar()
  call bar.p()
end main

class Foo
  
  procedure pp()
    print 1
  end procedure

end class

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  procedure p()
    call p1.pp()
  end procedure

  property p1 as Foo
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword5", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bar set to new Bar()
  call bar.p()
end main

class Foo
  
  procedure pp()
    print 1
  end procedure

end class

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  procedure p()
    if property.p2 then
      call p1.pp()
    end if 
  end procedure

  property p1 as Foo
  property p2 as Boolean
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });

  test("Fail_MissingPropertyKeyword6", async () => {
    const code = `# FFFF Elan v1.0.0 valid

main
  variable bar set to new Bar()
  call bar.p()
end main

class Foo
  
  procedure pp()
    print 1
  end procedure

end class

class Bar
  constructor()
    set property.p1 to new Foo()
  end constructor

  procedure p()
    if property.p2 then
      set p2 to false
    end if 
  end procedure

  property p1 as Foo
  property p2 as Boolean
end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, ["referencing a property requires a prefix"]);
  });
});
