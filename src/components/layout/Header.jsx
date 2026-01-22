/**
 * Componente de Encabezado Principal.
 *
 * **Funcionalidad:**
 * - Renderiza el branding y título de la aplicación.
 * - Muestra el subtítulo descriptivo.
 *
 * **Motivo de existencia:**
 * - Extraer contenido estático de `App.jsx`.
 * - Permitir reutilización o modificación independiente del header.
 *
 * @returns {JSX.Element}
 */
const Header = () => {
  return (
    <header className="text-center space-y-2 mb-8">
      <h1 className="text-3xl font-light tracking-tight text-gray-900">
        Weather<span className="font-semibold">Forecast</span>
      </h1>
      <p className="text-gray-500 text-sm">Minimalist weather checker</p>
    </header>
  );
};

export default Header;
