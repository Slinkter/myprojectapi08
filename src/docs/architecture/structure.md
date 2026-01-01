# Arquitectura Basada en Features (FBA)

## ¿Qué es?
Feature-Based Architecture es un patrón de organización donde los archivos que pertenecen a una misma funcionalidad de negocio (feature) se agrupan juntos.

## Estructura Implementada
En este proyecto, la funcionalidad principal es "Consultar el Clima". Por lo tanto, todo lo relacionado vive en:
`src/features/weather/`

### Desglose de `src/features/weather`:
1.  **`/components`**:
    -   Contiene `Search.jsx`, `WeatherCard.jsx`, `WeatherCardSkeleton.jsx`.
    -   Estos componentes son **privados** para esta feature (idealmente).
2.  **`/hooks`**:
    -   Contiene `useWeather.js`.
    -   Encapsula la lógica de estado y efectos.
3.  **`/services`**:
    -   Contiene `weatherService.js`.
    -   Aísla la complejidad de la red y la API.

## Beneficios
1.  **Escalabilidad**: Si queremos agregar una feature "Noticias", crearíamos `src/features/news` sin ensuciar la lógica del clima.
2.  **Navegación**: Es fácil encontrar todo lo relacionado con una feature sin saltar entre `src/components`, `src/actions`, `src/reducers`.
3.  **Mantenibilidad**: Modificar el comportamiento del clima solo afecta a esa carpeta.

## Reglas de Arquitectura
-   Los componentes dentro de una feature pueden importarse entre sí.
-   `App.jsx` actúa como **orquestador**, importando desde las features para componer la página.
-   Se usan **Absolute Imports (@)** para mantener las referencias limpias.
