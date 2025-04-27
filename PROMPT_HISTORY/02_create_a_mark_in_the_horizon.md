Me interesa imaginar más allá de la fase en que ya hayamos creado la paleta de bloques para MCP. Me ayudas a idear 5 proyectos distintos, sencillitos, que cubran la implementación del procololo MCP según Anthropic la ha definido, disponible en https://modelcontextprotocol.io/specification/2025-03-26.

Crea 5 tutoriales con los sketch blockly que sirvan de guía para el desarrollo.

# 5 Proyectos Tutorial para Blockly con MCP
A continuación presento cinco proyectos sencillos que cubren los aspectos principales del protocolo MCP, diseñados como tutoriales para la implementación con bloques Blockly.

Tutorial 1: Servidor de Eco MCP
-------------------------------

### Descripción

Un servidor básico que refleja mensajes y datos enviados por el cliente. Este proyecto cubre las bases de configuración de servidor, herramientas simples y recursos estáticos.

### Sketch Blockly

*(Imagen conceptual)*
```
[Configuración y Setup]

  [Crear Servidor MCP]

    [nombre: "Servidor Eco"]

    [versión: "1.0.0"]

    [asignar a variable: servidor]

  [Configurar Transporte Stdio]

    [asignar a variable: transporte]

  [Conectar]

    [servidor: servidor]

    [transporte: transporte]

[Recursos]

  [Definir Recurso Estático]

    [nombre: "info"]

    [uri: "info://server"]

    [función callback]

      [retornar]

        [crear objeto Contenido de Recurso]

          [uri: uri]

          [texto: "Servidor eco MCP v1.0"]

[Herramientas]

  [Definir Herramienta]

    [nombre: "eco"]

    [descripción: "Repite el mensaje enviado"]

    [parámetros]

      [mensaje: string]

    [función callback]

      [retornar]

        [crear objeto Respuesta de Herramienta]

          [tipo: "texto"]

          [texto: unir("El servidor dice: ", obtener parámetro mensaje)]
```
### Conceptos Cubiertos

-   Configuración básica del servidor MCP
-   Configuración de transporte stdio
-   Recurso estático simple
-   Herramienta con un parámetro
-   Manejo de cadenas de texto

Tutorial 2: Cliente de Clima MCP
--------------------------------

### Descripción

Un cliente MCP que se conecta a un servicio meteorológico y expone datos del clima a través de recursos y herramientas.

### Sketch Blockly

*(Imagen conceptual)*

```
[Configuración y Setup]

  [Crear Servidor MCP]

    [nombre: "Clima API"]

    [versión: "1.0.0"]

    [asignar a variable: servidor]

  [Configurar Transporte HTTP]

    [tipo: "streamable"]

    [asignar a variable: transporte]

  [Conectar]

    [servidor: servidor]

    [transporte: transporte]

[Recursos]

  [Definir Plantilla de Recurso]

    [nombre: "clima"]

    [plantilla: "clima://{ciudad}"]

    [función callback]

      [obtener variable: ciudad]

      [llamar API externa]

        [url: unir("https://api.weather.example/", ciudad)]

        [asignar respuesta a variable: datos]

      [retornar]

        [crear objeto Contenido de Recurso]

          [uri: uri]

          [texto: datos]

          [metadatos]

            [fuente: "API Externa de Clima"]

            [tipoMIME: "application/json"]

[Herramientas]

  [Definir Herramienta]

    [nombre: "previsión"]

    [descripción: "Obtiene previsión para los próximos días"]

    [parámetros]

      [ciudad: string]

      [días: número]

    [función callback]

      [llamar API externa]

        [url: unir("https://api.weather.example/forecast/", ciudad, "?days=", días)]

        [asignar respuesta a variable: previsión]

      [retornar]

        [crear objeto Respuesta de Herramienta]

          [contenido]

            [tipo: "texto"]

            [texto: previsión]
```

### Conceptos Cubiertos

-   Transporte HTTP Streamable
-   Plantillas de recursos con parámetros
-   Integración con APIs externas
-   Herramientas con múltiples parámetros
-   Metadatos en recursos

Tutorial 3: Asistente de Tareas con Autenticación
-------------------------------------------------

### Descripción

Un servidor MCP que gestiona tareas y requiere autenticación OAuth para acceder a algunas funcionalidades.

### Sketch Blockly

*(Imagen conceptual)*

