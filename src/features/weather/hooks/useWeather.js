import useSWR from "swr";
import { fetchWeatherData } from "../services/weatherService";
import { toWeatherDomainModel } from "../mappers/weatherMapper";
import { WEATHER_CONSTANTS } from "../constants";

/**
 * Custom hook to fetch and manage weather data using SWR.
 * Follows 'client-swr-dedup' best practice for automatic caching and deduplication.
 * @param {string} city - The city to fetch weather for.
 */
export const useWeather = (city) => {
    const { data, error, isValidating } = useSWR(
        city ? ["weather", city] : null,
        async ([, cityName], { signal } = {}) => {
            const rawData = await fetchWeatherData(cityName, signal);
            return toWeatherDomainModel(rawData);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            keepPreviousData: true,
        },
    );

    return {
        weatherData: data || null,
        isLoading: isValidating && !data,
        error: error
            ? error.message.includes("401") || error.message.includes("API key")
                ? WEATHER_CONSTANTS.MESSAGES.AUTH_ERROR
                : error.message // Mostramos el error real de la API si no es de auth
            : null,
    };
};
