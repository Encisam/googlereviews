const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
require("dotenv").config();

function write(url, user, review) {
  return new Promise(async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    //new page
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click("#gksS1d"),
    ]);

    await page.waitForTimeout(1000);
    await page.waitForSelector("#identifierId");
    await page.type("#identifierId", user, {
      delay: 30,
    });
    await page.waitForTimeout(1500);
    await page.click(".VfPpkd-LgbsSe-OWXEXe-k8QpJ");

    await page.waitForTimeout(1000);
    await page.waitForSelector("input[type=password]");
    page.type("input[type=password]", process.env.USER_PASS, {
      delay: 30,
    });

    await page.waitForTimeout(1500);
    //new page
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".VfPpkd-LgbsSe-OWXEXe-k8QpJ"),
    ]);

    //Posibles escenarios
    if (page.$('[jscontroller="soHxf"]') !== null) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.$('[jscontroller="soHxf"]', (x) => x.click()),
      ]);
      //new page
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click('a[data-sort_by="qualityScore"'),
      ]);
      await page.waitForSelector("#wrl");
      await page.click("#wrl");

      await page.waitForTimeout(1500);
      await page.waitForSelector("iframe");
      const elementHandle = await page.$('iframe[src*="ReviewsService"]'); //evaluate -> queryselector
      const frame = await elementHandle.contentFrame();

      await page.waitForTimeout(1000);
      await frame.click(
        "#yDmH0d > c-wiz > div > div > div > div > div.O51MUd > div.gKldgf > div.Ku5dzd"
      ); //QUITAR BUBBLE
      await frame.click('[data-rating="5"]'); // BOTON 5 ESTRELLAS
      await frame.type("#Yc71gb", review, {
        delay: 20,
      }); //ESCRIBIR REVIEW

      // //await frame.click('#ZRGZAf'); // BOTON PUBLICAR
      await page.waitForTimeout(3000);
      browser.close();
    } else if (
      page.$(
        "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div"
      ) !== null
    ) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.$(
          "#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div",
          (x) => x.click()
        ),
      ]);
      //new page
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click('a[data-sort_by="qualityScore"'),
      ]);
      await page.waitForSelector("#wrl");
      await page.click("#wrl");

      await page.waitForTimeout(1500);
      await page.waitForSelector("iframe");
      const elementHandle = await page.$('iframe[src*="ReviewsService"]'); //evaluate -> queryselector
      const frame = await elementHandle.contentFrame();

      await page.waitForTimeout(1000);
      await frame.click(
        "#yDmH0d > c-wiz > div > div > div > div > div.O51MUd > div.gKldgf > div.Ku5dzd"
      ); //QUITAR BUBBLE
      await frame.click('[data-rating="5"]'); // BOTON 5 ESTRELLAS
      await frame.type("#Yc71gb", review, {
        delay: 20,
      }); //ESCRIBIR REVIEW

      // //await frame.click('#ZRGZAf'); // BOTON PUBLICAR
      await page.waitForTimeout(3000);
      browser.close();
    } else {
      //new page
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click('a[data-sort_by="qualityScore"'),
      ]);
      await page.waitForSelector("#wrl");
      await page.click("#wrl");

      await page.waitForTimeout(1500);
      await page.waitForSelector("iframe");
      const elementHandle = await page.$('iframe[src*="ReviewsService"]'); //evaluate -> queryselector
      const frame = await elementHandle.contentFrame();

      await page.waitForTimeout(1000);
      await frame.click(
        "#yDmH0d > c-wiz > div > div > div > div > div.O51MUd > div.gKldgf > div.Ku5dzd"
      ); //QUITAR BUBBLE
      await frame.click('[data-rating="5"]'); // BOTON 5 ESTRELLAS
      await frame.type("#Yc71gb", review, {
        delay: 20,
      }); //ESCRIBIR REVIEW

      // //await frame.click('#ZRGZAf'); // BOTON PUBLICAR
      await page.waitForTimeout(3000);
      browser.close();
    }
  });
}

module.exports = {
  write,
};