```
[Configuración y Setup]

  [Crear Servidor MCP]

    [nombre: "Asistente de Tareas"]

    [versión: "1.0.0"]

    [asignar a variable: servidor]

  [Configurar Transporte HTTP Streamable]

    [puerto: 3000]

    [gestión de sesiones: verdadero]

    [asignar a variable: transporte]

  [Configurar Autenticación OAuth]

    [urlProveedor: "https://auth.example.com"]

    [clientId: "mi-asistente-tareas"]

    [scope: "tareas:escribir tareas:leer"]

[Recursos]

  [Definir Recurso]

    [nombre: "tareas-públicas"]

    [uri: "tareas://publicas"]

    [función callback]

      [acceder base de datos: "tareas_públicas"]

      [obtener filas]

      [asignar a variable: listaTareas]

      [retornar]

        [crear objeto Contenido de Recurso]

          [uri: uri]

          [texto: convertir a JSON listaTareas]

  [Definir Recurso Protegido]

    [nombre: "tareas-privadas"]

    [uri: "tareas://privadas"]

    [requiere autenticación: verdadero]

    [función callback]

      [obtener token de autorización]

      [verificar permisos: "tareas:leer"]

      [acceder base de datos: "tareas_usuario"]

      [filtrar por: autenticacion.usuario]

      [asignar a variable: tareas]

      [retornar]

        [crear objeto Contenido de Recurso]

          [uri: uri]

          [texto: convertir a JSON tareas]

[Herramientas]

  [Definir Herramienta Protegida]

    [nombre: "crear-tarea"]

    [descripción: "Crea una nueva tarea"]

    [requiere autenticación: verdadero]

    [parámetros]

      [título: string]

      [descripción: string]

      [fecha: string]

    [función callback]

      [verificar permisos: "tareas:escribir"]

      [crear objeto tarea]

        [título: obtener parámetro título]

        [descripción: obtener parámetro descripción]

        [fecha: obtener parámetro fecha]

        [usuario: autenticacion.usuario]

      [insertar en base de datos: "tareas_usuario"]

      [retornar]

        [crear objeto Respuesta de Herramienta]

          [contenido]

            [tipo: "texto"]

            [texto: "Tarea creada con éxito"]
```

### Conceptos Cubiertos

-   Autenticación OAuth
-   Recursos y herramientas protegidos
-   Gestión de sesiones HTTP
-   Integración con base de datos
-   Verificación de permisos

Tutorial 4: Generador de Imágenes con Notificaciones
----------------------------------------------------

### Descripción

Servidor MCP que genera imágenes a partir de descripciones de texto y utiliza notificaciones para informar sobre el progreso.

### Sketch Blockly

*(Imagen conceptual)*

```
[Configuración y Setup]

  [Crear Servidor MCP]

    [nombre: "Generador de Imágenes"]

    [versión: "1.0.0"]

    [asignar a variable: servidor]

  [Configurar Transporte HTTP Streamable]

    [puerto: 3000]

    [gestión de sesiones: verdadero]

    [asignar a variable: transporte]

[Recursos]

  [Definir Plantilla de Recurso]

    [nombre: "imagen"]

    [plantilla: "imagen://{id}"]

    [función callback]

      [obtener variable: id]

      [buscar imagen en almacenamiento]

        [id: id]

        [asignar resultado a variable: imagen]

      [si imagen existe]

        [retornar]

          [crear objeto Contenido de Recurso]

            [uri: uri]

            [datos: imagen.datos]

            [metadatos]

              [tipoMIME: "image/png"]

              [promptOriginal: imagen.prompt]

      [sino]

        [lanzar error]

          [código: "InvalidParams"]

          [mensaje: "Imagen no encontrada"]

[Herramientas]

  [Definir Herramienta]

    [nombre: "generar-imagen"]

    [descripción: "Genera una imagen a partir de una descripción"]

    [parámetros]

      [descripción: string]

      [estilo: string]

      [tamaño: string]

    [función callback]

      [crear id único]

      [asignar a variable: idImagen]

      [crear hilo de ejecución]

        [para porcentaje desde 0 hasta 100 paso 20]

          [enviar notificación de progreso]

            [mensaje: unir("Generando imagen: ", porcentaje, "%")]

            [progreso: porcentaje]

            [total: 100]

          [esperar: 1000]

        [llamar API de generación de imágenes]

          [prompt: obtener parámetro descripción]

          [estilo: obtener parámetro estilo]

          [tamaño: obtener parámetro tamaño]

          [asignar resultado a variable: imagen]

        [guardar en almacenamiento]

          [id: idImagen]

          [datos: imagen]

          [prompt: obtener parámetro descripción]

        [enviar notificación]

          [título: "Imagen generada"]

          [mensaje: "La imagen ha sido generada correctamente"]

      [retornar]

        [crear objeto Respuesta de Herramienta]

          [contenido]

            [tipo: "texto"]

            [texto: unir("Imagen en proceso de generación. ID: ", idImagen)]
```
### Conceptos Cubiertos

-   Notificaciones de progreso
-   Procesamiento asíncrono
-   Manejo de datos binarios
-   Generación de IDs únicos
-   Almacenamiento y recuperación de recursos

