/**
 * @file WeatherCardSkeleton.jsx
 * @description A skeleton loader component that mimics the layout of the WeatherCard.
 * It provides a visual placeholder while the weather data is being fetched.
 */

/**
 * Renders a skeleton loading state that visually matches the WeatherCard component.
 * This is used to indicate to the user that content is loading.
 *
 * @returns {JSX.Element} The rendered skeleton component.
 */
const WeatherCardSkeleton = () => {
  return (
    <div
      className="w-full bg-white rounded-3xl p-10 animate-pulse"
      aria-label="Loading weather data"
    >
      {/* Header Skeleton */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
      </div>

      {/* Temperature Skeleton */}
      <div className="flex flex-col items-start mb-10">
        <div className="h-24 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-12 bg-gray-200 rounded"></div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
