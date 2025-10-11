

/**
 * @file Weather.jsx
 * @description Componente para mostrar la información meteorológica de una ciudad.
 */

import PropTypes from "prop-types";

/**
 * Componente funcional Weather.
 * Muestra los datos meteorológicos como temperatura, descripción, velocidad del viento y humedad.
 * @param {object} props - Las props del componente.
 * @param {object} props.data - Objeto que contiene los datos meteorológicos.
 * @returns {JSX.Element} El componente Weather.
 */
const Weather = ({ data = {} }) => {

    const kelvinTemp = data?.main?.temp; // Temperatura en Kelvin
    const celsiusTemp = kelvinTemp - 273.15; // Convertir a Celsius

    /**
     * Obtiene la fecha actual formateada.
     * @returns {string} La fecha actual en formato largo (ej. "Friday, October 10, 2025").
     */
    const getCurrentDate = () => {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="transition-opacity duration-500 ease-in-out opacity-0 animate-fade-in">
            <div className="text-center mb-6">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                    {data?.name} , <span className="font-normal text-gray-600">{data?.sys?.country}</span>
                </p>
                <p className="text-sm text-gray-500 mb-4"> {getCurrentDate()}</p>
                <p className="text-5xl sm:text-6xl font-extrabold text-indigo-600 mb-2">{` ${celsiusTemp.toFixed(1)}°C`}</p>
                <p className="text-lg sm:text-xl text-gray-700 capitalize">
                    {data && data.weather && data.weather[0]
                        ? data.weather[0].description
                        : ""}
                </p>
            </div>

            <div className="weather-info flex flex-col md:flex-row justify-around mt-4 gap-4">
                <div className="flex-1 text-center p-2 rounded-lg bg-gray-100">
                    <div>
                        <p className="wind text-lg font-semibold"> {data?.wind?.speed} m/s</p>
                        <p className="text-sm text-gray-600">Wind Speed</p>
                    </div>
                </div>

                <div className="flex-1 text-center p-2 rounded-lg bg-gray-100">
                    <div>
                        <p className="humidity text-lg font-semibold">{data?.main?.humidity}% </p>
                        <p className="text-sm text-gray-600">Humidity</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;

Weather.propTypes = {
    data: PropTypes.object,
};

