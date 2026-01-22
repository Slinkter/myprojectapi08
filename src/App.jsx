/**
 * Componente Raíz / Orquestador (App).
 *
 * **Funcionalidad:**
 * - Orquesta la Feature "Weather".
 * - Indica la Feature "Forecast" (Pronóstico extendido).
 * - Integra los componentes de Layout (`MainLayout`, `Header`) con los componentes de la feature.
 * - Gestiona el flujo de alto nivel (búsqueda -> carga -> resultado).
 *
 * **Flujo de interacción:**
 * 1. Inicializa hooks `useWeather` y `useForecast`.
 * 2. Realiza un fetch inicial coordinado ("Lima") al montar.
 * 3. Renderiza el Layout.
 * 4. Pasa los manejadores de eventos (`handleSearch`) y datos a los componentes hijos.
 *
 * **Estado y efectos secundarios:**
 * - Delega el estado de negocio a los custom hooks.
 * - Efecto de montaje inicial para datos por defecto.
 *
 * **Motivo de existencia:**
 * - Punto de entrada de la lógica de aplicación.
 * - Composición de componentes (Composition Root para UI).
 *
 * @returns {JSX.Element}
 */
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
/* import Header from "@/components/layout/Header"; */

// Feature imports
import Search from "@/features/weather/components/Search";
import WeatherCard from "@/features/weather/components/WeatherCard";
import WeatherCardSkeleton from "@/features/weather/components/WeatherCardSkeleton";
import ForecastDisplay from "@/features/weather/components/ForecastDisplay";

import { useWeather } from "@/features/weather/hooks/useWeather";
import { useForecast } from "@/features/weather/hooks/useForecast";

const App = () => {
  // Inicialización de Hooks de Features (Smart Logic)
  const {
    weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    fetchWeather,
  } = useWeather();

  const {
    forecastData,
    isLoading: isForecastLoading,
    fetchForecast,
  } = useForecast();

  /**
   * Coordinador de búsqueda. Dispara la actualización de todas las features.
   * @param {string} city
   */
  const handleSearch = (city) => {
    fetchWeather(city);
    fetchForecast(city);
  };

  // Fetch inicial
  useEffect(() => {
    handleSearch("Lima");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once on mount

  // Renderizado condicional del bloque principal
  const renderWeatherTimestamp = () => {
    if (isWeatherLoading) return <WeatherCardSkeleton />;

    if (weatherError) {
      return (
        <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-sm">
          <p className="font-medium">Error</p>
          <p>{weatherError}</p>
        </div>
      );
    }

    if (weatherData) {
      return (
        <div className="space-y-8 animate-fade-in">
          <WeatherCard data={weatherData} />
          {/* Feature: Forecast Integration */}
          <ForecastDisplay
            forecastData={forecastData}
            isLoading={isForecastLoading}
          />
        </div>
      );
    }

    return (
      <div className="text-center p-6 text-gray-400 text-sm">
        Enter a city to see the forecast.
      </div>
    );
  };

  return (
    <MainLayout>
      <section>
        <Search onSearch={handleSearch} loading={isWeatherLoading} />
      </section>

      <section aria-live="polite" className="min-h-[300px]">
        {renderWeatherTimestamp()}
      </section>
    </MainLayout>
  );
};

export default App;
