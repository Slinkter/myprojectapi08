# 🔐 Guía de Seguridad - API Keys y Secrets

**Proyecto:** myprojectapi08  
**Fecha:** 2026-01-24  
**Versión:** 1.3.0

---

## ⚠️ Incidente de Seguridad Resuelto

### Resumen del Incidente

**Fecha:** 2026-01-24  
**Tipo:** Exposición de API Key en repositorio público  
**Severidad:** Media  
**Estado:** ✅ RESUELTO

**Detalles:**

- API Key de OpenWeatherMap expuesta en `dist/assets/index-*.js`
- Detectada por GitHub Secret Scanning
- Key antigua: `95f387e6c20dba2ec0661e6dfe0dfd9d` (REVOCADA)
- Key nueva: `` (ACTIVA)

**Acciones tomadas:**

1. ✅ API key antigua revocada en OpenWeatherMap
2. ✅ Nueva API key generada
3. ✅ `.env` actualizado localmente
4. ✅ Servidor de desarrollo reiniciado
5. ⚠️ PENDIENTE: Limpiar historial de Git
6. ⚠️ PENDIENTE: Cerrar alerta de GitHub

---

## 🛡️ Mejores Prácticas de Seguridad

### 1. Variables de Entorno

#### ✅ CORRECTO

```bash
# .env (NUNCA commitear)
VITE_OPENWEATHER_API_KEY=tu_api_key_aqui
```

```javascript
// src/config/env.js
const getEnvVar = (key, defaultValue = "") => import.meta.env[key];

export const config = {
    api: {
        weatherKey: getEnvVar("VITE_OPENWEATHER_API_KEY"),
        baseUrl: "https://api.openweathermap.org/data/2.5",
    },
};
```

#### ❌ INCORRECTO

```javascript
// ❌ NUNCA hardcodear API keys
const API_KEY = "95f387e6c20dba2ec0661e6dfe0dfd9d";

// ❌ NUNCA commitear .env
git add .env
```

---

### 2. Archivos a Ignorar

**`.gitignore`** debe incluir:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/
.vite/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS
.DS_Store
Thumbs.db
```

---

### 3. Plantilla de Variables de Entorno

**`.env.example`** (SÍ commitear):

```bash
# OpenWeatherMap API Configuration
VITE_OPENWEATHER_API_KEY=your_api_key_here

# Instructions:
# 1. Copy this file to .env
# 2. Get your API key from: https://openweathermap.org/api
# 3. Replace 'your_api_key_here' with your actual key
# 4. NEVER commit the .env file
```

---

### 4. Deployment Seguro

#### GitHub Actions (Recomendado)

**`.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main, gemini-22.01.2026]

jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: pnpm/action-setup@v2
              with:
                  version: 8

            - uses: actions/setup-node@v4
              with:
                  node-version: "20"
                  cache: "pnpm"

            - name: Install dependencies
              run: pnpm install

            - name: Build
              env:
                  VITE_OPENWEATHER_API_KEY: ${{ secrets.VITE_OPENWEATHER_API_KEY }}
              run: pnpm run build

            - name: Deploy
              uses: peaceiris/actions-gh-pages@v3
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  publish_dir: ./dist
```

**Configurar GitHub Secret:**

1. Ve a: `Settings > Secrets and variables > Actions`
2. Click en "New repository secret"
3. Nombre: `VITE_OPENWEATHER_API_KEY`
4. Valor: Tu API key
5. Click "Add secret"

---

### 5. Limpieza de Historial de Git

Si una API key fue commiteada por error:

#### Opción A: BFG Repo-Cleaner (Recomendado)

```bash
# 1. Descarga BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 2. Crea archivo con secrets a reemplazar
echo "95f387e6c20dba2ec0661e6dfe0dfd9d" > passwords.txt

# 3. Ejecuta BFG
java -jar bfg-1.14.0.jar --replace-text passwords.txt

