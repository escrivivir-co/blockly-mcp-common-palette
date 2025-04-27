Vamos a completar el tutorial anterior agregando una nueva categoría a la toolbol que sea MCP_App. Tendrá los nodos necesarios para agregar al ejemplo anterior un MCP_HOST (según la definición del protocolo MCP) que puede tener varios clientes. Entre ellos tendrá uno que pruebe la funcionalidad anterior. ¿Me ayudas?

# Extensión del Tutorial para Incluir MCP_HOST con Clientes

Vamos a crear una nueva categoría en la toolbox denominada "MCP_App" que contendrá los bloques necesarios para implementar un MCP_HOST según la definición del protocolo MCP, con capacidad para gestionar múltiples clientes. Esta extensión complementará el Servidor de Eco MCP que ya hemos diseñado.

## Diagrama Extendido para la Solución con Host MCP

```

┌─────────────────────────────────────────────────────────────────────────┐

│ [Crear Host MCP]                                                        │

│   nombre: "Host de Pruebas MCP"                                         │

│   [asignar a variable: host]                                            │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Crear Servidor MCP]                                                    │

│   nombre: "Servidor Eco"                                                │

│   versión: "1.0.0"                                                      │

│   [asignar a variable: servidor]                                        │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Configurar Transporte Stdio]                                           │

│   [asignar a variable: transporte]                                      │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Definir Recurso Estático]                                              │

│   nombre: "info"                                                        │

│   uri: "info://server"                                                  │

│                                                                         │

│   [Función callback]                                                    │

│     [Retornar]                                                          │

│       [crear objeto Contenido de Recurso]                               │

│         uri: uri                                                        │

│         texto: "Servidor eco MCP v1.0"                                  │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Definir Herramienta]                                                   │

│   nombre: "eco"                                                         │

│   [descripción: "Repite el mensaje enviado"]                            │

│                                                                         │

│   [Parámetros]                                                          │

│     mensaje: string                                                     │

│                                                                         │

│   [Función callback]                                                    │

│     [Retornar]                                                          │

│       [crear objeto Respuesta de Herramienta]                           │

│         tipo: "texto"                                                   │

│         texto: [unir "El servidor dice: " [obtener parámetro mensaje]]  │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Agregar Servidor a Host]                                               │

│   host: host                                                            │

│   servidor: servidor                                                    │

│   transporte: transporte                                                │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Crear Cliente de Prueba]                                               │

│   nombre: "Cliente Test"                                                │

│   [asignar a variable: clienteTest]                                     │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Agregar Cliente a Host]                                                │

│   host: host                                                            │

│   cliente: clienteTest                                                  │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Secuencia de Prueba]                                                   │

│   cliente: clienteTest                                                  │

│                                                                         │

│   [Leer Recurso]                                                        │

│     uri: "info://server"                                                │

│     [imprimir resultado]                                                │

│                                                                         │

│   [Llamar Herramienta]                                                  │

│     nombre: "eco"                                                        │

│     parámetros: { mensaje: "¡Hola MCP!" }                              │

│     [imprimir resultado]                                                │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Iniciar Host]                                                          │

│   host: host                                                            │

│   [asignar resultado a: hostRunning]                                    │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Ejecutar Secuencia de Prueba]                                          │

└───────────────────────────────┬─────────────────────────────────────────┘

                                │

                                ▼

┌─────────────────────────────────────────────────────────────────────────┐

│ [Manejar Evento]                                                        │

│   nombre: "test-complete"                                               │

│   [función]                                                             │

│     [Detener Host]                                                      │

│       host: host                                                        │

└─────────────────────────────────────────────────────────────────────────┘

```

## Código JavaScript Generado (Predicción con la Extensión)

