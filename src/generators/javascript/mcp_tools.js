import { javascriptGenerator, Order } from 'blockly/javascript';

/**
 * Generadores JavaScript para bloques de herramientas MCP (Simplificado)
 */

// Generador refactorizado para definir una herramienta (con IIFE para aislamiento)
javascriptGenerator.forBlock['mcp_define_tool'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || 'null';
  // Procesar bloques internos para obtener su código como string
  const configCode = javascriptGenerator.statementToCode(block, 'CONFIG');

  // Envolver toda la lógica de definición en una IIFE para aislar el scope
  const code = `
(function() {
  // Variables locales para esta definición de herramienta específica
  let toolDescription = '"Herramienta sin descripción"'; // Valor por defecto
  let toolParamNames = []; // Array para nombres de parámetros
  let toolCallbackBody = 'return { content: [{ type: "text", text: "Sin implementación" }] };'; // Cuerpo por defecto

  // Variables temporales usadas por los generadores internos (locales a esta IIFE)
  let __temp_description = toolDescription; // Inicializa con el default externo
  let __temp_param_names = []; // Inicializa vacío
  // CORRECCIÓN: Inicializa __temp_callback_body con el string por defecto directamente
  let __temp_callback_body = 'return { content: [{ type: "text", text: "Sin implementación" }] };';

  // Ejecutar el código generado por los bloques internos (esto poblará las variables __temp_)
  ${configCode}

  // Asignar los valores de las variables temporales a las variables locales de la IIFE
  toolDescription = __temp_description;
  toolParamNames = __temp_param_names;
  // Aquí toolCallbackBody SÍ se actualiza con el valor de __temp_callback_body (que fue poblado por configCode)
  toolCallbackBody = __temp_callback_body;

  // Definir la función callback *dentro* de la IIFE (ámbito local)
  const toolCallback = async (params) => {
    try {
      // Ejecutar el cuerpo del callback (que es un string) usando eval o Function constructor
      // NOTA: Usar eval puede tener implicaciones de seguridad si el código no es confiable.
      // Alternativa: const executor = new Function('params', toolCallbackBody); await executor(params);
      // Usamos la variable local 'toolCallbackBody' que ya tiene el valor correcto
      eval(toolCallbackBody);
    } catch (error) {
      console.error('Error en callback de herramienta:', error);
      return { content: [{ type: "text", text: "Error ejecutando herramienta: " + error.message }] };
    }
  };

  // Registrar la herramienta usando las variables y la función callback locales
  // Asegúrate que la firma de servidor.tool coincida (nombre, descripción, array nombres params, callback)
  servidor.tool(${name}, JSON.parse(toolDescription), JSON.stringify(toolParamNames), toolCallback);

})(); // Fin de la IIFE para esta definición de herramienta
\n`; // Añadir nueva línea para separar definiciones

  return code;
};

// Generador refactorizado para descripción (sin cambios, asigna a __temp_description)
javascriptGenerator.forBlock['mcp_tool_description'] = function(block) {
  const description = javascriptGenerator.valueToCode(block, 'DESCRIPTION', Order.ATOMIC) || '""';
  return `__temp_description = ${JSON.stringify(description)};\n`;
};

// Generador refactorizado para parámetro (sin cambios, añade a __temp_param_names)
javascriptGenerator.forBlock['mcp_tool_parameter'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || '""';
  const paramName = name.replace(/^['"]|['"]$/g, '');
  return `__temp_param_names = __temp_param_names || [];\n__temp_param_names.push('${paramName}');\n`;
};

// Generador refactorizado para callback (sin cambios, asigna a __temp_callback_body)
javascriptGenerator.forBlock['mcp_tool_callback'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'CALLBACK_BODY');
  // Asigna a __temp_callback_body. Esto se ejecuta como parte de configCode.
  return `__temp_callback_body = ${JSON.stringify(body)};\n`;
};

// Generador para obtener valor de parámetro (sin cambios)
javascriptGenerator.forBlock['mcp_get_parameter_value'] = function(block) {
    const paramName = javascriptGenerator.valueToCode(block, 'PARAM', Order.ATOMIC) || '""';
    const code = `params[${paramName}]`;
    return [code, Order.MEMBER];
};

// Generador para retornar respuesta de herramienta (sin cambios)
javascriptGenerator.forBlock['mcp_return_tool_response'] = function(block) {
    const type = javascriptGenerator.valueToCode(block, 'TYPE', Order.ATOMIC) || '"text"';
    const text = javascriptGenerator.valueToCode(block, 'TEXT', Order.ATOMIC) || '""';
    return `return { content: [{ type: ${type}, text: ${text} }] };\n`;
};

// Generador para llamar a una herramienta (sin cambios)
javascriptGenerator.forBlock['mcp_call_tool'] = function(block) {
    const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || 'null';
    const params = javascriptGenerator.valueToCode(block, 'PARAMS', Order.ATOMIC) || '{}';
    const code = `await mcp.tools.call(${name}, ${params})`;
    return [code, Order.AWAIT];
};

// Generador para listar herramientas (sin cambios)
javascriptGenerator.forBlock['mcp_list_tools'] = function(block) {
    const code = `await mcp.tools.list()`;
    return [code, Order.AWAIT];
};
