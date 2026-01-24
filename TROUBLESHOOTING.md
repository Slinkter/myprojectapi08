# 🔑 Guía Rápida: Solución al Error 401

## Problema

Tu API key muestra "Active" en el dashboard pero retorna 401 (Unauthorized).

## Causas Comunes

### 1. Propagación Pendiente (Más Común)

- **Tiempo típico:** 10-30 minutos
- **Tiempo máximo:** 2 horas
- **Tu caso:** ~20 minutos transcurridos

### 2. Cuenta No Verificada

- Revisa tu email para link de verificación
- Verifica que tu cuenta esté completamente activada

### 3. Límites del Plan Gratuito

Tu plan actual:

- ✅ 60 llamadas/minuto
- ✅ Pronóstico 5 días (3 horas)
- ❌ Sin pronóstico horario/diario

## Soluciones

### Solución 1: Generar Segunda Key (Recomendado)

A veces una segunda key se activa más rápido:

1. Ve a: https://home.openweathermap.org/api_keys
2. Click "Create key"
3. Name: `myprojectapi08-backup`
4. Click "Generate"
5. Copia la nueva key
6. Actualiza `.env`:
    ```bash
    VITE_OPENWEATHER_API_KEY=nueva_key_aqui
    ```
7. Reinicia servidor:
    ```bash
    pnpm run dev
    ```

### Solución 2: Esperar Más Tiempo

Si han pasado menos de 30 minutos:

- Espera 10-15 minutos más
- Refresca el navegador
- Prueba manualmente:
    ```bash
    curl "https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=TU_KEY"
    ```

### Solución 3: Verificar Email

1. Revisa tu bandeja de entrada
2. Busca email de OpenWeatherMap
3. Click en link de verificación si existe
4. Espera 5 minutos después de verificar

### Solución 4: Contactar Soporte

Si después de 2 horas sigue sin funcionar:

- https://home.openweathermap.org/questions
- Menciona que la key muestra "Active" pero retorna 401

## Verificación Manual

Prueba tu key con este comando:

```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=TU_KEY"
```

**Funciona si ves:**

```json
{
  "coord": {"lon": -77.0428, "lat": -12.0464},
  "weather": [{"id": 801, "main": "Clouds", ...}],
  ...
}
```

**Aún no funciona si ves:**

```json
{ "cod": 401, "message": "Invalid API key..." }
```

## Tiempo Transcurrido

- **Generación:** ~9:10 AM
- **Ahora:** ~9:32 AM
- **Transcurrido:** ~22 minutos
- **Recomendación:** Generar segunda key o esperar 10 minutos más

## Próximos Pasos

1. ✅ Genera segunda API key
2. ⏳ O espera 10-15 minutos más
3. 📧 Verifica tu email
4. 🔄 Refresca navegador cuando esté lista

---

**Última actualización:** 2026-01-24 09:32 AM
