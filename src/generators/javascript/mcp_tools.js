import { javascriptGenerator, Order } from 'blockly/javascript';

/**
 * Generadores JavaScript para bloques de herramientas MCP
 */

javascriptGenerator.forBlock['mcp_define_tool'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC);
  const config = javascriptGenerator.statementToCode(block, 'CONFIG');
  
  // Variables para almacenar configuración de la herramienta
  let description = '"Herramienta MCP"';
  let parameters = '{}';
  let callback = 'async (params) => { return { content: [{ type: "text", text: "Sin implementación" }] }; }';
  
  // Extraer la configuración del bloque
  const configLines = config.trim().split('\n');
  
  // Procesar las líneas de configuración
  configLines.forEach(line => {
    if (line.includes('// DESCRIPTION: ')) {
      description = line.split('// DESCRIPTION: ')[1];
    } else if (line.includes('// PARAMETERS: ')) {
      parameters = line.split('// PARAMETERS: ')[1];
    } else if (line.includes('// CALLBACK: ')) {
      callback = line.split('// CALLBACK: ')[1];
    }
  });
  
  return `servidor.tool(
  ${name},
  ${description},
  ${parameters},
  ${callback}
);\n`;
};

javascriptGenerator.forBlock['mcp_tool_description'] = function(block) {
  const description = javascriptGenerator.valueToCode(block, 'DESCRIPTION', Order.ATOMIC);
  return `// DESCRIPTION: ${description}\n`;
};

javascriptGenerator.forBlock['mcp_tool_parameter'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC);
  const type = block.getFieldValue('TYPE');
  
  // Mapear tipos a validadores zod
  let zodType;
  if (type === 'string') {
    zodType = 'z.string()';
  } else if (type === 'number') {
    zodType = 'z.number()';
  } else if (type === 'boolean') {
    zodType = 'z.boolean()';
  } else {
    zodType = 'z.any()';
  }
  
  return `// PARAMETER: { ${name.replace(/['"]+/g, '')}: ${zodType} }\n`;
};

javascriptGenerator.forBlock['mcp_tool_callback'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'CALLBACK_BODY');
  
  return `// CALLBACK: async (params) => {
${body}
  }\n`;
};

javascriptGenerator.forBlock['mcp_return_tool_response'] = function(block) {
  const type = javascriptGenerator.valueToCode(block, 'TYPE', Order.ATOMIC);
  const text = javascriptGenerator.valueToCode(block, 'TEXT', Order.ATOMIC);
  
  return `return {
  content: [
    {
      type: ${type},
      text: ${text}
    }
  ]
};\n`;
};

javascriptGenerator.forBlock['mcp_get_parameter_value'] = function(block) {
  const param = javascriptGenerator.valueToCode(block, 'PARAM', Order.ATOMIC);
  return [`params.${param.replace(/['"]+/g, '')}`, Order.MEMBER];
};