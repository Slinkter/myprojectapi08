import React, { useEffect, useState } from "react";
import Search from "./componentes/Search";
import Weather from "./componentes/Weather";
import "./App.css";

const App = () => {
  const [seach, setSeach] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const api_key = "95f387e6c20dba2ec0661e6dfe0dfd9d";
      const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${api_key}`;
      //
      const res = await fetch(url_api);
      const data = await res.json();
      if (data) {
        setData(data);
        setLoading(false);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchData(seach);
  };

  useEffect(() => {
    fetchData("Lima");
  }, []);

  return (
    <div>
      <Search search={seach} setSeach={setSeach} handleSearch={handleSearch} />
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <Weather data={data} />
      )}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
