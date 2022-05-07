var urlCompany = null;
/*=================================
      sending URL google
=================================*/
function sendURL() {
  urlCompany = document.querySelector("#urlCompany").value;

  fetch("/get-stats", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ urlCompany }),
  })
    /*=================================
          1st response
    =================================*/
    .then((res) => res.json())
    .then((data) => {
      makingChart(data);
    })
    .catch((err) => {
      // Handle error
      console.log("Error message: ", err);
    });
}
btnSend.addEventListener("click", sendURL);

/*=================================
      function 1st response
=================================*/
function makingChart(array) {
  principalHome.style.display = "none";
  modalHome.style.display = "none";
  chartDiv.style.display = "block";

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
/*=================================
        making keywords
=================================*/
function makeKeys() {
  fetch("/make-keywords", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ urlCompany }),
  })
    /*=================================
          2nd response
    =================================*/
    .then((res) => res.json())
    .then((data) => {
      workingWithKeys(data);
    })
    .catch((err) => {
      // Handle error
      console.log("Error message: ", err);
    });
}
btnSendNext.addEventListener("click", makeKeys);

/*=================================
      working with keywords
=================================*/
function workingWithKeys(array) {
  chartDiv.style.display = "none";
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
        make reviews
=================================*/
function makeReviews() {
  const keywords = inputKeywords.value;
  const negocio = document.querySelector("#negocio").value;

  fetch("/make-reviews", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ keywords, negocio }),
  })
    /*=================================
          3rd response
    =================================*/
    .then((res) => res.json())
    .then((data) => {
      workingWithReviews(data);
    })
    .catch((err) => {
      // Handle error
      console.log("Error message: ", err);
    });
}
btnSendKey.addEventListener("click", makeReviews);

/*=================================
      working with reviews
=================================*/
function workingWithReviews(array) {
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
        write reviews
=================================*/
function writeReviews() {
  const textArea = document.querySelectorAll("div.review > textarea");
  const myReviews = [];
  textArea.forEach((x) => myReviews.push(x.value));

  fetch("/write-reviews", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ myReviews, urlCompany }),
  })
    /*=================================
              screenshot
    =================================*/
    .then((res) => res.blob())
    .then((data) => {
      const imageObjectURL = URL.createObjectURL(data);
      var img = document.createElement("img");
      img.src = imageObjectURL;
      document.querySelector(".photo").append(img);
      document.querySelector(".photo").style.display = "block";
      document.querySelector(".urlRev").href = urlCompany;
      principalReviews.style.display = "none";
    })
    .catch((err) => {
      // Handle error
      console.log("Error message: ", err);
    });
}
btnSendRev.addEventListener("click", writeReviews);
