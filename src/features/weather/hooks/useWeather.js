/**
 * @file useWeather.js
 * @description Custom hook for managing weather data fetching logic.
 * Encapsulates state and side effects related to weather API calls.
 */

import { useState, useEffect, useCallback } from "react";
import { fetchWeatherData } from "../services/weatherService";

/**
 * Custom hook to fetch and manage weather data.
 * @returns {object} { weatherData, isLoading, error, fetchWeather }
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await fetchWeatherData(city);

      // Transform API data to domain model
      const transformedData = {
        name: data.name,
        tempC: data.main.temp - 273.15,
        condition: data.weather[0].description,
        windKph: (data.wind.speed * 3.6).toFixed(1),
        humidity: data.main.humidity,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        localtime: new Date(data.dt * 1000).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setWeatherData(transformedData);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Unable to load data. Please check the city name.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchWeather("Lima");
  }, [fetchWeather]);

  return { weatherData, isLoading, error, fetchWeather };
};
