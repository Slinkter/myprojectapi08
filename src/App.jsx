/**
 * @file App.jsx
 * @description Componente principal de la aplicación de pronóstico del tiempo.
 * Gestiona el estado de la ciudad de búsqueda, el estado de carga, los datos meteorológicos y los errores.
 * Realiza llamadas a la API de OpenWeatherMap a través de un servicio y transforma los datos para su visualización.
 */

import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./services/weatherService";
import Search from "./componentes/Search";
import WeatherCard from "./componentes/WeatherCard";
import WeatherCardSkeleton from "./componentes/WeatherCardSkeleton";

/**
 * Componente principal de la aplicación.
 * @returns {JSX.Element} El componente App.
 */
const App = () => {
    const [searchCity, setSearchCity] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null); // Nuevo estado para manejar errores

    /**
     * Función asíncrona para obtener datos meteorológicos de una ciudad específica.
     * Actualiza los estados de carga, datos y error de la aplicación.
     * @param {string} params - El nombre de la ciudad para la cual obtener el pronóstico.
     */
    const fetchData = async (params) => {
        setIsLoading(true);
        setError(null); // Limpiar errores anteriores al iniciar una nueva búsqueda
        setWeatherData(null); // Limpiar datos anteriores

        try {
            const data = await fetchWeatherData(params);
            // Transformar los datos de la API al formato esperado por WeatherCard
            const transformedData = {
                name: data.name,
                tempC: data.main.temp - 273.15, // Convertir Kelvin a Celsius
                condition: data.weather[0].description,
                windKph: (data.wind.speed * 3.6).toFixed(1), // Convertir m/s a km/h y redondear
                humidity: data.main.humidity,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                localtime: new Date(data.dt * 1000).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setWeatherData(transformedData);
        } catch (err) {
            console.error("Error in App.jsx fetchData:", err);
            setError("Error al cargar los datos. Inténtelo de nuevo o verifique el nombre de la ciudad."); // Mensaje de error para el usuario
            setWeatherData(null); // Asegurarse de que no haya datos parciales
        } finally {
            setIsLoading(false); // Siempre finalizar la carga, ya sea éxito o error
        }
    };

    const handleSearch = () => {
        fetchData(searchCity);
    };

    useEffect(() => {
        fetchData("Lima");
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <header className="max-w-md mx-auto">
                <Search
                    search={searchCity}
                    setSeach={setSearchCity}
                    handleSearch={handleSearch}
                    loading={isLoading}
                />
            </header>

            <main className="max-w-md mx-auto mt-6">
                {isLoading ? (
                    <WeatherCardSkeleton />
                ) : error ? (
                    <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p className="font-bold">¡Error!</p>
                        <p>{error}</p>
                    </div>
                ) : weatherData ? (
                    <WeatherCard data={weatherData} />
                ) : (
                    // Esto se mostrará si no hay datos, no hay error y no está cargando (ej. al inicio antes de la primera búsqueda exitosa)
                    <div className="text-center p-4 text-gray-500">
                        <p>Introduce una ciudad para ver el pronóstico.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
