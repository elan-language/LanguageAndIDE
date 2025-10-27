import { expect, test } from '@playwright/test';

test('lambda symbol completion parameter', async ({ page }) => {
    page.once('dialog', dialog => {
        //console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => { });
    });
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');

    await page.getByText('main procedure function test').click();

    await page.keyboard.type('cl');
    await page.keyboard.type('Foo');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.type('p');
    await page.keyboard.type('bar');
    await page.keyboard.press('Tab');
    await page.keyboard.type('l');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Func<of Foo => Int>');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.type('m');
    await page.keyboard.type('c');
    await page.keyboard.type('bar');
    await page.keyboard.press('Tab');
    await page.keyboard.type('lambda aFoo');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Foo');
    await page.keyboard.press('Tab');
    await page.keyboard.type('aF');

    await expect(page.locator('#args13')).toContainText('aFoo');
});

test('lambda symbol completion function', async ({ page }) => {
    page.once('dialog', dialog => {
        //console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => { });
    });
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');

    await page.getByText('main procedure function test').click();

    await page.keyboard.type('cl');
    await page.keyboard.type('Foo');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.type('f');
    await page.keyboard.type('yon');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Int');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Tab');
    await page.keyboard.type('0');  
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Enter');

    await page.keyboard.type('p');
    await page.keyboard.type('bar');
    await page.keyboard.press('Tab');
    await page.keyboard.type('l');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Func<of Foo => Int>');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.type('m');
    await page.keyboard.type('c');
    await page.keyboard.type('bar');
    await page.keyboard.press('Tab');
    await page.keyboard.type('lambda aFoo');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Foo');
    await page.keyboard.press('Tab');
    await page.keyboard.type('aFoo.y');

    await expect(page.locator('#args20')).toContainText('yon');
});

test('property symbol completion', async ({ page }) => {
    page.once('dialog', dialog => {
        //console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => { });
    });
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');

    await page.getByText('main procedure function test').click();

    await page.keyboard.type('cl');
    await page.keyboard.type('Foo');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.type('prop');
    await page.keyboard.type('bar');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Int');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await page.keyboard.type('f');
    await page.keyboard.type('yon');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Int');
    await page.keyboard.press('Enter');
    await page.keyboard.press('l');
    await page.keyboard.press('a');
    await page.keyboard.press('Tab');
    await page.keyboard.type('ba');

    await page.getByText('property.bar').click();

    await expect(page.locator('el-txt > input')).toHaveValue('property.bar');

    // to test backspace doesn't delete entire entry #2013
    await page.keyboard.press('Backspace');

    await expect(page.locator('el-txt > input')).toHaveValue('property.ba');
});