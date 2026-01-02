/**
 * @file WeatherIcon.jsx
 * @description A component that maps OpenWeatherMap icon codes to specific icons from the 'react-icons/wi' library.
 */
import PropTypes from "prop-types";
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiNa,
} from "react-icons/wi";

/**
 * Maps an OpenWeatherMap icon code to a corresponding weather icon component.
 *
 * @param {{ iconCode: string, className: string }} props - Component props.
 * @param {string} props.iconCode - The icon code from the OpenWeatherMap API (e.g., "01d", "10n").
 * @param {string} props.className - Additional CSS classes to apply to the icon.
 * @returns {JSX.Element} The rendered icon component.
 */
const WeatherIcon = ({ iconCode, className = "" }) => {
  const iconMap = {
    "01d": WiDaySunny,
    "01n": WiNightClear,
    "02d": WiDayCloudy,
    "02n": WiNightAltCloudy,
    "03d": WiCloud,
    "03n": WiCloud,
    "04d": WiCloudy,
    "04n": WiCloudy,
    "09d": WiShowers,
    "09n": WiShowers,
    "10d": WiRain,
    "10n": WiRain,
    "11d": WiThunderstorm,
    "11n": WiThunderstorm,
    "13d": WiSnow,
    "13n": WiSnow,
    "50d": WiFog,
    "50n": WiFog,
  };

  const IconComponent = iconMap[iconCode] || WiNa;

  return <IconComponent className={className} />;
};

WeatherIcon.propTypes = {
  iconCode: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default WeatherIcon;
