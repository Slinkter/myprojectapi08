# 🔑 Guía: Generar API Key de OpenWeatherMap

## Paso 1: Acceder a tu cuenta

1. Ve a: https://home.openweathermap.org/api_keys
2. Inicia sesión con tu cuenta

## Paso 2: Crear nueva API Key

1. En la sección "Create key"
2. Ingresa un nombre descriptivo: `myprojectapi08-production`
3. Click en "Generate"

## Paso 3: Esperar activación

⏳ **IMPORTANTE:** La nueva key puede tardar **5-15 minutos** en activarse

**Estados posibles:**

- 🟡 **Pending/Activating** - Espera unos minutos
- 🟢 **Active** - Lista para usar
- 🔴 **Blocked** - Contacta soporte de OpenWeather

## Paso 4: Probar la key

Abre en tu navegador (reemplaza YOUR_KEY):

```
https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=YOUR_KEY
```

✅ **Funciona:** Verás JSON con datos del clima  
❌ **Error 401:** La key aún no está activa, espera más tiempo

## Paso 5: Actualizar .env

```bash
# .env
VITE_OPENWEATHER_API_KEY=tu_nueva_key_aqui
```

## Paso 6: Reiniciar servidor

```bash
# Detener servidor actual (Ctrl+C)
# Luego:
pnpm run dev
```

---

## 🆓 Plan Gratuito - Límites

El plan gratuito de OpenWeatherMap tiene:

- ✅ 60 llamadas por minuto
- ✅ 1,000,000 llamadas por mes
- ✅ Datos actuales y pronóstico de 5 días
- ❌ Sin datos históricos
- ❌ Sin soporte prioritario

**Suficiente para desarrollo y demos** ✅

---

## 🔧 Troubleshooting

### Error: "Invalid API key"

- Verifica que copiaste la key completa
- Revisa que no haya espacios al inicio/final
- Espera 10-15 minutos después de generarla

### Error: "API key has been blocked"

- Contacta soporte: https://home.openweathermap.org/questions
- Genera una nueva key

### Error: "Rate limit exceeded"

- Espera 1 minuto
- Reduce la frecuencia de requests
- Implementa caché local

---

## 📞 Soporte OpenWeatherMap

- FAQ: https://openweathermap.org/faq
- Contact: https://home.openweathermap.org/questions
- Status: https://openweathermap.statuspage.io/

---

**Última actualización:** 2026-01-24
