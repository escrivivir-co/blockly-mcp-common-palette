export const tnotifications = [
  {
    kind: "category",
    name: "MCP Notificaciones",
    colour: "#8E7CC3",
    contents: [
      {
        kind: "block",
        type: "mcp_create_notification_system",
        fields: {
          NOTIFICATION_TYPE: "realtime"
        },
        inputs: {
          CHANNEL: {
            shadow: {
              type: "text",
              fields: {
                TEXT: "notificaciones",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "mcp_send_notification",
      },
      {
        kind: "block",
        type: "mcp_register_notification_subscriber",
      },
      {
        kind: "block",
        type: "mcp_client_on_notification",
      },
    ],
  }
];