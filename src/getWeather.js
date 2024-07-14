import { weatherKey } from "./keys.js";
export let icon = "";

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${weatherKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

const loc = document.getElementById("city");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const wind = document.getElementById("wind");
const humid = document.getElementById("humid");

export async function logWeather(city) {
  const weatherData = await getWeather(city);

  console.log(weatherData);

  loc.innerHTML = `${weatherData.address}`;
  temp.innerHTML = `Temp: ${weatherData.days[0].temp}`;
  desc.innerHTML = `${weatherData.days[0].conditions}`;
  wind.innerHTML = `Wind: ${weatherData.days[0].windspeed}mph`;
  humid.innerHTML = `Humidity: ${weatherData.days[0].humidity}%`;
  icon = `${weatherData.days[0].icon}`;
}
