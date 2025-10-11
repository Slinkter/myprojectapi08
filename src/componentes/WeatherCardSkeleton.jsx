import React from "react";

/**
 * WeatherCardSkeleton - Componente de esqueleto (skeleton loader) que imita la estructura y el estilo minimalista del WeatherCard.
 * Proporciona una retroalimentación visual durante el estado de carga.
 */
const WeatherCardSkeleton = () => {
    return (
        <article
            className="w-full max-w-md mx-auto rounded-xl p-6 shadow-sm ring-1 ring-gray-100 bg-white"
            aria-hidden="true"
        >
            <div className="animate-pulse">
                {/* Header: city line + icon */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-40 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-16 h-16 bg-gray-200 rounded"></div>
                </div>

                {/* Temperature block */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                        {/* big temp bar approximating text-6xl */}
                        <div className="h-16 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Footer: two small lines (wind, humidity) */}
                <div className="flex flex-col md:flex-row md:justify-between gap-3 border-t pt-4 mt-4">
                    <div className="h-6 w-28 bg-gray-200 rounded"></div>
                    <div className="h-6 w-28 bg-gray-200 rounded"></div>
                </div>
            </div>
        </article>
    );
};

export default WeatherCardSkeleton;
