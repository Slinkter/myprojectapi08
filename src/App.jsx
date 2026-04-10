import { useState, useCallback, lazy, Suspense, useTransition } from "react";
import Search from "@/features/weather/components/Search";
import { useWeather } from "@/features/weather/hooks/useWeather";
import { useForecast } from "@/features/weather/hooks/useForecast";

// Applying 'bundle-dynamic-imports' pattern
const WeatherCard = lazy(
    () => import("@/features/weather/components/WeatherCard"),
);
const WeatherCardSkeleton = lazy(
    () => import("@/features/weather/components/WeatherCardSkeleton"),
);
const ForecastDisplay = lazy(
    () => import("@/features/weather/components/ForecastDisplay"),
);

/**
 * Main App Component.
 * Optimized following Vercel React Best Practices.
 * Implements useTransition for non-blocking search interactions.
 */
const App = () => {
    // Phase 1: Lifted city state for synchronization
    const [currentCity, setCurrentCity] = useState("Lima");

    // Custom hooks for data fetching
    const { weatherData, isLoading: isWeatherLoading, error: weatherError } = useWeather(currentCity);
    const { forecastData, isLoading: isForecastLoading, error: forecastError } = useForecast(currentCity);

    const isLoading = isWeatherLoading || isForecastLoading;
    const error = weatherError || forecastError;

    // useTransition for non-blocking UI updates during searches
    const [isPending, startTransition] = useTransition();

    /**
     * Handles the search action triggered by the Search component.
     * Uses startTransition to keep UI responsive during data fetching.
     * @param {string} city - The city to search for.
     */
    const handleSearch = useCallback((city) => {
        if (city === currentCity) return;
        startTransition(() => {
            setCurrentCity(city);
        });
    }, [currentCity]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300">
            <main className="w-full max-w-lg space-y-8 animate-fade-in">
                <header className="hidden text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">
                        Weather<span className="font-semibold">Forecast</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Minimalist weather checker
                    </p>
                </header>

                <section>
                    <Search
                        onSearch={handleSearch}
                        loading={isLoading}
                        isPending={isPending}
                    />
                </section>

                <section aria-live="polite" className="min-h-[300px] space-y-8">
                    <Suspense fallback={<WeatherCardSkeleton />}>
                        {isLoading ? (
                            <WeatherCardSkeleton />
                        ) : error ? (
                            <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-xl text-center text-sm">
                                <p className="font-medium">Error</p>
                                <p>{error}</p>
                            </div>
                        ) : weatherData ? (
                            <div className={`transition-all duration-300 ${isPending ? "opacity-60 grayscale-[20%]" : "opacity-100"}`}>
                                <WeatherCard data={weatherData} />
                                {forecastData && (
                                    <ForecastDisplay data={forecastData} isLoading={isForecastLoading} />
                                )}
                            </div>
                        ) : (
                            <div className="text-center p-6 text-gray-400 text-sm">
                                Enter a city to see the forecast.
                            </div>
                        )}
                    </Suspense>
                </section>
            </main>
        </div>
    );
};

export default App;
