import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de storage MCP
 */

javascriptGenerator.forBlock["mcp_configure_storage"] = function (block) {
    const type = javascriptGenerator.valueToCode(block, "TYPE", Order.ATOMIC);
    const conn = javascriptGenerator.valueToCode(
        block,
        "CONNECTION",
        Order.ATOMIC
    );
    return `await mcp.storage.configure(${type}, ${conn});\n`;
};

javascriptGenerator.forBlock["mcp_db_query"] = function (block) {
    const table = javascriptGenerator.valueToCode(block, "TABLE", Order.ATOMIC);
    const code = `await mcp.storage.query(${table})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_db_insert"] = function (block) {
    const table = javascriptGenerator.valueToCode(block, "TABLE", Order.ATOMIC);
    const data = javascriptGenerator.valueToCode(block, "DATA", Order.ATOMIC);
    return `await mcp.storage.insert(${table}, ${data});\n`;
};

javascriptGenerator.forBlock["mcp_db_update"] = function (block) {
    const table = javascriptGenerator.valueToCode(block, "TABLE", Order.ATOMIC);
    const filter = javascriptGenerator.valueToCode(
        block,
        "FILTER",
        Order.ATOMIC
    );
    const data = javascriptGenerator.valueToCode(block, "DATA", Order.ATOMIC);
    return `await mcp.storage.update(${table}, ${filter}, ${data});\n`;
};

javascriptGenerator.forBlock["mcp_db_delete"] = function (block) {
    const table = javascriptGenerator.valueToCode(block, "TABLE", Order.ATOMIC);
    const filter = javascriptGenerator.valueToCode(
        block,
        "FILTER",
        Order.ATOMIC
    );
    return `await mcp.storage.delete(${table}, ${filter});\n`;
};

javascriptGenerator.forBlock["mcp_session_store"] = function (block) {
    const key = javascriptGenerator.valueToCode(block, "KEY", Order.ATOMIC);
    const value = javascriptGenerator.valueToCode(block, "VALUE", Order.ATOMIC);
    return `await mcp.session.store(${key}, ${value});\n`;
};

javascriptGenerator.forBlock["mcp_session_retrieve"] = function (block) {
    const key = javascriptGenerator.valueToCode(block, "KEY", Order.ATOMIC);
    const code = `await mcp.session.retrieve(${key})`;
    return [code, Order.FUNCTION_CALL];
};
