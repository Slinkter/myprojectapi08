# 📘 PROMPT CONSOLIDADO — Ingeniería WeatherForecast App

> **Proyecto**: myprojectapi08 | **Versión**: 1.3.0 | **Fecha**: 2026
> **Stack**: React 18.3 + Vite 5.4 + SWR 2.3 + Tailwind 3.4 + Framer Motion 12
> **Arquitectura**: Feature-Based Architecture (FBA) | **Package Manager**: pnpm
> **Performance**: 96% Vercel React Best Practices Compliance
> **Tipado**: JSDoc (NO TypeScript) — Máxima compatibilidad con IDE IntelliSense

---

## 📋 ÍNDICE DE ROLES

| #   | Rol                      | Propósito                                        |
| --- | ------------------------ | ------------------------------------------------ |
| 01  | **ORQUESTADOR**          | Planificación, ejecución por fases, coordinación |
| 02  | **QA ENGINEER**          | Auditoría de bugs, clean code, anti-patterns     |
| 03  | **PERFORMANCE ENGINEER** | Big O (Mappers), Vercel Best Practices, Memory Opt|

---

## 🎯 CONTEXTO DEL PROYECTO (LEER PRIMERO)

### Qué es

WeatherForecast App — SPA minimalista para consulta meteorológica global. Prioriza la legibilidad "Zen", el rendimiento extremo y una arquitectura desacoplada mediante Mappers y Hooks de fachada.

### Arquitectura Feature-Based (FBA)

```
src/
├── components/    # Layout, ErrorBoundary (transversales)
├── config/        # env.js (Adapter para configuración de entorno)
├── docs/          # Documentación técnica (Software, Performance, Glosario)
├── features/      # Lógica de negocio encapsulada por módulo
│   └── weather/   # Única feature core (clima y forecast)
│       ├── components/ # UI (Search, WeatherCard, ForecastDisplay)
│       ├── hooks/      # useWeather, useForecast (Facades con SWR)
│       ├── services/   # weatherService (Infraestructura de red)
│       ├── mappers/    # Transformación de datos (Adapter Pattern)
│       └── constants.js# Constantes de dominio (UNITS, DATE_FORMAT)
└── utils/         # Utilidades generales puras
```

### Reglas del proyecto

| Regla           | Detalle                                            |
| --------------- | -------------------------------------------------- |
| Package manager | **pnpm** — nunca npm/yarn                          |
| Import alias    | `@/` → `src/`                                      |
| Componentes     | Funcionales con `React.memo` (rerender-memo)       |
| Tipado          | **JSDoc** — @typedef para modelos de dominio       |
| Data Fetching   | **SWR** (client-swr-dedup) para caché y dedup      |
| UI Updates      | **useTransition** para búsquedas no bloqueantes    |
| Code Splitting  | `lazy` + `Suspense` para componentes pesados       |

---

## 01: ROL — ORQUESTADOR

### Fases de ejecución (Weather Optimización)

```
┌─────────────────────────────────────────────────────────────────┐
│                    HOJA DE RUTA                                 │
├──────────┬──────────────────────────────────────────────────────┤
│ FASE 1   │ Bugs & State Sync (Race conditions, SWR keys)        │
│          │ → Unificar estado en App.jsx, sanitizar input        │
├──────────┼──────────────────────────────────────────────────────┤
│ FASE 2   │ Performance (Vercel Best Practices)                  │
│          │ → Memoización de mappers, useTransition hooks        │
├──────────┼──────────────────────────────────────────────────────┤
│ FASE 3   │ Big O & Memory (Algoritmos en Mappers)               │
│          │ → Map vs Object, evitar spread in loop, 8GB RAM Opt  │
├──────────┼──────────────────────────────────────────────────────┤
│ FASE 4   │ Clean Architecture (ADR & FBA Compliance)            │
│          │ → Desacoplar Services de Hooks, inyectar deps        │
├──────────┼──────────────────────────────────────────────────────┤
│ FASE 5   │ Verificación final (Lighthouse + React Doctor)       │
│          │ → pnpm lint, pnpm build, verify bundle size          │
└──────────┴──────────────────────────────────────────────────────┘
```

---

## 02: ROL — QA ENGINEER & CODE ARCHITECT

### Áreas de análisis críticas

#### 1. DETECCIÓN DE BUGS (FBA Context)
- **SWR Race Conditions:** Verificar que las keys de SWR sean arrays `["key", dependency]` para evitar stale closures.
- **Environment Safety:** Cambiar `process.env` por `import.meta.env` (Vite standards).
- **Mappers Stability:** Validar que los mappers manejen `null/undefined` de la API sin crashear la UI.

#### 2. CLEAN CODE (JSDoc Wizard)
- **Hoisting:** Priorizar `const` sobre `function` para asegurar visibilidad en el módulo.
- **Sentinel Values:** Cambiar valores mágicos por constantes en `constants.js`.
- **Docs:** Documentar cada mapper con `@param` y `@returns` detallados para IntelliSense.

---

## 03: ROL — PERFORMANCE ENGINEER

### Análisis Big O (Mappers & Lists)

| Complejidad | Escenario | Optimización aplicada |
|-------------|-----------|-----------------------|
| **O(n²)**   | .find() dentro de un .map() | Transformar a **Map lookup (O(1))** |
| **O(n)**    | Agrupación de Forecast | In-loop aggregation para evitar sub-arrays |
| **O(log n)**| Búsqueda de historial | Binary search si la lista está ordenada |

### 8GB RAM Optimization (React 18)
- **Concurrent Rendering:** Maximizar el uso de `useTransition` para que la UI no se congele durante el procesamiento de mappers pesados.
- **Memory Leaks:** Asegurar limpieza de listeners en components y AbortController en services.
- **Bundling:** Validar `bundle-dynamic-imports` para que el esqueleto de carga sea visible inmediatamente.

---

## 🚀 SECUENCIA DE EJECUCIÓN (WEATHER AUDIT)

1. **Investigar `GEMINI.md`**: Es la fuente de verdad del proyecto.
2. **Cargar `software-architecture` skill**: Para validar cumplimiento de FBA.
3. **Analizar Mappers**: Punto crítico de rendimiento computacional.
4. **Analizar Hooks**: Punto crítico de estabilidad de estado.
5. **Generar reporte**: Con diagramas ASCII y notas técnicas.

---
**Nota de Arquitecto:** "En WeatherForecast, cada milisegundo cuenta. No solo refactorizamos para limpiar, refactorizamos para que la app vuele en dispositivos de gama baja mediante algoritmos O(n) y concurrencia de React 18."
