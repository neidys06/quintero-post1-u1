# Análisis 1: Petición GET — example.com

## Información general
- URL: https://example.com/
- Método: GET
- Código de estado: 200 OK

## Headers de Request
| Header | Valor |
|--------|-------|
| Host (:authority) | example.com |
| User-Agent | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 |
| Accept | text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7 |

> Nota: como la conexión se realizó sobre HTTP/2, el navegador envía el pseudo-header `:authority` en lugar del header clásico `Host`; ambos cumplen la misma función de indicar al servidor el dominio solicitado.

## Headers de Response
| Header | Valor | Significado |
|--------|-------|-------------|
| Content-Type | text/html | Indica al navegador que el cuerpo de la respuesta es un documento HTML, por lo que debe interpretarlo y renderizarlo como una página web (y no, por ejemplo, descargarlo como archivo binario). |
| Cache-Control | No presente en esta respuesta | El servidor no envió explícitamente esta directiva; sin embargo, la presencia de `Age: 8802` y `Cf-Cache-Status: HIT` muestra que Cloudflare (la CDN que sirve el sitio) igualmente almacenó en caché la respuesta y la entregó desde el borde de su red sin recalcularla, en lugar de contactar al servidor de origen. |

## Tiempos de carga
| Fase | Tiempo (ms) |
|------|------------|
| DNS Lookup | 149.48 ms |
| TTFB (Waiting for server response) | 104.66 ms |

## Conclusión
La petición GET a `https://example.com/` se resolvió correctamente con un código 200 OK, confirmando que el recurso HTML solicitado existe y fue entregado sin errores. El header `Content-Type: text/html` le indica al navegador cómo debe interpretar el cuerpo de la respuesta, mientras que los headers relacionados con Cloudflare (`Age`, `Cf-Cache-Status: HIT`) evidencian que la página se sirvió desde una caché de CDN en lugar del servidor de origen, lo cual reduce la carga en el backend y acelera la entrega al usuario. El tiempo de DNS Lookup (≈149 ms) fue relativamente alto comparado con el TTFB (≈105 ms), lo que sugiere que la resolución del nombre de dominio tomó más tiempo que la propia generación de la respuesta por parte del servidor. En conjunto, el ciclo completo de la petición (carga inicial, conexión SSL, espera de respuesta y descarga de contenido) tomó un poco menos de medio segundo, un tiempo razonable para una página estática y ligera como example.com. Este análisis confirma la utilidad del panel Network de DevTools para desglosar cada fase del ciclo de vida de una petición HTTP y detectar en qué etapa se concentra el tiempo de carga.