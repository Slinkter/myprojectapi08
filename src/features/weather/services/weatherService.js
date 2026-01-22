/**
 * Servicio de Clima (Weather Service).
 *
 * **Funcionalidad:**
 * - Gestiona la comunicación HTTP con la API de OpenWeatherMap.
 * - Construye las URLs de petición utilizando la configuración base.
 * - Maneja errores a nivel de red y respuesta HTTP.
 *
 * **Flujo de interacción:**
 * 1. Recibe el nombre de la ciudad.
 * 2. Obtiene la configuración (URL y Key) del módulo `env.js`.
 * 3. Realiza la petición `fetch`.
 * 4. Si la respuesta no es OK, lanza un error con el mensaje de la API.
 * 5. Si es OK, retorna el JSON crudo.
 *
 * **Estado y efectos secundarios:**
 * - Stateless.
 * - Efecto secundario: Realiza peticiones de red asíncronas.
 *
 * **Motivo de existencia:**
 * - Principo de Responsabilidad Única (SRP): Aislar la comunicación externa del resto de la app.
 * - Facilita el testing mockeando este servicio.
 *
 * @param {string} city - Nombre de la ciudad a consultar.
 * @returns {Promise<object>} Promesa con los datos crudos del clima.
 * @throws {Error} Si la respuesta de red falla o la API devuelve error.
 */
import { config } from "@/config/env";

/**
 * Fetches current weather data for a specific city.
 *
 * @param {string} city - City name.
 * @returns {Promise<object>} Raw weather data.
 */
export const fetchWeatherData = async (city) => {
  const { baseUrl, weatherKey } = config.api;
  validateConfig(weatherKey);

  const url = `${baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${weatherKey}`;
  return await performFetch(url);
};

/**
 * Fetches 5-day forecast data with 3-hour step.
 *
 * @param {string} city - City name.
 * @returns {Promise<object>} Raw forecast data.
 */
export const fetchForecastData = async (city) => {
  const { baseUrl, weatherKey } = config.api;
  validateConfig(weatherKey);

  const url = `${baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${weatherKey}`;
  return await performFetch(url);
};

// --- Private Helpers ---

const validateConfig = (key) => {
  if (!key) throw new Error("Configuration Error: API Key is missing.");
};

const performFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch data");
  }
  return await response.json();
};
