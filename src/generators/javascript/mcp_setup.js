import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de configuración MCP
 */

javascriptGenerator.forBlock["mcp_create_server"] = function (block) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
    const version = javascriptGenerator.valueToCode(
        block,
        "VERSION",
        Order.ATOMIC
    );

    const code = `new McpServer({\n  name: ${name},\n  version: ${version}\n})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_create_client"] = function (block) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
    const version = javascriptGenerator.valueToCode(
        block,
        "VERSION",
        Order.ATOMIC
    );

    const code = `new McpClient({\n  name: ${name},\n  version: ${version}\n})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_stdio_transport_server"] = function (block) {
    return ["new StdioServerTransport()", Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_stdio_transport_client"] = function (block) {
    return ["new StdioClientTransport()", Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_connect"] = function (block) {
    const server = javascriptGenerator.valueToCode(
        block,
        "SERVER",
        Order.ATOMIC
    );
    const transport = javascriptGenerator.valueToCode(
        block,
        "TRANSPORT",
        Order.ATOMIC
    );

    return `(async () => {
  try {
    await ${server}.connect(${transport});
    console.log("Servidor MCP conectado exitosamente");
  } catch (error) {
    console.error("Error conectando servidor MCP:", error);
  }
})();\n`;
};
