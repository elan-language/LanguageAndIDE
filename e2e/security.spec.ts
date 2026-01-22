import { expect, test } from '@playwright/test';

// main
//   print "<img src='images/Debug.png' onclick=console.warn('explot') />"
// end main
// main
//   print "<iframe src=javascript:console.warn('exploit') ></iframe>"
// end main
// main
//   call displayHtml("<img src='images/Debug.png' onclick=console.warn('explot') />")
// end main
// main
//   call displayHtml("<iframe src=javascript:console.warn('exploit') ></iframe>")
// end main
// main
//   variable a set to "a"
//   variable b set to "{a}` + eval('console.warn(`exploit`)') + `"
// end main
// main
//   variable a set to "a"
//   variable b set to "{a}` + console.warn(`exploit`) + `"
// end main
// main
//   throw exception "<iframe src=javascript:console.log('Youvebeenhacked!') ></iframe>"
// end main



test('img click xss', async ({ page }) => {
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
  await page.keyboard.type(`"<img src='images/Debug.png' onclick=console.error('exploit') />"`);
  await page.keyboard.press('Tab');

  await page.getByRole('button', { name: 'run' }).click();
  await expect(page.locator('#printed-text')).toContainText("<img src='images/Debug.png' onclick=console.error('exploit') />");
});

test('iframe xss', async ({ page }) => {
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
    await page.keyboard.type(`"<iframe src=javascript:console.error('exploit') ></iframe>"`);
    await page.keyboard.press('Tab');
  
    await page.getByRole('button', { name: 'run' }).click();
    await expect(page.locator('#printed-text')).toContainText("<iframe src=javascript:console.error('exploit') ></iframe>");
  });

  // test('img click xss html', async ({ page }) => {
  //   page.once('dialog', dialog => {
  //     //console.log(`Dialog message: ${dialog.message()}`);
  //     dialog.accept().catch(() => {});
  //   });
  
  //   page.on('console', async msg => {
  //     if (msg.type() === 'error') {
  //       expect(msg.text()).toContain("Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.");
  //     }
  //   });
  
  //   await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
  //   await page.getByText('main procedure function test').click();
  
  //   await page.keyboard.type('m');
  //   await page.keyboard.type('c');
  //   await page.keyboard.type('displayHtml');
  //   await page.keyboard.press('Tab');
  //   await page.keyboard.type(`"<img src='images/Debug.png' onclick=console.error('exploit')/>"`);
  //   await page.keyboard.press('Tab');
  
  //   await page.getByRole('button', { name: 'run' }).click();
  //   await page.frameLocator('iframe').locator('#display-html').click();
  // });
  
  test('iframe xss html', async ({ page }) => {
      page.once('dialog', dialog => {
        //console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept().catch(() => {});
      });
    
      page.on('console', async msg => {
        if (msg.type() === 'error') {
          expect(msg.text()).toContain("Blocked script execution in 'about:srcdoc' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.");
        }
      });
    
      await page.goto('https://elan-language.github.io/LanguageAndIDE/');
     
      await page.getByText('main procedure function test').click();
    
      await page.keyboard.type('m');
      await page.keyboard.type('ca');
      await page.keyboard.type('displayHtml');
      await page.keyboard.press('Tab');
      await page.keyboard.type(`"<iframe src=javascript:console.error('exploit') ></iframe>"`);
      await page.keyboard.press('Tab');
    
      await page.getByRole('button', { name: 'run' }).click();
    });

  test('string eval xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).not.toContain("exploit");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    await page.keyboard.type('v');
    await page.keyboard.type('aa');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"a"`);
    await page.keyboard.press('Enter');

    await page.keyboard.type('v');
    await page.keyboard.type('b');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"{a}\` + eval('console.error(\`exploit\`)') + \`"`);
    await page.keyboard.press('Enter');
  
    await page.getByRole('button', { name: 'run' }).click();
  });

  test('string js xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).not.toContain("exploit");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    await page.keyboard.type('v');
    await page.keyboard.type('aa');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"a"`);
    await page.keyboard.press('Enter');

    await page.keyboard.type('v');
    await page.keyboard.type('b');
    await page.keyboard.press('Tab');
    await page.keyboard.type(`"{a}\` + console.error('exploit') + \`"`);
    await page.keyboard.press('Enter');
  
    await page.getByRole('button', { name: 'run' }).click();
  });

  test('system error xss', async ({ page }) => {
    page.once('dialog', dialog => {
      //console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
  
    page.on('console', async msg => {
      if (msg.type() === 'error') {
        expect(msg.text()).not.toContain("exploit");
      }
    });
  
    await page.goto('https://elan-language.github.io/LanguageAndIDE/');
   
    await page.getByText('main procedure function test').click();
  
    await page.keyboard.type('m');
    
    await page.keyboard.type('th');

    await page.keyboard.type(`"<iframe src=javascript:console.warn('exploit') ></iframe>"`);
    await page.keyboard.press('Enter');
  
    await page.getByRole('button', { name: 'run' }).click();
    await expect(page.locator('#system-info')).toContainText("<iframe src=javascript:console.warn('exploit') ></iframe>");
  });