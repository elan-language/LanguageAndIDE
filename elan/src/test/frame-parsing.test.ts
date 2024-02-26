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
import { assertSourceFileParses } from './testHelpers';

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
		var code = `# fe7d4129310ebd088b815518559c4ac512b0e67da256e912bed669756817e4f4 Elan v0.1 valid

main
  # My first program
  print "Hello World!"
end main
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
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


	test('parse Frames - mergeSort', () => {
		var code = `# 99e4a4090ff23e3d09d26320f73c5c1d483cfe33e6b9c17250b86d2a762553c5 Elan v0.1 valid

main
  var li set to {"plum","apricot","lime","lemon","melon","apple","orange","strawberry","pear","banana"}
  print mergeSort(li)
end main

function mergeSort(list List<of String>) as List<of String>
  var result set to list
  if list.length() > 1
    var mid set to list.length() div 2
    set result to merge(mergeSort(list[..mid]), mergeSort(list[mid..]))
  end if
  return result
end function

function merge(a List<of String>, b List<of String>) as List<of String>
  var name set to new List<of String>()
  if a.isEmpty()
    set result to b
    else if b.isEmpty()
      set result to a
    else if a[0].isBefore(b[0])
      set result to a[0] + merge(a[1..], b)
    else
      set result to b[0] + merge(a, b[1..])
  end if
  return result
end function
`;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - mergeSort from file', (done) => {
		assertSourceFileParses(done, "T06_mergeSort.source");
	});

	test('parse Frames - snake.oop', () => {
		var code = `# 4e8bee2c83ff12cf2b63ad55e2daaab1b3d8899f05648823f0ef2a80d197be91 Elan v0.1 valid

main
  print welcome
  var k set to system.readKey()
  var newGame set to true
  while newGame
    call playGame()
    print "Do you want to play again (y/n)?"
    var answer set to ' '
    repeat
      set answer to system.readKey()
    end repeat when answer is 'y' or answer is 'n'
    if answer is 'n'
      set newGame to false
    end if
  end while
end main

constant directionByKey set to { 'w': Direction.up, 's' : Direction.down, 'a': Direction.left, 'd': Direction.right}

constant welcome set to "Welcome to the Snake game."

procedure playGame()
  var charMap set to new CharMap()
  call charMap.fillBackground()
  var currentDirection set to Direction.right
  var snake set to new Snake(charMap.width div 2, charMap.height, currentDirection)
  var gameOn set to true
  while gameOn
    call draw(charMap, snake.head, Colour.green)
    call draw(charMap, snake.apple, Colour.red)
    var priorTail set to snake.tail()
    call pause(200)
    var pressed set to system.keyHasBeenPressed()
    if pressed
      var k set to system.readKey()
      set currentDirection to directionByKey[k]
    end if
    call snake.clockTick(currentDirection, gameOn)
    if snake.tail() is not priorTail
      call draw(charMap, priorTail, charMap.backgroundColour)
    end if
  end while
  call charMap.setCursor(0, 0)
  print "Game Over! Score: {snake.length() - 2}"
end procedure

procedure draw(cm CharMap, sq Square, colour Colour)
  var col set to sq.x * 2
  var row set to sq.y
  call cm.putBlockWithColour(col, row, colour)
  var colPlus set to col + 1
  call cm.putBlockWithColour(colPlus, row, colour)
end procedure

class Snake
  constructor(boardWidth Int, boardHeight Int, startingDirection Direction)
    set property.boardWidth to boardWidth
    set property.boardHeight to boardHeight
    var tail set to new Square(boardWidth div 2, boardHeight div 2)
    set body to {tail}
    set head to tail.getAdjacentSquare(startingDirection)
    call setNewApplePosition()
  end constructor

  property boardWidth Int

  property boardHeight Int

  property head Square

  private property body List<of Square>

  property apple Square

  function tail() as Square
    return body[0]
  end function

  function length() as Int
    return body.length()
  end function

  function bodyCovers(sq Square) as Bool
    var result set to false
    each seg in body
      if (seg is sq)
        set result to true
      end if
    end each
    return result
  end function

  procedure clockTick(d Direction, out continue Boolean)
    set body to body + head;
    set head to head.getAdjacentSquare(d);
    if head is apple
      call setNewApplePosition()
      else
        set body to body[1..]
    end if
    set continue to not hasHitEdge() and not bodyCovers(head)
  end procedure

  function hasHitEdge() as Bool
    return head.x < 0 or head.y < 0 or head.x is boardWidth or head.y is boardHeight
  end function

  procedure setNewApplePosition()
    repeat
      var w set to boardWidth - 1
      var h set to boardHeight - 1
      var ranW set to system.random(w)
      var ranH set to system.random(h)
      set apple to new Square(ranW, ranH) 
    end repeat when not bodyCovers(apple)
  end procedure

end class

