# Patrones de Diseño Utilizados

## 1. Container / Presentational Pattern (Separación de Intereses)
Aunque usado de forma moderna con Hooks, el principio se mantiene:
-   **Container (Lógica)**: `useWeather` (Hook) gestiona el *cómo* funcionan las cosas (datos, errores, carga).
-   **Presentational (Vista)**: `WeatherCard` y `Search` gestionan el *cómo* se ven las cosas. Reciben datos vía props y emiten eventos. `App.jsx` actúa como el punto de integración.

## 2. Custom Hooks
Empaquetamos lógica de estado compleja en funciones reutilizables (`useWeather`). Esto permite que múltiples componentes pudieran acceder a la lógica del clima sin duplicar código.

## 3. Service Layer Pattern
La lógica de comunicación con la API se aísla en `weatherService.js`.
-   **Ventaja**: Si la API de OpenWeather cambia, o cambiamos a otra API, solo modificamos este archivo. Los componentes no saben de dónde vienen los datos.

## 4. Adapter / Transformation Pattern (Implícito)
En `useWeather`, los datos crudos de la API (que tienen una estructura compleja y anidada) se transforman en un objeto plano y fácil de usar (`transformedData`).
-   La vista (`WeatherCard`) consume este modelo de dominio limpio, no la respuesta "sucia" de la API.
