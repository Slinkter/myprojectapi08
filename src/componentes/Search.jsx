/**
 * @file Search.jsx
 * @description Componente de búsqueda para introducir el nombre de una ciudad y activar la búsqueda.
 * 
 * Principios SOLID aplicados:
 * - SRP (Single Responsibility Principle): Este componente tiene la única responsabilidad de gestionar la interfaz de usuario
 *   para la búsqueda de ciudades (input y botón). No se encarga de la lógica de la API ni de la visualización de los resultados del clima.
 * - OCP (Open/Closed Principle): El componente está abierto a la extensión a través de sus props (`handleSearch`, `loading`),
 *   permitiendo personalizar su comportamiento sin modificar su código fuente interno. Está cerrado a la modificación interna
 *   siempre que su propósito principal (la UI de búsqueda) no cambie.
 */

import PropTypes from "prop-types";

/**
 * Componente funcional Search.
 * Permite al usuario introducir una ciudad y buscar su pronóstico del tiempo.
 * @param {object} props - Las props del componente.
 * @param {string} props.search - El valor actual del campo de búsqueda.
 * @param {function} props.setSeach - Función para actualizar el valor del campo de búsqueda.
 * @param {function} props.handleSearch - Función que se ejecuta al hacer clic en el botón de búsqueda.
 * @param {boolean} props.loading - Indica si la aplicación está en estado de carga.
 * @returns {JSX.Element} El componente Search.
 */
const Search = ({ search, setSeach, handleSearch, loading }) => {
    return (
        <form
            className="w-full flex flex-col md:flex-row gap-3 mb-4"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
            aria-label="City search form"
        >
            <label htmlFor="city-search" className="sr-only">
                Search city
            </label>

            <input
                id="city-search"
                name="city-search"
                type="text"
                placeholder="Enter city..."
                className="flex-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all shadow-sm"
                value={search}
                onChange={(e) => setSeach(e.target.value)}
                aria-label="City name"
            />

            <button
                onClick={handleSearch}
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={loading}
                aria-busy={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>
        </form>
    );
};

export default Search;

Search.propTypes = {
    search: PropTypes.string.isRequired,
    setSeach: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};
