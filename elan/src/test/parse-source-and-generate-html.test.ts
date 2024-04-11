import * as vscode from 'vscode';
import { assertAreEqualByHtml, assertAreEqualBySource, assertGeneratesHtmlandSameSource } from './testHelpers';
import { T00_emptyFile, T01_helloWorld, T02_comments, T03_mainWithAllStatements, T04_allGlobalsExceptClass, T05_classes, T07_mainWithAllStatementsSelectMainById, T07_mainWithAllStatementsSelectStatementById, T08_collapseAll, T08_expandAll, T09_emptyMainAndClassWithGlobalSelector } from './milestone_1.functions.';


suite('Milestone 1 - Html rendering of code from model', () => {
	vscode.window.showInformationMessage('Start all tests.');

 	test('Test Empty File', (done) => {
		assertGeneratesHtmlandSameSource(done, "T00_emptyFile.elan",  "T00_emptyFile.html");
	}); 

	test('Test Hello World', (done) => {
		assertGeneratesHtmlandSameSource(done, "T01_helloWorld.elan", "T01_helloWorld.html");
	});

	test('Test Comments', (done) => {
		assertGeneratesHtmlandSameSource(done, "T02_comments.elan", "T02_comments.html");
	});

	test('Test Main With All Statements', (done) => {
		assertGeneratesHtmlandSameSource(done, "T03_mainWithAllStatements.elan", "T03_mainWithAllStatements.html");
	});

	test('Test All Globals Except Class', (done) => {
		assertGeneratesHtmlandSameSource(done, "T04_allGlobalsExceptClass.elan", "T04_allGlobalsExceptClass.html");
	});

	test('Test Classes', (done) => {
		assertGeneratesHtmlandSameSource(done, "T05_classes.elan", "T05_classes.html");
	});


// ----------------------------------------------------------


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
		assertAreEqualByHtml(done, "T08_expandAll.html", T08_expandAll(ff));
	});

	test('CollapseAll', (done) => {
		const ff = T03_mainWithAllStatements();
		assertAreEqualByHtml(done, "T08_collapseAll.html", T08_collapseAll(ff));
	});
	
	test('Test Empty Main and Class', (done) => {
		assertAreEqualByHtml(done, "T09_emptyMainAndClass.html", T09_emptyMainAndClassWithGlobalSelector);
	});
	test('Test Empty Main and Class - Source', (done) => {
		assertAreEqualBySource(done, "T09_emptyMainAndClass.source", T09_emptyMainAndClassWithGlobalSelector);
	});
});
