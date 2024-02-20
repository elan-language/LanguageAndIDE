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

suite('Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse - all Regexes', () => { 
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(`\n`), true);
		assert.equal(new RegExp(`^${Regexes.newLine}$`).test(`\r\n`), true);

		assert.equal(new RegExp(`^${Regexes.type}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`T`), true);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`Foo123_x`), true);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`Foo<of Bar>`), true);
		assert.equal(new RegExp(`^${Regexes.type}$`).test(`f`), false);


		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`t`), true);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`abc123_h`), true);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`F`), false);
		assert.equal(new RegExp(`^${Regexes.identifier}$`).test(`abc `), false);

		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello"`), true);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello`), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`hello"`), false);
		assert.equal(new RegExp(`^${Regexes.literalString}$`).test(`"hello" there`), false);
		assert.equal(new RegExp(Regexes.literalString).test(`"hello" there`), true);
       
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`0345`), true);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`0345 `), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`03 45`), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(`03.45`), false);
		assert.equal(new RegExp(`^${Regexes.literalInt}$`).test(``), false);

		assert.equal(new RegExp(Regexes.literalFloat).test(`0.345`), true);
		assert.equal(new RegExp(Regexes.literalFloat).test(`345`), false);
		assert.equal(new RegExp(Regexes.literalFloat).test(`.345`), false);
		assert.equal(new RegExp(`^${Regexes.literalFloat}$`).test(`0.345 `), false);
		assert.equal(new RegExp(`^${Regexes.literalFloat}$`).test(``), false);

		assert.equal(new RegExp(Regexes.literalChar).test(`'a'`), true);
		assert.equal(new RegExp(Regexes.literalChar).test(`' '`), true);
		assert.equal(new RegExp(Regexes.literalChar).test(`'a`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`a`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`a'`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`'ab'`), false);
		assert.equal(new RegExp(Regexes.literalChar).test(`"a"`), false);
		assert.equal(new RegExp(`^${Regexes.literalChar}$`).test(`'a' `), false);
		assert.equal(new RegExp(`^${Regexes.literalChar}$`).test(``), false);

		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`true`), true);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`false`), true);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`True`), false);
		assert.equal(new RegExp(`^${Regexes.literalBool}$`).test(`true `), false);

		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`"hello"`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`0345`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`0.345`), true);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`'a'`), true);	
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`true`), true);	
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`true `), false);
		assert.equal(new RegExp(`^${Regexes.literalValue}$`).test(`a`), false);

		assert.equal(new RegExp(`^${Regexes.variable}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a[3]`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`a[b]`), true);
		assert.equal(new RegExp(`^${Regexes.variable}$`).test(`"a"`), false);

		assert.equal(new RegExp(`^${Regexes.value}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`a[3]`), true);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`3`), true);
		assert.equal(new RegExp(`^${Regexes.value}$`).test(`"3"`), true);

		assert.equal(new RegExp(`^${Regexes.argList}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a`), true);
		//assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a, b`), true);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`3, a, "hello"`), true);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a `), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a,`), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`,`), false);
		assert.equal(new RegExp(`^${Regexes.argList}$`).test(`a,b`), false);

		assert.equal(new RegExp(`^${Regexes.expression}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`3`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`3 + 4`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`(3 + 4) * 5`), true);
		assert.equal(new RegExp(`^${Regexes.expression}$`).test(`mergeSort(li)`), true);

		assert.equal(new RegExp(`^${Regexes.conditionalOperator}$`).test(`>`), true);

		assert.equal(new RegExp(`^${Regexes.condition}$`).test(``), false);
		assert.equal(new RegExp(`^${Regexes.condition}$`).test(`a > b`), true);
	
/*		static readonly argList = `${Regexes.value}(, ${Regexes.value})*`; //For time being does not allow expressions
		static readonly paramDef = `${Regexes.identifier} ${Regexes.type}`;
		static readonly paramList = `${Regexes.paramDef}(, ${Regexes.paramDef})*`;
		static readonly typeList = `${Regexes.type}(, ${Regexes.type})*`;
		static readonly identifierList = `${Regexes.identifier}(, ${Regexes.identifier})*`;
		static readonly anythingToNewLine = `[^\\n]*`;
		static readonly expression = Regexes.anythingToNewLine; //TODO temporary kludge only - expression must go to end of line */
	}); 

	test('parse - empty file', () => {
        var source = new CodeSourceFromString("");
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		var code = `# Elan v0.1 valid e3b0c44298fc1c14

`;
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	}); 

    test('parse - set statement', () => {
		var code = "  set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse - variable', () => {
		var code = "  var fooBar set to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var v = new Variable(m);
		v.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(v.renderAsSource(), code);
	});

	test('parse - print', () => {
		var code = `  print "Hello World!"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var p = new Print(m);
		p.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(p.renderAsSource(), code);
	});
	test('parse - throw', () => {
		var code = `  throw "Failure"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - throw with variable', () => {
		var code = `  throw message1`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - call', () => {
		var code = `  call foo()`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - call with args', () => {
		var code = `  call foo(3, a, "hello")`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var setTo = new Call(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse - StatementSelector', () => {
		var code = "set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl();
		var m = new MainFrame(fl);	
		var ss = new StatementSelector(m);
		ss.parseFrom(source);
		assert.equal(source.getRemainingCode(), "");
	}); 

	test('parse - header file', () => {
		var code = `# Elan v0.1 valid e3b0c44298fc1c14

`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse - constant only', () => {
		var code = `# Elan v0.1 valid ac46b46919180712

constant pi set to 3.142
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl();
		fl.parseFrom(source);
		var elan = fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


	test('parse - two constants', () => {
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

	test('parse - main', () => {
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

	test('parse - hello world', () => {
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

	test('parse - main with all single-line statements', () => {
		var code = `# Elan v0.1 valid a07f33f9d15ca00c

main
  var name set to value or expression
  set a to 3 + 4
  throw message
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

	test('parse - all globals except class', () => {
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

	test('parse - class', () => {
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

	test('parse - immutable class', () => {
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

	test('parse - abstract class', () => {
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

	test('parse - abstract immutable class', () => {
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

	test('parse - all multiline statements', () => {
		var code = `# Elan v0.1 valid 5f4023bd4909d889

main
  while newGame

  end while
  repeat

  end repeat when score > 20
  for i from 1 to 10 step 1

  end for
  each letter in Charlie Duke

  end each
  if y > 4 then

  end if
  if y > 4 then
    else

  end if
  if y > 4 then
    else if y > 10 then

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

	/* Not yet running as conditions use more complex expressions than current parsing recognises
	test('parse - mergeSort', (done) => {
		assertSourceFileParses(done, "T06_mergeSort.source");
	});*/

});