import { javascriptGenerator, Order } from "blockly/javascript";
// Asumiendo que ResourceTemplate está disponible globalmente o importado
// import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Generadores JavaScript para bloques de recursos MCP
 */

// Generador para definir un recurso estático
javascriptGenerator.forBlock["mcp_define_resource_static"] = function (block) {
    const name =
        javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC) || "null";
    const uri =
        javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC) || "null";
    // Procesar el callback interno
    const callbackCode = javascriptGenerator.statementToCode(block, "CALLBACK");
    // Extraer el cuerpo real del callback generado por mcp_resource_callback
    let callbackBody = "// Callback no definido";
    if (callbackCode) {
        // Asumimos que mcp_resource_callback genera `let __resource_callback_body = \`...\`;`
        const match = callbackCode.match(
            /__resource_callback_body\s*=\s*`(.*?)`;/s
        ); // 's' para multilínea
        if (match && match[1]) {
            callbackBody = match[1].replace(/\\`/g, "`"); // Reemplazar escapes si es necesario
        }
    }

    // Generar la llamada a servidor.resource para URI fija
    return `servidor.resource(
  ${name},
  ${uri},
  async (uri) => { // El callback recibe la URI solicitada
    try {
${callbackBody}
    } catch (error) {
      console.error('Error en callback de recurso estático:', error);
      // Considerar retornar un error MCP si es aplicable
      return { contents: [] }; // Retorno seguro en caso de error
    }
  }
);\n`;
};

// Generador para definir un recurso dinámico
javascriptGenerator.forBlock["mcp_define_resource_dynamic"] = function (block) {
    const name =
        javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC) || "null";
    const templateUri =
        javascriptGenerator.valueToCode(block, "TEMPLATE_URI", Order.ATOMIC) ||
        "null";
    // Procesar el callback interno
    const callbackCode = javascriptGenerator.statementToCode(block, "CALLBACK");
    // Extraer el cuerpo real del callback generado por mcp_resource_callback
    let callbackBody = "// Callback no definido";
    if (callbackCode) {
        const match = callbackCode.match(
            /__resource_callback_body\s*=\s*`(.*?)`;/s
        );
        if (match && match[1]) {
            callbackBody = match[1].replace(/\\`/g, "`");
        }
    }

    // Generar la llamada a servidor.resource usando ResourceTemplate
    // ¡Asegúrate que ResourceTemplate esté disponible en el scope!
    return `servidor.resource(
  ${name},
  new ResourceTemplate(${templateUri}, { list: undefined }), // Asume que no es listable por defecto
  async (uri, params) => { // El callback recibe uri y params extraídos
    try {
${callbackBody}
    } catch (error) {
      console.error('Error en callback de recurso dinámico:', error);
      return { contents: [] };
    }
  }
);\n`;
};

// Generador para el bloque de callback (común)
javascriptGenerator.forBlock["mcp_resource_callback"] = function (block) {
    const body = javascriptGenerator.statementToCode(block, "CALLBACK_BODY");
    // Usamos una variable temporal para pasar el cuerpo al contenedor
    // Usamos template literals para manejar saltos de línea y escapes simples
    return `let __resource_callback_body = \`${body.replace(/`/g, "\\`")}\`;\n`;
};

// Generador para retornar contenido de recurso (dentro del callback)
javascriptGenerator.forBlock["mcp_return_resource_content"] = function (block) {
    // Obtener la URI específica que se retorna (puede ser la misma que la de entrada o una diferente si hay redirección implícita)
    const uri =
        javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC) || "uri"; // 'uri' es el parámetro del callback
    const text =
        javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC) || '""';

    // Genera la estructura de retorno esperada por el SDK
    return `return {
  contents: [
    {
      uri: String(${uri}), // Asegurar que sea string
      text: ${text}
    }
  ]
};\n`;
};

// Generador para obtener variable de plantilla URI (dentro del callback dinámico)
javascriptGenerator.forBlock["mcp_get_template_variable"] = function (block) {
    const varName =
        javascriptGenerator.valueToCode(block, "VAR_NAME", Order.ATOMIC) ||
        '""';
    // Asume que 'params' (segundo argumento del callback dinámico) está disponible
    const code = `params[${varName}]`;
    return [code, Order.MEMBER];
};

// --- Generadores para Bloques Faltantes ---

// Generador para leer un recurso (Cliente/Servidor)
javascriptGenerator.forBlock["mcp_read_resource"] = function (block) {
    const uri =
        javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC) || "null";
    // Asume una API mcp.resources.read en el cliente/servidor
    const code = `await mcp.resources.read(${uri})`;
    return [code, Order.AWAIT];
};

// Generador para listar recursos (Cliente/Servidor)
javascriptGenerator.forBlock["mcp_list_resources"] = function (block) {
    // Asume una API mcp.resources.list en el cliente/servidor
    const code = `await mcp.resources.list()`;
    return [code, Order.AWAIT];
};

// Generador para metadatos (Opcional)
/*
javascriptGenerator.forBlock['mcp_resource_metadata'] = function(block) {
  // ... generar código para metadatos ...
  return '';
};
*/