class Square
  constructor(x Int, y Int)
    set property.x to x
    set property.y to y
  end constructor

  property x Int

  property y Int

  function getAdjacentSquare(d Direction) as Square
    var newX set to x
    var newY set to y
    switch d
      case Direction.left
        set newX to newX - 1     
      case Direction.right
        set newX to newX + 1
      case Direction.up
        set newY to newY - 1 
      case Direction.down
        set newY to newY + 1
      default

    end switch
    return new Square(newX, newY)
  end function

end class
`;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

  test('parse Frames - wordle', () => {
		var code = `# d62f1187f5416a0d388d1097e326564403b46393e734db8587f0e8a27a817cb2 Elan v0.1 valid

constant allPossibleAnswers set to {"ABACK","ABASE","ABATE","ABBEY","ABBOT","ABHOR","ABIDE","ABLED","ABODE","ABORT","ABOUT","ABOVE"}

constant validWords set to {"ABACK","ABASE","ABATE","ABBEY","ABBOT","ABHOR","ABIDE","ABLED","ABODE","ABORT","ABOUT","ABOVE"}

main
  var possible set to validWords
  var marking set to ""
  var attempt set to "RAISE"
  while marking is not "*****"
    print attempt
    set marking to input
    set possible to possibleAnswersAfterAttempt(possible, attempt, marking).asList()
    set attempt to bestAttempt(possible, validWords)
  end while
end main

function isGreen(attempt String, target String, n Int) as Bool
  return target[n] is attempt[n]
end function

function setChar(word String, n Int, newChar Char) as String
  return word[..n] + newChar + word[n+1..]
end function

function setAttemptIfGreen(attempt String, target String, n Int) as String
  return attempt.setChar(n, '*') if attempt.isGreen(target, n)  else attempt
end function

function setTargetIfGreen(attempt String, target String, n Int) as String
  return target.setChar(n, '.') if attempt.isGreen(target, n) else target
end function

function isAlreadyMarkedGreen(attempt String, n Int) as Bool
  return attempt[n] is '*'
end function

function isYellow(attempt String, target String, n Int) as Bool
  return target.contains(attempt[n])
end function

function setAttemptIfYellow(attempt String, target String, n Int) as String
  return attempt if attempt[n] is '*'  else attempt.setChar(n, '+') if attempt.isYellow(target, n)  else attempt.setChar(n, '_')
end function

function setTargetIfYellow(attempt String, target String, n Int) as String
  return target if attempt.isAlreadyMarkedGreen(n)  else target.setChar(target.indexOf(attempt[n]), '.')  if attempt.isYellow(target, n)  else target
end function

constant letterPositions set to {0,1,2,3,4}

function evaluateGreens(attempt String, target String) as (String, String)
  return letterPositions.reduce((attempt, target), lambda a, x  -> (setAttemptIfGreen(a.attempt, a.target, x), setTargetIfGreen(a.attempt, a.target, x)))
end function

function evaluateYellows(attempt String, target String) as (String, String)
  return letterPositions.reduce((attempt, target),lambda a, x -> (setAttemptIfYellow(a.attempt, a.target, x), setTargetIfYellow(a.attempt, a.target, x)))
end function

function markAttempt(attempt String, target String) as String
  var (attemptAfterGreens, targetAfterGreens) set to evaluateGreens(attempt, target)
  return attemptAfterGreens.evaluateYellows(targetAfterGreens).first()
end function

function possibleAnswersAfterAttempt(prior Iter<of String>, attempt String, mark String) as Iter<of String>
  return prior.filter(lambda w -> markAttempt(attempt, w) is mark)
end function

function wordCountRemainingAfterAttempt(possibleAnswers Iter<of String>, attempt String) as WordCount
  var groups set to possibleAnswers.groupBy(lambda w -> markAttempt(attempt, w))
  return new WordCount(attempt, groups.maxBy(lambda g -> g.members.count()).members.count())
end function

function allRemainingWordCounts(possAnswers List<of String>, possAttempts Iter<of String>) as Iter<of WordCount>
  return possAttempts.asParallel().map(lambda w -> wordCountRemainingAfterAttempt(possAnswers, w))
end function

function betterOf(wc1 WordCount, wc2 WordCount, possAnswers Iter<of String>) as WordCount
  var isBetter set to wc2.count < wc1.count
  var isEqualAndPossAnswer set to wc2.count is wc1.count and possAnswers.contains(wc2.word)
  return wc2  if isBetter or isEqualAndPossAnswer  else wc1
end function

function bestAttempt(possAnswers List<of String>, possAttempts List<of String>) as String
  var wordCounts set to allRemainingWordCounts(possAnswers, possAttempts)
  return wordCounts.reduce(wordCounts.head(),lambda bestSoFar, newWord ->  betterOf(bestSoFar, newWord, possAnswers)).word
end function

immutable class WordCount
  constructor(word String, count Int)
    set property.word to word
    set property.count to count
  end constructor

  property word String

  property count Int

  function asString() as String
    return "{word}, {count}"
  end function

end class
`;
    var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});
});