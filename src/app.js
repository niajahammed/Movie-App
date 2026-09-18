const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = "https://api.themoviedb.org/3/";


// for theme 
function toggleTheme () {
  const htmlElement = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");

  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    localStorage.setItem("userTheme", "light");
    if (themeBtn) {
      themeBtn.innerText = "🌙";
    }
  } else {
    htmlElement.classList.add("dark");
    localStorage.setItem("userTheme", "dark");
    if (themeBtn) {
      themeBtn.innerText = "☀️";
    }
  }
}

// run after the HTML DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("userTheme");
  const htmlElement = document.documentElement;
  const themeBtn = document.getElementById("themeBtn");

  if (savedTheme === "dark") {
    htmlElement.classList.add("dark");
    if (themeBtn) {
      themeBtn.innerText = "☀️";
    }
  } else {
    htmlElement.classList.remove("dark");
    if (themeBtn) {
      themeBtn.innerText = "🌙"
    }
  }
});