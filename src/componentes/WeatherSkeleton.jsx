/**
 * @file WeatherSkeleton.jsx
 * @description Componente de esqueleto (skeleton screen) para mostrar mientras se cargan los datos meteorológicos.
 * Proporciona una retroalimentación visual al usuario sobre la estructura del contenido que está por venir.
 */

/**
 * Componente funcional WeatherSkeleton.
 * Muestra una representación de esqueleto de la interfaz de usuario del pronóstico del tiempo.
 * @returns {JSX.Element} El componente WeatherSkeleton.
 */
const WeatherSkeleton = () => {
    return (
        <div className="animate-pulse h-full flex flex-col p-4 space-y-6">
            {/* Skeleton for text-center block */}
            <div className="text-center space-y-3">
                <div className="h-7 bg-gray-200 rounded w-3/4 mx-auto"></div> {/* City, Country */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div> {/* Date */}
                <div className="h-14 bg-gray-200 rounded w-1/3 mx-auto"></div> {/* Temperature */}
                <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto"></div> {/* Description */}
            </div>

            {/* Skeleton for weather-info block */}
            <div className="flex flex-col md:flex-row justify-around mt-auto gap-4">
                <div className="flex-1 text-center p-2 rounded-lg bg-gray-100">
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div> {/* Wind Speed */}
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div> {/* Label */}
                    </div>
                </div>

                <div className="flex-1 text-center p-2 rounded-lg bg-gray-100">
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-16 mx-auto"></div> {/* Humidity */}
                        <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div> {/* Label */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherSkeleton;
