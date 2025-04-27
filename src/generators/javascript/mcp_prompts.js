import { javascriptGenerator, Order } from 'blockly/javascript';

/**
 * Generadores JavaScript para bloques de Prompts MCP (Versión Ampliada)
 */

// Generador para el bloque contenedor principal
javascriptGenerator.forBlock['mcp_define_prompt'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || 'null';
  // Procesar descripción, argumentos y callback por separado
  const descriptionCode = javascriptGenerator.statementToCode(block, 'DESCRIPTION');
  const argsCode = javascriptGenerator.statementToCode(block, 'ARGUMENTS');
  const callbackCode = javascriptGenerator.statementToCode(block, 'CALLBACK');

  // Extraer la descripción real del código generado para mcp_prompt_description
  // Asumimos que mcp_prompt_description genera algo como: `__description = 'texto';`
  let description = 'null';
  if (descriptionCode) {
    const match = descriptionCode.match(/__description\s*=\s*(.*?);/);
    if (match && match[1]) {
      description = match[1]; // Extrae el valor asignado
    }
  }

  // Extraer los nombres de los argumentos del código generado para mcp_prompt_argument
  // Asumimos que mcp_prompt_argument genera algo como: `__args.push('nombre');`
  let args = '[]';
  if (argsCode) {
    const argNames = [];
    const regex = /__args\.push\((.*?)\);/g;
    let match;
    while ((match = regex.exec(argsCode)) !== null) {
      if (match[1]) {
        argNames.push(match[1]); // Extrae el nombre del argumento
      }
    }
    if (argNames.length > 0) {
      args = `[${argNames.join(', ')}]`;
    }
  }

  // El código del callback ya está generado por statementToCode
  // Necesitamos envolverlo en la definición de la función async
  const finalCallbackCode = `async (context) => {\n${callbackCode}}`;

  // Construir el objeto de definición del prompt
  const definition = `{
    description: ${description},
    arguments: ${args},
    callback: ${finalCallbackCode}
  }`;

  // Generar la llamada final a la API del servidor
  const code = `servidor.definePrompt(${name}, ${definition});\n`;
  return code;
};

// Generador para el bloque de descripción
javascriptGenerator.forBlock['mcp_prompt_description'] = function(block) {
  const descriptionText = javascriptGenerator.valueToCode(block, 'DESCRIPTION', Order.ATOMIC) || '""';
  // Usamos una variable temporal para pasar la descripción al contenedor
  return `let __description = ${descriptionText};\n`;
};

// Generador para el bloque de argumento
javascriptGenerator.forBlock['mcp_prompt_argument'] = function(block) {
  const argName = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || '""';
  // Usamos un array temporal para pasar los argumentos al contenedor
  // Inicializamos el array si no existe (esto es un poco hacky, idealmente el contenedor lo haría)
  return `let __args = __args || [];\n__args.push(${argName});\n`;
};

// Generador para el bloque de callback (simplemente procesa el cuerpo)
javascriptGenerator.forBlock['mcp_prompt_callback'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'CALLBACK_BODY');
  return body; // El contenedor mcp_define_prompt lo envolverá en async (context) => { ... }
};

// Generador para el bloque de retorno de mensajes
javascriptGenerator.forBlock['mcp_return_prompt_messages'] = function(block) {
  const messagesCode = javascriptGenerator.statementToCode(block, 'MESSAGES');
  // Asumimos que mcp_add_message genera código que añade a un array __messages
  // Inicializamos el array si no existe
  const code = `let __messages = [];\n${messagesCode}return { content: __messages };\n`;
  return code;
};

// Generador para añadir un mensaje
javascriptGenerator.forBlock['mcp_add_message'] = function(block) {
  const role = javascriptGenerator.valueToCode(block, 'ROLE', Order.ATOMIC) || '"user"';
  const content = javascriptGenerator.valueToCode(block, 'CONTENT', Order.ATOMIC) || '""';
  // Añadimos al array temporal __messages
  return `__messages.push({ role: ${role}, content: [{ type: "text", text: ${content} }] });\n`;
};

// Generador para obtener un prompt (asume API del lado del cliente/servidor)
javascriptGenerator.forBlock['mcp_get_prompt'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC) || 'null';
  const code = `await mcp.prompts.get(${name})`; // Asume una API mcp.prompts
  return [code, Order.AWAIT];
};

// Generador para listar prompts (asume API del lado del cliente/servidor)
javascriptGenerator.forBlock['mcp_list_prompts'] = function(block) {
  const code = `await mcp.prompts.list()`; // Asume una API mcp.prompts
  return [code, Order.AWAIT];
};

// Generador para obtener valor de argumento (dentro del callback)
javascriptGenerator.forBlock['mcp_get_argument_value'] = function(block) {
  const argName = javascriptGenerator.valueToCode(block, 'ARG', Order.ATOMIC) || '""';
  // Asume que 'context' está disponible en el scope del callback
  const code = `context.arguments[${argName}]`;
  return [code, Order.MEMBER];
};

// Eliminar o comentar generadores antiguos si ya no se usan
// delete javascriptGenerator.forBlock['mcp_define_prompt_static'];
// delete javascriptGenerator.forBlock['mcp_return_prompt_response'];