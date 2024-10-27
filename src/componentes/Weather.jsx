import React, { useEffect, useState } from "react";

const Weather = ({ data = [] }) => {
    console.log(data);

    const kelvinTemp = data?.main?.temp; // Temperatura en Kelvin
    const celsiusTemp = kelvinTemp - 273.15; // Convertir a Celsius

    console.log(`La temperatura en Celsius es: ${celsiusTemp.toFixed(2)}°C`);

    const getCurrentDate = () => {
        return new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <>
            <div className="text-center">
                <p>
                    {data?.name} , <span>{data?.sys?.country}</span>
                </p>
                <p> {getCurrentDate()}</p>
                <p className="temp">{` ${celsiusTemp.toFixed(2)}°C`}</p>
                <p className="description">
                    {data && data.weather && data.weather[0]
                        ? data.weather[0].description
                        : ""}
                </p>
            </div>

            <div className="weather-info">
                <div className="">
                    <div>
                        <p className="wind"> {data?.wind?.speed} </p>
                        <p>Wind Speed</p>
                    </div>
                </div>

                <div className="">
                    <div>
                        <p className="humidity">{data?.main?.humidity}% </p>
                        <p>Humidy</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
