/**
 * @file weatherService.js
 * @description Service for interacting with the OpenWeatherMap API.
 * Applies the Single Responsibility Principle by exclusively handling API communication.
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetches weather data for a specific city from the OpenWeatherMap API.
 * To use this, create a .env file in the project root with the format:
 * VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
 *
 * @param {string} city - The name of the city for which to get the forecast.
 * @returns {Promise<object>} A promise that resolves with the city's weather data.
 * @throws {Error} Throws an error if the API response is not ok or if a network error occurs.
 */
export const fetchWeatherData = async (city) => {
  // To use the API key, create a .env file in the project root with the following format:
  // VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
  // Make sure the .env file is in your .gitignore to avoid uploading it to version control.
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch weather data");
  }

  return await response.json();
};
