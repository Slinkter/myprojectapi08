/**
 * @file useWeather.js
 * @description Custom hook for managing weather data fetching logic.
 * Encapsulates state and side effects related to weather API calls.
 */

import { useState, useCallback } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { toWeatherDomainModel } from "../mappers/weatherMapper";

/**
 * Hook Personalizado: Gestión del Clima (useWeather).
 *
 * **Funcionalidad:**
 * - Encapsula la lógica de estado y gestión de efectos para la feature "Weather".
 * - Coordina la llamada al servicio y la transformación de datos.
 *
 * **Flujo de interacción:**
 * 1. Expone el método `fetchWeather(city)`.
 * 2. Al invocarse, setea `isLoading` a true y limpia errores.
 * 3. Llama al servicio `fetchWeatherData`.
 * 4. Transforma la respuesta con `toWeatherDomainModel`.
 * 5. Actualiza el estado local con los datos listos para la UI.
 *
 * **Estado y efectos secundarios:**
 * - Maneja estados locales: `weatherData`, `isLoading`, `error`.
 * - Sin efectos secundarios automáticos (el consumidor decide cuándo llamar a fetch).
 *
 * **Motivo de existencia:**
 * - Separation of Concerns: Desacopla la vista (`App.jsx`) de la lógica de negocio.
 * - Reusabilidad: Permite usar la lógica del clima en múltiples componentes si fuera necesario.
 *
 * @returns {{
 *   weatherData: object|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   fetchWeather: (city: string) => Promise<void>
 * }}
 */
export const useWeather = () => {
  // local state
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback memoriza la función para mantener su referencia estable entre renderizados.
  // Esto es crucial si fetchWeather se añade como dependencia en un useEffect
  // en el componente que consuma este hook, evitando bucles infinitos.
  const fetchWeather = useCallback(async (city) => {
    if (!city || !city.trim()) {
      // Clear previous data if search is cleared
      setWeatherData(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(city);
      const transformedData = toWeatherDomainModel(data);
      setWeatherData(transformedData);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Unable to load data. Please check the city name.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { weatherData, isLoading, error, fetchWeather };
};
