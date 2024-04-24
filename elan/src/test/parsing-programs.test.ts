import * as vscode from 'vscode';
import { assertFileParses } from './testHelpers';

suite('File Parsing Tests', () => {
  vscode.window.showInformationMessage('Start all unit tests.');

  test('parse Frames - merge-sort', async () => {
    await assertFileParses("programs/merge-sort.elan");
  });
  test('parse Frames - snake', async () => {
    await assertFileParses("programs/snake.elan");
  });
  test('parse Frames - wordle', async () => {
    await assertFileParses("programs/wordle.elan");
  });
  test('parse Frames - life', async () => {
    await assertFileParses("programs/life.elan");
  });
  test('parse Frames - best-fit', async () => {
    await assertFileParses("programs/best-fit.elan");
  });
  test('parse Frames - binary-search', async () => {
    await assertFileParses("programs/binary-search.elan");
  });
});