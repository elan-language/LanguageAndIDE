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
<div class="code">${html}</div>
</body>
</html>`;
}

export function assertAreEqual<T extends Frame>(done: Mocha.Done, htmlFile: string, frame: () => T) {
    var ws = vscode.workspace.workspaceFolders![0].uri;
    var htmlUri = vscode.Uri.joinPath(ws, htmlFile);

    vscode.workspace.openTextDocument(htmlUri).then((fh) => {
        const model = frame();
        const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
        const expectedHtml = fh.getText().replaceAll("\r", "");

        done(assert.strictEqual(actualHtml, expectedHtml));
    });
}

export function assertAreEqualByFile<T extends Frame>(done: Mocha.Done, htmlFile: string, elanFile: string, frame: (s: string) => T) {
    var ws = vscode.workspace.workspaceFolders![0].uri;
    var elanUri = vscode.Uri.joinPath(ws, elanFile);
    var htmlUri = vscode.Uri.joinPath(ws, htmlFile);

    vscode.workspace.openTextDocument(elanUri).then((fe) => {
        vscode.workspace.openTextDocument(htmlUri).then((fh) => {
            const model = frame(fe.getText());
            const actualHtml = wrap(model.renderAsHtml()).replaceAll("\r", "");
            const expectedHtml = fh.getText().replaceAll("\r", "");

            done(assert.strictEqual(actualHtml, expectedHtml));
        });
    });
}