# Análisis 3: Petición POST — Postman (jsonplaceholder.typicode.com/posts)

## Configuración de la petición
- URL: https://jsonplaceholder.typicode.com/posts
- Método: POST
- Headers enviados: `Content-Type: application/json` (entre los 10 headers totales que Postman agrega automáticamente)
- Body (raw → JSON):
```json
{
  "title": "Laboratorio Programacion Web",
  "body": "Analisis de peticiones HTTP con Postman.",
  "userId": 1
}
```

## Respuesta recibida
- Código de estado: 201 Created
- Tiempo de respuesta: 576 ms
- Tamaño de la respuesta: 1.31 KB
- Cuerpo de la respuesta:
```json
{
  "title": "Laboratorio Programacion Web",
  "body": "Analisis de peticiones HTTP con Postman.",
  "userId": 1,
  "id": 101
}
```

El servidor devolvió exactamente el objeto enviado en el body, agregando un campo `id: 101` generado automáticamente, lo cual confirma que el recurso fue "creado" (de forma simulada, ya que jsonplaceholder no persiste realmente los datos).

## Headers relevantes de la respuesta
| Header | Valor | Significado |
|--------|-------|-------------|
| Location | https://jsonplaceholder.typicode.com/posts/101 | Apunta a la URL del nuevo recurso creado (`/posts/101`), siguiendo la convención REST de indicar dónde quedó ubicado el objeto recién creado. |
| Content-Type | application/json; charset=utf-8 | Indica que el cuerpo de la respuesta es un objeto JSON, igual que en las peticiones GET del Análisis 2. |
| X-Powered-By | Express | Revela que el backend de la API está construido sobre el framework Express (Node.js). |
| Cache-Control | no-cache | A diferencia de las respuestas GET del Análisis 2 (`max-age=43200`), aquí el servidor indica que esta respuesta no debe almacenarse en caché, ya que corresponde a una operación de creación y no a un recurso reutilizable. |
| Cf-Cache-Status | DYNAMIC | Cloudflare marca la respuesta como dinámica (no servida desde caché de borde), coherente con que cada POST genera un recurso distinto. |

## Resultado de los tests (pestaña "Tests"/"Scripts" de Postman)
```javascript
pm.test("Status 201 Created", () => {
  pm.response.to.have.status(201);
});

pm.test("Respuesta incluye id asignado", () => {
  const json = pm.response.json();
  pm.expect(json).to.have.property("id");
  pm.expect(json.title).to.equal("Laboratorio Programacion Web");
});
```

| Test | Resultado |
|------|-----------|
| Status 201 Created | ✅ PASSED |
| Respuesta incluye id asignado | ✅ PASSED |

Ambos tests pasaron exitosamente (2/2), confirmando de forma automatizada que el código de estado fue el esperado y que la respuesta incluye el campo `id` asignado por el servidor con el valor de `title` correcto.

## Diferencias entre GET y POST
| Aspecto | GET (Análisis 1 y 2) | POST (Análisis 3) |
|---------|----------------------|--------------------|
| Propósito | Solicitar/leer un recurso existente | Crear un nuevo recurso en el servidor |
| Cuerpo de la petición (body) | No lleva body | Lleva un body en JSON con los datos del recurso a crear |
| Código de estado esperado | 200 OK (éxito) / 404 Not Found (no existe) | 201 Created (recurso creado exitosamente) |
| Idempotencia | Sí — repetir la misma petición no cambia el estado del servidor | No — cada envío crea un nuevo recurso (por eso se generó `id: 101`, distinto en cada intento) |
| Cache-Control típico | Puede cachearse (ej. `max-age=43200`) | `no-cache` — no tiene sentido cachear una operación de creación |
| Header distintivo en la respuesta | No aplica un header de ubicación | `Location` apunta a la URL del recurso recién creado |

## Conclusión
La petición POST enviada a `/posts` fue procesada correctamente por el servidor, devolviendo un código 201 Created junto con el objeto enviado más un campo `id` autogenerado, lo que demuestra el patrón típico de creación de recursos en una API REST. El header `Location` es la evidencia más clara de esta diferencia frente al GET: le indica al cliente dónde quedó disponible el nuevo recurso, algo que no tiene sentido en una simple lectura de datos. Asimismo, el contraste entre `Cache-Control: max-age=43200` (en las respuestas GET) y `Cache-Control: no-cache` (en esta respuesta POST) refleja que cachear el resultado de una creación no aportaría valor, ya que cada solicitud genera un recurso distinto. Los dos tests automatizados en Postman validaron de forma objetiva tanto el código de estado como la integridad de los datos devueltos, mostrando cómo Postman permite no solo enviar peticiones manualmente sino también verificar programáticamente el comportamiento esperado de una API. En conjunto, este análisis evidencia que GET y POST, aunque comparten el mismo protocolo HTTP, cumplen roles semánticamente opuestos: uno consulta el estado del servidor sin modificarlo, y el otro lo modifica creando nueva información.