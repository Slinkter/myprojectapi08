import React, { useEffect, useState } from "react";

const Weather = ({ data = [] }) => {
  console.log(data);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="App">
      <div className=" city-name">
        <h2>{data?.name}</h2>, <span>{data?.sys?.country}</span>
      </div>
      <div className="date">
        <span>{getCurrentDate()}</span>
      </div>
      <div className="temp">{data?.main?.temp}</div>
      <p className="description">
        {data && data.weather && data.weather[0]
          ? data.weather[0].description
          : ""}
      </p>

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
    </div>
  );
};

export default Weather;
