import puppeteer from "puppeteer";
import assert from "assert";

suite("Smoke Test", () => {
  test("Title", async () => {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    // this oks the wrong browser confirm dialog that puppeteer triggers
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Navigate the page to a URL.
    await page.goto("https://elan-language.github.io/LanguageAndIDE/");
   
    const title = await page.title();

    assert.strictEqual(title, "Elan");

    await browser.close();
  });
});
