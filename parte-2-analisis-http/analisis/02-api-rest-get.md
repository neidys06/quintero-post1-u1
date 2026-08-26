# Análisis 2: Petición GET — API REST (jsonplaceholder.typicode.com)

## Información general
- URL (petición exitosa): https://jsonplaceholder.typicode.com/posts/1
- URL (petición al recurso inexistente): https://jsonplaceholder.typicode.com/posts/999
- Método: GET
- Código de estado: 200 OK (/posts/1) y 404 Not Found (/posts/999)

## Headers de Request
| Header | Valor |
|--------|-------|
| Host (:authority) | jsonplaceholder.typicode.com |
| User-Agent | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 |
| Accept | text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7 |

## Headers de Response
| Header | Valor | Significado |
|--------|-------|-------------|
| Content-Type | application/json; charset=utf-8 (igual en ambas peticiones, exitosa y fallida) | Indica al cliente que el cuerpo de la respuesta es un objeto JSON, por lo que debe parsearse como datos estructurados en lugar de renderizarse visualmente. En el caso 404, el cuerpo es un JSON vacío (`{}`) en lugar del objeto completo, pero el formato de la respuesta se mantiene. |
| Cache-Control | max-age=43200 (presente en ambas peticiones) | El servidor autoriza cachear la respuesta durante 43200 segundos (12 horas) antes de que el cliente deba volver a validarla, incluso para la respuesta 404 del recurso inexistente. |

## Tiempos de carga
| Fase | Tiempo (ms) |
|------|------------|
| DNS Lookup | No registrado en ninguna de las dos peticiones (la fase "Connection Start" solo muestra "Stalled", sin DNS Lookup/Initial connection/SSL separados, lo que indica que el navegador reutilizó una conexión ya establecida o el DNS ya estaba resuelto en caché) |
| TTFB (Waiting for server response) | 131.87 ms (/posts/1, 200 OK) · 157.82 ms (/posts/999, 404 Not Found) |

## Comparación HTTP vs API REST
| Aspecto | Análisis 1 — example.com (HTML) | Análisis 2 — API REST (JSON) |
|---------|----------------------------------|-------------------------------|
| Content-Type | text/html | application/json; charset=utf-8 |
| Naturaleza de la respuesta | Documento HTML para ser renderizado visualmente por el navegador | Objeto de datos estructurado (JSON) pensado para ser consumido por código, no para visualizarse directamente |
| Cache-Control | No presente en la respuesta | max-age=43200 (el servidor sí define una política explícita de cacheo, incluso en respuestas de error) |
| Manejo de "recurso no encontrado" | No aplica en este análisis (la página existía) | Código 404 con cuerpo JSON vacío (`{}`), manteniendo el mismo Content-Type que una respuesta exitosa |
| Uso típico | Cargar y mostrar una página web completa | Alimentar aplicaciones, scripts o front-ends que consumen la API |

La diferencia central entre ambas peticiones está en el `Content-Type`: mientras `text/html` le dice al navegador "esto es una página, píntala en pantalla", `application/json` le dice "esto son datos, interprétalos como tal". Además, en la API REST el código de estado (200 vs 404) refleja directamente si el recurso de datos solicitado existe, algo que no aplica de la misma forma en una petición de página HTML.

## Conclusión
Las dos peticiones GET realizadas contra la API de jsonplaceholder confirman que, a diferencia de una petición HTML tradicional, el código de estado aquí refleja directamente si el *recurso de datos* solicitado existe: `/posts/1` devolvió 200 OK con un objeto JSON completo, mientras que `/posts/999` devolvió 404 Not Found con un cuerpo JSON vacío (`{}`), manteniendo el mismo `Content-Type: application/json` en ambos casos. Esto demuestra que un código de error HTTP no implica una falla de conexión o de red, sino una respuesta perfectamente válida del servidor indicando que el recurso no existe. En ambas peticiones el servidor definió `Cache-Control: max-age=43200`, a diferencia de la petición HTML del Análisis 1 donde ese header no estaba presente, lo que sugiere que esta API aplica una política de cacheo explícita y uniforme sobre sus endpoints, existan o no los recursos solicitados. Los tiempos de espera (TTFB ≈132 ms y ≈158 ms respectivamente) fueron algo mayores que en la petición HTML de example.com, lo cual es razonable ya que la respuesta depende de una consulta a datos en el backend en lugar de servirse íntegramente desde el borde de una CDN. En conjunto, este análisis evidencia que el mismo método HTTP (GET) y el mismo `Content-Type` (JSON) pueden usarse tanto para confirmar la existencia de un recurso como para señalar claramente su ausencia, algo esencial al momento de consumir o depurar una API REST.