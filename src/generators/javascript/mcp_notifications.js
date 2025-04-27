import { javascriptGenerator, Order } from "blockly/javascript";

/**
 * Generadores JavaScript para bloques de notificaciones MCP
 */

javascriptGenerator.forBlock["mcp_create_notification_system"] = function (
    block
) {
    const notificationType = block.getFieldValue("NOTIFICATION_TYPE");
    const channel = javascriptGenerator.valueToCode(
        block,
        "CHANNEL",
        Order.ATOMIC
    );

    const code = `new McpNotificationSystem({
  type: "${notificationType}",
  channel: ${channel}
})`;
    return [code, Order.FUNCTION_CALL];
};

javascriptGenerator.forBlock["mcp_send_notification"] = function (block) {
    const notificationSystem = javascriptGenerator.valueToCode(
        block,
        "NOTIFICATION_SYSTEM",
        Order.ATOMIC
    );
    const event = javascriptGenerator.valueToCode(block, "EVENT", Order.ATOMIC);
    const data = javascriptGenerator.valueToCode(block, "DATA", Order.ATOMIC);

    return `${notificationSystem}.send(${event}, ${data});\n`;
};

javascriptGenerator.forBlock["mcp_register_notification_subscriber"] =
    function (block) {
        const notificationSystem = javascriptGenerator.valueToCode(
            block,
            "NOTIFICATION_SYSTEM",
            Order.ATOMIC
        );
        const subscriberId = javascriptGenerator.valueToCode(
            block,
            "SUBSCRIBER_ID",
            Order.ATOMIC
        );
        const channel = javascriptGenerator.valueToCode(
            block,
            "CHANNEL",
            Order.ATOMIC
        );

        return `${notificationSystem}.registerSubscriber(${subscriberId}, ${channel});\n`;
    };

javascriptGenerator.forBlock["mcp_client_on_notification"] = function (block) {
    const client = javascriptGenerator.valueToCode(
        block,
        "CLIENT",
        Order.ATOMIC
    );
    const channel = javascriptGenerator.valueToCode(
        block,
        "CHANNEL",
        Order.ATOMIC
    );
    const handler = javascriptGenerator.statementToCode(block, "HANDLER");

    return `${client}.onNotification(${channel}, (data) => {
  ${handler}
});\n`;
};
