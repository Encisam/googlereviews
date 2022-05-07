/*=================================
        .env variables
=================================*/
require("dotenv").config();

/*=================================
          express
=================================*/
const express = require("express");
const app = express();

/*=================================
          python exec
=================================*/
const { PythonShell } = require("python-shell");

/*=================================
        scrape files
=================================*/
const scrapeReviewsFile = require("./scrape/get_reviews");
const writeReviewFile = require("./scrape/write_reviews");
const getStatsFile = require("./scrape/get_statistics");
const takeScreenshot = require("./scrape/take_screenshot");

/*=================================
          db files
=================================*/
const db = require("./db/db");

/*=================================
        bot OpenAI
=================================*/
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

/*=================================
          middlewares
=================================*/
app.use(express.json());

/*=================================
            routes
=================================*/
app.use(express.static("public"));

app.post("/get-stats", async (req, res) => {
  const urlCompany = req.body.urlCompany;
  const getStats = await getStatsFile.get_statistics(urlCompany);
  console.log(getStats);
  res.send(getStats);
});

app.post("/make-keywords", async (req, res) => {
  const urlCompany = req.body.urlCompany;
  const scrapeReviews = await scrapeReviewsFile.run(urlCompany);
  console.log(scrapeReviews);

  //Make keywords
  let options = {
    mode: "text",
    scriptPath: "./scrape/",
    args: [scrapeReviews],
  };

  PythonShell.run("get_keywords.py", options, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post("/make-reviews", async (req, res) => {
  let keywords = req.body.keywords;
  let negocio = req.body.negocio;

  //Make reviews
  let reviews = [];
  const response1 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  let review1 = response1.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review1);
  const response2 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  let review2 = response2.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review2);
  const response3 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  let review3 = response3.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review3);
  //console.log(reviews);
  res.send(reviews);
});

app.post("/write-reviews", async (req, res) => {
  const myReviews = req.body.myReviews;
  const urlCompany = req.body.urlCompany;

  const users = [];
  const query = await db.asyncQuery("SELECT user FROM data");
  query.forEach((user) => {
    users.push(user.user);
  });
  //console.log(users);

  //WRITE REVIEW EVERY 40 SEC
  var i = 0;
  function writing() {
    writeReviewFile.write(urlCompany, users[i], myReviews[i]);
    i++;
    var stop = setTimeout(writing, 40000);

    if (i >= users.length) {
      clearTimeout(stop);
      takeScreenshot.takeScreen(urlCompany);

      setTimeout(() => {
        res.sendFile(__dirname + "/screenshot.png");
      }, 20000);
    }
  }
  writing();
});

/*=================================
              port
=================================*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
