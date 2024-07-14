import { weatherKey } from "./keys.js";
import "./style.css";
import { fetchBackground } from "./background.js";
import { geoKey } from "./keys.js";

let searchTerms = ["Chicago", "sunny"];

addEventListener("DOMContentLoaded", () => {
  fetchBackground(searchTerms);
});

document
  .getElementById("search-button")
  .addEventListener("click", async function () {
    const searchInput = document.getElementById("search-input").value;
    if (searchInput === "") {
      alert("Please enter a city");
    } else {
      const isValidCity = await validateCity(searchInput);
      if (isValidCity) {
        searchTerms[0] = searchInput;
        fetchBackground(searchTerms);
      } else {
        alert("Please enter a valid city");
      }
    }
  });

async function validateCity(searchInput) {
  const response = await fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchInput}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": geoKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  return data.data && data.data.length > 0;
}
