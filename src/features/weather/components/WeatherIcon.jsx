import { memo } from "react";
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

// Applying 'rendering-hoist-jsx' and 'js-index-maps' - Hoist static map outside component
const ICON_MAP = {
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

/**
 * Maps an OpenWeatherMap icon code to a corresponding weather icon component.
 * Wrapped in memo for 'rerender-memo' optimization.
 */
const WeatherIcon = memo(({ iconCode, className = "" }) => {
    const IconComponent = ICON_MAP[iconCode] || WiNa;
    return <IconComponent className={className} />;
});

WeatherIcon.displayName = "WeatherIcon";

WeatherIcon.propTypes = {
    iconCode: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default WeatherIcon;
