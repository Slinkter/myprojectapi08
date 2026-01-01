/**
 * WeatherCardSkeleton Component
 * Loading state for the WeatherCard component.
 */
const WeatherCardSkeleton = () => {
  return (
    <article
      className="w-full bg-white rounded-3xl p-10 border border-gray-100"
      aria-hidden="true"
    >
      <div className="animate-pulse">
        {/* Header: Name/Time + Icon */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col gap-2">
            <div className="h-8 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-100 rounded"></div>
          </div>
          <div className="w-20 h-20 bg-gray-100 rounded-full"></div>
        </div>

        {/* Main: Temp + Condition */}
        <div className="flex flex-col items-start mb-10 space-y-4">
          <div className="h-24 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-100 rounded"></div>
        </div>

        {/* Footer: Grid */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-100 rounded"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WeatherCardSkeleton;
