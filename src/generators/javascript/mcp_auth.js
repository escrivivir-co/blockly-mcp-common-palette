import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de autenticación MCP
 */

javascriptGenerator.forBlock["mcp_create_auth_manager"] = function (block) {
    const authType = block.getFieldValue("AUTH_TYPE");
    const secret = javascriptGenerator.valueToCode(
        block,
        "SECRET",
        Order.ATOMIC
    );

    const code = `new McpAuthManager({
  type: "${authType}",
  secret: ${secret}
})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_define_resource_protected"] = function (
    block
) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
    const uri = javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC);
    const authManager = javascriptGenerator.valueToCode(
        block,
        "AUTH_MANAGER",
        Order.ATOMIC
    );
    const callback = javascriptGenerator.statementToCode(block, "CALLBACK");

    const code = `servidor.defineProtectedResource(${name}, ${uri}, ${authManager}, async (uri, context) => {
  ${callback}
});\n`;
    return code;
};

javascriptGenerator.forBlock["mcp_define_tool_protected"] = function (block) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
    const authManager = javascriptGenerator.valueToCode(
        block,
        "AUTH_MANAGER",
        Order.ATOMIC
    );
    const config = javascriptGenerator.statementToCode(block, "CONFIG");

    const code = `servidor.defineProtectedTool(${name}, ${authManager}, (tool) => {
  ${config}
});\n`;
    return code;
};

javascriptGenerator.forBlock["mcp_generate_auth_token"] = function (block) {
    const authManager = javascriptGenerator.valueToCode(
        block,
        "AUTH_MANAGER",
        Order.ATOMIC
    );
    const userId = javascriptGenerator.valueToCode(
        block,
        "USER_ID",
        Order.ATOMIC
    );

    return [`${authManager}.generateToken(${userId})`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_get_request_auth_token"] = function (block) {
    return ["context.request.authToken", Order.MEMBER];
};

javascriptGenerator.forBlock["mcp_get_auth_user_id"] = function (block) {
    const authToken = javascriptGenerator.valueToCode(
        block,
        "AUTH_TOKEN",
        Order.ATOMIC
    );
    const authManager = javascriptGenerator.valueToCode(
        block,
        "AUTH_MANAGER",
        Order.ATOMIC
    );

    return [`${authManager}.getUserId(${authToken})`, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_test_read_resource_with_auth"] = function (
    block
) {
    const client = javascriptGenerator.valueToCode(
        block,
        "CLIENT",
        Order.ATOMIC
    );
    const uri = javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC);

    return `(async () => {
  try {
    const response = await ${client}.readResourceWithAuth(${uri});
    console.log("Respuesta de recurso autenticado:", response);
  } catch (error) {
    console.error("Error leyendo recurso autenticado:", error);
  }
})();\n`;
};

javascriptGenerator.forBlock["mcp_test_call_tool_with_auth"] = function (
    block
) {
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
    const response = await ${client}.callToolWithAuth(${toolName}, ${message});
    console.log("Respuesta de herramienta autenticada:", response);
  } catch (error) {
    console.error("Error llamando herramienta autenticada:", error);
  }
})();\n`;
};