Tutorial 5: Servidor con Múltiples Nodos y Prompts
--------------------------------------------------

### Descripción

Un servidor MCP distribuido con capacidad para ejecutarse en múltiples nodos, que incluye prompts personalizados y completado de parámetros.

### Sketch Blockly

*(Imagen conceptual)*

```

[Configuración y Setup]

  [Crear Servidor MCP]

    [nombre: "Servidor Multi-nodo"]

    [versión: "1.0.0"]

    [asignar a variable: servidor]

  [Configurar Transporte HTTP Streamable]

    [puerto: 3000]

    [modo: "persistente"]

    [asignar a variable: transporte]

  [Configurar Almacenamiento Persistente]

    [tipo: "base de datos"]

    [conexión: "postgres://usuario:clave@localhost/mcp_db"]

[Recursos]

  [Definir Plantilla de Recurso]

    [nombre: "documento"]

    [plantilla: "docs://{categoría}/{id}"]

    [completado]

      [variable: "categoría"]

      [función]

        [retornar: ["general", "técnico", "legal", "financiero"]]

    [función callback]

      [obtener variables: categoría, id]

      [consultar base de datos]

        [tabla: "documentos"]

        [filtro: {categoría: categoría, id: id}]

        [asignar resultado a variable: doc]

      [retornar]

        [crear objeto Contenido de Recurso]

          [uri: uri]

          [texto: doc.contenido]

          [metadatos]

            [autor: doc.autor]

            [fecha: doc.fecha]

[Prompts]

  [Definir Prompt]

    [nombre: "resumen-documento"]

    [descripción: "Genera un resumen ejecutivo de un documento"]

    [argumentos]

      [categoría: string]

      [id: string]

      [longitud: string]

    [función callback]

      [obtener argumentos: categoría, id, longitud]

      [retornar]

        [crear objeto Prompt]

          [mensajes]

            [rol: "usuario"]

            [contenido]

              [tipo: "texto"]

              [texto: unir("Por favor, genera un resumen ", longitud, " del documento en docs://", categoría, "/", id, ". Incluye los puntos clave y conclusiones principales.")]

[Notificaciones]

  [Definir Manejador de Estado de Sesión]

    [función]

      [al conectar nueva sesión]

        [obtener ID sesión]

        [registrar en base de datos]

          [tabla: "sesiones_activas"]

          [datos: {id: id_sesión, timestamp: ahora}]

      [al desconectar sesión]

        [obtener ID sesión]

        [eliminar de base de datos]

          [tabla: "sesiones_activas"]

          [filtro: {id: id_sesión}]

[Herramientas]

  [Definir Herramienta]

    [nombre: "estadísticas"]

    [descripción: "Obtiene estadísticas del sistema"]

    [función callback]

      [consultar base de datos]

        [tabla: "sesiones_activas"]

        [contar]

        [asignar resultado a variable: sesiones]

      [consultar base de datos]

        [tabla: "documentos"]

        [agrupar por: "categoría"]

        [contar]

        [asignar resultado a variable: docs]

      [retornar]

        [crear objeto Respuesta de Herramienta]

          [contenido]

            [tipo: "texto"]

            [texto: unir("Sesiones activas: ", sesiones, "\nDocumentos por categoría: ", convertir a JSON docs)]
```
### Conceptos Cubiertos

-   Almacenamiento persistente para servidores multi-nodo
-   Prompts personalizados con argumentos
-   Autocompletado de parámetros en plantillas
-   Manejo de sesiones persistentes
-   Consultas agregadas a bases de datos

Guía para la Implementación de los Tutoriales
---------------------------------------------

Para cada uno de estos tutoriales, la implementación seguiría estos pasos:

1.  **Definición de bloques personalizados**: Crear los bloques específicos de MCP que reflejen la API del SDK.
2.  **Configuración del entorno**: Establecer el entorno Blockly con las categorías adecuadas.
3.  **Desarrollo incremental**: Construir el proyecto paso a paso, comenzando por la configuración básica.
4.  **Prueba de generación de código**: Verificar que el código TypeScript generado sea funcional.
5.  **Despliegue y prueba**: Ejecutar el servidor o cliente MCP generado y probar su funcionalidad.

Estos proyectos cubren de manera progresiva los aspectos más importantes del protocolo MCP:

-   Recursos y herramientas (básicos y avanzados)
-   Transportes (stdio y HTTP streamable)
-   Autenticación y autorización
-   Notificaciones y progreso
-   Almacenamiento persistente
-   Prompts y completado

A medida que los usuarios completen estos tutoriales, obtendrán una comprensión completa de las capacidades de MCP y cómo implementarlas de manera visual con Blockly.