/**
 * @file weatherService.js
 * @description Servicio para interactuar con la API de OpenWeatherMap.
 * Contiene la lógica para obtener datos meteorológicos y registra información de depuración de las llamadas a la API.
 * 
 * Principios SOLID aplicados:
 * - SRP (Single Responsibility Principle): Este módulo tiene la única responsabilidad de interactuar con la API de OpenWeatherMap.
 *   Se encarga de construir la URL de la petición, realizar el `fetch`, manejar la respuesta cruda y lanzar errores específicos de la API.
 *   No se ocupa de la presentación de los datos ni de la gestión del estado de la aplicación.
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Para usar la clave API, crea un archivo .env en la raíz del proyecto con el siguiente formato:
// VITE_OPENWEATHER_API_KEY=TU_CLAVE_API_AQUI
// Asegúrate de que el archivo .env esté en tu .gitignore para evitar subirlo al control de versiones.

/**
 * Obtiene los datos meteorológicos para una ciudad específica de la API de OpenWeatherMap.
 * @param {string} city - El nombre de la ciudad para la cual obtener el pronóstico.
 * @returns {Promise<object>} Una promesa que resuelve con los datos meteorológicos de la ciudad.
 * @throws {Error} Si la respuesta de la API no es exitosa o si ocurre un error en la red.
 */
export const fetchWeatherData = async (city) => {
    try {
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}`;
        console.log("Fetching weather data from URL:", url); // Log the API URL
        const response = await fetch(url);
        console.log("API Response Status:", response.status); // Log the response status

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Data:", errorData); // Log API error details
            throw new Error(errorData.message || "Failed to fetch weather data");
        }
        const data = await response.json();
        console.log("API Data Received:", data); // Log the successfully parsed data
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error; // Re-throw to be handled by the caller
    }
};
