const puppeteer = require("puppeteer");

function takeScreen(url) {
  return new Promise(async () => {
    const browser = await puppeteer.launch({
      // headless: false,
      // defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    await page.waitForSelector("#L2AGLb");
    await page.click("#L2AGLb"); //BOTON COOKIES GOOGLE

    await page.waitForTimeout(1000);
    await page.waitForSelector("div[data-sort-id='newestFirst']");
    await page.$eval("div[data-sort-id='newestFirst']", (x) => x.click());
    await page.waitForTimeout(1000);
    await page.$eval("div.WMbnJf:nth-child(1)", (x) => x.scrollIntoView());
    await page.waitForTimeout(1000);
    const element = await page.$(".lcorif");
    await element.screenshot({ path: "screenshot.png" });

    await browser.close();
  });
}

module.exports = {
  takeScreen,
};
