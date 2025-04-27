import { javascriptGenerator, Order } from 'blockly/javascript';

/**
 * Generadores JavaScript para bloques de recursos MCP
 */

javascriptGenerator.forBlock['mcp_define_resource_static'] = function(block) {
  const name = javascriptGenerator.valueToCode(block, 'NAME', Order.ATOMIC);
  const uri = javascriptGenerator.valueToCode(block, 'URI', Order.ATOMIC);
  const callback = javascriptGenerator.statementToCode(block, 'CALLBACK');
  
  return `servidor.resource(
  ${name},
  ${uri},
  async (uri) => {
${callback}
  }
);\n`;
};

javascriptGenerator.forBlock['mcp_resource_callback'] = function(block) {
  const body = javascriptGenerator.statementToCode(block, 'CALLBACK_BODY');
  return body;
};

javascriptGenerator.forBlock['mcp_return_resource_content'] = function(block) {
  const uri = javascriptGenerator.valueToCode(block, 'URI', Order.ATOMIC);
  const text = javascriptGenerator.valueToCode(block, 'TEXT', Order.ATOMIC);
  
  return `return {
  contents: [
    {
      uri: ${uri},
      text: ${text}
    }
  ]
};\n`;
};