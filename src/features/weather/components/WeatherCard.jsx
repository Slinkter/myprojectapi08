/**
 * @file WeatherCard.jsx
 * @description A presentational component that displays weather information in a clean, minimalist card design.
 */
import PropTypes from "prop-types";
import WeatherIcon from "./WeatherIcon";

/**
 * Tarjeta de Clima (WeatherCard).
 *
 * **Funcionalidad:**
 * - Presenta la información climática detallada (temperatura, viento, humedad, etc.).
 * - Implementa el diseño visual principal de la respuesta.
 *
 * **Flujo de interacción:**
 * - Es un componente de presentación puro (Stateless).
 * - Recibe datos vía props y los renderiza si existen.
 *
 * **Estado y efectos secundarios:**
 * - Stateless.
 * - Renderiza condicionalmente el icono y subcomponentes.
 *
 * **Motivo de existencia:**
 * - Separación de presentación y lógica.
 * - Encapsula el diseño complejo de la tarjeta.
 *
 * @param {{
 *   data: {
 *     name: string,
 *     tempC: number,
 *     condition: string,
 *     windKph: number|string,
 *     humidity: number|string,
 *     iconCode: string,
 *     localtime: string,
 *     feelsLikeC: number
 *   }
 * }} props
 * @returns {JSX.Element|null}
 */
const WeatherCard = ({ data }) => {
  if (!data) return null;

  const { name, tempC, condition, windKph, humidity, iconCode, localtime } =
    data;

  return (
    <article
      className="w-full bg-gray-100 rounded-3xl p-10 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 border border-gray-100"
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
        {iconCode && (
          <div className="relative -mr-4 -mt-4 text-gray-800">
            <WeatherIcon
              iconCode={iconCode}
              className="w-24 h-24 opacity-90 drop-shadow-sm"
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
        <span className="text-md text-gray-400 font-light mt-2">
          Sensación Térmica: {Math.round(data.feelsLikeC)}°
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
    feelsLikeC: PropTypes.number,
    condition: PropTypes.string,
    windKph: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    humidity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    iconCode: PropTypes.string,
    localtime: PropTypes.string,
  }).isRequired,
};

export default WeatherCard;
