import { expect, test } from '@playwright/test';

test('copy code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');


  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('copy ').click();

  await page.waitForTimeout(1000);

  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

  expect(clipboardContent).toContain('variable a set to 1');

  await expect(page.locator('#var4')).toContainText('a');
});

test('copy code with keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');

  await page.getByText('variable', { exact: true }).click();

  await page.keyboard.press('Control+c');

  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

  expect(clipboardContent).toContain('variable a set to 1');

  await expect(page.locator('#var4')).toContainText('a');
});

test('copy multiple code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('ca');
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('2');


  await page.getByText('variable', { exact: true }).click({
    modifiers: ['Shift']
  });

  await page.getByText('call', { exact: true }).click({
    modifiers: ['Shift']
  });

  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('copy ').click();

  await page.waitForTimeout(1000);

  let clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
  clipboardContent = clipboardContent.trim().replaceAll("\r", "").replaceAll("\n", "");

  expect(clipboardContent).toContain(`variable a set to 1  call foo(2)`);
});

test('cut code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');


  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('cut ').click();

  await page.waitForTimeout(1000);

  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

  expect(clipboardContent).toContain('variable a set to 1');

  await expect(page.locator('#var4')).not.toBeVisible();
});

test('cut code with keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');


  await page.getByText('variable', { exact: true }).click();

  await page.keyboard.press('Control+x');

  const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());

  expect(clipboardContent).toContain('variable a set to 1');

  await expect(page.locator('#var4')).not.toBeVisible();
});

test('cut multiple code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1');
  await page.keyboard.press('Enter');
  await page.keyboard.type('ca');
  await page.keyboard.type('foo');
  await page.keyboard.press('Tab');
  await page.keyboard.type('2');


  await page.getByText('variable', { exact: true }).click({
    modifiers: ['Shift']
  });

  await page.getByText('call', { exact: true }).click({
    modifiers: ['Shift']
  });

  await page.getByText('variable', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('cut ').click();

  await page.waitForTimeout(1000);

  let clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
  clipboardContent = clipboardContent.trim().replaceAll("\r", "").replaceAll("\n", "");

  expect(clipboardContent).toContain(`variable a set to 1  call foo(2)`);
});

test('paste code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("variable a set to 2"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');

  await page.getByText('call').click({
    button: 'right'
  });

  await page.getByText('paste ').click();

  await expect(page.locator('#var4')).toContainText('a');
});

test('paste code with keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("variable a set to 2"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');

  await page.getByText('call').click();

  await page.keyboard.press('Control+v');

  await expect(page.locator('#var4')).toContainText('a');
});

test('paste multiple code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("variable a set to 2\nvariable b set to 3"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');

  await page.getByText('call').click({
    button: 'right'
  });

  await page.getByText('paste ').click();

  await expect(page.locator('#var4')).toContainText('a');
  await expect(page.locator('#var7')).toContainText('b');
});

test('paste multiple code with keyboard', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("variable a set to 2\nvariable b set to 3"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');

  await page.getByText('call').click();

  await page.keyboard.press('Control+v');

  await expect(page.locator('#var4')).toContainText('a');
  await expect(page.locator('#var7')).toContainText('b');
});

test('paste with new line1', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText(`'a
a'`));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');

  await page.keyboard.press('Control+v');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca');
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText("a\na");
});

test('paste with new line2', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("'a\na'"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');

  await page.keyboard.press('Control+v');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca');
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText("a\na");
});


test('paste invalid code', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.evaluate(() => navigator.clipboard.writeText("variable a set to 2"));

  await page.getByText('main procedure function test').click();

  await page.keyboard.press('Control+v');

  await expect(page.locator('div.context-menu div')).toContainText('Paste failed:');
});

test('paste into field', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => { });
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m');
  await page.keyboard.type('va');
  await page.keyboard.type('firstword');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"hello"');
  await page.keyboard.press('Enter');
  await page.keyboard.type('va');
  await page.keyboard.type('secondword');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"world"');
  await page.keyboard.press('Enter');
  await page.keyboard.type('p');
  await page.keyboard.type('ca');
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('secondword[2]');
  await page.keyboard.press('Tab');

  await page.waitForTimeout(2000);

  await page.getByText('firstword').dblclick();
  await page.keyboard.press('Control+c');

  await page.getByText('secondword[2]').dblclick();
  await page.keyboard.press('Control+v');


   await expect(page.locator('#parse')).not.toContainText('invalid');
});

