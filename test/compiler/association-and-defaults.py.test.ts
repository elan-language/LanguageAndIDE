import { StdLib } from "../../src/compiler/standard-library/std-lib";
import { CodeSourceFromString, FileImpl } from "../../src/ide/frames/file-impl";
import { Paradigm } from "../../src/ide/frames/paradigm";
import { StubInputOutput } from "../../src/ide/stub-input-output";
import {
  assertDoesNotCompile,
  assertDoesNotParse,
  assertObjectCodeExecutes,
  assertObjectCodeIs,
  assertParses,
  assertStatusIsValid,
  testHash,
  testPythonHeader,
  transforms,
} from "./compiler-test-helpers";

suite("Python Associations and Defaults", () => {
  test("Pass_CanHavePropertiesThatAreDataStructuresOrObjects", async () => {
    const code = `${testPythonHeader}

def main() -> None:
  x = 1 # variable definition
  x = pow(0.5, 2) # assignment
# end main

def main() -> None:
  g = Game() # variable definition
  printNoLine(g.p2) # procedure call
  printNoLine(g.p1) # procedure call
  printNoLine(g.previousScores) # procedure call
# end main

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p2 = Player("Chloe") # assignment
    self.p1 = Player("Joe") # assignment
    self.previousScores = [5, 2, 4] # assignment
  # end constructor

  p1: Player # property

  p2: Player # property

  previousScores: list[int] # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

class Player: # concrete class

  def __init__(self: Player, name: str) -> None:
    self.name = name # assignment
  # end constructor

  name: str # property

  def toString(self: Player) -> str: # function method
    return self.name
  # end function method

# end class

main()
`;

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

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  elan_p2;
  get p2() {
    return this.elan_p2 ??= Player.emptyInstance();
  }
  set p2(p2) {
    this.elan_p2 = p2;
  }

  previousScores = system.initialise(_stdlib.List.emptyInstance());

  async toString() {
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

  async toString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

def main() -> None:
  g = Game() # variable definition
  printNoLine(g.p2) # procedure call
  printNoLine(g.p1) # procedure call
  printNoLine(g.previousScores) # procedure call
# end main

class Player: # concrete class

  def __init__(self: Player, name: str) -> None:
    self.name = name # assignment
  # end constructor

  name: str # property

  def toString(self: Player) -> str: # function method
    return self.name
  # end function method

# end class

def main() -> None:
  g = Foo() # variable definition
  printNoLine(g.p1) # procedure call
  printNoLine(g.p2) # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = 1 # assignment
    self.p1 = self.p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

main()
`;

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

  async toString() {
    return "";
  }

  p1 = 0;

  p2 = 0;

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

class Player: # concrete class

  def __init__(self: Player, name: str) -> None:
    self.name = name # assignment
  # end constructor

  name: str # property

  def toString(self: Player) -> str: # function method
    return self.name
  # end function method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = 1 # assignment
    self.p1 = self.p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

def main() -> None:
  g = Game() # variable definition
  printNoLine(g.i) # procedure call
  printNoLine(g.f) # procedure call
  printNoLine(g.b) # procedure call
  printNoLine(g.s) # procedure call
  printNoLine(g.ds) # procedure call
  printNoLine(g.ai) # procedure call
  printNoLine(g.t) # procedure call
  printNoLine("aa".matchesRegExp(g.r)) # procedure call
# end main

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.s = "" # assignment
    self.ds = Dictionary[str, int]() # assignment
    self.ai = list[int]() # assignment
    self.t = (0, "", list[int]()) # assignment
  # end constructor

  i: int # property

  f: float # property

  b: bool # property

  s: str # property

  ds: Dictionary[str, int] # property

  ai: list[int] # property

  t: tuple[int, str, list[int]] # property

  r: RegExp # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

main()
`;

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
  await _stdlib.printNoLine(_stdlib.matchesRegExp("aa", g.r));
}

class Game {
  static emptyInstance() { return system.emptyClass(Game, [["i", 0], ["f", 0], ["b", false], ["s", ""], ["ds", system.initialise(_stdlib.Dictionary.emptyInstance())], ["ai", system.initialise(_stdlib.List.emptyInstance())], ["t", system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())])], ["r", system.emptyRegExp()]]);};

  async _initialise() {
    this.s = "";
    this.ds = system.initialise(await new _stdlib.Dictionary()._initialise());
    this.ai = system.initialise(await new _stdlib.List()._initialise());
    this.t = system.tuple([0, "", system.initialise(await new _stdlib.List()._initialise())]);
    return this;
  }

  i = 0;

  f = 0;

  b = false;

  s = "";

  ds = system.initialise(_stdlib.Dictionary.emptyInstance());

  ai = system.initialise(_stdlib.List.emptyInstance());

  t = system.emptyTuple([0, "", system.initialise(_stdlib.List.emptyInstance())]);

  r = system.emptyRegExp();

  async toString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "00false[][](0, , [])true");
  });

  test("Pass_DefaultValuesOnEmptyClass", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = 1 # assignment
    self.p1 = self.p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.s = "" # assignment
    self.ds = Dictionary[str, int]() # assignment
    self.ai = list[int]() # assignment
    self.t = (0, "", list[int]()) # assignment
  # end constructor

  i: int # property

  f: float # property

  b: bool # property

  s: str # property

  ds: Dictionary[str, int] # property

  ai: list[int] # property

  t: tuple[int, str, list[int]] # property

  r: RegExp # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

def main() -> None:
  p = Player() # variable definition
  g = p.g # variable definition
  printNoLine(g.i) # procedure call
  printNoLine(g.f) # procedure call
  printNoLine(g.b) # procedure call
  printNoLine(g.s) # procedure call
  printNoLine(g.ds) # procedure call
  printNoLine(g.ai) # procedure call
  printNoLine(g.t) # procedure call
  printNoLine(g.r) # procedure call
# end main

class Player: # concrete class

  def __init__(self: Player) -> None:
    self.g = Game() # assignment
  # end constructor

  def toString(self: Player) -> str: # function method
    return ""
  # end function method

  g: Game # property

# end class

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.s = "" # assignment
    self.li = list[int]() # assignment
    self.ds = Dictionary[str, int]() # assignment
    self.ai = list[int]() # assignment
    self.t = (0, "", list[int]()) # assignment
  # end constructor

  i: int # property

  f: float # property

  b: bool # property

  s: str # property

  li: list[int] # property

  ds: Dictionary[str, int] # property

  ai: list[int] # property

  t: tuple[int, str, list[int]] # property

  r: RegExp # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

main()
`;

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

  async toString() {
    return "";
  }

  elan_g;
  get g() {
    return this.elan_g ??= Game.emptyInstance();
  }
  set g(g) {
    this.elan_g = g;
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

  async toString() {
    return "A game";
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "00false[][](0, , [])A RegExp");
  });

  test("Pass_PropertiesOfClassTypesHaveDefaultValues", async () => {
    const code = `${testPythonHeader}

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.s = "" # assignment
    self.ds = Dictionary[str, int]() # assignment
    self.ai = list[int]() # assignment
    self.t = (0, "", list[int]()) # assignment
  # end constructor

  i: int # property

  f: float # property

  b: bool # property

  s: str # property

  ds: Dictionary[str, int] # property

  ai: list[int] # property

  t: tuple[int, str, list[int]] # property

  r: RegExp # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

class Player: # concrete class

  def __init__(self: Player) -> None:
    self.g = Game() # assignment
  # end constructor

  def toString(self: Player) -> str: # function method
    return ""
  # end function method

  g: Game # property

# end class

def main() -> None:
  g = Game() # variable definition
  printNoLine(g.p1) # procedure call
  printNoLine(g.previousGame) # procedure call
# end main

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = Player("Player1") # assignment
    self.previousGame = Maybe[Game]() # assignment
  # end constructor

  p1: Player # property

  previousGame: Maybe[Game] # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

class Player: # concrete class

  def __init__(self: Player, name: str) -> None:
    self.name = name # assignment
  # end constructor

  name: str # property

  def toString(self: Player) -> str: # function method
    return self.name
  # end function method

# end class

main()
`;

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
    this.previousGame = system.initialise(await new _stdlib.Maybe()._initialise());
    return this;
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Player.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

  elan_previousGame;
  get previousGame() {
    return this.elan_previousGame ??= system.initialise(_stdlib.Maybe.emptyInstance());
  }
  set previousGame(previousGame) {
    this.elan_previousGame = previousGame;
  }

  async toString() {
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

  async toString() {
    return this.name;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    await assertObjectCodeExecutes(fileImpl, "Player1a Maybe");
  });

  test("Pass_PropertyOfListType", async () => {
    const code = `${testPythonHeader}

class Player: # concrete class

  def __init__(self: Player) -> None:
    self.g = Game() # assignment
  # end constructor

  def toString(self: Player) -> str: # function method
    return ""
  # end function method

  g: Game # property

# end class

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = Player("Player1") # assignment
    self.previousGame = Maybe[Game]() # assignment
  # end constructor

  p1: Player # property

  previousGame: Maybe[Game] # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

def main() -> None:
  g = Game() # variable definition
  g.something() # procedure call
# end main

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = [1, 2, 3] # assignment
  # end constructor

  def toString(self: Game) -> str: # function method
    return ""
  # end function method

  p1: list[int] # property

  def something(self: Game) -> None: # procedure method
    a = 1 # variable definition
    a = self.p1[0] # assignment
    printNoLine(a) # procedure call
  # end procedure method

# end class

main()
`;

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

  async toString() {
    return "";
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
      new Paradigm(""),
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
    const code = `${testPythonHeader}

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = Player("Player1") # assignment
    self.previousGame = Maybe[Game]() # assignment
  # end constructor

  p1: Player # property

  previousGame: Maybe[Game] # property

  def toString(self: Game) -> str: # function method
    return "A game"
  # end function method

# end class

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = [1, 2, 3] # assignment
  # end constructor

  def toString(self: Game) -> str: # function method
    return ""
  # end function method

  p1: list[int] # property

  def something(self: Game) -> None: # procedure method
    a = 1 # variable definition
    a = self.p1[0] # assignment
    printNoLine(a) # procedure call
  # end procedure method

# end class

def main() -> None:
  bar = Bar() # variable definition
  bar.p() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    p1 = self.p1 # variable definition
    p1.pp() # procedure call
  # end procedure method

  p1: Foo # property

# end class

main()
`;

    const objectCode = `let system; let _stdlib; let _tests = []; export function _inject(l,s) { system = l; _stdlib = s; }; export async function program() {
const global = new class {};
async function main() {
  let bar = system.initialise(await new Bar()._initialise());
  await bar.p();
}

class Foo {
  static emptyInstance() { return system.emptyClass(Foo, []);};

  async _initialise() {

    return this;
  }

  async toString() {
    return "";
  }

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

  async toString() {
    return "";
  }

  async p() {
    let p1 = this.p1;
    await p1.pp();
  }

  elan_p1;
  get p1() {
    return this.elan_p1 ??= Foo.emptyInstance();
  }
  set p1(p1) {
    this.elan_p1 = p1;
  }

}
return [main, _tests];}`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
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
    const code = `${testPythonHeader}

class Game: # concrete class

  def __init__(self: Game) -> None:
    self.p1 = [1, 2, 3] # assignment
  # end constructor

  def toString(self: Game) -> str: # function method
    return ""
  # end function method

  p1: list[int] # property

  def something(self: Game) -> None: # procedure method
    a = 1 # variable definition
    a = self.p1[0] # assignment
    printNoLine(a) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  if:  # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertDoesNotParse(fileImpl);
  });

  test("Fail_UseOfReservedWordAsName", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  if:  # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  break: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'break' matches a reserved word.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword1", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  if:  # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  break: int # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword2", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  break: int # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = [0] # assignment
    self.p1 = p2[0] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword3", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p1 = p2 # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: int # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = [0] # assignment
    self.p1 = p2[0] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    if self.p1 == 0:
      p2 = [0] # assignment
    # end if
  # end procedure method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword4", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = [0] # assignment
    self.p1 = p2[0] # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    if self.p1 == 0:
      p2 = [0] # assignment
    # end if
  # end procedure method

# end class

def main() -> None:

# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    self.p2 = [0] # assignment
    p1 = self.p2[0] # assignment
  # end procedure method

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword5", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    if self.p1 == 0:
      p2 = [0] # assignment
    # end if
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    self.p2 = [0] # assignment
    p1 = self.p2[0] # assignment
  # end procedure method

# end class

def main() -> None:
  bar = Bar() # variable definition
  bar.p() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    p1.pp() # procedure call
  # end procedure method

  p1: Foo # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword6", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:
    self.p2 = list[int]() # assignment
  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  p1: int # property

  p2: list[int] # property

  def foo(self: Foo) -> None: # procedure method
    self.p2 = [0] # assignment
    p1 = self.p2[0] # assignment
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

def main() -> None:
  bar = Bar() # variable definition
  bar.p() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    if self.p2:
      p1.pp() # procedure call
    # end if
  # end procedure method

  p1: Foo # property

  p2: bool # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_MissingPropertyKeyword6", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

def main() -> None:
  bar = Bar() # variable definition
  bar.p() # procedure call
# end main

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:
    self.p1 = Foo() # assignment
  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    if self.p2:
      p2 = False # assignment
    # end if
  # end procedure method

  p1: Foo # property

  p2: bool # property

# end class

main()
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_noThis", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    a = toString() # variable definition
  # end procedure method

# end class
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "Must prefix member with 'this'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_notInScope", async () => {
    const code = `${testPythonHeader}

class Foo: # concrete class

  def __init__(self: Foo) -> None:

  # end constructor

  def toString(self: Foo) -> str: # function method
    return ""
  # end function method

  def pp(self: Foo) -> None: # procedure method
    printNoLine(1) # procedure call
  # end procedure method

# end class

def foo() -> int: # function
  return 0
# end function

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    a = self.foo() # variable definition
  # end procedure method

# end class
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'foo' is not defined for type 'Bar'.ErrorMessages.html#compile_error",
    ]);
  });

  test("Fail_spuriousProperty3", async () => {
    const code = `${testPythonHeader}

def foo() -> int: # function
  return 0
# end function

aa = 1 # constant

class Bar: # concrete class

  def __init__(self: Bar) -> None:

  # end constructor

  def toString(self: Bar) -> str: # function method
    return ""
  # end function method

  def p(self: Bar) -> None: # procedure method
    a = self.aa # variable definition
  # end procedure method

# end class
`;

    const fileImpl = new FileImpl(
      testHash,
      new Paradigm(""),
      "",
      transforms(),
      new StdLib(new StubInputOutput()),
      false,
      true,
    );
    await fileImpl.parseFrom(new CodeSourceFromString(code));

    assertParses(fileImpl);
    assertDoesNotCompile(fileImpl, [
      "'aa' is not defined for type 'Bar'.ErrorMessages.html#compile_error",
    ]);
  });
});
