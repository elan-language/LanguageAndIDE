import { editorEvent } from '../frames/interfaces/editor-event';
import assert from 'assert';
import * as vscode from 'vscode';
import { DefaultProfile } from '../frames/default-profile';
import { FileImpl } from '../frames/file-impl';
import { hash } from '../util';
import { FunctionFrame } from '../frames/globals/function-frame';


suite('Editing Fields Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

test('process keys', () => { 
    var func = new FunctionFrame(new FileImpl(hash, new DefaultProfile()));
    var params = func.params;
    var modKey =  { control:false, shift: false, alt: false}
    var event: editorEvent = {
        type: 'key',
        target: "frame",
        id: '',
        key: 'a',
        modKey:modKey
    };
    params.processKey(event);
    assert.equal(params.renderAsSource(),"a");
    assert.equal(params.renderAsHtml(),`<field id="params4" class="optional incomplete" tabindex=0><text>a<keyword></keyword></text><placeholder>parameter definitions</placeholder><completion> as <pr>Type</pr></completion></field>`);
    event = {
        type: 'key',
        target: "frame",
        id: '',
        key: ' ',
        modKey:modKey
    };
    params.processKey(event);
    assert.equal(params.renderAsSource(),"a ");
    assert.equal(params.renderAsHtml(),`<field id="params4" class="optional incomplete" tabindex=0><text>a <keyword></keyword></text><placeholder>parameter definitions</placeholder><completion>as <pr>Type</pr></completion></field>`);
});

});