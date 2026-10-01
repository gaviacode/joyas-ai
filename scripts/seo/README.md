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

## Descubrir nuevas guías

El modo `--discover` consulta ideas de keywords a partir de categorías y términos temáticos amplios de las guías ES publicadas. No crea, modifica ni publica guías, y no usa traducciones EN/PT-BR. `--limit N` limita los grupos de semillas (categorías) consultados, no las oportunidades finales.

```powershell
# Ver las semillas sin API
npm run seo:keyword-map -- --discover --dry-run

# Prueba con un grupo pequeño
npm run seo:keyword-map -- --discover --config "<ruta-config-externo>" --limit 1 --output "<ruta-externa>/keyword-opportunities-test.csv"

# Descubrimiento completo
npm run seo:keyword-map -- --discover --config "<ruta-config-externo>" --output "<ruta-externa>/keyword-opportunities.csv"

# Discovery long-tail: baja temporalmente el mínimo a 200 búsquedas/mes
npm run seo:keyword-map -- --discover --config "<ruta-config>" --min-volume 200 --output "<ruta-output>"
```

Sin `--output`, crea `keyword-opportunities.csv` junto al fichero de configuración externo. `--min-volume N` solo se aplica a `--discover` y usa 500 búsquedas mensuales por defecto. Bajarlo temporalmente a 200 ayuda a descubrir keywords long-tail y clusters con menor volumen individual. El CSV deja dificultad SEO y evidencia SERP para revisión manual: no raspa Google ni inventa esas señales.
