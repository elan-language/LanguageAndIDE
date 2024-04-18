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
    return this._p1 ?? Player.defaultInstance();
  }
  set p1(p1) {
    this._p1 = p1;
  }

  _p2;
  get p2() {
    return this._p2 ?? Player.defaultInstance();
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

  

});