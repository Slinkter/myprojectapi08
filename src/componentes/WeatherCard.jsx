import PropTypes from "prop-types";

/**
 * WeatherCard - Componente visual para mostrar la información del clima con un diseño minimalista.
 * Muestra la temperatura, condición, velocidad del viento, humedad, icono y hora local.
 * 
 * Principios SOLID aplicados:
 * - SRP (Single Responsibility Principle): Este componente tiene la única responsabilidad de presentar los datos del clima
 *   formateados de una manera visualmente atractiva. No se encarga de obtener los datos ni de la lógica de la aplicación.
 * - OCP (Open/Closed Principle): El componente está cerrado a la modificación en cuanto a su estructura de presentación de datos.
 *   Sin embargo, está abierto a la extensión, por ejemplo, su estructura es replicada por `WeatherCardSkeleton.jsx` para el estado de carga,
 *   permitiendo que la UI de carga se adapte a los cambios de diseño de esta tarjeta sin modificar su código interno.
 * @param {object} props - Las props del componente.
 * @param {object} props.data - Objeto que contiene los datos meteorológicos formateados. Espera las propiedades: `{ name, tempC, condition, windKph, humidity, icon, localtime }`.
 */
const WeatherCard = ({ data }) => {
    // data: { name, tempC, condition, windKph, humidity, icon, localtime }
    if (!data) return null;

    const { name, tempC, condition, windKph, humidity, icon, localtime } = data;

    return (
        <article
            className="w-full max-w-md mx-auto bg-white rounded-xl p-6 shadow-sm ring-1 ring-gray-100"
            role="region"
            aria-label={`Weather for ${name}`}
        >
            <header className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {name}
                    </h3>
                    {localtime && (
                        <p className="mt-1 text-sm text-gray-500">
                            {localtime}
                        </p>
                    )}
                </div>

                {icon && (
                    <img
                        src={icon}
                        alt={condition || "weather icon"}
                        className="w-16 h-16 flex-shrink-0"
                        loading="lazy"
                    />
                )}
            </header>

            {/* Temperatura principal */}
            <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                    <p className="text-6xl md:text-7xl font-bold leading-none text-gray-900">
                        {Math.round(tempC)}°
                    </p>
                    <p className="mt-2 text-base text-gray-600">{condition}</p>
                </div>
            </div>

            {/* Datos secundarios agrupados: móvil column, escritorio row */}
            <footer className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-600 border-t pt-4 mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-500">Viento:</span>
                    <strong className="text-gray-800">
                        {windKph} km/h
                    </strong>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-500">Humedad:</span>
                    <strong className="text-gray-800">
                        {humidity}%
                    </strong>
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
