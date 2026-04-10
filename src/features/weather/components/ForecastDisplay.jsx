import { memo } from "react";
import PropTypes from "prop-types";
import DailyForecastCard from "./DailyForecastCard";

/**
 * Visualizador de Pronóstico (ForecastDisplay).
 *
 * **Funcionalidad:**
 * - Renderiza la lista completa de pronósticos o un estado de carga.
 * - Wrapped in React.memo to prevent unnecessary re-renders (rerender-memo).
 *
 * @param {{ data: Array, isLoading: boolean }} props
 */
const ForecastDisplay = memo(({ data, isLoading }) => {
  if (isLoading) {
    // Simple skeleton for list
    return (
      <div className="grid grid-cols-5 gap-4 animate-pulse mt-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-gray-500 text-sm font-medium mb-4 ml-1">
        Next 5 Days
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {data.map((day) => (
          <DailyForecastCard key={day.id} {...day} />
        ))}
      </div>
    </div>
  );
});

ForecastDisplay.displayName = "ForecastDisplay";

ForecastDisplay.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default ForecastDisplay;
