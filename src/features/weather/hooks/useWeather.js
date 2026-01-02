/**
 * @file useWeather.js
 * @description Custom hook for managing weather data fetching logic.
 * Encapsulates state and side effects related to weather API calls.
 */

import { useState, useCallback } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { toWeatherDomainModel } from "../mappers/weatherMapper";

/**
 * Custom hook to fetch and manage weather data.
 * It encapsulates the logic for fetching data, managing loading and error states,
 * and transforming the data into the application's domain model.
 *
 * @returns {{weatherData: object|null, isLoading: boolean, error: string|null, fetchWeather: function(string): Promise<void>}}
 * An object containing the weather data, loading state, error state, and the function to fetch weather.
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
