# GEMINI.md - WeatherForecast Project Context

Este documento sirve como guía de contexto para Gemini CLI al interactuar con el proyecto **WeatherForecast**.

## 🌦️ Project Overview
**WeatherForecast** es una aplicación web (SPA) minimalista y de alto rendimiento diseñada para consultar el clima global. Está construida con **React 18**, **Vite**, y **Tailwind CSS**, siguiendo una arquitectura de software limpia y modular.

- **Tecnologías Core:** React 18, Vite 5, Tailwind CSS 3, SWR 2.
- **Arquitectura:** Feature-Based Architecture + Clean Architecture Principles.
- **Enfoque Principal:** Rendimiento extremo (Vercel React Best Practices) y UX minimalista.
- **API:** OpenWeatherMap API (Consumida vía Client-side y con soporte para Serverless Proxy).

## 🏛️ Architecture & Project Structure

El proyecto está organizado por **Features**, lo que permite una alta cohesión y bajo acoplamiento.

```text
C:\Users\LJCR\Documents\GitHub\myprojectapi08\
├── api/                    # Vercel Serverless Functions (Proxy API)
├── src/
│   ├── components/         # Componentes transversales (Layout, ErrorBoundary)
│   ├── config/             # Configuración de entorno y adaptadores de red
│   ├── docs/               # Documentación extensiva (Arquitectura, Performance, etc.)
│   └── features/           # Módulos de negocio (Clima)
│       └── weather/
│           ├── components/ # UI de la feature (Search, WeatherCard, Skeletons)
│           ├── hooks/      # Facades (useWeather, useForecast)
│           ├── services/   # Comunicación con la API (weatherService)
│           ├── mappers/    # Transformación de datos (weatherMapper)
│           └── constants.js # Constantes locales
```

### Key Design Patterns
1. **Adapter Pattern (Mappers):** Aísla el dominio de la estructura de la API externa.
2. **Facade Pattern (Hooks):** Los custom hooks proveen una interfaz simplificada para la lógica de negocio.
3. **Separation of Concerns:** Clara división entre UI (Componentes), Lógica (Hooks) e Infraestructura (Servicios).

## 🚀 Building and Running

### Prerequisites
- **Node.js** (LTS recomendado)
- **pnpm** (Package manager preferido)
- **API Key:** Requiere `VITE_OPENWEATHER_API_KEY` en un archivo `.env`.

### Key Commands
- `pnpm install`: Instala las dependencias.
- `pnpm run dev`: Inicia el servidor de desarrollo (Vite) en `http://localhost:5173`.
- `pnpm run build`: Genera el build de producción optimizado en `/dist`.
- `pnpm run lint`: Ejecuta ESLint para asegurar la calidad del código.
- `pnpm run preview`: Previsualiza el build de producción localmente.
- `pnpm run deploy`: Despliega a GitHub Pages.

## ⚡ Development Conventions

### Coding Style & Standards
- **Vercel React Best Practices:** El proyecto busca una conformidad del 100% (actualmente 96%). Priorizar:
    - Uso de `useTransition` para búsquedas no bloqueantes.
    - `lazy` y `Suspense` para Code Splitting.
    - Caching y Deduplicación con `SWR`.
    - Minimización de re-renders innecesarios (`React.memo`).
- **Functional Components:** Siempre usar componentes funcionales y hooks.
- **Tailwind CSS:** Evitar bibliotecas de componentes externas (MUI, Chakra). Usar utilidades puras.
- **Naming:** CamelCase para componentes/archivos JSX, kebab-case para directorios no-source (si aplica), camelCase para funciones y variables.

### Performance Guidelines
Cualquier cambio debe ser evaluado por su impacto en el rendimiento:
- Revisar si el cambio introduce re-renders costosos.
- Asegurar que las peticiones de red estén cacheadas vía SWR.
- Mantener el bundle size bajo (actualmente ~164 kB).

## 📚 Documentation Reference
Para profundizar en decisiones técnicas, consultar:
- `src/docs/DOCUMENTACION_SOFTWARE.md`: Visión completa y diagramas C4/Flujo.
- `src/docs/OPTIMIZACIONES_PERFORMANCE.md`: Detalle de técnicas Vercel aplicadas.
- `src/docs/SEGURIDAD.md`: Manejo de API keys y proxies.

---
**Nota para Gemini:** Prioriza siempre la mantenibilidad del Feature-Based Folder y el cumplimiento de las Vercel Best Practices al proponer cambios.
