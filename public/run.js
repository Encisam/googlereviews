/*=================================
      sending URL google
=================================*/
var urlCompany = null;
function sendUrl() {
  urlCompany = document.querySelector("#urlCompany").value;

  fetch("/get-keywords", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ urlCompany }),
  })
    /*=================================
      getting keywords
=================================*/
    .then((res) => res.json())
    .then((data) => {
      //console.log(keywords);
      keywords(data);
    });
}
btnSend.addEventListener("click", sendUrl);

/*=================================
      working with keywords
=================================*/
function keywords(array) {
  modalKey.style.display = "block";
  spanKey.onclick = function () {
    modalKey.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modalKey) {
      modalKey.style.display = "none";
    }
  };
  principalHome.style.display = "none";
  principalKeywords.style.display = "flex";
  inputKeywords.value = array.join("");
}

/*=================================
      sending keywords
=================================*/
function sendKeywords() {
  const keywords = inputKeywords.value;
  const negocio = document.querySelector("#negocio").value;

  fetch("http://localhost:3000/get-reviews", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ keywords, negocio }),
  })
    /*=================================
      getting reviews
=================================*/
    .then((res) => res.json())
    .then((data) => {
      //console.log(reviews);
      reviews(data);
    });
}
btnSendKey.addEventListener("click", sendKeywords);

/*=================================
    working with reviews
=================================*/
function reviews(array) {
  principalKeywords.style.display = "none";
  principalReviews.style.display = "flex";
  modalRev.style.display = "block";
  spanRev.onclick = function () {
    modalRev.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modalRev) {
      modalRev.style.display = "none";
    }
  };

  /*=================================
creating inputs to show reviews
=================================*/
  for (let i = 0; i < array.length; i++) {
    let reviews = document.createElement("div");
    let textarea = document.createElement("textarea");
    reviews.classList.add("review");
    reviewsDiv.appendChild(reviews);
    reviews.appendChild(textarea);
    textarea.classList.add("review-text");
    textarea.textContent = array[i];
  }

  /*=================================
    logo color with textareas
=================================*/
  const reviewTextarea = document.querySelectorAll(".review");
  reviewTextarea.forEach((input) => {
    input.addEventListener("click", () => {
      logos.forEach((logo) => {
        logo.classList.toggle("color");
      });
    });

    input.addEventListener("focusout", () => {
      logos.forEach((logo) => {
        logo.classList.toggle("color");
      });
    });
  });
}

/*=================================
      sending reviews
=================================*/
function sendReviews() {
  const textArea = document.querySelectorAll("div.review > textarea");
  const myReviews = [];
  textArea.forEach((x) => myReviews.push(x.value));

  fetch("http://localhost:3000/myreviews", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ myReviews }),
  })
    /*=================================
      getting statistics
=================================*/
    .then((res) => res.json())
    .then((data) => {
      makeChart(data);
    });
}
btnSendRev.addEventListener("click", sendReviews);

function makeChart(array) {
  principalReviews.style.display = "none";
  modalRev.style.display = "none";
  chartDiv.style.display = "block";
  document.querySelector(".urlRev").href = urlCompany;

  var data = {
    labels: [
      "Este mes",
      "Hace 1 mes",
      "Hace 2 meses",
      "Hace 3 meses",
      "Hace 4 meses",
      "Hace 5 meses",
      "Hace 6 meses",
      "Hace 7 meses",
      "Hace 8 meses",
      "Hace 9 meses",
      "Hace 10 meses",
      "Hace 11 meses",
    ],
    datasets: [
      {
        label: "Reviews de 1 año",
        backgroundColor: "rgba(68,50,102,0.7)",
        borderColor: "#8c489f",
        borderWidth: 3,
        hoverBackgroundColor: "rgba(68,50,102,1)",
        hoverBorderColor: "#8c489f",
        data: array,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
          color: "#000",
        },
        ticks: {
          color: "#000",
          font: {
            size: 16,
          },
        },
      },
      x: {
        ticks: {
          color: "#000",
          font: {
            size: 13,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#000",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  new Chart("chart", {
    type: "bar",
    options: options,
    data: data,
  });
}