```javascript

// Importar el SDK de MCP

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { McpClient } from "@modelcontextprotocol/sdk/client/mcp.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { createMcpHost } from "@modelcontextprotocol/sdk/host/index.js";

import { z } from "zod";

// Crear un Host MCP para gestionar la comunicación

const host = createMcpHost({

  name: "Host de Pruebas MCP"

});

// Crear el servidor MCP

const servidor = new McpServer({

  name: "Servidor Eco",

  version: "1.0.0"

});

// Configurar el transporte stdio para el servidor

const transporte = new StdioServerTransport();

// Definir un recurso estático

servidor.resource(

  "info",

  "info://server",

  async (uri) => {

    return {

      contents: [

        {

          uri: uri.toString(),

          text: "Servidor eco MCP v1.0"

        }

      ]

    };

  }

);

// Definir una herramienta que repite mensajes

servidor.tool(

  "eco",

  "Repite el mensaje enviado",

  { 

    mensaje: z.string() 

  },

  async ({ mensaje }) => {

    return {

      content: [

        {

          type: "text",

          text: "El servidor dice: " + mensaje

        }

      ]

    };

  }

);

// Agregar el servidor al host

host.addServer("servidor-eco", servidor, transporte);

// Crear un cliente de prueba

const clienteTest = new McpClient({

  name: "Cliente Test",

  version: "1.0.0"

});

// Agregar el cliente al host

host.addClient("cliente-test", clienteTest);

// Definir una secuencia de prueba

const secuenciaPrueba = async (cliente) => {

  try {

    // Probar lectura de recurso

    console.log("Leyendo recurso info://server...");

    const infoRecurso = await cliente.readResource("info://server");

    console.log("Respuesta del recurso:", infoRecurso.contents[0].text);

    // Probar herramienta eco

    console.log("Llamando a herramienta eco...");

    const respuestaEco = await cliente.callTool("eco", { 

      mensaje: "¡Hola MCP!" 

    });

    console.log("Respuesta de la herramienta:", respuestaEco.content[0].text);

    // Emitir evento de prueba completada

    host.emitEvent("test-complete", { success: true });

  } catch (error) {

    console.error("Error en la secuencia de prueba:", error);

    host.emitEvent("test-complete", { success: false, error });

  }

};

// Registrar manejo de eventos

host.on("test-complete", (data) => {

  console.log("Prueba completada:", data.success ? "Exitosamente" : "Con errores");

  // Detener el host después de completar las pruebas

  host.stop().then(() => {

    console.log("Host MCP detenido");

  });

});

// Iniciar el host y ejecutar la secuencia de prueba

(async () => {

  try {

    const hostRunning = await host.start();

    console.log("Host MCP iniciado");

    // Ejecutar la secuencia de prueba después de un breve retraso

    setTimeout(() => {

      secuenciaPrueba(clienteTest).catch(console.error);

    }, 1000);

  } catch (error) {

    console.error("Error al iniciar el host:", error);

    process.exit(1);

  }

})();

```

## Explicación de la Implementación con Host MCP

### Concepto del Host MCP

En el protocolo MCP, un Host actúa como un coordinador que facilita la comunicación entre servidores y clientes. Permite mantener varios componentes MCP en un entorno controlado, ideal para pruebas y desarrollo.

### Nuevos Componentes Añadidos

1\. **Host MCP**: Coordina la comunicación entre servidores y clientes.

2\. **Cliente de Prueba**: Permite probar las funcionalidades del servidor.

3\. **Secuencia de Prueba**: Serie de acciones para validar el funcionamiento.

4\. **Sistema de Eventos**: Permite que los componentes se comuniquen entre sí.

### Ventajas de Este Enfoque

1\. **Pruebas Integradas**: Permite probar el servidor y cliente en un mismo entorno.

2\. **Gestión Centralizada**: Un solo host puede gestionar múltiples servidores y clientes.

3\. **Comunicación Interna**: Facilita la comunicación entre componentes sin necesidad de configurar transportes externos.

4\. **Testing Automatizado**: La secuencia de prueba puede ejecutarse automáticamente.

### Flujo de Trabajo

1\. El Host se crea y configura para coordinar comunicaciones

2\. Se configura el servidor con sus recursos y herramientas

3\. Se añade el servidor al host con su transporte

4\. Se crea un cliente de prueba y se añade al host

5\. Se define una secuencia de prueba que accede al recurso y llama a la herramienta

6\. Se inicia el host y se ejecuta la secuencia de prueba

7\. Al completar, se emite un evento que detiene el host

Esta implementación muestra cómo los componentes MCP pueden trabajar juntos en un entorno integrado, facilitando tanto el desarrollo como las pruebas.

Similar code found with 3 license types