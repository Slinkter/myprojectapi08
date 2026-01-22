/**
 * Hook Personalizado: Gestión del Pronóstico Extendido (useForecast).
 *
 * **Funcionalidad:**
 * - Gestiona el estado y la obtención de datos para el pronóstico de 5 días.
 *
 * **Flujo de interacción:**
 * 1. Expone `fetchForecast(city)`.
 * 2. Llama al servicio `fetchForecastData`.
 * 3. Transforma datos con `toForecastDomainModel`.
 * 4. Actualiza estado.
 *
 * **Estado y efectos secundarios:**
 * - States: `forecastData` (Array), `isLoading`, `error`.
 *
 * **Motivo de existencia:**
 * - Feature Isolation: Separa la lógica del forecast de la del clima actual.
 *
 * @returns {{
 *   forecastData: Array<object>|null,
 *   isLoading: boolean,
 *   error: string|null,
 *   fetchForecast: (city: string) => Promise<void>
 * }}
 */
import { useState, useCallback } from "react";
import { fetchForecastData } from "../services/weatherService";
import { toForecastDomainModel } from "../mappers/forecastMapper";

export const useForecast = () => {
  const [forecastData, setForecastData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = useCallback(async (city) => {
    if (!city || !city.trim()) {
      setForecastData(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const rawData = await fetchForecastData(city);
      const domainData = toForecastDomainModel(rawData);
      setForecastData(domainData);
    } catch (err) {
      console.error("Error fetching forecast:", err);
      // No mostramos error en UI para forecast si falla, o podemos mostrar un mensaje discreto.
      // Estandarizamos mensaje.
      setError("No forecast available.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { forecastData, isLoading, error, fetchForecast };
};
