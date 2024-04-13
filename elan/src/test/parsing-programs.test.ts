import * as vscode from 'vscode';
import { assertFileParses } from './testHelpers';

suite('File Parsing Tests', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('parse Frames - merge-sort', (done) => {
		assertFileParses(done, "programs/merge-sort.elan");
	});
	test('parse Frames - snake', (done) => {
    assertFileParses(done, "programs/snake.elan");
  });
  test('parse Frames - wordle', (done) => {
    assertFileParses(done, "programs/wordle.elan");
	});
  test('parse Frames - life', (done) => {
    assertFileParses(done, "programs/life.elan");
	});
  test('parse Frames - best-fit', (done) => {
    assertFileParses(done, "programs/best-fit.elan");
	});
  test('parse Frames - binary-search', (done) => {
    assertFileParses(done, "programs/binary-search.elan");
	});
});