# Importaciones Absolutas

## Configuración
Se ha configurado el alias `@` para apuntar al directorio `src/`.
Esto permite importaciones limpias y evita el "infierno de puntos" (`../../../../`).

## Ejemplo
**Antes:**
```javascript
import { fetchWeatherData } from "../../../services/weatherService";
```

**Ahora:**
```javascript
import { useWeather } from "@/features/weather/hooks/useWeather";
```

## Configuración Técnica
- **vite.config.js**: `resolve.alias` mapea `@` a `./src`.
- **jsconfig.json**: Configura el editor (VS Code) para entender el alias y proporcionar autocompletado.
