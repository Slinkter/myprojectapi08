import React from "react";
import PropTypes from "prop-types";

/**
 * Componente Límite de Errores Global (Error Boundary).
 *
 * **Funcionalidad:**
 * - Captura errores de JavaScript en el árbol de componentes hijo.
 * - Muestra una UI de respaldo (Fallback) en lugar de colapsar toda la app.
 *
 * **Flujo de interacción:**
 * 1. Envuelve a la aplicación principal.
 * 2. Si ocurre un error en `componentDidCatch`, actualiza estado `hasError`.
 * 3. Renderiza el mensaje de error amigable.
 * 4. Permite al usuario "Recargar Aplicación".
 *
 * **Motivo de existencia:**
 * - Robustez (RNF-04): Evita la "Pantalla Blanca de la Muerte" (White Screen of Death).
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la UI alternativa
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full">
            <div className="text-red-500 mb-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-6">
              We encountered an unexpected error. Please try reloading the
              application.
            </p>
            {/* Opcional: Mostrar detalle del error en desarrollo */}
            {import.meta.env.DEV && this.state.error && (
              <pre className="bg-gray-100 p-3 rounded text-xs text-left overflow-auto mb-6 max-h-32 text-red-800">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors focus:ring-4 focus:ring-gray-200"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
