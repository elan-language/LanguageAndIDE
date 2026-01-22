import { expect, test } from '@playwright/test';

test('simple program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('ca');
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText('100');
});

test('load and run demo', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'demo' }).click();
  await page.getByText('Collatz').click();

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText("Enter a starting number (0 to quit)");

  await page.locator('#inp').fill('3');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("Enter a starting number (0 to quit)");
});

test('input validation', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'demo' }).click();
  await page.getByText('Pathfinder').click();

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText("Enter % rocks (0-100):");

  await page.locator('#inp').fill('101');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("must be an integer between 0 and 100 inclusive");
  await page.locator('#inp').fill('35');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic");
  await page.locator('#inp').fill('b');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("response must be one of [a, d, h]");
  await page.locator('#inp').fill('h');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("Enter 'a' for A-star, 'd' for Dijkstra, 'h' for Heuristic");
});

test('demo with tests', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'Demo' }).click();
  await page.getByText('Life').click();

  await expect(page.locator('#parse')).toContainText('valid');
  await expect(page.locator('#compile')).toContainText('ok');
  await expect(page.locator('#test')).toContainText('pass');
});

test('debug program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('p'); // procedure
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a as Int');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca');
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('End'); // to outer selector

  await page.keyboard.type('m'); // main
  await page.keyboard.type('ca'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.locator('#call5').click({
    button: 'right'
  });
  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  await expect(page.locator('#system-info')).toContainText('a 100');
  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('compile error', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('ca'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  
  await expect(page.locator('#call3')).toContainText('\'foo\' is not defined.');
  await expect(page.locator('#compile')).toContainText('unknown symbol');
});

test('parse error', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('ca'); // call
  await page.keyboard.type('4');
  
  await expect(page.locator('#call3')).toContainText('Invalid.');
  await expect(page.locator('#parse')).toContainText('invalid');
});

test('load and run demo with graphics', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'demo' }).click();
  await page.getByText('Burrow').click();

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('[style="background-color:#ff0000;"]')).toContainText("");
});

test('symbol completion', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('ca');
  await page.keyboard.type('c');

  await expect(page.locator('#ident4')).toContainText('clearBlocksclearHtmlclearKeyBufferclearPrintedTextclearVectorGraphicsdisplayBlocksdisplayVectorGraphics');
});

test('undo redo', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#code-title')).toContainText('file: code.elan');
  await page.getByText('main procedure function test').click();
  await page.keyboard.type('m');
  await expect(page.locator('#code-title')).toContainText('file: code.elan UNSAVED');
  await page.getByRole('button', { name: 'undo' }).click();
  await expect(page.locator('el-help')).toContainText(' ?');
  await page.getByRole('button', { name: 'redo' }).click();
  await expect(page.locator('el-top')).toContainText('main');
}); 

test('help focus', async ({ page }) => {
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#code-title')).toContainText('file: code.elan');
  await page.getByText('main procedure function test').click();
  await page.keyboard.type('m');
 
  // click worksheet button and expect tab to be visible
  await page.getByText('worksheet', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'standard worksheets' })).toBeVisible();

  // click help and expect help to be visible
  await page.getByRole('link', { name: '?' }).click();
  await expect(page.locator('#help-home')).toBeVisible();

  // click worksheet button and expect tab to be visible
  await page.getByText('worksheet', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'standard worksheets' })).toBeVisible();

  // click help and expect help to again be visible
  await page.getByRole('link', { name: '?' }).click();
  await expect(page.locator('#help-home')).toBeVisible();
  
}); 

test('display image', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();
  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('image https://elan-lang.org/documentation/images/logo.png');
  await page.keyboard.press('Enter');
  await page.keyboard.type('ca');
  await page.keyboard.type('displayHtml(a.asString())');
  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('img[src="https://elan-lang.org/documentation/images/logo.png"]')).toBeVisible();
});

test('ghost test', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('t');
  await page.keyboard.type('one');
  await page.keyboard.press('Enter');
  await page.keyboard.type('a');
  await page.keyboard.type('1');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  
  await expect(page.locator('#test')).toContainText('pass');

  await page.getByText('end test', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('ghost').click();

  await expect(page.locator('#test')).not.toContainText('pass');

  await page.getByText('end test', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('unghost').click();

  await expect(page.locator('#test')).toContainText('pass');
});

test('ghost code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('fred');

  
  await expect(page.locator('#compile')).toContainText('unknown');

  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('ghost').click();

  await expect(page.locator('#compile')).toContainText('ok');

  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('unghost').click();

  await expect(page.locator('#compile')).toContainText('unknown');

  await page.getByText('main', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('ghost').click();

  await expect(page.locator('#compile')).toContainText('ok');

  await page.getByText('main', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('unghost').click();

  await expect(page.locator('#compile')).toContainText('unknown');
});

/* test('delete ghosted code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('l');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('fred');

  await expect(page.locator('#compile')).toContainText('unknown');

  await page.getByText('let', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('delete ALL ghosted code');
  await page.getByText('delete').click();

  await expect(page.locator('#main1')).not.toContainText('fred');
});
 */

test('toggle private ', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('cl');
  await page.keyboard.type('Foo');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('prop');
  await page.keyboard.type('aa');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Int');
  await page.keyboard.press('Enter');

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Foo()');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('foo.aa');

  
  await expect(page.locator('#compile')).toContainText('ok');

  await page.getByText('property', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('make private').click();

  await expect(page.getByText('private ', { exact: true })).toBeVisible();

  await expect(page.locator('#compile')).not.toContainText('ok');

  await page.getByText('property', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('make public').click();

  await expect(page.getByText('private ', { exact: true })).not.toBeVisible();

  await expect(page.locator('#compile')).toContainText('ok');
});

test('toggle private by keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('cl');
  await page.keyboard.type('Foo');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('prop');
  await page.keyboard.type('aa');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Int');
  await page.keyboard.press('Enter');

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Foo()');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('foo.aa');

  
  await expect(page.locator('#compile')).toContainText('ok');

  await page.getByText('property', { exact: true }).click();

  await page.keyboard.press('Control+p');

   await expect(page.getByText('private ', { exact: true })).toBeVisible();

  await expect(page.locator('#compile')).not.toContainText('ok');

  await page.getByText('property', { exact: true }).click();

  await page.keyboard.press('Control+p');

  await expect(page.getByText('private ', { exact: true })).not.toBeVisible();

  await expect(page.locator('#compile')).toContainText('ok');
});

test('backspace enter #2027', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1234');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Enter');

  await expect(page.locator('#expr5')).toHaveClass("empty warning")
});