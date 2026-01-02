# Glosario de Términos

Este documento centraliza y define los conceptos clave, tecnologías y patrones de arquitectura utilizados en el proyecto WeatherForecast.

---

## A

### Absolute Import (Importación Absoluta)
Técnica que permite importar módulos usando una ruta base (en este proyecto, `@` que apunta a `src/`). Evita rutas relativas complejas como `../../`.
- **Ver también**: `jsconfig.json`, `vite.config.js`

### API (Application Programming Interface)
Interfaz que define cómo un software se comunica con otro. En este proyecto, se consume la API de OpenWeatherMap para obtener datos del clima.

### Arquitectura Limpia (Clean Architecture)
Filosofía de diseño de software que separa el código en capas (Dominio, Aplicación, Infraestructura) para reducir el acoplamiento y mejorar la mantenibilidad. Los principios de este proyecto se inspiran en ella.

### ADR (Architecture Decision Record)
Un documento breve que describe una decisión de arquitectura importante, su contexto y sus consecuencias.

## C

### Componente
En React, una pieza de UI reutilizable y autocontenida. En este proyecto, se dividen en:
- **Componentes de Presentación (Dumb Components)**: Solo muestran datos y emiten eventos (ej. `WeatherCard`).
- **Componentes Contenedores (Smart Components)**: Orquestan datos y estado, aunque esta lógica se delega a los Hooks (ej. `App.jsx`).

### Custom Hook (Hook Personalizado)
Una función de React (que empieza con `use`) que permite extraer y reutilizar lógica de estado y efectos secundarios de un componente. `useWeather` es el Custom Hook principal de este proyecto.

## D

### Desacoplamiento (Decoupling)
Práctica de diseño que busca que los componentes o módulos de un sistema tengan la menor dependencia posible entre sí. Esto facilita las modificaciones y la reutilización.

### DRY (Don't Repeat Yourself)
Principio que promueve la reducción de la repetición de código. En lugar de copiar y pegar lógica, se debe abstraer y reutilizar.

## F

### Feature-Based Architecture (FBA)
Patrón de organización de código donde los archivos se agrupan por funcionalidad o "feature" de negocio (ej. `features/weather`), en lugar de por tipo de archivo (ej. carpetas `components`, `hooks` a nivel raíz).

## H

### Hook
Funciones especiales de React (`useState`, `useEffect`, etc.) que permiten "engancharse" a las características de React desde componentes de función.

## M

### Mapper (Mapeador)
Un módulo o función cuya única responsabilidad es transformar datos de una estructura a otra. En este proyecto, `weatherMapper.js` convierte la respuesta del API en un modelo de dominio limpio para la aplicación. Este es un ejemplo del **Patrón Adaptador (Adapter Pattern)**.

## P

### Prop Drilling
Anti-patrón en React donde las props se pasan a través de varios niveles de componentes anidados que no las necesitan, solo para llegar a un componente hijo profundo. Se evita con Hooks, Context API o gestión de estado global.

### Props (Propiedades)
Datos que se pasan de un componente padre a un componente hijo para configurar su comportamiento o contenido. Son de solo lectura.

## S

### Service Layer (Capa de Servicio)
Capa de la arquitectura que encapsula la lógica para comunicarse con sistemas externos (como una API). En este proyecto, `weatherService.js` actúa como la capa de servicio.

### Single Page Application (SPA)
Una aplicación web que carga una única página HTML y actualiza su contenido dinámicamente (generalmente con JavaScript) en lugar de cargar páginas nuevas desde el servidor.

### SOLID
Acrónimo de cinco principios de diseño orientado a objetos que promueven la creación de software más entendible, flexible y mantenible. El **Principio de Responsabilidad Única (SRP)** es uno de los más relevantes en este proyecto.

### SRP (Single Responsibility Principle)
Principio SOLID que establece que un módulo, clase o función debe tener una y solo una razón para cambiar. Por ejemplo, `weatherService.js` solo cambia si la API cambia.

## T

### Tailwind CSS
Un framework de CSS "utility-first" que proporciona clases de bajo nivel para construir diseños directamente en el HTML, sin escribir CSS personalizado.

## V

### Vite
Una herramienta de construcción (build tool) y servidor de desarrollo extremadamente rápido para proyectos web modernos. Reemplaza herramientas más lentas como Webpack en muchos casos de uso.
