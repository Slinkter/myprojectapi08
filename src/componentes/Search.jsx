import React from "react";

const Search = ({ search, setSeach, handleSearch }) => {
    return (
        <div className=" flex flex-col md:flex-row gap-2 mb-2">
            <input
                id="price"
                name="price"
                type="text"
                placeholder="city..."
                className="block w-full rounded-lg  pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg py-2 md:py-0 sm:leading-6"
                value={search}
                onChange={(e) => setSeach(e.target.value)}
            />

            <button
                onClick={handleSearch}
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Search
            </button>
        </div>
    );
};

export default Search;
