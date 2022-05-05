const puppeteer = require("puppeteer");

function run(url) {
  return new Promise(async (resolve, reject) => {
    try {
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

      await page.waitForTimeout(2 * 1000);

      await page.waitForSelector('div[data-sort-id="newestFirst"]');
      await page.$('div[data-sort-id="newestFirst"]', (x) => x.click()); // BOTON +recientes

      await page.evaluate(
        //MAKE SCROLL
        () =>
          new Promise((resolve) => {
            const scroller = document.querySelector(".review-dialog-list"); //SELECTOR BARRA SCROLL

            const timer = setInterval(() => {
              const totalChilds = document.querySelectorAll(
                ".gws-localreviews__general-reviews-block > *"
              ).length; // TODOS LOS HIJOS

              const totalReviews = document
                .querySelector(".z5jxId")
                .innerText.slice(0, -8); //TOTAL DE REVIEWS

              if (totalChilds == totalReviews || totalChilds == 100) {
                clearInterval(timer);
                resolve();
              }
              scroller.scrollBy(0, 100);
            }, 200);
          })
      );

      await page.evaluate(() => {
        //BOTON PARA CARGAR TODA LA REVIEW
        const more = document.querySelectorAll("a.review-more-link");
        for (let i = 0; i < more.length; i++) {
          more[i].click(); //boton 'más'
        }
      });

      await page.waitForTimeout(1 * 1000);

      let reviews = await page.evaluate(() => {
        var results = [];
        const blockData = document.querySelectorAll(".jxjCjc");

        for (let i = 0; i < blockData.length; i++) {
          if (
            blockData[i]
              .querySelector("g-review-stars.lTi8oc span")
              .getAttribute("aria-label")
              .slice(14, -19) == "5,0"
          ) {
            if (
              blockData[i].querySelector('[jscontroller="MZnM8e"]').innerText !=
              ""
            ) {
              results.push(
                blockData[i].querySelector('[jscontroller="MZnM8e"]').innerText
              );
            }
          }
        }
        return results;
      });

      //CERRAR NAVEGADOR
      browser.close();

      //REPLACE
      let string = reviews.join(",");
      let reviewsDef = string.replace(/\n/g, "");
      resolve(reviewsDef);
    } catch (e) {
      return reject(e);
    }
  });
}

module.exports = {
  run,
};
