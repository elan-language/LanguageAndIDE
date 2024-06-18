import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import {
  assertDoesNotCompile,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  ignore_test,
  testHash,
  transforms,
} from "./compiler-test-helpers";

suite("T45_AssociationsAndDefaults", () => {
  test("Pass_CanHavePropertiesThatAreDataStructuresOrObjects", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.p2
  print g.p1
  print g.previousScores
end main

class Game
    constructor()
      set p2 to new Player("Chloe")
      set p1 to new Player("Joe")
      set previousScores to {5, 2, 4}
    end constructor

    property p1 as Player
    property p2 as Player

    property previousScores as ImmutableList<of Int>

    function asString() return String
        return "A game"
    end function

end class

class Player
    constructor(name as String)
        set property.name to name
    end constructor

    property name as String

    function asString() return String
        return name
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.p2));
  system.print(_stdlib.asString(g.p1));
  system.print(_stdlib.asString(g.previousScores));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["previousScores", system.emptyImmutableList()]]);};
  constructor() {
    this.p2 = system.initialise(new Player("Chloe"));
    this.p1 = system.initialise(new Player("Joe"));
    this.previousScores = system.immutableList([5, 2, 4]);
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
    await assertObjectCodeExecutes(fileImpl, "ChloeJoeImmutableList {5, 2, 4}");
  });

  test("Pass_PropertiesOfAllStandardTypesHaveDefaultValues", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.i
  print g.f
  print g.b
  print g.s
  print g.li
  print g.ds
  print g.dsi
  print g.ai
  print g.t
end main

class Game
    constructor()
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property s as String
    property li as ImmutableList<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as ImmutableDictionary<of String, Int>
    property ai as ArrayList<of Int>
    property t as Tuple<of Int, String, ImmutableList<of Int>>

    function asString() return String
        return "A game"
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.i));
  system.print(_stdlib.asString(g.f));
  system.print(_stdlib.asString(g.b));
  system.print(_stdlib.asString(g.s));
  system.print(_stdlib.asString(g.li));
  system.print(_stdlib.asString(g.ds));
  system.print(_stdlib.asString(g.dsi));
  system.print(_stdlib.asString(g.ai));
  system.print(_stdlib.asString(g.t));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.emptyImmutableList()], ["ds", system.emptyDictionary()], ["dsi", system.emptyImmutableDictionary()], ["ai", system.emptyArrayList()], ["t", system.emptyTuple([0, "", system.emptyImmutableList()])]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.emptyImmutableList();

  ds = system.emptyDictionary();

  dsi = system.emptyImmutableDictionary();

  ai = system.emptyArrayList();

  t = system.emptyTuple([0, "", system.emptyImmutableList()]);

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
    await assertObjectCodeExecutes(
      fileImpl,
      "00falseempty ImmutableListempty Dictionaryempty ImmutableDictionaryempty ArrayListTuple (0, , empty ImmutableList)",
    );
  });

  test("Pass_DefaultValuesOnEmptyClass", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var p set to new Player()
  var g set to p.g
  print g.i
  print g.f
  print g.b
  print g.s
  print g.li
  print g.ds
  print g.dsi
  print g.ai
  print g.t
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
    property li as ImmutableList<of Int>
    property ds as Dictionary<of String, Int>
    property dsi as ImmutableDictionary<of String, Int>
    property ai as ArrayList<of Int>
    property t as Tuple<of Int, String, ImmutableList<of Int>>

    function asString() return String
        return "A game"
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var p = system.initialise(new Player());
  var g = p.g;
  system.print(_stdlib.asString(g.i));
  system.print(_stdlib.asString(g.f));
  system.print(_stdlib.asString(g.b));
  system.print(_stdlib.asString(g.s));
  system.print(_stdlib.asString(g.li));
  system.print(_stdlib.asString(g.ds));
  system.print(_stdlib.asString(g.dsi));
  system.print(_stdlib.asString(g.ai));
  system.print(_stdlib.asString(g.t));
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
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["li", system.emptyImmutableList()], ["ds", system.emptyDictionary()], ["dsi", system.emptyImmutableDictionary()], ["ai", system.emptyArrayList()], ["t", system.emptyTuple([0, "", system.emptyImmutableList()])]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.emptyImmutableList();

  ds = system.emptyDictionary();

  dsi = system.emptyImmutableDictionary();

  ai = system.emptyArrayList();

  t = system.emptyTuple([0, "", system.emptyImmutableList()]);

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
    await assertObjectCodeExecutes(
      fileImpl,
      "00falseempty ImmutableListempty Dictionaryempty ImmutableDictionaryempty ArrayListTuple (0, , empty ImmutableList)",
    );
  });

  test("Pass_DefaultValuesNotPickedUpFromDefaultConstructor", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to empty Game
  print g.i
end main

class Game
    constructor()
       set i to 100
    end constructor

    property i as Float

    function asString() return String
        return "A game"
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = Game.emptyInstance();
  system.print(_stdlib.asString(g.i));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.p1
  print g.previousGame
end main

class Game
  constructor()
  end constructor

  property p1 as Player
  property previousGame as Game

  function asString() return String
    return "A game"
  end function

end class

class Player
  constructor(name as String)
    set property.name to name
  end constructor

  property name as String

  function asString() return String
    return name
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.p1));
  system.print(_stdlib.asString(g.previousGame));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.p1 is empty Player
  print g.p2 is empty Player
  print g.previousGame is empty Game
  print g.previousScores is empty ImmutableList<of Int>
  print g.score is empty Int
  print g.best is empty Int
