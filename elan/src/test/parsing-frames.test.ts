import assert from 'assert';
import * as vscode from 'vscode';
import {CodeSourceFromString } from '../frames/code-source';
import { FileImpl } from '../frames/file-impl';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { StatementSelector } from '../frames/statements/statement-selector';
import { VarStatement } from '../frames/statements/var-statement';
import { Print } from '../frames/statements/print';
import { Throw } from '../frames/statements/throw';
import { CallStatement } from '../frames/statements/call-statement';
import { hash } from '../util';
import { DefaultProfile } from '../frames/default-profile';
import { TestFrame } from '../frames/globals/test-frame';
import { AssertStatement } from '../frames/statements/assert-statement';
import { LetStatement } from '../frames/statements/let-statement';
import { ExternalStatement } from '../frames/statements/external-statement';
import { ignore_test } from './compiler/compiler-test-helpers';

suite('File Parsing Tests', async () => {
	vscode.window.showInformationMessage('Start all unit tests.');

    test('parse Frames - set statement', () => {
		var code = "  set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse Frames - set statement 2', () => {
		var code = "  set tot to tot";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 
	test('parse Frames - set statement 3', () => {
		var code = "  set result to 3 + 4";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new SetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse Frames - let statement 1', () => {
		var code = "  let result be 3 + 4";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new LetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 

	test('parse Frames - let statement 2', () => {
		var code = "  let (attemptAfterGreens, targetAfterGreens) be evaluateGreens(attempt, target)";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new LetStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	}); 


	test('parse Frames - assert statement 3', () => {
		var code = "  assert foo is 7";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var t = new TestFrame(fl);	
		var ass = new AssertStatement(t);
		ass.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(ass.renderAsSource(), code);
	}); 

	test('parse Frames - variable', () => {
		var code = "  var fooBar set to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var v = new VarStatement(m);
		v.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(v.renderAsSource(), code);
	});

	test('parse Frames - print', () => {
		var code = `  print "Hello World!"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var p = new Print(m);
		p.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(p.renderAsSource(), code);
	});
	test('parse Frames - throw', () => {
		var code = `  throw "Failure"`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - throw with variable', () => {
		var code = `  throw message1`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new Throw(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - call', () => {
		var code = `  call foo()`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new CallStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - call with args', () => {
		var code = `  call foo(3, a, "hello")`;
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var setTo = new CallStatement(m);
		setTo.parseFrom(source);
		assert.equal(source.hasMoreCode(), false);
		assert.equal(setTo.renderAsSource(), code);
	});
	test('parse Frames - StatementSelector', () => {
		var code = "set fooBar to 3.141";
        var source = new CodeSourceFromString(code + "\n");
		const fl = new FileImpl(hash, new DefaultProfile());
		var m = new MainFrame(fl);	
		var ss = new StatementSelector(m);
		ss.parseFrom(source);
		assert.equal(source.getRemainingCode(), "");
	}); 

	test('parse Frames - header file', async () => {
		var code = `# c86776f84624ecbc12d2eef7883c0a525c2c11b6ddcab8a3010430a7580c1ab3 Elan v0.1 valid

`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - constant only', async () => {
		var code = `# 83e1b601b037b88345a6441e68c281a520c5919d159b62b13c216ece8457ad42 Elan v0.1 valid

constant pi set to 3.142
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});


	test('parse Frames - two constants', async () => {
		var code = `# 1e1d3aa095463fa2aab8601b090744c2e670e90a5333ade81ad565f36767866a Elan v0.1 valid

constant pi set to 3.142

constant e set to 2.718
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - main', async () => {
		var code = `# 5642a0933550c6081bce260e8e0c4cf2cdf112193b0cc034980e23636a796bfc Elan v0.1 valid

main

end main
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - hello world', async () => {
		var code = `# 244696ccd30157219b43a148c6139816206b9269b1de2665cf230de346df30c3 Elan v0.1 valid

# my comment
main
  # My first program
  print "Hello World!"
end main
`;
        var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
    if (fl.parseError) {
      throw new Error(fl.parseError);
    }
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - main with all single-line statements', async () => {
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
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - all globals except class', async () => {
		var code = `# d04e23623596c2023d05e48f464deddfbfa5b5a3d0d3e01cf1cc5e5f26d83735 Elan v0.1 valid

constant phi set to 1.618

main

end main

procedure signIn(password as String)

end procedure

function hypotenuse(sideB as Number, sideC as Number) return Number
  return 0.0
end function

enum Fruit
  apple, orange, pear
end enum
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - class', async () => {
		var code = `# 834c9e198f709067045ddf39de7a96f9f926021b95df792d5dc55a0bae618736 Elan v0.1 valid

class Player inherits Foo, Bar
  constructor()

  end constructor

  property score as Int

  procedure foo()
    print 1
  end procedure

  function bar() return Int
    return 1
  end function

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - immutable class', async () => {
		var code = `# c716652d0078c118b606b66848e0ea87e5618f5f0e9196cf41c34f8b8409ede2 Elan v0.1 valid

immutable class Card inherits Foo, Bar
  constructor()

  end constructor

  private property value as Int

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - abstract class', async () => {
		var code = `# cc887504cf1fe1864e92e7d759fc8b8e95b0e0626c7f9b56328076222486c6e5 Elan v0.1 valid

abstract class Foo
  abstract property p1 as Int

  abstract property p2 as Int

  abstract procedure setP1(v as Int)

  abstract function product() return Int

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - external with into', async () => {
		var code = `# c6c9024aa74b80f7d1423e3d28c4318353d16034100e75d3ed1673aa76a04b2a Elan v0.1 valid

main
  external foo() into a
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - external (no into)', async () => {
		var code = `# 8d60cbf9747bf32d051ec9b6b3625e3accb03c91f4cebf76e9b51a7028063506 Elan v0.1 valid

main
  external foo()
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - abstract immutable class', async () => {
		var code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan v0.1 valid

abstract immutable class Card
  abstract property value as Int

  abstract function bar() return Qux

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('parse Frames - External frame with optional into', () => { 
		var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
		var ext = new ExternalStatement(main);
		ext.method.parseCurrentText();
		ext.args.parseCurrentText();;
		var html = ext.renderAsHtml();
		assert.equal(html, `<statement class="incomplete" id='ext3' tabindex="0"><top><keyword>external </keyword><field id="ident4" class="empty incomplete" tabindex=0><text></text><placeholder>method</placeholder><completion><pr>method</pr></completion><msg></msg><help title="The name of the procedure to be called (starting lower-case). Alternatively, a 'dotted-call':  the name of a variable or property, followed by a ''' and the name of the procedure method to call on that 'instance'.">?</help></field>(<field id="args5" class="empty optional valid" tabindex=0><text></text><placeholder>arguments</placeholder><completion><pr></pr></completion><msg></msg><help title="list of zero or more arguments, comma separated. Each argument may be a literal value, variable, or simple expression.">?</help></field>) <field id="into6" class="empty optional valid" tabindex=0><text></text><placeholder>into</placeholder><completion></completion><msg></msg><help title="Type 'i' put the result of the external method call into a pre-defined variable of a Type able to accept the result.">?</help></field></top></statement>`);
	});

	test('parse Frames - switch 1', async () => {
		var code = `# 66c88e1b3c6d6cf3d54f6b7cb336e426eda4a6c54219026aa772eea34a20e771 Elan v0.1 valid

main
  switch i
    case 1
      print "a"
    default

  end switch
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});
	test('parse Frames - switch 2', async () => {
		var code = `# cea6cdc7ee252b7d3bef59d737cb0a8aa25bb53e485105264a561060c589cea2 Elan v0.1 valid

main
  switch i
    case 1
      print "a"
    default
      print "b"
  end switch
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});
	test('parse Frames - external with and without into clause', async () => {
		var code = `# 0689659e2831b64100b411c9ab85c703343cf8f1df1c79074863928b350dcea6 Elan v0.1 valid

main
  external foo(4)
  external bar(4) into x
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});
	test('parse Frames - else with and without if', async () => {
		var code = `# 137e2149d84f86368994a74b51a04d7e84bfc144b3cc2810d511cdb7bdf97607 Elan v0.1 valid

main
  if true
    else if true

    else

  end if
end main
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile());
		await await fl.parseFrom(source);
		var elan = await fl.renderAsSource();
		assert.equal(elan, code.replaceAll("\n", "\r\n"));
	});

	test('#367 abstract class cannot contain concrete property', async () => {
		var code = `# Elan v0.1 valid

abstract class Card
  property value as Int

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile(), true);
		await await fl.parseFrom(source);
		assert.equal(fl.parseError!.includes(`0 matches found at property value as Int`), true);
	});

	test('#367 abstract class cannot contain concrete method', async () => {
		var code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan v0.1 valid

abstract class Card
  function bar() return Int
    return 0
  end function

end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile(), true);
		await await fl.parseFrom(source);
		assert.equal(fl.parseError!.includes(`0 matches found at function bar() return Int`), true);
	});
	test('#367 immutable class cannot contain procedure', async () => {
		var code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan v0.1 valid

immutable class Card
  constructor()

  end constructor

  procedure foo()

  end procedure
	  
end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile(), true);
		await await fl.parseFrom(source);
		assert.equal(fl.parseError!.includes(`0 matches found at procedure foo()`), true);
	});

	test('#367 abstract class cannot contain constructor', async () => {
		var code = `# a84a6db387a793b0e3493b26f384f0496485bc1f7f8cc686918ecbfd4c78c1b5 Elan v0.1 valid

abstract class Card
  constructor()

  end constructor
	  
 end class
`
		;
		var source = new CodeSourceFromString(code);
		const fl = new FileImpl(hash, new DefaultProfile(), true);
		await await fl.parseFrom(source);
		assert.equal(fl.parseError!.includes(`0 matches found at constructor()`), true);
	});
	
	
});