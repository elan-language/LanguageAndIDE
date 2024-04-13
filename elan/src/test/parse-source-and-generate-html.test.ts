import * as vscode from 'vscode';
import { assertAreEqualByHtml, assertAreEqualBySource, assertEffectOfAction, assertGeneratesHtmlandSameSource } from './testHelpers';
import { CollapseAll, ExpandAll, SelectMainById, SelectStatementById, T03_mainWithAllStatements, T09_emptyMainAndClassWithGlobalSelector } from './model-generating-functions.';


suite('Parse source and generate Html', () => {
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

	test('Test Select Main By Id', (done) => {
		assertEffectOfAction(done, "T03_mainWithAllStatements.elan",  SelectMainById, "T07_mainSelected.html",);
	});

	test('Test Select Statement By Id', (done) => {
		assertEffectOfAction(done, "T03_mainWithAllStatements.elan",  SelectStatementById, "T07_statementSelected.html",);
	});

	//-------------------
	test('ExpandAll', (done) => {
		assertEffectOfAction(done, "T03_mainWithAllStatements.elan",  ExpandAll, "T08_expandAll.html",);
	});

	test('CollapseAll', (done) => {
		const ff = T03_mainWithAllStatements();
		assertEffectOfAction(done, "T03_mainWithAllStatements.elan",CollapseAll, "T08_collapseAll.html");
	});
});
