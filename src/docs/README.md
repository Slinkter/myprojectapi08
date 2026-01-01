# Weather Forecast App

## Descripción
Aplicación de pronóstico del tiempo minimalista y profesional desarrollada con React y Tailwind CSS. Este proyecto sigue una **Feature-Based Architecture (FBA)** para garantizar la escalabilidad, mantenibilidad y una clara separación de responsabilidades.

## Características Clave
- **Diseño Minimalista**: Interfaz limpia, moderna y enfocada en la tipografía ('Inter').
- **Arquitectura Modular**: Código organizado por funcionalidades (features) en lugar de capas técnicas.
- **Gestión de Estado Eficiente**: Uso de Custom Hooks (`useWeather`) para separar lógica de UI.
- **Stack Moderno**: React + Vite + Tailwind CSS.
- **Clean Code**: Aplicación de principios SOLID y DRY.

## Tecnologías
- **Core**: React 18, Vite.
- **Estilos**: Tailwind CSS (sin librerías de componentes pesadas).
- **API**: OpenWeatherMap.
- **Herramientas**: ESLint, Prettier.

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone <repo-url>
   cd myprojectapi08
   ```

2. **Instalar dependencias**:
   ```bash
   pnpm install
   ```

3. **Configurar Variables de Entorno**:
   Crear un archivo `.env` en la raíz:
   ```env
   VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
   ```

4. **Iniciar servidor de desarrollo**:
   ```bash
   pnpm run dev
   ```

## Documentación
La documentación técnica detallada se encuentra en este mismo directorio:
- [Documentación Técnica](./DOCUMENTATION.md)
- [Arquitectura](./architecture/structure.md)
- [Guía de Importaciones](./imports.md)
- [Registro de Decisiones (ADR)](./decisions.md)
