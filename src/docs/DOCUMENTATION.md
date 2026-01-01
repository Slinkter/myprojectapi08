# Documentación Técnica

## Visión General
Weather Forecast App es una SPA (Single Page Application) diseñada para mostrar el clima actual de una ciudad. El enfoque técnico prioriza la **simplicidad**, **modularidad** y **rendimiento**.

## Estructura del Proyecto: Feature-Based Architecture
El código no se organiza por "tipo de archivo" (componentes, hooks), sino por **dominio de negocio** (features).

```text
src/
├── features/
│   └── weather/           # Dominio: Clima
│       ├── components/    # UI específica (Search, WeatherCard)
│       ├── hooks/         # Lógica de negocio (useWeather)
│       └── services/      # Comunicación con API (weatherService)
├── docs/                  # Documentación del proyecto
├── App.jsx                # Componente raíz (Composition Root)
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales y Tailwind
```

## Componentes Principales

### 1. `WeatherCard`
- **Responsabilidad**: Mostrar los datos del clima.
- **Diseño**: Minimalista, con jerarquía visual clara (Temperatura > Ciudad > Detalles).
- **Props**: Recibe un objeto `data` normalizado.

### 2. `Search`
- **Responsabilidad**: Capturar la entrada del usuario.
- **Interacción**: Input de texto sutil con botón de acción.

### 3. `useWeather` (Hook)
- **Responsabilidad**: Gestionar el ciclo de vida de la petición de datos.
- **Retorno**: `{ weatherData, isLoading, error, fetchWeather }`.
- **Patrón**: Encapsula `fetch` y `useState`, exponiendo solo lo necesario a la vista.

## Gestión de Datos
- **Fuente**: OpenWeatherMap API.
- **Transformación**: Los datos crudos de la API se normalizan en `useWeather` antes de llegar a los componentes, asegurando que la UI no dependa de la estructura exacta de la API (Adapter Pattern simplificado).

## Estilos y Diseño
- Se utiliza **Tailwind CSS** exclusivamente.
- Tipografía: **Inter** (Google Fonts).
- Se evitan medidas arbitrarias, usando la escala de espaciado de Tailwind (`p-8`, `gap-4`).
