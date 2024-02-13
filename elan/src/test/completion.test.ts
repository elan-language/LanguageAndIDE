import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate } from './testHelpers';

suite('Language Server', () => {
  
  const ws = vscode.workspace.workspaceFolders![0].uri;
  const docUri = vscode.Uri.joinPath(ws, "default.elan");
  
  test('Check for hard coded completion response from language server', async () => {
   
    await testCompletion(docUri, new vscode.Position(0, 0), {
      items: [
        { label: 'Elan', kind: vscode.CompletionItemKind.Text },
        { label: 'Elan', kind: vscode.CompletionItemKind.Text }
      ]
    });
  });
});

async function testCompletion(
  docUri: vscode.Uri,
  position: vscode.Position,
  expectedCompletionList: vscode.CompletionList
) {
  await activate(docUri);

  // Executing the command `vscode.executeCompletionItemProvider` to simulate triggering completion
  const actualCompletionList = (await vscode.commands.executeCommand(
    'vscode.executeCompletionItemProvider',
    docUri,
    position
  )) as vscode.CompletionList;

  assert.ok(actualCompletionList.items.length >= 2);
  expectedCompletionList.items.forEach((expectedItem, i) => {
    const actualItem = actualCompletionList.items[i];
    assert.equal(actualItem.label, expectedItem.label);
    assert.equal(actualItem.kind, expectedItem.kind);
  });
}