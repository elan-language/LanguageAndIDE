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

suite("Associations and Defaults", () => {
  test("Pass_CanHavePropertiesThatAreDataStructuresOrObjects", async () => {
    const code = `${testHeader}

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

    property previousScores as ListImmutable<of Int>

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
  let g = system.initialise(await new Game()._initialise());
  await system.printLine(g.p2);
  await system.printLine(g.p1);
  await system.printLine(g.previousScores);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["previousScores", system.initialise(_stdlib.ListImmutable.emptyInstance())]]);};

  async _initialise() {
    this.p2 = system.initialise(await new Player()._initialise("Chloe"));
    this.p1 = system.initialise(await new Player()._initialise("Joe"));
    this.previousScores = system.listImmutable([5, 2, 4]);
    return this;
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

  previousScores = system.initialise(_stdlib.ListImmutable.emptyInstance());

  async asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};

  async _initialise(name) {
    this.name = name;
    return this;
  }

  name = "";

  async asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ChloeJoe{5, 2, 4}");
  });

  test("Pass_AssignProperty", async () => {
    const code = `${testHeader}

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
  let g = system.initialise(await new Foo()._initialise());
  await system.printLine(g.p1);
  await system.printLine(g.p2);
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["p1", 0], ["p2", 0]]);};

  async _initialise() {
    this.p2 = 1;
    this.p1 = this.p2;
    return this;
  }

  p1 = 0;

  p2 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "11");
  });

  test("Pass_PropertiesOfAllStandardTypesHaveDefaultValues", async () => {
    const code = `${testHeader}

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
    property li as ListImmutable<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as DictionaryImmutable<of String, Int>
    property ai as List<of Int>
    property t as Tuple<of Int, String, ListImmutable<of Int>>
    property ff as Func<of String, String => Int>
    property r as RegExp

    function asString() returns String
        return "A game"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new Game()._initialise());
  await system.printLine(g.i);
  await system.printLine(g.f);
  await system.printLine(g.b);
  await system.printLine(g.s);
  await system.printLine(g.li);
  await system.printLine(g.ds);
  await system.printLine(g.dsi);
  await system.printLine(g.ai);
  await system.printLine(g.t);
  await system.printLine((await g.ff("a", "b")));
  await system.printLine(_stdlib.matchesRegExp("aa", g.r));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.initialise(_stdlib.ListImmutable.emptyInstance())], ["ds", system.initialise(_stdlib.Dictionary.emptyInstance())], ["dsi", system.initialise(_stdlib.DictionaryImmutable.emptyInstance())], ["ai", system.initialise(_stdlib.List.emptyInstance())], ["t", system.emptyTuple([0, "", system.initialise(_stdlib.ListImmutable.emptyInstance())])], ["ff", system.emptyFunc(0)], ["r", system.emptyRegExp()]]);};

  async _initialise() {

    return this;
  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.initialise(_stdlib.ListImmutable.emptyInstance());

  ds = system.initialise(_stdlib.Dictionary.emptyInstance());

  dsi = system.initialise(_stdlib.DictionaryImmutable.emptyInstance());

  ai = system.initialise(_stdlib.List.emptyInstance());

  t = system.emptyTuple([0, "", system.initialise(_stdlib.ListImmutable.emptyInstance())]);

  ff = system.emptyFunc(0);

  r = system.emptyRegExp();

  async asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false{}[]{}[]tuple(0, , {})0true");
  });

  test("Pass_DefaultValuesOnEmptyClass", async () => {
    const code = `${testHeader}

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
    property li as ListImmutable<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as DictionaryImmutable<of String, Int>
    property ai as List<of Int>
    property t as Tuple<of Int, String, ListImmutable<of Int>>
    property r as RegExp

    function asString() returns String
        return "A game"
    end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let p = system.initialise(await new Player()._initialise());
  let g = p.g;
  await system.printLine(g.i);
  await system.printLine(g.f);
  await system.printLine(g.b);
  await system.printLine(g.s);
  await system.printLine(g.li);
  await system.printLine(g.ds);
  await system.printLine(g.dsi);
  await system.printLine(g.ai);
  await system.printLine(g.t);
  await system.printLine(g.r);
}

class Player {
  static emptyInstance() { return system.emptyClass(Player, []);};

  async _initialise() {

    return this;
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
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.initialise(_stdlib.ListImmutable.emptyInstance())], ["ds", system.initialise(_stdlib.Dictionary.emptyInstance())], ["dsi", system.initialise(_stdlib.DictionaryImmutable.emptyInstance())], ["ai", system.initialise(_stdlib.List.emptyInstance())], ["t", system.emptyTuple([0, "", system.initialise(_stdlib.ListImmutable.emptyInstance())])], ["r", system.emptyRegExp()]]);};

  async _initialise() {

    return this;
  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.initialise(_stdlib.ListImmutable.emptyInstance());

  ds = system.initialise(_stdlib.Dictionary.emptyInstance());

  dsi = system.initialise(_stdlib.DictionaryImmutable.emptyInstance());

  ai = system.initialise(_stdlib.List.emptyInstance());

  t = system.emptyTuple([0, "", system.initialise(_stdlib.ListImmutable.emptyInstance())]);

  r = system.emptyRegExp();

  async asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false{}[]{}[]tuple(0, , {})A RegExp");
  });

  test("Pass_DefaultValuesNotPickedUpFromDefaultConstructor", async () => {
    const code = `${testHeader}

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
  await system.printLine(g.i);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0]]);};

  async _initialise() {
    this.i = 100;
    return this;
  }

  i = 0;

  async asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test("Pass_PropertiesOfClassTypesHaveDefaultValues", async () => {
    const code = `${testHeader}

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
  let g = system.initialise(await new Game()._initialise());
  await system.printLine(g.p1);
  await system.printLine(g.previousGame);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};

  async _initialise() {

    return this;
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

  async asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};

  async _initialise(name) {
    this.name = name;
    return this;
  }

  name = "";

  async asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A game");
  });

  test("Pass_defaultKeywordToTestValue", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  print g.p1 is empty Player
  print g.p2 is empty Player
  print g.previousGame is empty Game
  print g.previousScores is empty ListImmutable<of Int>
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

  property previousScores as ListImmutable<of Int>

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
  let g = system.initialise(await new Game()._initialise());
  await system.printLine(system.objectEquals(g.p1, Player.emptyInstance()));
  await system.printLine(system.objectEquals(g.p2, Player.emptyInstance()));
  await system.printLine(system.objectEquals(g.previousGame, Game.emptyInstance()));
  await system.printLine(system.objectEquals(g.previousScores, system.initialise(_stdlib.ListImmutable.emptyInstance())));
  await system.printLine(g.score === 0);
  await system.printLine(g.best === 0);
  await system.printLine(g.r === system.emptyRegExp());
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.initialise(_stdlib.ListImmutable.emptyInstance())], ["r", system.emptyRegExp()]]);};

  async _initialise() {
    this.score = 1;
    return this;
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

  previousScores = system.initialise(_stdlib.ListImmutable.emptyInstance());

  r = system.emptyRegExp();

  async asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};

  async _initialise(name) {
    this.name = name;
    return this;
  }

  name = "";

  async asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetruetrue");
  });

  test("Pass_defaultValueCanBeAssigned", async () => {
    const code = `${testHeader}

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

  property previousScores as ListImmutable<of Int>

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
  let g = system.initialise(await new Game()._initialise());
  await system.printLine(g.score);
  await g.setScore(0);
  await system.printLine(g.score);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.initialise(_stdlib.ListImmutable.emptyInstance())]]);};

  async _initialise() {
    this.score = 10;
    return this;
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

  previousScores = system.initialise(_stdlib.ListImmutable.emptyInstance());

  async asString() {
    return "A game";
  }

}

class Player {
  static emptyInstance() { return system.emptyClass(Player, [["name", ""]]);};

  async _initialise(name) {
    this.name = name;
    return this;
  }

  name = "";

  async asString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100");
  });

  test("Pass_defaultForStandardDataStructures", async () => {
    const code = `${testHeader}

main
  variable f set to new Foo()
  print f.a
  print f.b
  print f.c
  print f.d
  print f.a is empty ListImmutable<of Int>
  print f.b is empty String
  print f.c is empty Dictionary<of String,Int>
  print f.d is empty List<of Int>
end main

class Foo
  constructor()
  end constructor

  property a as ListImmutable<of Int>
  property b as String
  property c as Dictionary<of String, Int>
  property d as List<of Int>

  function asString() returns String
    return "A Foo"
  end function

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let f = system.initialise(await new Foo()._initialise());
  await system.printLine(f.a);
  await system.printLine(f.b);
  await system.printLine(f.c);
  await system.printLine(f.d);
  await system.printLine(system.objectEquals(f.a, system.initialise(_stdlib.ListImmutable.emptyInstance())));
  await system.printLine(f.b === "");
  await system.printLine(system.objectEquals(f.c, system.initialise(_stdlib.Dictionary.emptyInstance())));
  await system.printLine(system.objectEquals(f.d, system.initialise(_stdlib.List.emptyInstance())));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.initialise(_stdlib.ListImmutable.emptyInstance())], ["b", ""], ["c", system.initialise(_stdlib.Dictionary.emptyInstance())], ["d", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {

    return this;
  }

  a = system.initialise(_stdlib.ListImmutable.emptyInstance());

  b = "";

  c = system.initialise(_stdlib.Dictionary.emptyInstance());

  d = system.initialise(_stdlib.List.emptyInstance());

  async asString() {
    return "A Foo";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "{}[][]truetruetruetrue");
  });

  test("Pass_PropertyOfAbstractType", async () => {
    const code = `${testHeader}

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
  let g = system.initialise(await new Game()._initialise());
  let p = g.p1;
  await system.printLine((await p.ucName()));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};

  async _initialise() {

    return this;
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

  async asString() {
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

  async ucName() {
    return "";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  test("Pass_PropertyOfListType", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  call g.something()
end main

class Game
  constructor()
    set property.p1 to [1,2,3]
  end constructor

  property p1 as List<of Int>

  procedure something()
    variable a set to 1
    set a to property.p1[0]
    print a
  end procedure

end class`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let g = system.initialise(await new Game()._initialise());
  await g.something();
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["p1", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.p1 = system.list([1, 2, 3]);
    return this;
  }

  p1 = system.initialise(_stdlib.List.emptyInstance());

  async something() {
    let a = 1;
    a = system.safeIndex(this.p1, 0);
    await system.printLine(a);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Pass_CallProcedureOnProperty", async () => {
    const code = `${testHeader}

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
  let bar = system.initialise(await new Bar()._initialise());
  await bar.p();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};
  async _initialise() { return this; }
  async pp() {
    await system.printLine(1);
  }

}

class Bar {
  static emptyInstance() { return system.emptyClass(Bar, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Foo()._initialise());
    return this;
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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "1");
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  property if as Int

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

  property break as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' is a reserved word, and may not be used as an identifier.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword1", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    set property.p1 to p2
  end constructor

  property p1 as Int
  property p2 as Int

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword2", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    set property.p2 to [0]
    set property.p1 to p2[0]
  end constructor

  property p1 as Int
  property p2 as List<of Int>

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword3", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  property p1 as Int
  property p2 as List<of Int>

  procedure foo()
    if property.p1 is 0 then
      set p2 to [0]
    end if
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword3", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
  end constructor

  property p1 as Int
  property p2 as List<of Int>

  procedure foo()
    set property.p2 to [0]
    set p1 to property.p2[0]
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword4", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword5", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword6", async () => {
    const code = `${testHeader}

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

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_spuriousProperty1", async () => {
    const code = `${testHeader}

class Bar
  procedure p()
    let a be property.asString()
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot prefix function with 'property'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_spuriousProperty2", async () => {
    const code = `${testHeader}

function foo() returns Int
  return 0
end function

class Bar
  procedure p()
    let a be property.foo()
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Cannot prefix function with 'property'.LangRef.html#compile_error",
    ]);
  });

  test("Fail_spuriousProperty3", async () => {
    const code = `${testHeader}

constant aa set to 1

class Bar
  procedure p()
    let a be property.aa
  end procedure

end class`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), "", transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'aa' is not defined for type 'Bar'.LangRef.html#compile_error",
    ]);
  });
});
