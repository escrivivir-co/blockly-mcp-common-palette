import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de Host MCP y testing
 */

javascriptGenerator.forBlock["mcp_create_host"] = function (block) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);

    const code = `createMcpHost({\n  name: ${name}\n})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_host_add_server"] = function (block) {
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);
    const serverId = javascriptGenerator.valueToCode(
        block,
        "SERVER_ID",
        Order.ATOMIC
    );
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

    return `${host}.addServer(${serverId}, ${server}, ${transport});\n`;
};

javascriptGenerator.forBlock["mcp_host_add_client"] = function (block) {
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);
    const clientId = javascriptGenerator.valueToCode(
        block,
        "CLIENT_ID",
        Order.ATOMIC
    );
    const client = javascriptGenerator.valueToCode(
        block,
        "CLIENT",
        Order.ATOMIC
    );

    return `${host}.addClient(${clientId}, ${client});\n`;
};

javascriptGenerator.forBlock["mcp_host_start"] = function (block) {
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);

    return `(async () => {
  try {
    await ${host}.start();
    console.log("Host MCP iniciado exitosamente");
  } catch (error) {
    console.error("Error iniciando host MCP:", error);
  }
})();\n`;
};

javascriptGenerator.forBlock["mcp_host_stop"] = function (block) {
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);

    return `(async () => {
  try {
    await ${host}.stop();
    console.log("Host MCP detenido exitosamente");
  } catch (error) {
    console.error("Error deteniendo host MCP:", error);
  }
})();\n`;
};

javascriptGenerator.forBlock["mcp_create_test_client"] = function (block) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);

    const code = `new McpClient({\n  name: ${name},\n  version: "1.0.0"\n})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_test_read_resource"] = function (block) {
    const client = javascriptGenerator.valueToCode(
        block,
        "CLIENT",
        Order.ATOMIC
    );
    const uri = javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC);

    return `(async () => {
  try {
    console.log("Leyendo recurso " + ${uri} + "...");
    const resourceResult = await ${client}.readResource(${uri});
    console.log("Recurso leído:", resourceResult.contents[0].text);
  } catch (error) {
    console.error("Error leyendo recurso:", error);
  }
})();\n`;
};

javascriptGenerator.forBlock["mcp_test_call_tool"] = function (block) {
    const client = javascriptGenerator.valueToCode(
        block,
        "CLIENT",
        Order.ATOMIC
    );
    const toolName = javascriptGenerator.valueToCode(
        block,
        "TOOL_NAME",
        Order.ATOMIC
    );
    const message = javascriptGenerator.valueToCode(
        block,
        "MESSAGE",
        Order.ATOMIC
    );

    return `(async () => {
  try {
    console.log("Llamando herramienta " + ${toolName} + "...");
    const toolResult = await ${client}.callTool(${toolName}, { mensaje: ${message} });
    console.log("Respuesta de herramienta:", toolResult.content[0].text);
  } catch (error) {
    console.error("Error llamando herramienta:", error);
  }
})();\n`;
};

javascriptGenerator.forBlock["mcp_test_run_sequence"] = function (block) {
    const sequence = javascriptGenerator.statementToCode(block, "SEQUENCE");

    return `// Secuencia de prueba
const runTestSequence = async () => {
${sequence}
};

// Ejecutar secuencia de prueba con un pequeño retraso para asegurar que todo esté listo
setTimeout(() => {
  runTestSequence().catch(error => {
    console.error("Error en secuencia de prueba:", error);
  });
}, 1000);\n`;
};

javascriptGenerator.forBlock["mcp_host_on_event"] = function (block) {
    const event = block.getFieldValue("EVENT");
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);
    const handler = javascriptGenerator.statementToCode(block, "HANDLER");

    return `${host}.on("${event}", (data) => {
${handler}
});\n`;
};

javascriptGenerator.forBlock["mcp_host_emit_event"] = function (block) {
    const host = javascriptGenerator.valueToCode(block, "HOST", Order.ATOMIC);
    const eventName = javascriptGenerator.valueToCode(
        block,
        "EVENT_NAME",
        Order.ATOMIC
    );
    const data = javascriptGenerator.valueToCode(block, "DATA", Order.ATOMIC);

    return `${host}.emitEvent(${eventName}, ${data});\n`;
};
