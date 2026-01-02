# Tutorial Práctico: Extendiendo la Aplicación del Clima

Este documento ofrece ejercicios prácticos para familiarizarse con la arquitectura del proyecto. Al completarlos, entenderás cómo añadir nuevas funcionalidades manteniendo el código limpio y organizado.

---

### Requisito Previo

Asegúrate de tener el proyecto corriendo localmente. Si no, sigue las instrucciones del `README.md` principal.

---

### Ejercicio 1: Añadir un Nuevo Dato a la UI

**Objetivo**: Modificar `WeatherCard.jsx` para mostrar un dato que ya obtenemos pero que no estamos usando: la hora local.

1.  **Analiza el Modelo de Dominio**:
    El hook `useWeather` y el mapeador `weatherMapper.js` ya transforman la fecha y la guardan en la propiedad `localtime` del objeto `weatherData`.

2.  **Modifica el Componente de Presentación**:
    Abre `src/features/weather/components/WeatherCard.jsx`.
    Busca la sección `<header>` donde se muestra el nombre de la ciudad (`{name}`).
    Justo debajo, añade un párrafo para mostrar la hora local.

    ```jsx
    // En WeatherCard.jsx, dentro del primer <div> del <header>

    <h2 className="text-3xl font-medium text-gray-900 tracking-tight">
      {name}
    </h2>
    {/* Añade esta línea */}
    {localtime && (
      <p className="text-sm text-gray-400 font-light tracking-wide uppercase">
        {localtime}
      </p>
    )}
    ```

3.  **Verifica**:
    Guarda el archivo y mira la aplicación en tu navegador. Ahora deberías ver la fecha y hora local debajo del nombre de la ciudad.

**Lección Aprendida**: Los componentes de presentación son "tontos". Solo reciben datos y los muestran. Modificar la UI es tan simple como añadir un nuevo campo, siempre que el modelo de datos ya lo proporcione.

---

### Ejercicio 2: Añadir un Nuevo Dato desde el API

**Objetivo**: Obtener y mostrar la "sensación térmica" (`feels_like`) del API.

Este ejercicio requiere que modifiques todas las capas de la arquitectura.

1.  **Capa de Mapeo (`mapper`)**:
    Abre `src/features/weather/mappers/weatherMapper.js`.
    El API de OpenWeatherMap devuelve `main.feels_like`. Necesitamos añadirlo a nuestro modelo de dominio.

    ```javascript
    // En toWeatherDomainModel dentro del objeto de retorno
    export const toWeatherDomainModel = (apiData) => {
      // ...
      return {
        // ... (otras propiedades)
        tempC: apiData.main.temp - 273.15,
        feelsLikeC: apiData.main.feels_like - 273.15, // <-- AÑADE ESTA LÍNEA
        condition: apiData.weather[0].description,
        // ... (otras propiedades)
      };
    };
    ```

2.  **Capa de Presentación (`component`)**:
    Ahora que el dato `feelsLikeC` está disponible en el objeto `data` que llega a `WeatherCard`, podemos mostrarlo.
    Abre `src/features/weather/components/WeatherCard.jsx`.

    ```jsx
    // En WeatherCard.jsx, debajo de la condición del clima
    <span className="text-2xl text-gray-500 font-light capitalize mt-2 tracking-wide">
      {condition}
    </span>
    {/* Añade estas líneas */}
    <span className="text-md text-gray-400 font-light mt-2">
      Sensación Térmica: {Math.round(data.feelsLikeC)}°
    </span>
    ```

3.  **Verifica**:
    Guarda los archivos. La tarjeta del clima ahora debería mostrar la sensación térmica.

**Lección Aprendida**: El flujo de datos es unidireccional y claro: `API -> Servicio -> Hook -> Mapper -> Componente`. Para añadir un nuevo dato, seguimos ese flujo. El `hook` y el `servicio` no necesitaron cambios porque su responsabilidad es genérica (obtener datos), no específica (conocer cada campo).

---

### Ejercicio 3 (Avanzado): Crear un Nuevo Componente y Hook

**Objetivo**: Crear una nueva "feature" que muestre una alerta de viento fuerte si la velocidad del viento supera un umbral.

1.  **Crea un Nuevo Componente de Presentación**:
    Crea el archivo `src/features/weather/components/WindAlert.jsx`. Este componente solo recibirá una prop `windSpeed`.

    ```jsx
    // src/features/weather/components/WindAlert.jsx
    import PropTypes from "prop-types";

    /**
     * Muestra una alerta si la velocidad del viento es alta.
     * @param {{ windSpeed: number }} props
     */
    const WindAlert = ({ windSpeed }) => {
      if (windSpeed < 25) { // Umbral: 25 km/h
        return null;
      }

      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl text-center text-sm">
          <strong>Alerta:</strong> Vientos fuertes de {windSpeed} km/h.
        </div>
      );
    };

    WindAlert.propTypes = {
      windSpeed: PropTypes.number,
    };

    export default WindAlert;
    ```

2.  **Crea un Nuevo Custom Hook (Opcional pero recomendado)**:
    Para mantener la lógica de negocio fuera de `App.jsx`, podrías crear un `useWindAlert.js` que reciba `weatherData` y devuelva el `windSpeed`. Para este ejemplo, lo haremos directamente en `App.jsx` por simplicidad, pero en un caso real, un hook sería mejor.

3.  **Integra en el Contenedor (`App.jsx`)**:
    Abre `src/App.jsx` e importa tu nuevo componente. Luego, renderízalo condicionalmente.

    ```jsx
    // En App.jsx
    import WindAlert from "@/features/weather/components/WindAlert"; // <-- IMPORTA

    const App = () => {
      const { weatherData, isLoading, error, fetchWeather } = useWeather();
      // ...

      return (
        <div className="min-h-screen ...">
          <main className="w-full ...">
            {/* ... otras secciones */}

            {/* AÑADE ESTA SECCIÓN */}
            {weatherData && (
              <section>
                <WindAlert windSpeed={Number(weatherData.windKph)} />
              </section>
            )}

            <section aria-live="polite" className="min-h-[300px]">
              {/* ... renderizado de WeatherCard */}
            </section>
          </main>
        </div>
      );
    };
    ```

4.  **Verifica**:
    Busca una ciudad con viento fuerte (ej. "Wellington") para ver si aparece tu alerta.

**Lección Aprendida**: La arquitectura basada en features te permite añadir nuevos componentes y lógica de forma aislada. `WindAlert` es parte de la feature "weather" y se integra limpiamente en el orquestador `App.jsx` sin afectar a los otros componentes.
