import useSWR from "swr";
import { useState } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { toWeatherDomainModel } from "../mappers/weatherMapper";

/**
 * Custom hook to fetch and manage weather data using SWR.
 * Follows 'client-swr-dedup' best practice for automatic caching and deduplication.
 */
export const useWeather = () => {
    const [city, setCity] = useState("Lima");

    const { data, error, isValidating } = useSWR(
        city ? city : null,
        async (cityName) => {
            const rawData = await fetchWeatherData(cityName);
            return toWeatherDomainModel(rawData);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        },
    );

    return {
        weatherData: data || null,
        isLoading: isValidating && !data,
        error: error
            ? error.message.includes("401") || error.message.includes("API key")
                ? "Invalid or missing API Key. Please check your .env file."
                : "Unable to load data. Please check the city name."
            : null,
        fetchWeather: setCity,
    };
};
