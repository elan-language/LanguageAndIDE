import assert from 'assert';
import * as vscode from 'vscode';
import { DefaultProfile } from '../frames/default-profile';
import { FileImpl } from '../frames/file-impl';
import { hash } from '../util';
import { key } from './testHelpers';
import { Constant } from '../frames/globals/constant';
import { MainFrame } from '../frames/globals/main-frame';
import { SetStatement } from '../frames/statements/set-statement';
import { FunctionFrame } from '../frames/globals/function-frame';


suite('Editing Fields Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

test('Simple entry & editing of text in a name', () => { 
    var con = new Constant(new FileImpl(hash, new DefaultProfile()));
    var name = con.name;
    assert.equal(name.text, "");
    assert.equal(name.cursorPos, 0);
    name.processKey(key("a"));
    assert.equal(name.text, "a");
    assert.equal(name.cursorPos, 1);
    name.processKey(key("b"));
    name.processKey(key("c"));
    name.processKey(key("d"));
    name.processKey(key("e"));
    assert.equal(name.text, "abcde");
    assert.equal(name.cursorPos, 5);
    name.processKey(key("Backspace"));
    assert.equal(name.text, "abcd");
    assert.equal(name.cursorPos, 4);
    name.processKey(key("ArrowLeft"));
    name.processKey(key("ArrowLeft"));
    assert.equal(name.text, "abcd");
    assert.equal(name.cursorPos, 2);
    name.processKey(key("Delete"));
    assert.equal(name.text, "abd");
    assert.equal(name.cursorPos, 2);
    name.processKey(key("Backspace"));
    assert.equal(name.text, "ad");
    assert.equal(name.cursorPos, 1);
    name.processKey(key("ArrowLeft"));
    assert.equal(name.text, "ad");
    assert.equal(name.cursorPos, 0);
    name.processKey(key("ArrowLeft"));
    assert.equal(name.text, "ad");
    assert.equal(name.cursorPos, 0);  // i.e. no further left
    name.processKey(key("End"));
    assert.equal(name.text, "ad");
    assert.equal(name.cursorPos, 2);  
    name.processKey(key("ArrowRight"));
    assert.equal(name.text, "ad");
    assert.equal(name.cursorPos, 2); // no further right
    name.processKey(key("f"));
    assert.equal(name.text, "adf");
    assert.equal(name.cursorPos, 3);
    name.processKey(key("Home"));
    assert.equal(name.text, "adf");
    assert.equal(name.cursorPos, 0);  
    });


    test('Entry of text with formatting', () => { 
        var main = new MainFrame(new FileImpl(hash, new DefaultProfile()));
        var set = new SetStatement(main);
        var expr = set.expr;
        expr.processKey(key("3"));
        assert.equal(expr.text, "3");
        assert.equal(expr.cursorPos, 1); 
        expr.processKey(key(" "));
        assert.equal(expr.text, "3 ");
        assert.equal(expr.cursorPos, 2); 
        assert.equal(expr.getCompletion(), "<pr>operator</pr> <pr>expression</pr>");
        expr.processKey(key("+")); 
        assert.equal(expr.text, "3 +");
        assert.equal(expr.cursorPos, 3); 
        assert.equal(expr.getCompletion(), " <pr>expression</pr>");
        expr.processKey(key(" "));
        assert.equal(expr.text, "3 + ");
        assert.equal(expr.cursorPos, 4); 
        assert.equal(expr.getCompletion(), "<pr>expression</pr>");
        expr.processKey(key("4"));
        assert.equal(expr.text, "3 + 4");
        assert.equal(expr.cursorPos, 5); 
        assert.equal(expr.getCompletion(), "");
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "3 + ");
        assert.equal(expr.cursorPos, 4); 
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "3 +");
        assert.equal(expr.cursorPos, 3); 
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "3 ");
        assert.equal(expr.cursorPos, 2); 
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "3");
        assert.equal(expr.cursorPos, 1); 
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "");
        assert.equal(expr.cursorPos, 0); 
        expr.processKey(key("Backspace"));
        assert.equal(expr.text, "");
        assert.equal(expr.cursorPos, 0); 
    });

    test('Entry of text with formatting ', () => { 
        var f = new FunctionFrame(new FileImpl(hash, new DefaultProfile()));
        var t = f.returnType;
        t.processKey(key("F"));
        assert.equal(t.text, "F");
        assert.equal(t.cursorPos, 1); 
        t.processKey(key("<"));
        assert.equal(t.text, "F<");
        assert.equal(t.cursorPos, 2); 
        assert.equal(t.getCompletion(), "of <pr>Type</pr>>");
        t.processKey(key("ArrowRight"));
        assert.equal(t.text, "F<of ");
        assert.equal(t.cursorPos, 5);
        assert.equal(t.getCompletion(), "<pr>Type</pr>>");
        t.processKey(key("ArrowRight"));
        assert.equal(t.text, "F<of "); //i.e. does not accept a prompt as text
        assert.equal(t.cursorPos, 5);
        assert.equal(t.getCompletion(), "<pr>Type</pr>>");
        t.processKey(key("B"));
        t.processKey(key("ArrowRight"));
        assert.equal(t.text, "F<of B>");
        assert.equal(t.getCompletion(), "");
        assert.equal(t.cursorPos, 7);

    });

});