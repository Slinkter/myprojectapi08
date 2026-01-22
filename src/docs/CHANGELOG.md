# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.2.0] - 2026-01-22

### Added
- **Feature: Extended Forecast**:
    - Implementado `useForecast` hook para gestión de datos de 5 días.
    - Implementado `forecastMapper` para agregación lógica de clima diario.
    - Componentes UI: `ForecastDisplay` y `DailyForecastCard`.
- **Architecture**:
    - Centralización de Configuración en `src/config/env.js`.
    - Definición de Constantes de Dominio en `src/features/weather/constants.js`.

### Changed
- **Refactor**:
    - `weatherService.js` ahora es agnóstico del endpoint base, soportando weather y forecast.
    - `App.jsx` limpiado drásticamente para actuar solo como orquestador.
    - `WeatherCard` separado de lógica de orquestación.
- **Documentation**:
    - Reorganización de `src/docs`: Material de entrenamiento movido a `src/docs/training/`.
    - Documentación JSDoc estandarizada a nivel Senior en el núcleo del sistema.

## [1.1.0] - 2024-08-01
