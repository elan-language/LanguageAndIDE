import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { StatementSelector } from '../frames/statements/statement-selector';
import { VariableDefStatement } from '../frames/statements/variable-def-statement';
import { Print } from '../frames/statements/print';
import { Throw } from '../frames/statements/throw';
import { Call } from '../frames/statements/call';
import { Regexes } from '../frames/fields/regexes';
import { assertFileParses } from './testHelpers';

suite('File Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse Frames - empty file', () => {
        var source = new CodeSourceFromString("");
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		var code = `# c86776f84624ecbc12d2eef7883c0a525c2c11b6ddcab8a3010430a7580c1ab3 Elan v0.1 valid

`;
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	}); 

    test('parse Frames - set statement', () => {
		var code = "  set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse Frames - variable', () => {
		var code = "  var fooBar set to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var v = new VariableDefStatement(m);
		v.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(v.renderAsSource(), code);
	});

	test('parse Frames - print', () => {
		var code = `  print "Hello World!"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var p = new Print(m);
		p.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(p.renderAsSource(), code);
	});
	test('parse Frames - throw', () => {
		var code = `  throw "Failure"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - throw with variable', () => {
		var code = `  throw message1`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - call', () => {
		var code = `  call foo()`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - call with args', () => {
		var code = `  call foo(3, a, "hello")`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - StatementSelector', () => {
		var code = "set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var ss = new StatementSelector(m);
		ss.parseFrom(source);
		assert.equal(source.getRemainingCode(), "");
	}); 

	test('parse Frames - header file', () => {
		var code = `# c86776f84624ecbc12d2eef7883c0a525c2c11b6ddcab8a3010430a7580c1ab3 Elan v0.1 valid

`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - constant only', () => {
		var code = `# 83e1b601b037b88345a6441e68c281a520c5919d159b62b13c216ece8457ad42 Elan v0.1 valid

constant pi set to 3.142
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


	test('parse Frames - two constants', () => {
		var code = `# 1e1d3aa095463fa2aab8601b090744c2e670e90a5333ade81ad565f36767866a Elan v0.1 valid

constant pi set to 3.142

constant e set to 2.718
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - main', () => {
		var code = `# 5642a0933550c6081bce260e8e0c4cf2cdf112193b0cc034980e23636a796bfc Elan v0.1 valid

main

end main
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - hello world', () => {
		var code = `# FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF Elan v0.1 valid

# my comment
main
  # My first program
  print "Hello World!"
end main
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(true);
		fl.parseFrom(source);
    if (fl.parseError) {
      throw new Error(fl.parseError);
    }
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - main with all single-line statements', () => {
		var code = `# 55a316ade19e2e61cf48355ed7e92e75892157dcb631211d4080aa2649df6dfe Elan v0.1 valid

main
  var name set to value or expression
  set a to 3 + 4
  throw "message"
  call signIn(rwp, password)
  print "Hello World!"
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - all globals except class', () => {
		var code = `# 7769aa9d4a8e95e8c8bf6e52f8acbfd148ec61bbe9e7b21d6f04d3d17d101de4 Elan v0.1 valid

constant phi set to 1.618

main

end main

procedure signIn(password String)

end procedure

function hypotenuse(sideB Float, sideC Float) as Float
  return value or expression
end function

enum Fruit
  apple, orange, pear
end enum
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - class', () => {
		var code = `# 6d4d8df24c74a2072fbd05dd92278fa6219317b688fde9908f7251e5d831721c Elan v0.1 valid

class Player inherits Foo, Bar
  constructor()

  end constructor

  property score Int

  procedure foo()
    print 1
  end procedure

  function bar() as Int
    return 1
  end function

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - immutable class', () => {
		var code = `# f7be3359698e8a4b584dbcb48c04b834b33800696ddd3317abf43c76b75525c8 Elan v0.1 valid

immutable class Card inherits Foo, Bar
  constructor()

  end constructor

  private property value Int

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - abstract class', () => {
		var code = `# a1cdd02909a58fceb0c51f3b484ef65f9d91a6c3aa587173069528231e7bd10c Elan v0.1 valid

abstract class Card
  abstract property value Int

  abstract procedure foo()

  abstract function bar() as Qux

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - abstract immutable class', () => {
		var code = `# 254e89bdf507e1d4e0bbddeb2b5a5c0c189c04bc3c44335818762a505869426a Elan v0.1 valid

abstract immutable class Card
  abstract property value Int

  abstract function bar() as Qux

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - all multiline statements', () => {
		var code = `# eae84efc2363cb4ae9c67b77395dfe16f2f941b1077c4a311b70406e5a4015cd Elan v0.1 valid

main
  while newGame

  end while
  repeat

  end repeat when score > 20
  for i from 1 to 10 step 1

  end for
  each letter in Charlie Duke

  end each
  if y > 4

  end if
  if y > 4
    else

  end if
  if y > 4
    else if y > 10

    else

  end if
  try
    catch e

  end try
  switch a
    case 1

    default

  end switch
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});
	test('parse Frames - mergeSort from file', (done) => {
		assertFileParses(done, "programs/merge-sort.elan");
	});
	test('parse Frames - snake-oop', (done) => {
    assertFileParses(done, "programs/snake-oop.elan");
  });
  test('parse Frames - wordle', (done) => {
    assertFileParses(done, "programs/wordle-with-class.elan");
	});
  test('parse Frames - life', (done) => {
    assertFileParses(done, "programs/life.elan");
	});
  test('parse Frames - best-fit', (done) => {
    assertFileParses(done, "programs/best-fit.elan");
	});
  test('parse Frames - binary-search', (done) => {
    assertFileParses(done, "programs/binary-search.elan");
	});

  test('parse Frames - temp', () => {

  var code = `# FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF Elan v0.1 valid

main

end main

class GridGraph
  constructor(gridSize Int)
    set nodes to new List<of Point>() # Temp solution - need a proper Set
    set property.gridSize to gridSize
    call setBlock((new Point(0, 0)), (new Point(gridSize - 1, gridSize - 1)), true)
  end constructor

  property gridSize Int

  property nodes List<of Point>

  procedure setBlock(p1 Point, p2 Point, add Bool)
    # TODO: check that p1, p2 are in right order!
    for x from p1.x to p2.x step 1
      for y from p1.y to p2.y step 1
        var p set to new Point(x, y)
        if add
          set nodes to nodes + p
          else
            throw "not implemented"
        end if
      end for
    end for
  end procedure

  function nodeExists(p Point) as Bool
    return nodes.contains(p)
  end function

  function pointsAreAdjacentDiagonally(p1 Point,p2 Point) as Bool
    return absolute(p1.x - p2.x) is 1 and absolute(p1.y - p2.y) is 1
  end function

  # Assumes that it will only be called if the points ARE immediate neighbours
  function findEdge(p1 Point, p2 Point) as Float
    return p1.distanceFrom(p2)
  end function

  # Returns a list of nodes that can be reached from the specified node
  function neighbours(p Point) as List<of Point>
    var list set to { new Point(p.x, p.y-1),new Point(p.x+1, p.y-1),new Point(p.x+1, p.y),new Point(p.x+1, p.y+1),new Point(p.x, p.y+1),new Point(p.x-1, p.y+1), new Point(p.x-1, p.y),new Point(p.x-1, p.y-1) }
    return list.filter(lambda n -> nodeExists(n)).asList()
  end function

  # Returns a list of nodes, from source to destination, representing the shortest path, using dijkstra's algorithm
  # You may make use of existing methods such a s Neignbours, or findEdge.
  procedure shortestPath(source Point, destination Point, alg Algorithm, out route List<of Point>)
    # Initialise the 'table' with three 'columns' - one 'row' per node
    var visited set to newDictionaryOfAllPointsReturningFalseValues()
    var costFromSource set to  newDictionaryOfAllPointsReturningDoublesSetToInfinity()
    var via set to newDictionaryOfAllPointsReturningNull()
    # Set start
    var currentNode set to source
    set costFromSource to costFromSource.setItem(currentNode, 0)
    # Iterate until shortest path found
    while currentNode is not destination
      set visited to visited.setItem(currentNode,true)
      call updateCostAndViaOfEachNeighbourIfApplicable(costFromSource, via, currentNode, destination)
      set currentNode to nextNodeToVisit(currentNode, visited, costFromSource, destination, alg)
      if costFromSource[currentNode] is infinity
        throw "Cannot reach destination -  graph is 'disconnected'"
        else

      end if
    end while
    set route to retraceRoute(destination, source, via)
  end procedure

  function newDictionaryOfAllPointsReturningNull() as Dictionary<of Point, Point>
    var dict set to new Dictionary<of Point, Point>()
    each p in nodes
      set dict to dict.setItem(p, default Point)
    end each
    return dict
  end function

  function newDictionaryOfAllPointsReturningDoublesSetToInfinity() as Dictionary<of Point, Float>
    var dict set to new Dictionary<of Point, Float>()
    each p in nodes
      set dict to dict.setItem(p, infinity)
    end each
    return dict
  end function

  function newDictionaryOfAllPointsReturningFalseValues() as Dictionary<of Point, Bool>
    var dict set to new Dictionary<of Point, Bool>()
    each p in nodes
      set dict to dict.setItem(p, false)
    end each
    return dict
  end function

  procedure updateCostAndViaOfEachNeighbourIfApplicable(out costFromSource Dictionary<of Point, Float>, out via Dictionary<of Point, Point>,  currentNode Point,  destination Point)
    each neighbour in neighbours(currentNode)
      var newCost set to costFromSource[currentNode] + findEdge(currentNode, neighbour)
      if newCost < costFromSource[neighbour]
        set costFromSource to costFromSource.setItem(neighbour, newCost) # Wrong -  don't update cost to estimate -  update to actual. Use estimate to choose the lowest cost unvisited node only. 
        set via to via.setItem(neighbour,currentNode)
      end if
    end each
  end procedure

  function estimatedCostToDestination(current Point, destination Point) as Float
    return sqrt((current.x - destination.x) ^ 2 + (current.y - destination.y) ^ 2)
  end function

  function nextNodeToVisit(currentNode Point, visited Dictionary<of Point, Bool>, costFromSource Dictionary<of Point, Float>, destination Point ,alg Algorithm) as Point
    var lowestCostSoFar set to infinity
    var lowestCostNode set to nodes.element(0)
    var possibilities set to nodes.filter(lambda n ->  not visited[n] and costFromSource[n] < infinity)
    each p in possibilities
      var cost set to 0.0
      switch alg
        case Algorithm.dijkstra
          set cost to costFromSource[p]
        case Algorithm.optimistic
          set cost to estimatedCostToDestination(p, destination)
        case Algorithm.aStar
          set cost to costFromSource[p] + estimatedCostToDestination(p, destination)
        default

      end switch
      if cost < lowestCostSoFar
        set lowestCostSoFar to cost
        set lowestCostNode to p
      end if
    end each
    return lowestCostNode
  end function

  function retraceRoute(destination Point, source Point, via Dictionary<of Point, Point>) as List<of Point>
    var result set to { destination }
    var currentNode set to destination
    while currentNode is not source
      var previous set to via[currentNode]
      set result to result.insert(0, previous)
      set currentNode to previous
    end while
    return result
  end function

  function sumOfEdges(route List<of Point>) as Float
    var result set to 0.0
    var stage set to 0
    while stage < route.length() - 1
      set result to result + findEdge(route[stage], route[stage + 1])
      set stage to stage + 1
    end while
    return result
  end function

  function asString() as String
    return "a GridGraph"
  end function

end class

immutable class Point
  constructor(x Int, y Int)
    set property.x to x
    set property.y to y
  end constructor

  property x Int

  property y Int

  function distanceFrom(p2 Point) as Float
    return sqrt((p2.x - x)^2 + (p2.y - y)^2)
  end function

  function asString() as String
    return "a GridGraph"
  end function

end class

enum Algorithm
  dijkstra, optimistic, aStar
end enum

# big enough for this purpose
constant infinity set to 1000000.0
`;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(true);
		fl.parseFrom(source);
    if (fl.parseError) {
      throw new Error(fl.parseError);
    }
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

});