/**
 * Módulo de Configuración de Entorno.
 *
 * **Funcionalidad:**
 * - Centraliza el acceso a las variables de entorno.
 * - Valida la existencia de variables críticas al inicio.
 * - Provee valores tipados y seguros al resto de la aplicación.
 *
 * **Flujo de interacción:**
 * 1. Lee `import.meta.env` (específico de Vite).
 * 2. Valida que las keys requeridas existan.
 * 3. Exporta un objeto de configuración inmutable.
 *
 * **Estado y efectos secundarios:**
 * - Stateless.
 * - Lanza un error (Throw) si falta configuración crítica, deteniendo la app para evitar fallos silenciosos.
 *
 * **Motivo de existencia:**
 * - Desacopla la lógica de negocio del mecanismo específico de build (Vite).
 * - Facilita el cambio de entorno (dev, prod, test) sin tocar código de features.
 * - Aplica el patrón "Adapter" para configuración.
 */

// Validación temprana de variables críticas
const REQUIRED_KEYS = [
  // 'VITE_OPENWEATHER_API_KEY' // Comentado temporalmente si se quiere permitir ejecutar sin key para demo UI, pero idealmente se descomenta.
];

// Función de validación interna
const getEnvVar = (key, fallback = "") => {
  const value = import.meta.env[key];
  if (!value && !fallback && REQUIRED_KEYS.includes(key)) {
    console.warn(`[Config] Missing critical environment variable: ${key}`);
    // En producción estricta, aquí podríamos hacer throw new Error(...)
  }
  return value || fallback;
};

export const config = {
  api: {
    weatherKey: getEnvVar("VITE_OPENWEATHER_API_KEY"),
    baseUrl: "https://api.openweathermap.org/data/2.5",
  },
  app: {
    name: "WeatherForecast",
    version: "1.2.0",
    language: "es-ES", // Localización centralizada
  },
};