end main

class Game
  constructor()
    set score to 1
  end constructor

  property score as Float
  property best as Float

  property p1 as Player
  property p2 as Player

  property previousGame as Game

  property previousScores as ImmutableList<of Int>

  function asString() return String
    return "A game"
  end function

end class

class Player
  constructor(name as String)
    set property.name to name
  end constructor

  property name as String

  function asString() return String
    return name
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(system.objectEquals(g.p1, Player.emptyInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.p2, Player.emptyInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.previousGame, Game.emptyInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.previousScores, system.emptyImmutableList())));
  system.print(_stdlib.asString(g.score === 0));
  system.print(_stdlib.asString(g.best === 0));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["score", 0], ["best", 0], ["previousScores", system.emptyImmutableList()]]);};
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
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetrue");
  });

  test("Pass_defaultValueCanBeAssigned", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.score
  call g.setScore(empty Int)
  print g.score
end main

class Game
  constructor()
    set score to 10
  end constructor

  property score as Int
  property best as Int

  property p1 as Player
  property p2 as Player

  procedure setScore(newScore as Int)
    set score to newScore
  end procedure

  property previousGame as Game

  property previousScores as ImmutableList<of Int>

  function asString() return String
    return "A game"
  end function

end class

class Player
    constructor(name as String)
      set property.name to name
    end constructor

    property name as String

    function asString() return String
      return name
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.score));
  await g.setScore(0);
  system.print(_stdlib.asString(g.score));
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
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.a
  print f.b
  print f.c
  print f.d
  print f.a is empty ImmutableList<of Int>
  print f.b is empty String
  print f.c is empty Dictionary<of String,Int>
  print f.d is empty ArrayList<of Int>
end main

class Foo
  constructor()
  end constructor

  property a as ImmutableList<of Int>
  property b as String
  property c as Dictionary<of String, Int>
  property d as ArrayList<of Int>

  function asString() return String
    return "A Foo"
  end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.a));
  system.print(_stdlib.asString(f.b));
  system.print(_stdlib.asString(f.c));
  system.print(_stdlib.asString(f.d));
  system.print(_stdlib.asString(system.objectEquals(f.a, system.emptyImmutableList())));
  system.print(_stdlib.asString(f.b === ""));
  system.print(_stdlib.asString(system.objectEquals(f.c, system.emptyDictionary())));
  system.print(_stdlib.asString(system.objectEquals(f.d, system.emptyArrayList())));
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, [["a", system.emptyImmutableList()], ["b", ""], ["c", system.emptyDictionary()], ["d", system.emptyArrayList()]]);};
  constructor() {

  }

  a = system.emptyImmutableList();

  b = "";

  c = system.emptyDictionary();

  d = system.emptyArrayList();

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
    await assertObjectCodeExecutes(
      fileImpl,
      "empty ImmutableListempty Dictionaryempty ArrayListtruetruetruetrue",
    );
  });

  test("Pass_PropertyOfAbstractType", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  var p set to g.p1
  print p.ucName()
end main

class Game
  constructor()
  end constructor

  property p1 as Player
  property p2 as Player

  function asString() return String
    return "A game"
  end function

end class

abstract class Player
    abstract property name as String
    abstract function ucName() return String
end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  var p = g.p1;
  system.print(_stdlib.asString(p.ucName()));
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

  asString() {
    return "empty Abstract Class Player";
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

  // pending with implementation
  ignore_test("Pass_defaultCannotBeReplacedUsingWith", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var p set to empty Player
  var p1 set to new Player("other player")
  var p2 set to p with {name set to "foo", otherPlayer set to p1}
  print type(p2)
  print p2.name
  print p2.otherPlayer
  print p2.otherPlayer.name
end main

class Player
    constructor(name String)
        set property.name to name
    end constructor

    property name String

    property otherPlayer Player

    function asString() as String
        return name
    end function

end class`;

    const objectCode = `var system; var _stdlib; var _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {

return [main, _tests];}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), transforms(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(
      fileImpl,
      "empty Listempty Dictionaryempty Arraytruetruetruetrue",
    );
  });

  test("Fail_UseOfKeywordAsName", async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

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
    assertDoesNotCompile(fileImpl, ["'if' keyword may not be used as identifier"]);
  });
});
