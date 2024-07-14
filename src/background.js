import { unsplashKey } from "./keys.js";

export async function fetchBackground(searchTerms) {
  console.log(searchTerms);
  const query = searchTerms.join(" ");
  console.log(query);
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKey}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * 11);
    const photo = data.results[randomIndex];
    displayBackground(photo);
  } else {
    console.error("No photos found.");
  }
}
function displayBackground(photo) {
  document.body.style.backgroundImage = `url(${photo.urls.regular})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  const footer = document.querySelector("footer");
  footer.innerHTML = `Photo by <a href="${photo.user.links.html}">${photo.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a>`;
}
