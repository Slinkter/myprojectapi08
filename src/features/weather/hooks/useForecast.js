import useSWR from "swr";
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
 * 1. Expone `forecastData`, `isLoading`, `error`.
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
 * @param {string} city - The city to fetch forecast for.
 * @returns {{
 *   forecastData: Array<object>|null,
 *   isLoading: boolean,
 *   error: string|null
 * }}
 */
export const useForecast = (city) => {
    const { data, error, isValidating } = useSWR(
        city ? ["forecast", city] : null,
        async ([, cityName], { signal } = {}) => {
            const rawData = await fetchForecastData(cityName, signal);
            return toForecastDomainModel(rawData);
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
            dedupingInterval: 60000, // Cache for 1 minute
            keepPreviousData: true,
        },
    );

    return {
        forecastData: data || null,
        isLoading: isValidating && !data,
        error: error ? error.message : null,
    };
};
