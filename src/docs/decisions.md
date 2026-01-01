# Registro de Decisiones de Arquitectura (ADR)

## 1. Uso de Tailwind CSS Puro
- **Estado**: Aceptado.
- **Contexto**: Se requería un diseño minimalista, ligero y totalmente personalizado.
- **Decisión**: No utilizar librerías de componentes UI (como Material UI o Chakra) y construir los componentes desde cero con utilidades de Tailwind.
- **Consecuencias**: Mayor control sobre el diseño, menor tamaño de bundle, pero requiere implementar manualmente estados base (hover, focus).

## 2. Migración a Feature-Based Architecture
- **Estado**: Aceptado.
- **Contexto**: El proyecto original tenía una estructura plana y desordenada.
- **Decisión**: Reorganizar el código en módulos funcionales (`src/features/weather`).
- **Consecuencias**: Mejor organización del código, mayor facilidad para escalar y entender el dominio del problema.

## 3. Implementación de Custom Hook `useWeather`
- **Estado**: Aceptado.
- **Contexto**: `App.jsx` contenía lógica de negocio, mezcla de UI y llamadas a API.
- **Decisión**: Extraer la lógica a `useWeather`.
- **Consecuencias**: `App.jsx` ahora cumple SRP (Single Responsibility Principle) actuando solo como vista/contenedor.

## 4. Diseño Visual Minimalista
- **Estado**: Aceptado.
- **Contexto**: Necesidad de una interfaz profesional y moderna.
- **Decisión**: Uso de mucho espacio en blanco (whitespace), tipografía sans-serif ('Inter'), bordes sutiles y eliminación de sombras pesadas o colores saturados.
- **Consecuencias**: Interfaz elegante tipo "Editorial".
