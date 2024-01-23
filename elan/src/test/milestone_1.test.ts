import * as vscode from 'vscode';
import { assertAreEqualByHtml, assertAreEqualBySource } from './testHelpers';
import { T00_emptyFile, T01_helloWorld, T02_comments, T03_mainWithAllStatements, T04_allGlobals, T05_snake, T06_mergeSort, T07_mainWithAllStatementsSelectMainById, T07_mainWithAllStatementsSelectStatementById, T08_collapseAll, T08_expandAll } from './testFrameFunctions';

suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Test Empty File', (done) => {
		assertAreEqualByHtml(done, "T00_emptyFile.html", T00_emptyFile);
	}); 
	test('Test Empty File Source', (done) => {
		assertAreEqualBySource(done, "T00_emptyFile.source", T00_emptyFile);
	});
	test('Test Hello World', (done) => {
		assertAreEqualByHtml(done, "T01_helloWorld.html", T01_helloWorld);
	});
	test('Test Hello World Source', (done) => {
		assertAreEqualBySource(done, "T01_helloWorld.source", T01_helloWorld);
	});
	test('Test Comments', (done) => {
		assertAreEqualByHtml(done, "T02_comments.html", T02_comments);
	});
	test('Test Comments Source', (done) => {
		assertAreEqualBySource(done, "T02_comments.source", T02_comments);
	});
	test('Test Main With All Statements', (done) => {
		assertAreEqualByHtml(done, "T03_mainWithAllStatements.html", T03_mainWithAllStatements);
	});
	test('Test Main With All Statements Source', (done) => {
		assertAreEqualBySource(done, "T03_mainWithAllStatements.source", T03_mainWithAllStatements);
	});
	test('Test All Globals', (done) => {
		assertAreEqualByHtml(done, "T04_allGlobals.html", T04_allGlobals);
	});
	test('Test Snake', (done) => {
		assertAreEqualByHtml(done, "T05_snake.html", T05_snake);
	});
	test('Test Merge Sort', (done) => {
		assertAreEqualByHtml(done, "T06_mergeSort.html", T06_mergeSort);
	});
	/*test('Test Merge Sort Source', (done) => {
		assertAreEqualBySource(done, "T06_mergeSort.source", T06_mergeSort);
	});*/
	test('Test Select Main By Id', (done) => {
		const ff = T03_mainWithAllStatements();
		assertAreEqualByHtml(done, "T07_mainSelected.html", T07_mainWithAllStatementsSelectMainById(ff));
	});

	test('Test Select Statement By Id', (done) => {
		const ff = T03_mainWithAllStatements();
		assertAreEqualByHtml(done, "T07_statementSelected.html", T07_mainWithAllStatementsSelectStatementById(ff));
	});

	test('ExpandAll', (done) => {
		const ff = T03_mainWithAllStatements();
		assertAreEqualByHtml(done, "T03_mainWithAllStatements.html", T08_expandAll(ff));
	});

	test('CollapseAll', (done) => {
		const ff = T03_mainWithAllStatements();
		assertAreEqualByHtml(done, "T08_collapseAll.html", T08_collapseAll(ff));
	});


});
