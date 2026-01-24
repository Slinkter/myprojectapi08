import useSWR from "swr";
import { useState } from "react";
import { fetchForecastData } from "../services/weatherService";
import { toForecastDomainModel } from "../mappers/forecastMapper";

/**
 * Hook Personalizado: Gestión del Pronóstico Extendido (useForecast).
 *
 * **Funcionalidad:**
 * - Gestiona el estado y la obtención de datos para el pronóstico de 5 días.
 * - Migrado a SWR para caché automático y deduplicación.
 *
 * **Flujo de interacción:**
 * 1. Expone `fetchForecast(city)`.
 * 2. SWR maneja automáticamente caché, revalidación y estados.
 * 3. Transforma datos con `toForecastDomainModel`.
 *
 * **Estado y efectos secundarios:**
 * - SWR maneja: `data`, `error`, `isValidating`.
 * - Caché de 60 segundos para evitar requests redundantes.
 *
 * **Motivo de existencia:**
 * - Feature Isolation: Separa la lógica del forecast de la del clima actual.
 * - Consistencia: Mismo patrón que useWeather.
 *
 * @returns {{
 *   forecastData: Array<object>|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   fetchForecast: (city: string) => void
 * }}
 */
export const useForecast = () => {
    const [city, setCity] = useState("Lima");

    const { data, error, isValidating } = useSWR(
        city ? `forecast-${city}` : null,
        async () => {
            const rawData = await fetchForecastData(city);
            return toForecastDomainModel(rawData);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            dedupingInterval: 60000, // Cache for 1 minute
        },
    );

    return {
        forecastData: data || null,
        isLoading: isValidating && !data,
        error: error ? "No forecast available." : null,
        fetchForecast: setCity,
    };
};
