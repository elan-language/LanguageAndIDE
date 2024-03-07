import * as vscode from 'vscode';
import { T03_mainWithAllStatements, T04_allGlobalsExceptClass, T09_emptyMainAndClassWithGlobalSelector } from './milestone_1.functions.';
import { assertClasses, assertElementHasClasses, loadFileAsModel, readAsDOM } from './testHelpers';
import { isParent } from '../frames/helpers';
import assert from 'assert';
import { FileImpl } from '../frames/file-impl';
import { Class } from '../frames/globals/class';
import { MemberSelector } from '../frames/class-members/member-selector';
import { MainFrame } from '../frames/globals/main-frame';
import { Function } from '../frames/globals/function';
import { StatementSelector } from '../frames/statements/statement-selector';
import { GlobalSelector } from '../frames/globals/global-selector';
import { Switch } from '../frames/statements/switch';
import { IfStatement } from '../frames/statements/if-statement';
import { While } from '../frames/statements/while';
import { FunctionMethod } from '../frames/class-members/function-method';
import { hash } from '../util';

suite('Navigation', () => {
	vscode.window.showInformationMessage('Start all unit tests.');

	test('Selectable Select', () => {
		var file = T03_mainWithAllStatements();
		var main = file.getChildNumber(0)as MainFrame;
	});

});	

