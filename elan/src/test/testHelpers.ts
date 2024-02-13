import * as vscode from 'vscode';
import { Selectable } from '../frames/interfaces/selectable';
import assert from 'assert';
import { File } from '../frames/interfaces/file';
import * as jsdom from 'jsdom';
import { KeyEvent } from '../frames/interfaces/key-event';

// flag to update test file 
var updateTestFiles = true;

function updateTestFile(testDoc: vscode.TextDocument, newContent: string, done: Mocha.Done,) {
    const edit = new vscode.WorkspaceEdit();

    edit.replace(
        testDoc.uri,
        new vscode.Range(0, 0, testDoc.lineCount, 0),
        newContent);

    vscode.workspace.applyEdit(edit).then(ok => {
        if (ok) {
            testDoc.save().then(b => {
                if (!b) {
                    console.warn("Save failed: " + testDoc.fileName);
                }
                done();
            });
        }
        else {
            console.warn("Edit failed: " + testDoc.fileName);
            done();
        }
    });  
}

export function wrap(html: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="..\\..\\..\\media\\elanStyle.css" rel="stylesheet" />
<title>Elan Editor</title>
</head>
<body>
<elan-code>
${html}
</elan-code>
</body>
</html>`;
}

export async function assertAreEqualByHtml(done: Mocha.Done, htmlFile: string, frame: () => File) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
    const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
    const model = frame();
    // get rid of \r for appveyor
    const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
    const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

    try {
        assert.strictEqual(actualHtml, expectedHtml);
        done();
    }
    catch (e) {
        if (updateTestFiles) {
            updateTestFile(htmlDoc, actualHtml, done);
        }
        else {
            done();
        }
        throw e;
    }
}

export async function assertAreEqualBySource(done: Mocha.Done, sourceFile: string, frame: () => File) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
    const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
    const model = frame();
    // get rid of \r for appveyor
    const actualSource = model.renderAsSource().replaceAll("\r", "");
    const expectedSource = sourceDoc.getText().replaceAll("\r", "");

    try {
        assert.strictEqual(actualSource, expectedSource);
        done();
    }
    catch (e) {
        done(e);
        throw e;
    }
}

export async function assertAreEqualByFile<T extends Selectable>(done: Mocha.Done, htmlFile: string, elanFile: string, frame: (s: string) => T) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const elanUri = vscode.Uri.joinPath(ws, elanFile);
    const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
    const elanDoc = await vscode.workspace.openTextDocument(elanUri);
    const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
    const model = frame(elanDoc.getText());
    const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
    const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

    try {
        assert.strictEqual(actualHtml, expectedHtml);
        done();
    }
    catch (e) {
        done(e);
        throw e;
    }
}

export function assertElementsById(dom : jsdom.JSDOM, id: string, expected: string){
	const e = dom.window.document.getElementById(id);
	const c = e?.className;
	assert.strictEqual(c, expected);
}

export function assertElementHasClasses(f: File, elementId: string, classes : string){
	const dom = readAsDOM(f);
    assertElementsById(dom, elementId, classes);
}

export function assertElementHtmlById(dom : jsdom.JSDOM, id: string, expected: string){
	const e = dom.window.document.getElementById(id);
	const c = e?.innerHTML;
	assert.strictEqual(c, expected);
}

export function assertElementContainsHtml(f: File, id: string, expectedHtml: string){
    const dom = readAsDOM(f);
	const e = dom.window.document.getElementById(id);
	const c = e?.innerHTML;
	assert.strictEqual(c, expectedHtml);
}

export function readAsDOM(f: File) {
	return new jsdom.JSDOM(f.renderAsHtml());
}

export function assertClasses(setupFn : () => File, testFn : (f: File) => void, assertClasses : [string, string, string]){
    const ff = setupFn();
	const preDom = readAsDOM(ff);
    testFn(ff);
    const postDom = readAsDOM(ff);

    assertElementsById(preDom, assertClasses[0], assertClasses[1]);
    assertElementsById(postDom, assertClasses[0], assertClasses[2]);
}

export function assertHtml(setupFn : () => File, testFn : (f: File) => void, assertClasses : [string, string]){
    const ff = setupFn();
    testFn(ff);
    const postDom = readAsDOM(ff);

    assertElementHtmlById(postDom, assertClasses[0], assertClasses[1]);
}

export function key(k: string, shift?: boolean, control?: boolean, alt?: boolean): KeyEvent {
    return { key: k, shift: !!shift, control: !!control, alt: !!alt };
}

export async function activate(docUri: vscode.Uri) {
    // The extensionId is `publisher.name` from package.json
    const ext = vscode.extensions.getExtension('undefined_publisher.elan')!;

    if (!ext){
        assert.fail("extension not found");
    }

    await ext.activate();
    try {
      const doc = await vscode.workspace.openTextDocument(docUri);
      const editor = await vscode.window.showTextDocument(doc);
      await sleep(2000); // Wait for server activation
    } catch (e) {
      console.error(e);
    }
  }
  
  async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }