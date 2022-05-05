/*=================================
        constants
=================================*/
const btnCollapse = document.querySelector(".collapse");
const links = document.querySelector(".links");
const login = document.querySelector(".login");
const navbar = document.querySelector(".navbar");
const principalHome = document.querySelector(".principal-home");
const principalKeywords = document.querySelector(".principal-keywords");
const principalReviews = document.querySelector(".principal-reviews");
const footer = document.querySelector("footer");

const modalHome = document.querySelector(".modal-home");
const spanHome = document.querySelector(
  ".modal-home > div:nth-child(2) > div:nth-child(1) > i:nth-child(1)"
);
const modalKey = document.querySelector(".modal-key");
const spanKey = document.querySelector(
  ".modal-key > div:nth-child(2) > div:nth-child(1) > i:nth-child(1)"
);
const modalRev = document.querySelector(".modal-review");
const spanRev = document.querySelector(
  ".modal-review > div:nth-child(2) > div:nth-child(1) > i:nth-child(1)"
);

const dudas = document.querySelectorAll(".dudas-modal");

const modalHeader = document.querySelectorAll(".modal-header");
const btnScroll = document.querySelectorAll("#scrolltop");

const inputsText = document.querySelectorAll("input[type='text']");
const textarea = document.querySelector("textarea");

const logos = document.querySelectorAll(".logo img");

const btnSend = document.querySelector(".send");
const btnSendKey = document.querySelector(".sendKeywords");
const btnSendRev = document.querySelector(".sendReviews");
const keywordsContainer = document.querySelector(".keywords");
const inputKeywords = document.querySelector("#keywords");

const reviewsDiv = document.querySelector(".reviews-container");

const chartDiv = document.querySelector(".chart-container");

/*=================================
      responsive navbar
=================================*/
btnCollapse.addEventListener("click", () => {
  links.classList.toggle("active");
  login.classList.toggle("active");
  navbar.classList.toggle("active");
  document.querySelector("main").style.display = "none";
  footer.style.display = "none";

  if (navbar.className == "navbar") {
    setTimeout(() => {
      document.querySelector("main").style.display = "block";
      footer.style.display = "block";
    }, 600);
  }
});

/*=================================
            modal
=================================*/
if (location.pathname == "/index.html" || location.pathname == "/") {
  window.onload = function () {
    modalHome.style.display = "block";
    //checkCookie();
  };

  spanHome.onclick = function () {
    modalHome.style.display = "none";
    typeWriter();
  };

  window.onclick = function (event) {
    if (event.target == modalHome) {
      modalHome.style.display = "none";
      typeWriter();
    }
  };
}

/*=================================
        doubts-modal
=================================*/
if (location.pathname == "/index.html" || location.pathname == "/") {
  dudas[0].addEventListener("click", () => {
    modalHome.style.display = "block";
    console.log(dudas);
  });
  dudas[1].addEventListener("click", () => {
    modalKey.style.display = "block";
  });
}

/*=================================
    buttons scrolltop modal
=================================*/
if (location.pathname == "/index.html" || location.pathname == "/") {
  function modalScroll() {
    modalHeader.forEach((modal) => {
      modal.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  }
  btnScroll.forEach((btn) => {
    btn.addEventListener("click", modalScroll);
  });
  modalHome.addEventListener("scroll", () => {
    btnScroll.forEach((btn) => {
      btn.style.display = "flex";
      if (modalHome.scrollTop === 0) {
        btn.style.display = "none";
      }
    });
  });
  modalKey.addEventListener("scroll", () => {
    btnScroll.forEach((btn) => {
      btn.style.display = "flex";
      if (modalKey.scrollTop === 0) {
        btn.style.display = "none";
      }
    });
  });
}

/*=================================
      h2 title writer
=================================*/
var i = 0;
var txt = "Encisamator v1.0 ツ";
var speed = 100;

function typeWriter() {
  if (i < txt.length) {
    document.querySelector(".main-title h2").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

/*=================================
          logo colored
=================================*/
if (location.pathname == "/index.html" || location.pathname == "/") {
  inputsText.forEach((input) => {
    input.addEventListener("focus", () => {
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

  textarea.addEventListener("focus", () => {
    logos.forEach((logo) => {
      logo.classList.toggle("color");
    });
  });

  textarea.addEventListener("focusout", () => {
    logos.forEach((logo) => {
      logo.classList.toggle("color");
    });
  });
}

/*=================================
        loading button
=================================*/
if (location.pathname == "/index.html" || location.pathname == "/") {
  btnSend.addEventListener("click", () => {
    btnSend.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Cargando...';
    btnSend.classList.toggle("loading");
  });

  btnSendKey.addEventListener("click", () => {
    btnSendKey.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Cargando...';
    btnSendKey.classList.toggle("loading");
  });
  btnSendRev.addEventListener("click", () => {
    btnSendRev.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Cargando...';
    btnSendRev.classList.toggle("loading");
  });
}

/*=================================
        set cookie
=================================*/
// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie =
//     cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None; Secure";
// }

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   let visited = getCookie("visited");
//   if (visited == "yes") {
//     modal.style.display = "none";
//     typeWriter();
//   } else {
//     setCookie("visited", "yes", 1);
//   }
// }
