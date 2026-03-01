import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { DefaultProfile } from "../../src/ide/frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  testHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Associations and Defaults", () => {
  test("Pass_CanHavePropertiesThatAreDataStructuresOrObjects", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  call printNoLine(g.p2)
  call printNoLine(g.p1)
  call printNoLine(g.previousScores)
end main

class Game
    constructor()
      set property.p2 to new Player("Chloe")
      set property.p1 to new Player("Joe")
      set property.previousScores to [5, 2, 4]
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
  let g = system.initialise(await new Game()._initialise());
  await _stdlib.printNoLine(g.p2);
  await _stdlib.printNoLine(g.p1);
  await _stdlib.printNoLine(g.previousScores);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["previousScores", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.p2 = system.initialise(await new Player()._initialise("Chloe"));
    this.p1 = system.initialise(await new Player()._initialise("Joe"));
    this.previousScores = system.list([5, 2, 4]);
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

  previousScores = system.initialise(_stdlib.List.emptyInstance());

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ChloeJoe[5, 2, 4]");
  });

  test("Pass_AssignProperty", async () => {
    const code = `${testHeader}

main
  variable g set to new Foo()
  call printNoLine(g.p1)
  call printNoLine(g.p2)
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
  await _stdlib.printNoLine(g.p1);
  await _stdlib.printNoLine(g.p2);
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
  call printNoLine(g.i)
  call printNoLine(g.f)
  call printNoLine(g.b)
  call printNoLine(g.s)
  call printNoLine(g.ds)
  call printNoLine(g.ai)
  call printNoLine(g.t)
  call printNoLine(g.ff("a", "b"))
  call printNoLine("aa".matchesRegExp(g.r))
end main

class Game
    constructor()
      set property.s to ""
      set property.ds to new Dictionary<of String, Int>()
      set property.ai to new List<of Int>()
      set property.t to tuple(0, "", new List<of Int>())
      set property.ff to lambda a as String, b as String => 0
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property s as String
    property ds as Dictionary<of String, Int>
    property ai as List<of Int>
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
  let g = system.initialise(await new Game()._initialise());
  await _stdlib.printNoLine(g.i);
  await _stdlib.printNoLine(g.f);
  await _stdlib.printNoLine(g.b);
  await _stdlib.printNoLine(g.s);
  await _stdlib.printNoLine(g.ds);
  await _stdlib.printNoLine(g.ai);
  await _stdlib.printNoLine(g.t);
  await _stdlib.printNoLine((await g.ff("a", "b")));
  await _stdlib.printNoLine(_stdlib.matchesRegExp("aa", g.r));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["ds", system.initialise(_stdlib.Dictionary.emptyInstance())], ["ai", system.initialise(_stdlib.List.emptyInstance())], ["t", system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())])], ["ff", system.emptyFunc(0)], ["r", system.emptyRegExp()]]);};

  async _initialise() {
    this.s = "";
    this.ds = system.initialise(await new _stdlib.Dictionary()._initialise());
    this.ai = system.initialise(await new _stdlib.List()._initialise());
    this.t = system.tuple([0, "", system.initialise(await new _stdlib.List()._initialise())]);
    this.ff = async (a, b) => 0;
    return this;
  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  ds = system.initialise(_stdlib.Dictionary.emptyInstance());

  ai = system.initialise(_stdlib.List.emptyInstance());

  t = system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())]);

  ff = system.emptyFunc(0);

  r = system.emptyRegExp();

  async asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false[][]tuple(0, , [])0true");
  });

  test("Pass_DefaultValuesOnEmptyClass", async () => {
    const code = `${testHeader}

main
  variable p set to new Player()
  variable g set to p.g
  call printNoLine(g.i)
  call printNoLine(g.f)
  call printNoLine(g.b)
  call printNoLine(g.s)
  call printNoLine(g.ds)
  call printNoLine(g.ai)
  call printNoLine(g.t)
  call printNoLine(g.r)
end main

class Player
  constructor()
    set property.g to new Game()
  end constructor

  property g as Game

end class

class Game
    constructor()
      set property.s to ""
      set property.li to new List<of Int>()
      set property.ds to new Dictionary<of String, Int>()
      set property.ai to new List<of Int>()
      set property.t to tuple(0, "", new List<of Int>())
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property s as String
    property li as List<of Int>
    property ds as Dictionary<of String, Int>
    property ai as List<of Int>
    property t as Tuple<of Int, String, List<of Int>>
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
  await _stdlib.printNoLine(g.i);
  await _stdlib.printNoLine(g.f);
  await _stdlib.printNoLine(g.b);
  await _stdlib.printNoLine(g.s);
  await _stdlib.printNoLine(g.ds);
  await _stdlib.printNoLine(g.ai);
  await _stdlib.printNoLine(g.t);
  await _stdlib.printNoLine(g.r);
}

class Player {
  static emptyInstance() { return system.emptyClass(Player, []);};

  async _initialise() {
    this.g = system.initialise(await new Game()._initialise());
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
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.initialise(_stdlib.List.emptyInstance())], ["ds", system.initialise(_stdlib.Dictionary.emptyInstance())], ["ai", system.initialise(_stdlib.List.emptyInstance())], ["t", system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())])], ["r", system.emptyRegExp()]]);};

  async _initialise() {
    this.s = "";
    this.li = system.initialise(await new _stdlib.List()._initialise());
    this.ds = system.initialise(await new _stdlib.Dictionary()._initialise());
    this.ai = system.initialise(await new _stdlib.List()._initialise());
    this.t = system.tuple([0, "", system.initialise(await new _stdlib.List()._initialise())]);
    return this;
  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.initialise(_stdlib.List.emptyInstance());

  ds = system.initialise(_stdlib.Dictionary.emptyInstance());

  ai = system.initialise(_stdlib.List.emptyInstance());

  t = system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())]);

  r = system.emptyRegExp();

  async asString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00false[][]tuple(0, , [])A RegExp");
  });

  test("Pass_PropertiesOfClassTypesHaveDefaultValues", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  call printNoLine(g.p1)
  call printNoLine(g.previousGame)
end main

class Game
  constructor()
    set property.p1 to new Player("Player1")
    set property.previousGame to new Optional<of Game>()
  end constructor

  property p1 as Player
  property previousGame as Optional<of Game>

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
  await _stdlib.printNoLine(g.p1);
  await _stdlib.printNoLine(g.previousGame);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};

  async _initialise() {
    this.p1 = system.initialise(await new Player()._initialise("Player1"));
    this.previousGame = system.initialise(await new _stdlib.Optional()._initialise());
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
    return this._previousGame ??= system.initialise(_stdlib.Optional.emptyInstance());
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "Player1a Optional");
  });

  ignore_test("Pass_emptyKeywordToTestReference", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  call printNoLine(g.p1.isSameReferenceAs(empty Player))
  call printNoLine(g.p2.isSameReferenceAs(empty Player))
  call printNoLine(g.previousGame.isSameReferenceAs(empty Game))
  call printNoLine(g.previousScores.isSameReferenceAs(empty List<of Int>))
  call printNoLine(g.score.isSameReferenceAs(empty Int))
  call printNoLine(g.best.isSameReferenceAs(empty Int))
  call printNoLine(g.r.isSameReferenceAs(empty RegExp))
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
  let g = system.initialise(await new Game()._initialise());
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.p1, Player.emptyInstance()));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.p2, Player.emptyInstance()));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.previousGame, Game.emptyInstance()));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.previousScores, system.initialise(_stdlib.List.emptyInstance())));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.score, 0));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.best, 0));
  await _stdlib.printNoLine(_stdlib.isSameReferenceAs(g.r, system.emptyRegExp()));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.initialise(_stdlib.List.emptyInstance())], ["r", system.emptyRegExp()]]);};

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

  previousScores = system.initialise(_stdlib.List.emptyInstance());

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "falsefalsefalsefalsefalsetruetrue");
  });

  test("Pass_defaultValueCanBeAssigned", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  call printNoLine(g.score)
  call g.setScore(empty Int)
  call printNoLine(g.score)
end main

class Game
  constructor()
    set property.score to 10
    set property.p1 to new Player("Player 1")
    set property.p2 to new Player("Player 2")
    set property.previousGame to new Optional<of Game>()
    set property.previousScores to new List<of Int>()
  end constructor

  property score as Int
  property best as Int

  property p1 as Player
  property p2 as Player

  procedure setScore(newScore as Int)
    set property.score to newScore
  end procedure

  property previousGame as Optional<of Game>

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
  let g = system.initialise(await new Game()._initialise());
  await _stdlib.printNoLine(g.score);
  await g.setScore(0);
  await _stdlib.printNoLine(g.score);
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.initialise(_stdlib.List.emptyInstance())]]);};

  async _initialise() {
    this.score = 10;
    this.p1 = system.initialise(await new Player()._initialise("Player 1"));
    this.p2 = system.initialise(await new Player()._initialise("Player 2"));
    this.previousGame = system.initialise(await new _stdlib.Optional()._initialise());
    this.previousScores = system.initialise(await new _stdlib.List()._initialise());
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
    return this._previousGame ??= system.initialise(_stdlib.Optional.emptyInstance());
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  previousScores = system.initialise(_stdlib.List.emptyInstance());

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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "100");
  });

  test("Pass_PropertyOfAbstractType", async () => {
    const code = `${testHeader}

main
  variable g set to new Game()
  variable p set to g.p1
  call printNoLine(p.hasValue())
end main

class Game
  constructor()
    set property.p1 to new Optional<of Player>()
    set property.p2 to new Optional<of Player>()
  end constructor

  property p1 as Optional<of Player>
  property p2 as Optional<of Player>

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
  await _stdlib.printNoLine(p.hasValue());
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, []);};

  async _initialise() {
    this.p1 = system.initialise(await new _stdlib.Optional()._initialise());
    this.p2 = system.initialise(await new _stdlib.Optional()._initialise());
    return this;
  }

  _p1;
  get p1() {
    return this._p1 ??= system.initialise(_stdlib.Optional.emptyInstance());
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= system.initialise(_stdlib.Optional.emptyInstance());
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "false");
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
    call printNoLine(a)
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
    await _stdlib.printNoLine(a);
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    call printNoLine(1)
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
    await _stdlib.printNoLine(1);
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'if' matches a reserved word (even if different case), so may not be defined as an identifier.LangRef.html#compile_error",
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word (even if different case), so may not be defined as an identifier.LangRef.html#compile_error",
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    set property.p2 to new List<of Int>()
  end constructor

  property p1 as Int
  property p2 as List<of Int>

  procedure foo()
    if property.p1 is 0 then
      set p2 to [0]
    end if
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "referencing a property requires a prefix.LangRef.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword4", async () => {
    const code = `${testHeader}

main
 
end main

class Foo
  constructor()
    set property.p2 to new List<of Int>()
  end constructor

  property p1 as Int
  property p2 as List<of Int>

  procedure foo()
    set property.p2 to [0]
    set p1 to property.p2[0]
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    call printNoLine(1)
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    call printNoLine(1)
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    call printNoLine(1)
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

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    variable a set to property.asString()
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    variable a set to property.foo()
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
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
    variable a set to property.aa
  end procedure

end class`;

    const fileImpl = new FileImpl(
      testHash,
      new DefaultProfile(),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'aa' is not defined for type 'Bar'.LangRef.html#compile_error",
    ]);
  });
});
