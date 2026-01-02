/**
 * @file WeatherCard.jsx
 * @description A presentational component that displays weather information in a clean, minimalist card design.
 */
import PropTypes from "prop-types";

/**
 * Renders a card with detailed weather information for a specific location.
 *
 * @param {{data: object}} props - The props for the component.
 * @param {object} props.data - The weather data object to display.
 * @param {string} props.data.name - The name of the city.
 * @param {number} props.data.tempC - The temperature in Celsius.
 * @param {string} props.data.condition - A description of the weather condition.
 * @param {string|number} props.data.windKph - The wind speed in km/h.
 * @param {string|number} props.data.humidity - The humidity percentage.
 * @param {string} props.data.icon - The URL for the weather condition icon.
 * @param {string} props.data.localtime - The local time and date string.
 * @returns {JSX.Element|null} The rendered weather card component or null if no data is provided.
 */
const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, tempC, condition, windKph, humidity, icon, localtime } = data;

  return (
    <article
      className="w-full bg-white rounded-3xl p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-100"
      role="region"
      aria-label={`Weather forecast for ${name}`}
    >
      <header className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-medium text-gray-900 tracking-tight">
            {name}
          </h2>
          {localtime && (
            <p className="text-sm text-gray-400 font-light tracking-wide uppercase">
              {localtime}
            </p>
          )}
        </div>
        {icon && (
          <div className="relative w-20 h-20 -mr-4 -mt-4">
            <img
              src={icon}
              alt={condition || "Weather icon"}
              className="w-full h-full object-contain opacity-90 drop-shadow-sm"
              loading="lazy"
            />
          </div>
        )}
      </header>

      <div className="flex flex-col items-start mb-10">
        <span className="text-8xl font-thin text-gray-900 tracking-tighter -ml-1">
          {Math.round(tempC)}°
        </span>
        <span className="text-2xl text-gray-500 font-light capitalize mt-2 tracking-wide">
          {condition}
        </span>
      </div>

      <footer className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Wind
          </span>
          <span className="text-xl text-gray-800 font-light">
            {windKph} <span className="text-sm text-gray-400">km/h</span>
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Humidity
          </span>
          <span className="text-xl text-gray-800 font-light">
            {humidity}
            <span className="text-sm text-gray-400">%</span>
          </span>
        </div>
      </footer>
    </article>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    tempC: PropTypes.number,
    condition: PropTypes.string,
    windKph: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    humidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    icon: PropTypes.string,
    localtime: PropTypes.string,
  }).isRequired,
};

export default WeatherCard;
