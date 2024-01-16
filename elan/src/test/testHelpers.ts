import * as vscode from 'vscode';
import { Frame } from '../frames/frame';
import assert from 'assert';

export function wrap(html: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="..\\..\\media\\elanStyle.css" rel="stylesheet" />
<title>Elan Editor</title>
</head>
<body>
<elan-code>${html}</elan-code>
</body>
</html>`;
}

export async function assertAreEqual<T extends Frame>(done: Mocha.Done, htmlFile: string, frame: () => T) {
    const ws = vscode.workspace.workspaceFolders![0].uri;

    const htmlUri = vscode.Uri.joinPath(ws, htmlFile);
    const htmlDoc = await vscode.workspace.openTextDocument(htmlUri);
    const model = frame();
    const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
    const expectedHtml = htmlDoc.getText().replaceAll("\r", "");

    done(assert.strictEqual(actualHtml, expectedHtml));
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

    done(assert.strictEqual(actualHtml, expectedHtml));
}