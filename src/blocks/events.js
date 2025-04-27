export const tevents = [
    {
        kind: "category",
        name: "MCP Eventos",
        colour: "#5CA681",
        contents: [
            {
                kind: "block",
                type: "mcp_on_connect",
            },
            {
                kind: "block",
                type: "mcp_on_disconnect",
            },
            {
                kind: "block",
                type: "mcp_send_notification",
                inputs: {
                    TITLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Título",
                            },
                        },
                    },
                    MESSAGE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Mensaje de notificación",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_send_progress_notification",
                inputs: {
                    MESSAGE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Progreso...",
                            },
                        },
                    },
                    PROGRESS: {
                        shadow: {
                            type: "math_number",
                            fields: {
                                NUM: 50,
                            },
                        },
                    },
                    TOTAL: {
                        shadow: {
                            type: "math_number",
                            fields: {
                                NUM: 100,
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_on_notification",
            },
            {
                kind: "block",
                type: "mcp_register_error_handler",
            },
        ],
    },
];
