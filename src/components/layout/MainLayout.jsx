import PropTypes from "prop-types";

/**
 * Componente de Layout Principal.
 *
 * **Funcionalidad:**
 * - Provee el contenedor centrado y responsive para toda la aplicación.
 * - Maneja las transiciones de fondo globales.
 *
 * **Motivo de existencia:**
 * - Centralizar la estructura visual base.
 * - Evitar repetir clases de contenedor en cada página o vista.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 bg-gray-50">
      <main className="w-full max-w-lg space-y-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
