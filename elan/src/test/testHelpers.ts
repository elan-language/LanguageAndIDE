import * as vscode from 'vscode';
import { Frame } from '../frames/frame';
import assert from 'assert';

// flag to update test file 
var updateTestFiles = false;

function updateTestFile(testDoc: vscode.TextDocument, newContent: string) {
    const edit = new vscode.WorkspaceEdit();

    edit.replace(
        testDoc.uri,
        new vscode.Range(0, 0, testDoc.lineCount, 0),
        newContent);

    vscode.workspace.applyEdit(edit);
    testDoc.save();
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

export async function assertAreEqualByHtml<T extends Frame>(done: Mocha.Done, htmlFile: string, frame: () => T) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
    const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
    const model = frame();
    const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
    const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

    try {
        assert.strictEqual(actualHtml, expectedHtml);
        done();
    }
    catch (e) {
        if (updateTestFiles) {
            updateTestFile(htmlDoc, actualHtml);
        }

        done(e);
        throw e;
    }
}

export async function assertAreEqualBySource<T extends Frame>(done: Mocha.Done, sourceFile: string, frame: () => T) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const sourceUri = vscode.Uri.joinPath(ws, sourceFile);
    const sourceDoc = await vscode.workspace.openTextDocument(sourceUri);
    const model = frame();
    const actualSource = model.renderAsSource();
    const expectedSource = sourceDoc.getText();

    try {
        assert.strictEqual(actualSource, expectedSource);
        done();
    }
    catch (e) {
        done(e);
        throw e;
    }
}

export async function assertAreEqualByFile<T extends Frame>(done: Mocha.Done, htmlFile: string, elanFile: string, frame: (s: string) => T) {
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
