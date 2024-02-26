import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { StatementSelector } from '../frames/statements/statement-selector';
import { Variable } from '../frames/statements/variable';
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
		var code = `# e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 Elan v0.1 valid

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
		var v = new Variable(m);
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
		var code = `# e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 Elan v0.1 valid

`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - constant only', () => {
		var code = `# ac46b469191807126275bd96064b77c6ea13633faa227fda6513d90820f49dea Elan v0.1 valid

constant pi set to 3.142
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


	test('parse Frames - two constants', () => {
		var code = `# 92f459a07caf7d31f5383b5d7e26476d8c9470c8259a3cdcb39cbf1b3e101aac Elan v0.1 valid

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
		var code = `# 0cad41862a1b04bf92c8af69439d0e7e84531c7197be676912015cdfff86c355 Elan v0.1 valid

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
		var code = `# fc7c4565dc3c9c3b087c41e6ac607330bb97003fe75fd57360c88a0ff28f6a7d Elan v0.1 valid

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
		var code = `# edecbe6cd394058d2f572608d1b334c2fe2387333b261e3060bacc123c775bdf Elan v0.1 valid

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
		var code = `# c6f179daced8df8a9550680f2a67ae9dc26e6355aa8ea6437c685b140ae58de2 Elan v0.1 valid

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
		var code = `# 66b203d7b930afe3747b4ad07b21a812bf0134cd1b4792c9b6da723307acdfd1 Elan v0.1 valid

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
		var code = `# 33a98752be0ede6a68fbc894b8ab92bf6c02f43c29f14ab8f2e9ec1146d8abe3 Elan v0.1 valid

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
		var code = `# 12efc404ab43c3e2597dd738a3eb8bbb2ecd25115938ac717d11c09b28fa1044 Elan v0.1 valid

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
		var code = `# cdf1d048244b396c4e0cf2f19999e572913743a8c4390fb57a9224dd8fe53731 Elan v0.1 valid

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
		var code = `# bee13e6e47a3fd0547f7a9317ffd676fea5fc5fba88c46b7d57cae0eef948fc8 Elan v0.1 valid

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
		var code = `# 4d28f8a01546c4abc583b6ff1852559209498535f526461821c1bdd7fbdba611 Elan v0.1 valid

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
		var code = `# e47d2d8965b8780e58df6490ef79bc340857bb116d5c81af96fca0be6bb0fb80 Elan v0.1 valid

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
`;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


});