# 4. Limpia referencias
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Force push (CUIDADO: reescribe historial)
git push --force
```

#### Opción B: git filter-repo

```bash
# 1. Instala git-filter-repo
pip install git-filter-repo

# 2. Reemplaza el secret
git filter-repo --replace-text <(echo '95f387e6c20dba2ec0661e6dfe0dfd9d==>REDACTED')

# 3. Force push
git push --force
```

⚠️ **ADVERTENCIA:** `git push --force` reescribe el historial. Coordina con tu equipo.

---

### 6. Alternativas de Arquitectura

#### Opción A: Backend Proxy (Más Seguro)

**Ventajas:**

- ✅ API key nunca se expone al cliente
- ✅ Control total sobre rate limiting
- ✅ Posibilidad de agregar caché server-side

**Implementación con Vercel Serverless Functions:**

```javascript
// api/weather.js
export default async function handler(req, res) {
    const { city } = req.query;

    // API key solo en el servidor
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
}
```

```javascript
// Frontend: src/features/weather/services/weatherService.js
export const fetchWeatherData = async (city) => {
    const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`,
    );
    if (!response.ok) throw new Error("Failed to fetch");
    return await response.json();
};
```

#### Opción B: Rate Limiting en Cliente (Menos Seguro)

Si decides mantener la API key en el cliente:

1. **Configura límites estrictos** en OpenWeatherMap:
    - Rate limit: 60 calls/min (mínimo)
    - Sin billing automático
    - Alertas de uso

2. **Documenta el riesgo** en el README:

    ```markdown
    ## ⚠️ Security Notice

    This is a demo project. The API key is public with strict rate limits.
    For production, use a backend proxy.
    ```

3. **Implementa rate limiting local:**

    ```javascript
    // Simple rate limiter
    const rateLimiter = {
        calls: [],
        maxCalls: 10,
        timeWindow: 60000, // 1 minuto

        canMakeRequest() {
            const now = Date.now();
            this.calls = this.calls.filter(
                (time) => now - time < this.timeWindow,
            );
            return this.calls.length < this.maxCalls;
        },

        recordCall() {
            this.calls.push(Date.now());
        },
    };
    ```

---

## 📋 Checklist de Seguridad

### Pre-Commit

- [ ] `.env` está en `.gitignore`
- [ ] No hay API keys hardcodeadas en el código
- [ ] `.env.example` está actualizado
- [ ] Secrets están en variables de entorno

### Pre-Deploy

- [ ] GitHub Secrets configurados
- [ ] Workflow de CI/CD usa secrets
- [ ] Build no expone variables sensibles
- [ ] Rate limiting configurado

### Post-Incident

- [ ] API key antigua revocada
- [ ] Nueva API key generada
- [ ] Historial de Git limpiado
- [ ] Alerta de GitHub cerrada
- [ ] Documentación actualizada

---

## 🔍 Detección de Secrets

### Herramientas Recomendadas

1. **GitHub Secret Scanning** (Automático)
    - Ya habilitado en repos públicos
    - Detecta 200+ tipos de secrets

2. **git-secrets** (Local)

    ```bash
    # Instalar
    brew install git-secrets

    # Configurar
    git secrets --install
    git secrets --register-aws
    ```

3. **pre-commit hooks**

    ```bash
    # .husky/pre-commit
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    # Detectar secrets
    if git diff --cached | grep -i "api.*key.*=.*[a-z0-9]\{32\}"; then
      echo "⚠️  Possible API key detected!"
      exit 1
    fi
    ```

---

## 📚 Referencias

- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

---

## 📞 Contacto en Caso de Incidente

Si detectas una exposición de secrets:

1. **Inmediato:** Revoca el secret en el proveedor
2. **Urgente:** Genera nuevo secret
3. **Importante:** Limpia historial de Git
4. **Seguimiento:** Documenta el incidente

---

**Última actualización:** 2026-01-24  
**Responsable:** Equipo de Desarrollo  
**Próxima revisión:** Mensual
