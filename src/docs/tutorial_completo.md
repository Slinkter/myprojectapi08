# Tutorial Completo: Construyendo una App de Clima Profesional

Este documento resume el proceso de transformación del proyecto desde un código base desordenado hasta una arquitectura profesional.

## Fase 1: Análisis y Limpieza
1.  Se identificó que el proyecto original usaba una estructura plana y mezclaba responsabilidades.
2.  Se decidió migrar a **Vite + Tailwind CSS** (stack oficial).
3.  Se eliminaron archivos redundantes y carpetas vacías (`src/utils`, `src/store` innecesarios por ahora).

## Fase 2: Arquitectura (Feature-Based)
1.  Creamos el directorio `src/features/weather`.
2.  Movimos los componentes (`WeatherCard`, `Search`) a `src/features/weather/components`.
3.  Creamos una capa de servicio en `src/features/weather/services/weatherService.js` para manejar la API.

## Fase 3: Lógica y Estado (Hooks)
1.  Creamos `useWeather.js` en `src/features/weather/hooks`.
2.  Extrajimos toda la lógica de `fetch`, `useState` y manejo de errores de `App.jsx` a este hook.
3.  Resultado: `App.jsx` pasó de tener 50+ líneas de lógica a solo llamar al hook.

## Fase 4: Referencias Absolutas
1.  Configuramos `vite.config.js` y `jsconfig.json`.
2.  Ahora importamos así: `import { useWeather } from "@/features/weather/hooks/useWeather"`.

## Fase 5: Diseño UX/UI (Minimalismo)
1.  Integramos la fuente **Inter**.
2.  Rediseñamos `WeatherCard` para usar `rounded-3xl`, fuentes finas (`font-thin`) y un grid limpio.
3.  Mejoramos `Search` para ser una barra sutil y elegante.

## Resultado Final
Una aplicación robusta, organizada y visualmente atractiva, lista para ser escalada con nuevas features.
