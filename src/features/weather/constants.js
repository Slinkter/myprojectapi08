/**
 * Constantes de Dominio para Weather Feature.
 *
 * **Funcionalidad:**
 * - Almacena valores constantes utilizados en la lógica de negocio y mapeo.
 * - Evita "números mágicos" y cadenas repetidas.
 *
 * **Motivo de existencia:**
 * - Facilita el mantenimiento: si cambia una unidad o formato, se cambia en un solo lugar.
 * - Mejora la legibilidad del código.
 */

export const WEATHER_CONSTANTS = {
  /** Configuración de unidades y factores de conversión */
  UNITS: {
    /** Desplazamiento de Kelvin a Celsius (0°C = 273.15K) */
    KELVIN_OFFSET: 273.15,
    /** Factor para convertir metros por segundo a kilómetros por hora */
    WIND_CONVERSION_FACTOR: 3.6,
    /** Factor para convertir segundos a milisegundos */
    SECONDS_TO_MS: 1000,
  },

  /** Límites y configuración de negocio */
  LIMITS: {
    /** Número máximo de días a mostrar en el pronóstico */
    MAX_FORECAST_DAYS: 5,
  },

  /** Configuración regional y localización */
  LOCALE: {
    /** Idioma predeterminado para formatos de fecha y números */
    DEFAULT: "es-ES",
  },

  /** Formatos predeterminados para visualización de fechas (Intl.DateTimeFormat) */
  DATE_FORMAT: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },

  /** Mensajes de error centralizados */
  MESSAGES: {
    FETCH_ERROR:
      "No se pudo cargar la información. Por favor verifica la ciudad.",
    GENERIC_ERROR: "Ocurrió un error inesperado al consultar el clima.",
    AUTH_ERROR: "Invalid or missing API Key. Please check your .env file.",
    LOAD_ERROR: "Unable to load data. Please check the city name.",
    NO_FORECAST: "No forecast available.",
  },
};
