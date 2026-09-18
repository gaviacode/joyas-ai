# Mapa de palabras clave

El script analiza únicamente las guías españolas definidas en `lib/site-content.ts`. Las credenciales, el token OAuth y los CSV se mantienen fuera del repositorio.

```powershell
# 1. Detectar guías sin llamadas externas
npm run seo:keyword-map -- --dry-run

# 2. Probar una guía (primera ejecución: abrir la URL OAuth que muestra la terminal)
npm run seo:keyword-map -- --config "<ruta-a-config-externo>" --limit 1

# 3. Ejecutar un lote de 50 guías
npm run seo:keyword-map -- --config "<ruta-a-config-externo>" --limit 50

# 4. Elegir la ruta y el nombre del CSV fuera del repositorio
npm run seo:keyword-map -- --config "<ruta-a-config-externo>" --output "<ruta-externa>/keyword-map.csv"
```

Si no se indica `--output`, el CSV `keyword-map.csv` y la cola `keyword-map-serp-review.csv` se crean junto al archivo de configuración. La cola SERP es deliberadamente manual: el script no raspa Google ni inventa puntuaciones de dificultad SEO.
