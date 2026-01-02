# Documentación de Software: WeatherForecast App

**Versión**: 1.0.0
**Fecha**: 2024-08-01

---

## Tabla de Contenidos
1.  [Visión General del Proyecto](#1-visión-general-del-proyecto)
    -   1.1. Propósito
    -   1.2. Alcance
    -   1.3. Tecnologías
2.  [Arquitectura de Software](#2-arquitectura-de-software)
    -   2.1. Arquitectura Basada en Features (FBA)
    -   2.2. Estructura de Directorios
    -   2.3. Flujo de Datos
3.  [Patrones de Diseño](#3-patrones-de-diseño)
    -   3.1. Container / Presentational (con Hooks)
    -   3.2. Custom Hooks
    -   3.3. Service Layer
    -   3.4. Mapper / Adapter
4.  [Decisiones de Arquitectura (ADR)](#4-decisiones-de-arquitectura-adr)
5.  [Referencia de Componentes](#5-referencia-de-componentes)
    -   5.1. `App.jsx`
    -   5.2. `Search.jsx`
    -   5.3. `WeatherCard.jsx`
    -   5.4. `WeatherCardSkeleton.jsx`
6.  [Guía de Instalación y Uso](#6-guía-de-instalación-y-uso)
    -   6.1. Requisitos
    -   6.2. Instalación
    -   6.3. Scripts Disponibles
7.  [Recursos Adicionales](#7-recursos-adicionales)

---

## 1. Visión General del Proyecto

### 1.1. Propósito
**WeatherForecast App** es una Aplicación de Página Única (SPA) que permite a los usuarios consultar los datos meteorológicos actuales de cualquier ciudad del mundo. El proyecto prioriza una interfaz de usuario limpia y minimalista, y una base de código robusta, escalable y mantenible.

### 1.2. Alcance
-   Búsqueda de clima por nombre de ciudad.
-   Visualización de datos clave: temperatura, condición, sensación térmica, viento y humedad.
-   Diseño responsive y minimalista.
-   Manejo explícito de estados de carga y error.

### 1.3. Tecnologías
-   **Core**: React 18, Vite
-   **Estilos**: Tailwind CSS
-   **Fuente de Datos**: OpenWeatherMap API
-   **Calidad de Código**: ESLint, JSDoc

---

## 2. Arquitectura de Software

### 2.1. Arquitectura Basada en Features (FBA)
El proyecto adopta una **Arquitectura Basada en Features (FBA)**. En lugar de organizar el código por tipo de archivo (`/components`, `/hooks`), lo agrupamos por dominio de negocio (`/features`). Esto mejora la cohesión y reduce el acoplamiento, facilitando la escalabilidad. La única feature actual es `weather`.

### 2.2. Estructura de Directorios
```
src/
├── assets/
│
├── features/
│   └── weather/                # <-- Feature: Clima
│       ├── components/         # Componentes de UI para esta feature
│       │   ├── Search.jsx
│       │   └── WeatherCard.jsx
│       ├── hooks/              # Hooks con lógica de estado y efectos
│       │   └── useWeather.js
│       ├── mappers/            # Transformadores de datos
│       │   └── weatherMapper.js
│       └── services/           # Lógica de comunicación con APIs
│           └── weatherService.js
│
├── docs/                       # <-- Documentación del proyecto
│   ├── DOCUMENTACION_SOFTWARE.md  (Este archivo)
│   ├── GLOSARIO.md
│   └── TUTORIAL_PRACTICO.md
│
├── App.jsx                     # Raíz de la aplicación (orquestador)
└── main.jsx                    # Punto de entrada de la aplicación
```

### 2.3. Flujo de Datos
El flujo de datos es unidireccional, predecible y desacoplado:
1.  **Evento de UI**: El usuario interactúa con `Search.jsx`, que invoca la función `fetchWeather` pasada desde `App.jsx`.
2.  **Hook**: `App.jsx` llama a `fetchWeather` del hook `useWeather`. El hook actualiza su estado a `isLoading=true`.
3.  **Servicio**: El hook invoca a `fetchWeatherData` en `weatherService.js`.
4.  **API Externa**: El servicio construye la URL y realiza la llamada `fetch` al API de OpenWeatherMap.
5.  **Mapper**: Una vez recibida la respuesta del API, el hook `useWeather` la pasa a `weatherMapper.js` para transformarla en un modelo de dominio limpio y consistente.
6.  **Actualización de Estado**: El hook actualiza su estado (`weatherData`, `isLoading=false`) con los datos mapeados.
7.  **Renderizado de UI**: React detecta el cambio de estado y re-renderiza `App.jsx`, que pasa los nuevos datos a `WeatherCard.jsx` para su visualización.

---

## 3. Patrones de Diseño

### 3.1. Container / Presentational (con Hooks)
-   **Lógica (Container)**: `useWeather` actúa como el "contenedor" de la lógica. Gestiona el estado, los efectos y la obtención de datos. `App.jsx` lo utiliza y orquesta.
-   **Presentación**: `WeatherCard.jsx` y `Search.jsx` son componentes de presentación. No conocen el origen de los datos, solo los muestran (props) y notifican eventos (callbacks).

### 3.2. Custom Hooks
El hook `useWeather` encapsula toda la complejidad del estado del clima. Esto permite que la lógica sea reutilizable y que `App.jsx` se mantenga limpio y declarativo.

### 3.3. Service Layer (Capa de Servicio)
`weatherService.js` aísla toda la comunicación de red. Si la URL del API cambia, o si necesitamos añadir cabeceras de autenticación, solo modificamos este archivo. Los componentes y hooks permanecen intactos.

### 3.4. Mapper / Adapter
`weatherMapper.js` implementa el patrón Adaptador. Adapta la estructura de datos "sucia" o compleja del API a un modelo de dominio limpio y predecible que la aplicación entiende. Esto desacopla la UI de los contratos de datos externos.

---

## 4. Decisiones de Arquitectura (ADR)

1.  **Uso de Tailwind CSS Puro**: Se eligió no usar librerías de componentes para tener control total sobre el diseño y mantener un bundle ligero, a cambio de construir componentes desde cero.
2.  **Migración a Feature-Based Architecture**: Se adoptó para mejorar la organización y escalabilidad del código frente a una estructura plana inicial.
3.  **Extracción de Lógica a Custom Hooks**: Se decidió mover la lógica de estado y datos de `App.jsx` a `useWeather` para cumplir con el Principio de Responsabilidad Única.
4.  **Diseño Visual Minimalista**: Se optó por una estética limpia, con espacios en blanco y tipografía cuidada, para una apariencia profesional.

---

## 5. Referencia de Componentes

### 5.1. `App.jsx`
-   **Rol**: Orquestador principal. Compone la aplicación juntando los diferentes componentes de la feature `weather`. Utiliza `useWeather` para gestionar el estado global de la feature.

### 5.2. `Search.jsx`
-   **Rol**: Capturar la entrada del usuario.
-   **Props**:
    -   `onSearch: (city: string) => void`: Callback que se ejecuta al enviar el formulario.
    -   `loading: boolean`: Deshabilita el botón durante la carga.
-   **Estado Interno**: Gestiona el valor del input de texto.

### 5.3. `WeatherCard.jsx`
-   **Rol**: Mostrar los datos del clima de forma visual.
-   **Props**:
    -   `data: object`: Objeto con los datos del clima ya mapeados.

### 5.4. `WeatherCardSkeleton.jsx`
-   **Rol**: Proporcionar un feedback visual de carga que imita la estructura de `WeatherCard`. Se muestra mientras `isLoading` es `true`.

---

## 6. Guía de Instalación y Uso

### 6.1. Requisitos
-   Node.js (v18+)
-   pnpm (o npm/yarn)

### 6.2. Instalación
1.  **Clonar**: `git clone <url-del-repositorio>`
2.  **Entrar al directorio**: `cd myprojectapi08`
3.  **Instalar dependencias**: `pnpm install`
4.  **Variables de Entorno**: Crea un archivo `.env` en la raíz y añade tu clave de API:
    ```
    VITE_OPENWEATHER_API_KEY=TU_CLAVE_DE_API
    ```

### 6.3. Scripts Disponibles
-   `pnpm run dev`: Inicia el servidor de desarrollo.
-   `pnpm run build`: Compila la aplicación para producción.
-   `pnpm run lint`: Ejecuta el linter para revisar la calidad del código.
-   `pnpm run preview`: Sirve la build de producción localmente.

---

## 7. Recursos Adicionales
-   [Glosario de Términos](./GLOSARIO.md)
-   [Tutorial Práctico de Desarrollo](./TUTORIAL_PRACTICO.md)
