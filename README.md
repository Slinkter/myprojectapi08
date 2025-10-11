# API08: Aplicación del Clima (Refactorizada)

## 1. Descripción General

Esta aplicación es un buscador de pronósticos del tiempo simple que consume datos de la API de OpenWeatherMap. La interfaz permite a los usuarios buscar el clima de una ciudad en tiempo real, mostrando información relevante como temperatura, condición, velocidad del viento y humedad.

Este proyecto es el resultado de una refactorización profunda centrada en aplicar principios de arquitectura de software moderna, mejorar el rendimiento, implementar un manejo de errores robusto y elevar la calidad de la UI/UX con un diseño minimalista.

## 2. Tecnologías Utilizadas

- **Framework Frontend:** React 18
- **Estilos:** Tailwind CSS
- **Bundler:** Vite
- **Linting:** ESLint
- **Validación de Props:** PropTypes

## 3. Arquitectura del Software

La arquitectura ha sido reestructurada para seguir un modelo basado en componentes, con una clara separación entre la lógica de negocio, el estado de la aplicación y la capa de presentación.

### Diagrama de Arquitectura (Mermaid)

```mermaid
graph TD
    subgraph Inicialización y Carga
        A[App.jsx] -- Montaje inicial --> F[fetchData("Lima")];
        F -- Establece isLoading(true) --> SK[WeatherCardSkeleton.jsx];
    end

    subgraph Flujo de Datos del Clima
        F -- Llama a --> WS[weatherService.js];
        WS -- Realiza petición --> API[OpenWeatherMap API];
        API -- Responde con datos/error --> WS;
        WS -- Retorna datos/lanza error --> F;
        F -- Transforma datos (si éxito) --> TD[Datos Transformados];
        F -- Establece weatherData/error --> A;
        F -- Establece isLoading(false) --> A;
    end

    subgraph Interacción del Usuario
        A -- Renderiza --> S[Search.jsx];
        S -- onSearch --> H[handleSearch];
        H -- Llama a --> F;
    end

    subgraph Visualización
        A -- Si isLoading --> SK;
        A -- Si error --> EM[Mensaje de Error];
        A -- Si weatherData --> WC[WeatherCard.jsx];
    end

    style SK fill:#ff9,stroke:#333,stroke-width:2px
    style WS fill:#9cf,stroke:#333,stroke-width:2px
    style API fill:#c9f,stroke:#333,stroke-width:2px
    style EM fill:#fcc,stroke:#333,stroke-width:2px
    style WC fill:#cff,stroke:#333,stroke-width:2px
```

### Principios Clave Aplicados:

1.  **S - Principio de Responsabilidad Única (SRP)**

    Este principio establece que un componente o módulo debe tener una, y solo una, razón para cambiar.

    *   **Aplicación:**
        *   **`App.jsx`:** Su responsabilidad principal es orquestar la aplicación, gestionar el estado global de carga, datos y errores, y renderizar condicionalmente los componentes principales.
        *   **`weatherService.js`:** Tiene la **única responsabilidad** de interactuar con la API de OpenWeatherMap, construir la URL de la petición, realizar el `fetch` y manejar la respuesta cruda. Si la API cambia, solo este archivo necesita modificación.
        *   **`Search.jsx`:** Su única responsabilidad es proporcionar una interfaz para que el usuario introduzca una ciudad y active la búsqueda.
        *   **`WeatherCard.jsx`:** Su única responsabilidad es presentar los datos del clima formateados de una manera visualmente atractiva.

2.  **O - Principio de Abierto/Cerrado**

    Este principio dicta que las entidades de software (componentes, clases) deben estar abiertas a la extensión, pero cerradas a la modificación.

    *   **Aplicación:**
        *   **`WeatherCard.jsx` y `WeatherCardSkeleton.jsx`:** El `WeatherCard` está cerrado a la modificación en cuanto a su estructura de presentación de datos. Sin embargo, es "extendido" por `WeatherCardSkeleton.jsx`, que proporciona una representación visual similar durante la carga sin modificar la lógica interna de `WeatherCard`. Si la estructura de la tarjeta cambia, el esqueleto puede adaptarse fácilmente.
        *   **Componentes de UI:** Componentes como `Search.jsx` están diseñados para ser reutilizables. Su lógica interna de renderizado está cerrada, pero pueden ser extendidos en su uso a través de props para personalizar su comportamiento (ej. `handleSearch`, `loading`).

3.  **D - Principio de Inversión de Dependencias (DIP)**

    Este principio sugiere que los módulos de alto nivel no deben depender de los módulos de bajo nivel; ambos deben depender de abstracciones.

    *   **Aplicación en React (Servicios/Hooks):**
        *   **`App.jsx` (Módulo de Alto Nivel):** Depende de la abstracción `fetchWeatherData` proporcionada por `weatherService.js`. `App.jsx` no necesita saber los detalles internos de cómo `weatherService.js` construye la URL, maneja la clave API o realiza la petición `fetch`. Solo le importa que `fetchWeatherData` le devuelva los datos del clima o lance un error.
        *   Si la implementación de `weatherService.js` cambiara (ej. usar una librería diferente para HTTP, cambiar la versión de la API), `App.jsx` **no requeriría ninguna modificación**, ya que su dependencia es sobre la interfaz (`fetchWeatherData`), no sobre los detalles de implementación.

## 4. Instalación y Ejecución

1.  Clona el repositorio.
2.  Instala las dependencias:
    ```bash
    pnpm install
    ```
3.  Crea un archivo `.env` en la raíz del proyecto con tu clave de API de OpenWeatherMap:
    ```
    VITE_OPENWEATHER_API_KEY=TU_CLAVE_API_AQUI
    ```
4.  Ejecuta el servidor de desarrollo:
    ```bash
    pnpm run dev
    ```