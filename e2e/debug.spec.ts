import { expect, test } from '@playwright/test';


test('debug simple types', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va'); 
  await page.keyboard.type('b');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"fred"');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va'); 
  await page.keyboard.type('c');
  await page.keyboard.press('Tab');
  await page.keyboard.type('1.0');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va'); 
  await page.keyboard.type('d');
  await page.keyboard.press('Tab');
  await page.keyboard.type('true');
  await page.keyboard.press('Enter');

  await page.keyboard.type('va'); 
  await page.keyboard.type('f');
  await page.keyboard.press('Tab');
  await page.keyboard.type('/a+/');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  await expect(page.locator('#system-info')).toContainText('a 100');
  await expect(page.locator('#system-info')).toContainText('b "fred"');
  await expect(page.locator('#system-info')).toContainText('c 1.0');
  await expect(page.locator('#system-info')).toContainText('d true');
  await expect(page.locator('#system-info')).toContainText('f /a+/');


  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug list', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('[1, 2, 3]');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a List<of Int> # length 3'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeVisible();
  await expect(page.getByText('[1] 2')).toBeVisible();
  await expect(page.getByText('[2] 3')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug list immutable', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('{1, 2, 3}');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
    const summary = 'a ListImmutable<of Int> # length 3'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeVisible();
  await expect(page.getByText('[1] 2')).toBeVisible();
  await expect(page.getByText('[2] 3')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug array', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Array<of Int>(3, 1)');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Array<of Int> # length 3'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeVisible();
  await expect(page.getByText('[1] 1')).toBeVisible();
  await expect(page.getByText('[2] 1')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('[0] 1')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug array 2d', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Array2D<of String>(3, 3, "bill")');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Array2D<of String> # size 3 x 3'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('[0, _]')).toBeVisible();
  await expect(page.getByText('[1, _]')).toBeVisible();
  await expect(page.getByText('[2, _]')).toBeVisible();

  await page.getByText('[0, _]').click();

  await expect(page.getByText('[0, 0] "bill"')).toBeVisible();
  await expect(page.getByText('[0, 1] "bill"')).toBeVisible();
  await expect(page.getByText('[0, 2] "bill"')).toBeVisible();

  await page.getByText('[0, _]').click();

  await expect(page.getByText('[0, 0] "bill"')).toBeHidden();
  await expect(page.getByText('[0, 1] "bill"')).toBeHidden();
  await expect(page.getByText('[0, 2] "bill"')).toBeHidden();

  await page.getByText(summary).click();

  await expect(page.getByText('[0, _]')).toBeHidden();
  await expect(page.getByText('[1, _]')).toBeHidden();
  await expect(page.getByText('[2, _]')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug dictionary', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('["k1":1, "k2":2]');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Dictionary<of String, Int> # length 2'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('["k1"] 1')).toBeVisible();
  await expect(page.getByText('["k2"] 2')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('["k1"] 1')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug dictionary immutable', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('{1:"v1", 2:"v2"}');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a DictionaryImmutable<of Int, String> # length 2'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('[1] "v1"')).toBeVisible();
  await expect(page.getByText('[2] "v2"')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('[1] "v1"')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug tuple', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('tuple(1, "bill")');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a tuple(Int, String)'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('item0 1')).toBeVisible();
  await expect(page.getByText('item1 "bill"')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('item0 1')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug enum', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('e'); // main
  await page.keyboard.type('Fruit'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('apple, pear');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Fruit.pear');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Fruit.pear'
  await expect(page.locator('#system-info')).toContainText(summary);
 
  await expect(page.locator('#run-status')).toContainText('paused');
});

test('debug class', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('cl'); // class
  await page.keyboard.type('Foo'); 
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.type('c');
  await page.keyboard.press('Enter');
  await page.keyboard.type('s');
  await page.keyboard.type('property.a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('100');
  await page.keyboard.press('Enter');
  await page.keyboard.type('s');
  await page.keyboard.type('property.b');
  await page.keyboard.press('Tab');
  await page.keyboard.type('"bill"');
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');

  await page.keyboard.type('prop');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Int');
  await page.keyboard.press('Enter');
  await page.keyboard.type('prop');
  await page.keyboard.type('b');
  await page.keyboard.press('Tab');
  await page.keyboard.type('String');
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');


  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Foo()');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Foo'
  await expect(page.locator('#system-info')).toContainText(summary);
  await page.getByText(summary).click();

  await expect(page.getByText('a 100')).toBeVisible();
  await expect(page.getByText('b "bill"')).toBeVisible();

  await page.getByText(summary).click();

  await expect(page.getByText('a 100')).toBeHidden();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug deconstruct list', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('con'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('{1, 2, 3}');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('x:y');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca');
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'y ListImmutable<of Int> # length 2'
  await expect(page.locator('#system-info')).toContainText(summary);
  await expect(page.locator('#system-info')).toContainText("x 1");

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

test('debug deconstruct tuple', async ({ page }) => {
  page.once('dialog', dialog => {
    //console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.goto('https://elan-language.github.io/LanguageAndIDE/');

  await page.getByText('main procedure function test').click();

  await page.keyboard.type('con'); 
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('tuple(1, "bill", {1, 2})');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('x,z,y');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca')
  await page.keyboard.type('print'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Enter');

  await page.getByText('call', { exact: true }).click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'y ListImmutable<of Int> # length 2'
  await expect(page.locator('#system-info')).toContainText(summary);
  await expect(page.locator('#system-info')).toContainText("x 1");
  await expect(page.locator('#system-info')).toContainText('z "bill"');

  await expect(page.locator('#run-status')).toContainText('paused');
 
});

// test('debug deconstruct record', async ({ page }) => {
//   page.once('dialog', dialog => {
//     //console.log(`Dialog message: ${dialog.message()}`);
//     dialog.accept().catch(() => {});
//   });
//   await page.goto('https://elan-language.github.io/LanguageAndIDE/');

//   await page.getByText('main procedure function test').click();

//   await page.keyboard.type('r'); 
//   await page.keyboard.type('Foo');
//   await page.keyboard.press('Enter');
//   await page.keyboard.type('p');
//   await page.keyboard.type('a');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('Int');
//   await page.keyboard.press('Enter');
//   await page.keyboard.type('p');
//   await page.keyboard.type('b');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('String');
//   await page.keyboard.press('Enter');
//   await page.keyboard.press('ArrowLeft');
//   await page.keyboard.press('Enter');

//   await page.keyboard.type('m'); // main
//   await page.keyboard.type('va'); 
//   await page.keyboard.type('a,b');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('new Foo() with a set to 1, b set to "bill"');
//   await page.keyboard.press('Enter');

//   await page.keyboard.type('ca')
//   await page.keyboard.type('print'); 
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('a');
//   await page.keyboard.press('Enter');

//   await page.getByText('call', { exact: true }).click({
//     button: 'right'
//   });

//   await page.getByText('set breakpoint').click();
//   await page.getByRole('button', { name: 'debug' }).click();
//   await expect(page.locator('#system-info')).toContainText("a 1");
//   await expect(page.locator('#system-info')).toContainText('b "bill"');

//   await expect(page.locator('#run-status')).toContainText('paused');
 
// });


// test('debug complex structure', async ({ page }) => {
//   page.once('dialog', dialog => {
//     //console.log(`Dialog message: ${dialog.message()}`);
//     dialog.accept().catch(() => {});
//   });
//   await page.goto('https://elan-language.github.io/LanguageAndIDE/');

//   await page.getByText('main procedure function test').click();

//   await page.keyboard.type('r'); 
//   await page.keyboard.type('Foo');
//   await page.keyboard.press('Enter');
//   await page.keyboard.type('p');
//   await page.keyboard.type('a');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('ListImmutable<of Int>');
//   await page.keyboard.press('Enter');
//   await page.keyboard.type('p');
//   await page.keyboard.type('b');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('String');
//   await page.keyboard.press('Enter');
//   await page.keyboard.press('ArrowLeft');
//   await page.keyboard.press('Enter');

//   await page.keyboard.type('m'); // main
//   await page.keyboard.type('va'); 
//   await page.keyboard.type('dict');
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('{"key":new Foo() with a set to {1, 2}, b set to "bill"}');
//   await page.keyboard.press('Enter');

//   await page.keyboard.type('ca');
//   await page.keyboard.type('print'); 
//   await page.keyboard.press('Tab');
//   await page.keyboard.type('a');
//   await page.keyboard.press('Enter');

//   await page.getByText('call', { exact: true }).click({
//     button: 'right'
//   });

//   await page.getByText('set breakpoint').click();
//   await page.getByRole('button', { name: 'debug' }).click();
//   const summary = 'dict DictionaryImmutable<of String, Foo> # length 1'
//   await expect(page.locator('#system-info')).toContainText(summary);

//   await page.getByText(summary).click();

//   await expect(page.getByText('["key"] Foo')).toBeVisible();

//   await page.getByText('["key"] Foo').click();

//   await expect(page.getByText('a ListImmutable<of Int> # length 2')).toBeVisible();
//   await expect(page.getByText('b "bill"')).toBeVisible();

//   await page.getByText('a ListImmutable<of Int> # length 2').click();

//   await expect(page.getByText('[0] 1')).toBeVisible();
//   await expect(page.getByText('[1] 2')).toBeVisible();


//   await expect(page.locator('#run-status')).toContainText('paused');
 
// });

test('debug out parameter', async ({ page }) => {
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
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.type('Int');
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');

  await page.keyboard.type('p'); // proc
  await page.keyboard.type('bar'); 
  await page.keyboard.press('Tab');
  await page.keyboard.type('out a as Foo');
  await page.keyboard.press('Enter');
  await page.keyboard.type('ca'); 
  await page.keyboard.type('print');
  await page.keyboard.press('Tab');
  await page.keyboard.type('a');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Enter');

  await page.keyboard.type('m'); // main
  await page.keyboard.type('va'); 
  await page.keyboard.type('x');
  await page.keyboard.press('Tab');
  await page.keyboard.type('new Foo()');
  await page.keyboard.press('Enter');

  await page.keyboard.type('ca'); 
  await page.keyboard.type('bar');
  await page.keyboard.press('Tab');
  await page.keyboard.type('x');

  await page.locator('#call12').click({
    button: 'right'
  });

  await page.getByText('set breakpoint').click();
  await page.getByRole('button', { name: 'debug' }).click();
  const summary = 'a Foo'
  await expect(page.locator('#system-info')).toContainText(summary);

  await page.getByText(summary).click();

  await expect(page.getByText('a 0')).toBeVisible();

  await expect(page.locator('#run-status')).toContainText('paused');
 
});