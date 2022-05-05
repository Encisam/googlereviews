const puppeteer = require("puppeteer");

function get_statistics(url) {
  return new Promise(async (resolve) => {
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

    await page.waitForSelector('div[data-sort-id="newestFirst"]');
    await page.$eval('div[data-sort-id="newestFirst"]', (x) => x.click()); // +recientes

    await page.waitForTimeout(2000);

    await page.evaluate(
      //MAKE SCROLL
      () =>
        new Promise((resolve) => {
          const scroller = document.querySelector(".review-dialog-list"); //SELECTOR BARRA SCROLL

          const timer = setInterval(() => {
            const totalChilds = document.querySelectorAll(
              ".gws-localreviews__general-reviews-block > *"
            ).length; // TODOS LOS HIJOS

            const spansDiv = document.querySelectorAll(
              "#reviewSort > div > div.gws-localreviews__general-reviews-block > div > div.jxjCjc > div > div.PuaHbe > span.dehysf.lTi8oc"
            );
            const spansText = [];
            spansDiv.forEach((x) => {
              spansText.push(x.innerText);
            });
            const found = spansText.find((el) => el.slice(5) == "2 años");

            const totalReviews = document
              .querySelector(".z5jxId")
              .innerText.slice(0, -8); //TOTAL DE REVIEWS

            if (totalChilds == totalReviews || found) {
              clearInterval(timer);
              resolve();
            }
            scroller.scrollBy(0, 100);
          }, 200);
        })
    );

    let getStatsArray = await page.evaluate(() => {
      var results = [
        (estemes = 0),
        (unmes = 0),
        (dosmes = 0),
        (tresmes = 0),
        (cuatromes = 0),
        (cincomes = 0),
        (seismes = 0),
        (sietemes = 0),
        (ochomes = 0),
        (nuevemes = 0),
        (diezmes = 0),
        (oncemes = 0),
      ];
      const block = document.querySelectorAll(".jxjCjc");

      for (let i = 0; i < block.length; i++) {
        if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "minuto" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "inutos" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "día" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "ías" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "días" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            " hora" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            " hora" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) ==
            "oras" ||
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(8) == "horas"
        ) {
          results[0]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -2) ==
          "un m"
        ) {
          results[1]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "2"
        ) {
          results[2]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "3"
        ) {
          results[3]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "4"
        ) {
          results[4]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "5"
        ) {
          results[5]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "6"
        ) {
          results[6]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "7"
        ) {
          results[7]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "8"
        ) {
          results[8]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) == "9"
        ) {
          results[9]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) ==
          "10"
        ) {
          results[10]++;
        } else if (
          block[i].querySelector(".dehysf.lTi8oc").innerText.slice(5, -6) ==
          "11"
        ) {
          results[11]++;
        }
      }
      return results;
    });

    browser.close();
    resolve(getStatsArray);
  });
}

module.exports = {
  get_statistics,
};
