import useSWR from "swr";
import { useState } from "react";
import { fetchWeatherData } from "../services/weatherService";
import { toWeatherDomainModel } from "../mappers/weatherMapper";

/**
<<<<<<< HEAD
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
=======
 * Custom hook to fetch and manage weather data using SWR.
 * Follows 'client-swr-dedup' best practice for automatic caching and deduplication.
>>>>>>> skill01
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
