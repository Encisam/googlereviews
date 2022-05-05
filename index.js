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

var urlCompany = null;
app.post("/get-keywords", async (req, res) => {
  //GET REVIEWS
  urlCompany = req.body.urlCompany;
  const reviewsCompany = await scrapeReviewsFile.run(urlCompany);

  //GET KEYWORDS
  let options = {
    mode: "text",
    scriptPath: "./scrape/",
    args: [reviewsCompany],
  };
  PythonShell.run("get_keywords.py", options, function (err, result) {
    if (err) throw err;
    //console.log(result);
    res.send(result);
  });
});

app.post("/get-reviews", async (req, res) => {
  let keywords = req.body.keywords;
  let negocio = req.body.negocio;

  //GET REVIEWS
  let reviews = [];

  const response1 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 800,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  console.log(response1.data.choices[0].text);
  let review1 = response1.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review1);

  const response2 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 800,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  console.log(response2.data.choices[0].text);
  let review2 = response2.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review2);

  const response3 = await openai.createCompletion("text-davinci-002", {
    prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
    temperature: 0.5,
    max_tokens: 800,
    top_p: 1.0,
    frequency_penalty: 2,
    presence_penalty: 1,
  });
  console.log(response3.data.choices[0].text);
  let review3 = response3.data.choices[0].text.replace(/\n/g, "");
  reviews.push(review3);

  // const response4 = await openai.createCompletion("text-davinci-002", {
  //   prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
  //   temperature: 0.5,
  //   max_tokens: 800,
  //   top_p: 1.0,
  //   frequency_penalty: 2,
  //   presence_penalty: 1,
  // });
  // console.log(response4.data.choices[0].text);
  // let review4 = response4.data.choices[0].text.replace(/\n/g, "");
  // reviews.push(review4);

  // const response5 = await openai.createCompletion("text-davinci-002", {
  //   prompt: `Escribe una reseña basándote en estas notas:\n\nNegocio: ${negocio}\n${keywords}\n\n`,
  //   temperature: 0.5,
  //   max_tokens: 800,
  //   top_p: 1.0,
  //   frequency_penalty: 2,
  //   presence_penalty: 1,
  // });
  // console.log(response5.data.choices[0].text);
  // let review5 = response5.data.choices[0].text.replace(/\n/g, "");
  // reviews.push(review5);

  res.send(reviews);
});

app.post("/myreviews", async (req, res) => {
  //WRITE A REVIEW AND STATISTICS
  const myReviews = req.body.myReviews;

  const users = [];
  const query = await db.asyncQuery("SELECT user FROM data");
  query.forEach((user) => {
    users.push(user.user);
  });
  console.log(users);
  //WRITE REVIEW EVERY 40 SEC
  var i = 0;
  function writing() {
    writeReviewFile.write(urlCompany, users[i], myReviews[i]);
    i++;
    var stop = setTimeout(writing, 40000);

    if (i == users.length) {
      clearTimeout(stop);
      // console.log("done");
      res.send(getStats);
    }
  }
  writing();

  //STATISTICS
  const getStats = await getStatsFile.get_statistics(urlCompany);
});

/*=================================
              port
=================================*/
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
