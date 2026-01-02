/**
 * @file weatherMapper.js
 * @description Maps raw API data to the application's domain model for weather.
 * This ensures a consistent data structure throughout the app and decouples it from the API's contract.
 */

/**
 * Transforms the raw weather data from the OpenWeatherMap API into a structured domain model.
 *
 * @param {object} apiData - The raw data object received from the API.
 * @returns {object} A structured weather data object for use in the application.
 * @property {string} name - City name.
 * @property {number} tempC - Temperature in Celsius.
 * @property {string} condition - Weather condition description.
 * @property {string} windKph - Wind speed in kilometers per hour.
 * @property {number} humidity - Humidity percentage.
 * @property {string} icon - URL for the weather icon.
 * @property {string} localtime - Local date and time.
 */
export const toWeatherDomainModel = (apiData) => {
  if (!apiData) return null;

  return {
    name: apiData.name,
    tempC: apiData.main.temp - 273.15,
    condition: apiData.weather[0].description,
    windKph: (apiData.wind.speed * 3.6).toFixed(1),
    humidity: apiData.main.humidity,
    icon: `https://openweathermap.org/img/wn/${apiData.weather[0].icon}@4x.png`,
    localtime: new Date(apiData.dt * 1000).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
