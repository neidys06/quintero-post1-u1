# Post-contenido — Unidad 1: Fundamentos de la Web

## Descripción
Repositorio del laboratorio de la Unidad 1 de Programación Web —
Séptimo Semestre. Contiene dos partes: configuración del entorno
de desarrollo (parte-1-entorno/) y análisis de peticiones HTTP con
Chrome DevTools y Postman (parte-2-analisis-http/).

## Parte 1 — Entorno de desarrollo
Página HTML básica inspeccionada con Chrome DevTools. Ver
parte-1-entorno/.

### Estructura de archivos
```
apellido-post1-u1/
├── parte-1-entorno/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── capturas/
├── parte-2-analisis-http/
│   ├── analisis/
│   │   ├── 01-pagina-html.md
│   │   ├── 02-api-rest-get.md
│   │   └── 03-postman-post.md
│   └── capturas/
└── README.md
```

### Instalación y ejecución
1. Clonar el repositorio:
   ```
   git clone https://github.com/neidys06/quintero-post1-u1.git
   cd quintero-post1-u1
   ```
2. Abrir la carpeta del repositorio en VS Code (`File → Open Folder`).
3. Instalar las extensiones necesarias desde el panel de extensiones (`Ctrl+Shift+X`):
   - Live Server (Ritwick Dey)
   - Prettier - Code formatter
   - GitLens — Git supercharged
   - ESLint
4. Verificar que Git esté instalado y configurado:
   ```
   git --version
   git config --global --list
   ```
5. Para visualizar la página de la Parte 1: hacer clic derecho sobre `parte-1-entorno/index.html` y seleccionar **"Open with Live Server"**. Esto abrirá la página en el navegador en `http://127.0.0.1:5500/` (o el puerto que asigne Live Server).
6. Abrir Chrome DevTools (`F12`) para inspeccionar el DOM, los estilos y la consola mientras la página está corriendo con Live Server.


## Parte 2 — Análisis de peticiones HTTP
| # | Tipo | URL | Código |
|---|------|-----|--------|
| 1 | GET HTML | https://example.com | 200 OK |
| 2 | GET JSON (exitoso) | /posts/1 | 200 OK |
| 3 | GET JSON (fallido) | /posts/999 | 404 Not Found |
| 4 | POST JSON | /posts | 201 Created |

Ver parte-2-analisis-http/analisis/.

## Herramientas utilizadas
- VS Code, Git, GitHub
- Google Chrome + DevTools (panel Network)
- Postman (petición POST con tests)

## Conclusiones
Este laboratorio permitió configurar de principio a fin un entorno de desarrollo web profesional (VS Code, Git y GitHub) y, sobre esa base, practicar el análisis real del tráfico HTTP con dos herramientas complementarias: Chrome DevTools y Postman. Se comprobó que el mismo método GET puede usarse tanto para obtener un documento HTML destinado a renderizarse (`Content-Type: text/html`) como para consumir datos estructurados de una API REST (`Content-Type: application/json`), y que el código de estado (200, 404) refleja directamente la existencia o ausencia del recurso solicitado. Con la petición POST en Postman se evidenció además cómo un mismo protocolo HTTP puede usarse no solo para leer información, sino para crear nuevos recursos, identificando diferencias clave frente al GET como el envío de un body, el código 201 Created y el header `Location`. La automatización de pruebas con `pm.test()` mostró el valor de validar programáticamente el comportamiento de una API en lugar de revisar manualmente cada respuesta. En conjunto, el laboratorio consolidó tanto las bases del entorno de trabajo del curso como las habilidades de inspección y depuración de comunicaciones cliente-servidor, esenciales para el desarrollo web moderno.

## Evidencias — Parte 1: Entorno de desarrollo

### Extensiones de VS Code instaladas
![Extensiones instaladas en VS Code](parte-1-entorno/capturas/vscode-extensiones.png)

### Instalación y configuración de Git
![Configuración global de Git](parte-1-entorno/capturas/instalación_y_configuración_de_Git.png)

### Repositorio clonado y primer commit en GitHub
![Repositorio en GitHub y terminal con git log](parte-1-entorno/capturas/repositorio_en_GitHub_y_terminal_con_git_log.png)

### Historial de commits (mínimo 3 commits descriptivos)
![Historial de commits en GitHub y git log en terminal](parte-1-entorno/capturas/historial_de_commits_en_GitHub_y_git_log_en_terminal.png)

### Página renderizada con Live Server
![Página renderizada](parte-1-entorno/capturas/pagina-renderizada.png)

### DevTools — Consola con los mensajes registrados por main.js
![Mensajes registrados en la consola de DevTools](parte-1-entorno/capturas/devTools_mensajes_registrados.png)

### DevTools — Panel Elements con los estilos del header
![Panel Console y panel Elements con estilos del header](parte-1-entorno/capturas/panel_Console_y_panel_Elements_con_estilos_del_header.png)

## Evidencias — Parte 2: Análisis de peticiones HTTP

### Estructura de carpetas y control de versiones
![Estructura de carpetas completa y git log](parte-1-entorno/capturas/estructura_de_carpetas_completa.png)

### Análisis 1 — GET a example.com (200 OK)
![General y Response Headers](parte-2-analisis-http/capturas/General_and_Response_Headers_1_A1.png)
![Request Headers](parte-2-analisis-http/capturas/Request_Headers_2_A1.png)
![Response (HTML)](parte-2-analisis-http/capturas/Response_1_A1.png)
![Response (HTML) continuación](parte-2-analisis-http/capturas/Response_2_A1.png)
![Timing](parte-2-analisis-http/capturas/Timing_A1.png)

### Análisis 2 — GET a /posts/1 (200 OK)
![General y Response Headers](parte-2-analisis-http/capturas/General_and_Response_Headers_1_A2.png)
![Response y Request Headers](parte-2-analisis-http/capturas/General_and_Response_Headers_2_A2.png)
![Request Headers](parte-2-analisis-http/capturas/Request_Headers_A2.png)
![Response (JSON)](parte-2-analisis-http/capturas/Response_A2.png)
![Timing](parte-2-analisis-http/capturas/Timming_A2.png)

### Análisis 2 — GET a /posts/999 (404 Not Found)
![General y Response Headers](parte-2-analisis-http/capturas/General_and_Response_Headers_A2_1.png)
![Response y Request Headers](parte-2-analisis-http/capturas/General_and_Response_Headers_A2_2.png)
![Request Headers](parte-2-analisis-http/capturas/Request_Headers_A2_1.png)
![Response (JSON vacío)](parte-2-analisis-http/capturas/Response_A2_1.png)
![Timing](parte-2-analisis-http/capturas/Timmin_A2_1.png)

### Análisis 3 — POST con Postman (201 Created)
![Body de la respuesta](parte-2-analisis-http/capturas/A3_Body.png)
![Headers de la respuesta](parte-2-analisis-http/capturas/A3_Headers1.png)
![Headers de la respuesta (continuación)](parte-2-analisis-http/capturas/A3_Headers2.png)
![Resultados de los tests](parte-2-analisis-http/capturas/A3_Test_Results.png)
