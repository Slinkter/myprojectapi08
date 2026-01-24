import { lazy, Suspense } from "react";
import Search from "@/features/weather/components/Search";
import { useWeather } from "@/features/weather/hooks/useWeather";

// Applying 'bundle-dynamic-imports' pattern
const WeatherCard = lazy(
    () => import("@/features/weather/components/WeatherCard"),
);
const WeatherCardSkeleton = lazy(
    () => import("@/features/weather/components/WeatherCardSkeleton"),
);

/**
 * Main App Component.
 * Optimized following Vercel React Best Practices.
 */
const App = () => {
    const { weatherData, isLoading, error, fetchWeather } = useWeather();

    const handleSearch = (city) => {
        fetchWeather(city);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300">
            <main className="w-full max-w-lg space-y-8 animate-fade-in">
                <header className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">
                        Weather<span className="font-semibold">Forecast</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Minimalist weather checker
                    </p>
                </header>

                <section>
                    <Search onSearch={handleSearch} loading={isLoading} />
                </section>

                <section aria-live="polite" className="min-h-[300px]">
                    <Suspense fallback={<WeatherCardSkeleton />}>
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
                    </Suspense>
                </section>
            </main>
        </div>
    );
};

export default App;
