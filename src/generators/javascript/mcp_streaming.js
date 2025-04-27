import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de streaming MCP
 */

javascriptGenerator.forBlock["mcp_define_resource_streaming"] = function (
    block
) {
    const name = javascriptGenerator.valueToCode(block, "NAME", Order.ATOMIC);
    const uri = javascriptGenerator.valueToCode(block, "URI", Order.ATOMIC);
    const callback = javascriptGenerator.statementToCode(block, "CALLBACK");

    const code = `servidor.defineStreamingResource(${name}, ${uri}, async (uri, context) => {
  ${callback}
});\n`;
    return code;
};

javascriptGenerator.forBlock["mcp_stream_resource_start"] = function (block) {
    const type = javascriptGenerator.valueToCode(block, "TYPE", Order.ATOMIC);
    const text = javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC);

    return `context.stream.start(${type}, ${text});\n`;
};

javascriptGenerator.forBlock["mcp_stream_resource_update"] = function (block) {
    const type = javascriptGenerator.valueToCode(block, "TYPE", Order.ATOMIC);
    const text = javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC);

    return `context.stream.update(${type}, ${text});\n`;
};

javascriptGenerator.forBlock["mcp_stream_resource_complete"] = function (
    block
) {
    const type = javascriptGenerator.valueToCode(block, "TYPE", Order.ATOMIC);
    const text = javascriptGenerator.valueToCode(block, "TEXT", Order.ATOMIC);

    return `context.stream.complete(${type}, ${text});\n`;
};

javascriptGenerator.forBlock["mcp_wait"] = function (block) {
    const milliseconds = javascriptGenerator.valueToCode(
        block,
        "MILLISECONDS",
        Order.ATOMIC
    );

    return `await new Promise(resolve => setTimeout(resolve, ${milliseconds}));\n`;
};

javascriptGenerator.forBlock["mcp_generate_id"] = function (block) {
    const prefix = javascriptGenerator.valueToCode(
        block,
        "PREFIX",
        Order.ATOMIC
    );

    return [
        `${prefix} + "-" + Math.random().toString(36).substr(2, 9)`,
        Order.FUNCTION_CALL,
    ];
};
