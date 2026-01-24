import { useState, memo } from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";

/**
 * Componente de Búsqueda (Search).
 *
 * **Funcionalidad:**
 * - Provee una interfaz para que el usuario ingrese el nombre de una ciudad.
 * - Gestiona su estado interno de formulario.
 * - Comunica la búsqueda al componente padre.
 *
 * **Flujo de interacción:**
 * 1. El usuario escribe en el input (estado local `city`).
 * 2. Al hacer submit, valida que no esté vacío.
 * 3. Ejecuta `onSearch` pasando la ciudad limpia.
 *
 * **Estado y efectos secundarios:**
 * - `city` (string): Estado local del input.
 * - No tiene efectos secundarios.
 *
 * **Motivo de existencia:**
 * - Reutilizable: Puede usarse en cualquier parte que requiera input de ciudad.
 * - Aísla la lógica de formularios de la lógica de negocio.
 *
 * @param {{ onSearch: (city: string) => void, loading: boolean }} props
 * @returns {JSX.Element}
 */
const Search = memo(({ onSearch, loading }) => {
    const [city, setCity] = useState("");

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
                        <FaSpinner className="animate-spin" />
                        Searching
                    </span>
                ) : (
                    "Find"
                )}
            </button>
        </form>
    );
});

Search.displayName = "Search";

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Search;
