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
		var code = `# Elan v0.1 valid e3b0c44298fc1c14

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
		var code = `# Elan v0.1 valid e3b0c44298fc1c14

`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - constant only', () => {
		var code = `# Elan v0.1 valid ac46b46919180712

constant pi set to 3.142
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


	test('parse Frames - two constants', () => {
		var code = `# Elan v0.1 valid 92f459a07caf7d31

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
		var code = `# Elan v0.1 valid 0cad41862a1b04bf

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
		var code = `# Elan v0.1 valid fc7c4565dc3c9c3b

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
		var code = `# Elan v0.1 valid edecbe6cd394058d

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
		var code = `# Elan v0.1 valid c6f179daced8df8a

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
		var code = `# Elan v0.1 valid 66b203d7b930afe3

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
		var code = `# Elan v0.1 valid 33a98752be0ede6a

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
		var code = `# Elan v0.1 valid 12efc404ab43c3e2

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
		var code = `# Elan v0.1 valid cdf1d048244b396c

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
		var code = `# Elan v0.1 valid bee13e6e47a3fd05

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
		var code = `# Elan v0.1 valid 4d28f8a01546c4ab

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


});