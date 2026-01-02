/**
 * @file Search.jsx
 * @description A self-contained, minimalist search component for entering city names.
 */

import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Search Component
 * Manages its own input state and triggers a search event via a callback.
 *
 * @param {{ onSearch: (city: string) => void, loading: boolean }} props - Component props.
 * @returns {JSX.Element} The rendered Search component.
 */
const Search = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  /**
   * Handles form submission and triggers the onSearch callback.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form
      className="w-full flex flex-col md:flex-row gap-4 items-stretch"
      onSubmit={handleSubmit}
      aria-label="City search form"
    >
      <label htmlFor="city-search" className="sr-only">
        Search city
      </label>

      <div className="relative flex-1">
        <input
          id="city-search"
          name="city-search"
          type="text"
          placeholder="Search city..."
          className="w-full bg-transparent border-b-2 border-gray-200 px-2 py-4 text-xl text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 scale-x-0 transition-transform origin-left peer-focus:scale-x-100"></div>
      </div>

      <button
        type="submit"
        className="px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Searching
          </span>
        ) : (
          "Find"
        )}
      </button>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Search;
