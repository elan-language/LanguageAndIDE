import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test, testHash } from "./compiler-test-helpers";
import { createHash } from "node:crypto";

suite('T45_AssociationsAndDefaults', () => {

  test('Pass_CanHavePropertiesThatAreDataStructuresOrObjects', async () => {
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
      set previousScores to [5, 2, 4]
    end constructor

    property p1 as Player
    property p2 as Player

    property previousScores as List<of Number>

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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.p2));
  system.print(_stdlib.asString(g.p1));
  system.print(_stdlib.asString(g.previousScores));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["p1", "Player"], ["p2", "Player"], ["previousScores", "List<of Number>"]]);};
  constructor() {
    this.p2 = system.initialise(new Player("Chloe"));
    this.p1 = system.initialise(new Player("Joe"));
    this.previousScores = system.list([5, 2, 4]);
  }

  _p1;
  get p1() {
    return this._p1 ??= Player.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.defaultInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  previousScores = system.defaultList();

  asString() {
    return "A game";
  }

}

class Player {
  static defaultInstance() { return system.defaultClass(Player, [["name", "String"]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "ChloeJoeList [5, 2, 4]");
  });

  test('Pass_PropertiesOfAllStandardTypesHaveDefaultValues', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.i
  print g.f
  print g.b
  print g.s
  print g.li
  print g.dsi
  print g.ai
end main

class Game
    constructor()
    end constructor

    property i as Int
    property f as Number
    property b as Boolean
    property s as String
    property li as List<of Int>
    property dsi as Dictionary<of String, Int>
    property ai as Array<of Int>

    function asString() return String
        return "A game"
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.i));
  system.print(_stdlib.asString(g.f));
  system.print(_stdlib.asString(g.b));
  system.print(_stdlib.asString(g.s));
  system.print(_stdlib.asString(g.li));
  system.print(_stdlib.asString(g.dsi));
  system.print(_stdlib.asString(g.ai));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["i", "Int"], ["f", "Number"], ["b", "Boolean"], ["s", "String"], ["li", "List<of Int>"], ["dsi", "Dictionary<of String, Int>"], ["ai", "Array<of Int>"]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  li = system.defaultList();

  dsi = system.defaultDictionary();

  ai = system.defaultArray();

  asString() {
    return "A game";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "00falseempty Listempty Dictionaryempty Array");
  });

  test('Pass_DefaultValuesNotPickedUpFromDefaultConstructor', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to default Game
  print g.i
end main

class Game
    constructor()
       set i to 100
    end constructor

    property i as Number

    function asString() return String
        return "A game"
    end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = Game.defaultInstance();
  system.print(_stdlib.asString(g.i));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["i", "Number"]]);};
  constructor() {
    this.i = 100;
  }

  i = 0;

  asString() {
    return "A game";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "0");
  });

  test('Pass_PropertiesOfClassTypesHaveDefaultValues', async () => {
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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.p1));
  system.print(_stdlib.asString(g.previousGame));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["p1", "Player"], ["previousGame", "Game"]]);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Player.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _previousGame;
  get previousGame() {
    return this._previousGame ??= Game.defaultInstance();
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  asString() {
    return "A game";
  }

}

class Player {
  static defaultInstance() { return system.defaultClass(Player, [["name", "String"]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "A game");
  });

  test('Pass_defaultKeywordToTestValue', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.p1 is default Player
  print g.p2 is default Player
  print g.previousGame is default Game
  print g.previousScores is default List<of Int>
  print g.score is default Int
  print g.best is default Int
end main

class Game
  constructor()
    set score to 1
  end constructor

  property score as Number
  property best as Number

  property p1 as Player
  property p2 as Player

  property previousGame as Game

  property previousScores as List<of Number>

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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(system.objectEquals(g.p1, Player.defaultInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.p2, Player.defaultInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.previousGame, Game.defaultInstance())));
  system.print(_stdlib.asString(g.previousScores === system.defaultList()));
  system.print(_stdlib.asString(g.score === 0));
  system.print(_stdlib.asString(g.best === 0));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["score", "Number"], ["best", "Number"], ["p1", "Player"], ["p2", "Player"], ["previousGame", "Game"], ["previousScores", "List<of Number>"]]);};
  constructor() {
    this.score = 1;
  }

  score = 0;

  best = 0;

  _p1;
  get p1() {
    return this._p1 ??= Player.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.defaultInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  _previousGame;
  get previousGame() {
    return this._previousGame ??= Game.defaultInstance();
  }
  set previousGame(previousGame) {
    this._previousGame = previousGame;
  }

  previousScores = system.defaultList();

  asString() {
    return "A game";
  }

}

class Player {
  static defaultInstance() { return system.defaultClass(Player, [["name", "String"]]);};
  constructor(name) {
    this.name = name;
  }

  name = "";

  asString() {
    return this.name;
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetrue");
  });

  ignore_test('Pass_defaultValueCanBeAssigned', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var g set to new Game()
  print g.score
  call g.setScore(default Int)
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

  property previousScores as List<of Int>

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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetrue");
  });

  test('Pass_defaultForStandardDataStructures', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var f set to new Foo()
  print f.a
  print f.b
  print f.c
  print f.d
  print f.a is default List<of Int>
  print f.b is default String
  print f.c is default Dictionary<of String,Int>
  print f.d is default Array<of Int>
end main

class Foo
  constructor()
  end constructor

  property a as List<of Int>
  property b as String
  property c as Dictionary<of String, Int>
  property d as Array<of Int>

  function asString() return String
    return "A Foo"
  end function

end class`;

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var f = system.initialise(new Foo());
  system.print(_stdlib.asString(f.a));
  system.print(_stdlib.asString(f.b));
  system.print(_stdlib.asString(f.c));
  system.print(_stdlib.asString(f.d));
  system.print(_stdlib.asString(f.a === system.defaultList()));
  system.print(_stdlib.asString(f.b === ""));
  system.print(_stdlib.asString(f.c === system.defaultDictionary()));
  system.print(_stdlib.asString(f.d === system.defaultArray()));
}

class Foo {
  static defaultInstance() { return system.defaultClass(Foo, [["a", "List<of Int>"], ["b", "String"], ["c", "Dictionary<of String, Int>"], ["d", "Array<of Int>"]]);};
  constructor() {

  }

  a = system.defaultList();

  b = "";

  c = system.defaultDictionary();

  d = system.defaultArray();

  asString() {
    return "A Foo";
  }

}
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty Listempty Dictionaryempty Arraytruetruetruetrue");
  });

  test('Pass_PropertyOfAbstractType', async () => {
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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
async function main() {
  var g = system.initialise(new Game());
  var p = g.p1;
  system.print(_stdlib.asString(p.ucName()));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["p1", "Player"], ["p2", "Player"]]);};
  constructor() {

  }

  _p1;
  get p1() {
    return this._p1 ??= Player.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ??= Player.defaultInstance();
  }
  set p2(p2) {
    this._p2 = p2;
  }

  asString() {
    return "A game";
  }

}

class Player {
  static defaultInstance() { return system.defaultClass(Player, [["name", "String"]]);};
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
return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "");
  });

  ignore_test('Pass_defaultCannotBeReplacedUsingWith', async () => {
    const code = `# FFFFFFFFFFFFFFFF Elan v0.1 valid

main
  var p set to default Player
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

    const objectCode = `var system; var _stdlib; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {

return main;}`;

    const fileImpl = new FileImpl(testHash, new DefaultProfile(), true);
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "empty Listempty Dictionaryempty Arraytruetruetruetrue");
  });

  

});