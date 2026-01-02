# Simulación de Entrevista Técnica: Feature de Pronóstico Extendido

## Escenario

-   **Empresa**: ClimaTech Solutions
-   **Puesto**: Desarrollador Frontend
-   **Entrevistador**: Arquitecto Principal
-   **Contexto**: Has superado las primeras fases y ahora estás en la entrevista técnica final. Se te presenta el proyecto actual (`WeatherForecast`) y se te pide que expliques cómo implementarías una nueva funcionalidad clave.

---

## Diálogo de la Entrevista

**Entrevistador**: "Hola, bienvenido. He revisado la arquitectura actual de la aplicación `WeatherForecast` y estoy impresionado con la limpieza del código, la separación de responsabilidades y la documentación. Es un buen punto de partida."

**Entrevistador**: "Ahora, quiero proponerte un desafío. La aplicación actualmente solo muestra el clima del momento. Nuestro siguiente objetivo es mostrar un **pronóstico extendido de 5 días**. Queremos que pienses como arquitecto y desarrollador. ¿Cómo abordarías esta nueva funcionalidad?"

**Entrevistador**: "Para ser más específico, esto es lo que negocio nos pide:"

1.  "Debajo de la tarjeta del clima actual, debe aparecer una nueva sección que muestre el pronóstico para los próximos 5 días."
2.  "Para cada uno de esos 5 días, necesitamos mostrar: el **día de la semana**, un **icono representativo del clima** para ese día, y la **temperatura máxima y mínima**."

**Entrevistador**: "Técnicamente, esto implica usar un endpoint diferente del API de OpenWeatherMap, el de pronóstico de 5 días (`/forecast`), que devuelve una lista de datos en intervalos de 3 horas. Teniendo en cuenta la arquitectura actual, me gustaría que me explicaras tu plan de acción. Por ejemplo:"

*   "**A nivel de Servicio**: ¿Qué cambios harías en `weatherService.js`?"
*   "**A nivel de Lógica**: ¿Modificarías el hook `useWeather` o crearías uno nuevo? ¿Por qué?"
*   "**El mayor desafío**: El nuevo endpoint nos da datos cada 3 horas. ¿Cómo procesarías esa información para agruparla por día y calcular la temperatura máxima/mínima de cada día? ¿Dónde iría esa lógica?"
*   "**A nivel de UI**: ¿Qué nuevos componentes crearías y qué responsabilidad tendría cada uno?"

---

## Resumen de Requisitos Técnicos

Basado en la entrevista, esta es la lista de tareas a implementar para desarrollar la nueva funcionalidad de "Pronóstico Extendido".

### 1. Capa de Servicio (`Service Layer`)

-   **Tarea**: Actualizar `src/features/weather/services/weatherService.js`.
-   **Requisito**: Añadir una nueva función asíncrona, `fetchForecastData(city)`, que consulte el endpoint `/forecast` del API de OpenWeatherMap. Debe manejar la comunicación y los errores de la misma manera que `fetchWeatherData`.

### 2. Capa de Mapeo (`Mapper Layer`)

-   **Tarea**: Crear un nuevo archivo: `src/features/weather/mappers/forecastMapper.js`.
-   **Requisito**: Implementar una función `toForecastDomainModel(apiData)`. Esta es la parte más compleja. La función debe:
    1.  Recibir la lista de pronósticos (en intervalos de 3 horas) del API.
    2.  Agrupar los resultados por día.
    3.  Para cada día, calcular la temperatura máxima (`temp_max`) y mínima (`temp_min`).
    4.  Seleccionar un icono de clima representativo para cada día (por ejemplo, el del mediodía).
    5.  Devolver un array de objetos, donde cada objeto represente un día de pronóstico con `{ day, icon, maxTemp, minTemp }`.

### 3. Capa de Lógica (`Hook Layer`)

-   **Tarea**: Crear un nuevo custom hook: `src/features/weather/hooks/useForecast.js`.
-   **Requisito**:
    1.  Debe ser similar a `useWeather`, pero para gestionar el estado del pronóstico extendido.
    2.  Expondrá `{ forecastData, isLoading, error, fetchForecast }`.
    3.  Internamente, llamará a `weatherService.fetchForecastData` y usará `forecastMapper.toForecastDomainModel` para procesar los datos antes de actualizar su estado.
    -   *Decisión de Arquitectura*: Se crea un hook separado para mantener la cohesión y no sobrecargar `useWeather` con una segunda responsabilidad (SRP).

### 4. Capa de Presentación (Componentes de UI)

-   **Tarea**: Crear dos nuevos componentes de presentación.
-   **Requisitos**:
    1.  **`DailyForecastCard.jsx`**: Un componente "tonto" que recibe las props para un solo día (`day`, `icon`, `maxTemp`, `minTemp`) y las renderiza visualmente.
    2.  **`ForecastDisplay.jsx`**: Un componente "inteligente" (o contenedor de la feature) que:
        -   Utiliza el hook `useForecast.js` para obtener los datos del pronóstico.
        -   Maneja los estados de `isLoading` (mostrando quizás un esqueleto de carga) y `error`.
        -   Si hay datos, itera sobre `forecastData` y renderiza una lista de componentes `DailyForecastCard.jsx`.

### 5. Integración Final

-   **Tarea**: Modificar `App.jsx`.
-   **Requisito**:
    1.  Integrar el nuevo componente `ForecastDisplay.jsx` debajo de la sección del `WeatherCard` actual.
    2.  Pasar la ciudad buscada (`searchCity`) a `ForecastDisplay.jsx` para que pueda disparar la carga de datos del pronóstico. Esto implica que `App.jsx` deberá coordinar la llamada a ambos hooks (`useWeather` y `useForecast`).
