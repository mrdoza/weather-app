
import { weatherKey } from "./keys.js";
import "./style.css";
import { fetchBackground } from "./background.js";

let searchTerms = ["Chicago", "rain", "sunrise"];

addEventListener("DOMContentLoaded", () => {
  fetchBackground(searchTerms);
});

document.getElementById("search-button").addEventListener("click", function () {
  const searchInput = document.getElementById("search-input").value;
  if (searchInput === "") {
    alert("Please enter a city");
  } else {
    searchTerms[0] = searchInput;
    fetchBackground(searchTerms);
  }
});


