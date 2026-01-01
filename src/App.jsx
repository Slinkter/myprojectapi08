/**
 * @file App.jsx
 * @description Main application component.
 * Orchestrates the application using Feature-Based Architecture patterns.
 */

import { useState } from "react";
import Search from "@/features/weather/components/Search";
import WeatherCard from "@/features/weather/components/WeatherCard";
import WeatherCardSkeleton from "@/features/weather/components/WeatherCardSkeleton";
import { useWeather } from "@/features/weather/hooks/useWeather";

/**
 * Main App Component
 * Integrates the Weather feature components and logic.
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  // Custom hook encapsulates all data fetching and state logic
  const { weatherData, isLoading, error, fetchWeather } = useWeather();

  // Local state for the search input
  const [searchCity, setSearchCity] = useState("");

  const handleSearch = () => {
    fetchWeather(searchCity);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500">
      <main className="w-full max-w-lg space-y-8 animate-fade-in">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-light tracking-tight text-gray-900">
            Weather<span className="font-semibold">Forecast</span>
          </h1>
          <p className="text-gray-500 text-sm">Minimalist weather checker</p>
        </header>

        <section>
          <Search
            search={searchCity}
            setSeach={setSearchCity}
            handleSearch={handleSearch}
            loading={isLoading}
          />
        </section>

        <section aria-live="polite" className="min-h-[300px]">
          {isLoading ? (
            <WeatherCardSkeleton />
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-sm">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          ) : weatherData ? (
            <WeatherCard data={weatherData} />
          ) : (
            <div className="text-center p-6 text-gray-400 text-sm">
              Enter a city to see the forecast.
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
