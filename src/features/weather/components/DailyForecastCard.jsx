import PropTypes from "prop-types";
import WeatherIcon from "./WeatherIcon";

/**
 * Tarjeta de Pronóstico Diario (DailyForecastCard).
 *
 * **Funcionalidad:**
 * - Renderiza el resumen de un solo día del pronóstico.
 *
 * **Motivo de existencia:**
 * - Componente presentacional puro y reutilizable para listas de días.
 *
 * @param {object} props
 */
const DailyForecastCard = ({ dayName, iconCode, minTemp, maxTemp }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform hover:-translate-y-1">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        {dayName.slice(0, 3)}
      </span>

      {iconCode && (
        <div className="text-gray-700 my-2">
          <WeatherIcon iconCode={iconCode} className="w-8 h-8 opacity-80" />
        </div>
      )}

      <div className="flex gap-2 text-sm font-medium mt-1">
        <span className="text-gray-900">{maxTemp}°</span>
        <span className="text-gray-400">{minTemp}°</span>
      </div>
    </div>
  );
};

DailyForecastCard.propTypes = {
  dayName: PropTypes.string.isRequired,
  iconCode: PropTypes.string,
  minTemp: PropTypes.number.isRequired,
  maxTemp: PropTypes.number.isRequired,
};

export default DailyForecastCard;
