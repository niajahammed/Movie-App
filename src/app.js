const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = "https://api.themoviedb.org/3/";

const htmlElement = document.documentElement;
const themeBtn = document.getElementById("themeBtn");


// for theme 
function toggleTheme () {
  

  htmlElement.classList.toggle("dark");

  if (htmlElement.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

if (htmlElement.classList.contains("dark")) {
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

// run after the HTML DOM is fully loaded
// document.addEventListener("DOMContentLoaded", () => {
//   const savedTheme = localStorage.getItem("userTheme");
//   const htmlElement = document.documentElement;
//   const themeBtn = document.getElementById("themeBtn");

//   if (savedTheme === "dark") {
//     htmlElement.classList.add("dark");
//     if (themeBtn) {
//       themeBtn.innerText = "☀️";
//     }
//   } else {
//     htmlElement.classList.remove("dark");
//     if (themeBtn) {
//       themeBtn.innerText = "🌙"
//     }
//   }
// });