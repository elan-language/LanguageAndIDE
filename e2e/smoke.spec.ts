import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Elan/);
});

test('simple program', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('p');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'Run the program' }).click();
  await expect(page.locator('#printed-text')).toContainText('100');
});

test('load and run demo', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'Demo' }).hover();
  await page.getByText('Binary Search').click();

  await page.getByRole('button', { name: 'Run the program' }).click();
  await expect(page.locator('#printed-text')).toContainText("What type of fruit do you want ('x' to exit)? ");

  await page.locator('#inp').fill('fig');
  await page.locator('#inp').press('Enter');
  await expect(page.locator('#printed-text')).toContainText("What type of fruit do you want ('x' to exit)? fig We can supply a fig What type of fruit do you want ('x' to exit)? ");
});

test('input validation', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'Demo' }).hover();
  await page.getByText('Pathfinder').click();

  await page.getByRole('button', { name: 'Run the program' }).click();
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
 
  await page.getByRole('button', { name: 'Demo' }).hover();
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

  await page.keyboard.type('p'); // print
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('End'); // to outer selector

  await page.keyboard.type('m'); // main
  await page.keyboard.type('c'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Tab');

  await page.getByText('print', { exact: true }).click({
    button: 'right'
  });
  await page.getByText('set breakpoint (Ctrl-b)').click();
  await page.getByText('Debug', { exact: true }).click();
  await page.getByRole('button', { name: 'Debug the program' }).click();
  await expect(page.locator('#system-info')).toContainText('a : 100');
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
  await page.keyboard.type('c'); // call
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  
  await expect(page.locator('#call5')).toContainText('\'foo\' is not defined.');
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
  await page.keyboard.type('c'); // call
  await page.keyboard.type('4');
  
  await expect(page.locator('#call5')).toContainText('Invalid.');
  await expect(page.locator('#parse')).toContainText('invalid');
});

test('load and run demo with graphics', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await page.getByRole('button', { name: 'Demo' }).hover();
  await page.getByText('Snake - procedural').click();

  await page.getByRole('button', { name: 'Run the program' }).click();
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
  await page.keyboard.type('c');
  await page.keyboard.type('c');

  await expect(page.locator('#ident6')).toContainText('clearBlocksclearHtmlclearKeyBufferclearPrintedTextclearVectorGraphicsdisplayBlocksdisplayVectorGraphics');
});

test('undo redo', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');
 
  await expect(page.locator('#code-title')).toContainText('File: code.elan');
  await page.getByText('main procedure function test').click();
  await page.keyboard.type('m');
  await expect(page.locator('#code-title')).toContainText('File: code.elan UNSAVED');
  await page.getByRole('button', { name: 'Undo' }).click();
  await expect(page.locator('.selector')).toContainText(' main procedure function test constant enum record class abstract interface #');
  await page.getByRole('button', { name: 'Redo' }).click();
  await expect(page.locator('el-top')).toContainText('main');
});
