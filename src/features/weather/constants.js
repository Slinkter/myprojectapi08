/**
 * Constantes de Dominio para Weather Feature.
 *
 * **Funcionalidad:**
 * - Almacena valores constantes utilizados en la lógica de negocio y mapeo.
 * - Evita "números mágicos" y cadenas repetidas.
 *
 * **Motivo de existencia:**
 * - Facilita el mantenimiento: si cambia una unidad o formato, se cambia en un solo lugar.
 * - Mejora la legibilidad del código (ej. `KELVIN_OFFSET` vs `273.15`).
 */

export const WEATHER_CONSTANTS = {
  UNITS: {
    KELVIN_OFFSET: 273.15,
    WIND_CONVERSION_FACTOR: 3.6, // m/s a km/h
  },
  DATE_FORMAT: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
  MESSAGES: {
    FETCH_ERROR:
      "No se pudo cargar la información. Por favor verifica la ciudad.",
    GENERIC_ERROR: "Ocurrió un error inesperado al consultar el clima.",
  },
};
