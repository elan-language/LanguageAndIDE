import { DefaultProfile } from "../../frames/default-profile";
import { CodeSourceFromString, FileImpl } from "../../frames/file-impl";
import { assertDoesNotParse, assertObjectCodeDoesNotExecute, assertObjectCodeExecutes, assertObjectCodeIs, assertParses, assertStatusIsValid, ignore_test } from "./compiler-test-helpers";
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
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(g.p2));
  system.print(_stdlib.asString(g.p1));
  system.print(_stdlib.asString(g.previousScores));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["p1", "Player"], ["p2", "Player"], ["previousScores", "List<of Int>"]]);};
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

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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
  print g.c
  print g.s
  print g.li
  print g.dsi
  print g.ai
end main

class Game
    constructor()
    end constructor

    property i as Int
    property f as Float
    property b as Boolean
    property c as Char
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
  system.print(_stdlib.asString(g.c));
  system.print(_stdlib.asString(g.s));
  system.print(_stdlib.asString(g.li));
  system.print(_stdlib.asString(g.dsi));
  system.print(_stdlib.asString(g.ai));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["i", "Int"], ["f", "Float"], ["b", "Boolean"], ["c", "Char"], ["s", "String"], ["li", "List<of Int>"], ["dsi", "Dictionary<of String, Int>"], ["ai", "Array<of Int>"]]);};
  constructor() {

  }

  i = 0;

  f = 0;

  b = false;

  c = "";

  s = "";

  li = system.defaultList();

  dsi = system.defaultDictionary();

  ai = system.defaultArray();

  asString() {
    return "A game";
  }

}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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

    property i as Int

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
  static defaultInstance() { return system.defaultClass(Game, [["i", "Int"]]);};
  constructor() {
    this.i = 100;
  }

  i = 0;

  asString() {
    return "A game";
  }

}
return main;}`;

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

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

  property score as Int
  property best as Int

  property p1 as Player
  property p2 as Player

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
  var g = system.initialise(new Game());
  system.print(_stdlib.asString(system.objectEquals(g.p1, Player.defaultInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.p2, Player.defaultInstance())));
  system.print(_stdlib.asString(system.objectEquals(g.previousGame, Game.defaultInstance())));
  system.print(_stdlib.asString(g.previousScores === system.defaultList()));
  system.print(_stdlib.asString(g.score === 0));
  system.print(_stdlib.asString(g.best === 0));
}

class Game {
  static defaultInstance() { return system.defaultClass(Game, [["score", "Int"], ["best", "Int"], ["p1", "Player"], ["p2", "Player"], ["previousGame", "Game"], ["previousScores", "List<of Int>"]]);};
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

    const fileImpl = new FileImpl(() => "", new DefaultProfile(), true);
    fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertStatusIsValid(fileImpl);
    assertObjectCodeIs(fileImpl, objectCode);
    await assertObjectCodeExecutes(fileImpl, "truetruetruetruefalsetrue");
  });

  

});