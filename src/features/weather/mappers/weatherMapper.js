/**
 * @typedef {Object} WeatherDomainModel
 * @property {string} name - City name.
 * @property {number} tempC - Current temperature in Celsius.
 * @property {number} feelsLikeC - Apparent temperature in Celsius.
 * @property {string} condition - Description of current weather.
 * @property {string} windKph - Wind speed in km/h.
 * @property {number} humidity - Relative humidity percentage.
 * @property {string} iconCode - OpenWeather icon identifier.
 * @property {string} localtime - Formatted local date string.
 */

/**
 * Mapeador de Dominio de Clima (Weather Mapper).
 *
 * **Funcionalidad:**
 * - Transforma los datos "crudos" de la API de OpenWeatherMap al modelo de dominio de la aplicación.
 * - Aplica conversiones de unidades (Kelvin -> Celsius, m/s -> km/h).
 * - Formatea fechas y descripciones.
 *
 * **Flujo de interacción:**
 * 1. Recibe `apiData` (JSON crudo).
 * 2. Valida la existencia de datos.
 * 3. Aplica fórmulas matemáticas usando constantes centralizadas.
 * 4. Retorna el objeto `WeatherDomainModel`.
 *
 * **Estado y efectos secundarios:**
 * - Función pura (Pure Function): Misma entrada siempre produce misma salida, sin efectos secundarios.
 *
 * **Motivo de existencia:**
 * - Patrón Adaptador: Desacopla la vista de la estructura específica de la API externa.
 * - Centraliza la lógica de transformación de datos.
 *
 * @param {object} apiData - Objeto de respuesta raw de la API.
 * @returns {WeatherDomainModel|null} Objeto de dominio limpio o null si no hay datos.
 */
import { WEATHER_CONSTANTS } from "../constants";

export const toWeatherDomainModel = (apiData) => {
  if (!apiData) return null;

  const { UNITS, DATE_FORMAT, LOCALE } = WEATHER_CONSTANTS;

  return {
    name: apiData.name,
    // Conversión explícita usando constantes
    tempC: apiData.main.temp - UNITS.KELVIN_OFFSET,
    feelsLikeC: apiData.main.feels_like - UNITS.KELVIN_OFFSET,
    condition: apiData.weather[0].description,
    windKph: (apiData.wind.speed * UNITS.WIND_CONVERSION_FACTOR).toFixed(1),
    humidity: apiData.main.humidity,
    iconCode: apiData.weather[0].icon,
    // Formateo de fecha usando configuración local centralizada
    localtime: new Date(apiData.dt * UNITS.SECONDS_TO_MS).toLocaleDateString(
      LOCALE.DEFAULT,
      DATE_FORMAT,
    ),
  };
};
