export const ttools = [
    {
        kind: "category",
        name: "MCP Herramientas",
        colour: "#81A65C",
        contents: [
            {
                kind: "block",
                type: "mcp_define_tool",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "mi-herramienta",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_tool_description",
                inputs: {
                    DESCRIPTION: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Descripción de la herramienta",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_tool_parameter",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "parametro",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_tool_callback",
            },
            {
                kind: "block",
                type: "mcp_return_tool_response",
                inputs: {
                    TEXT: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Respuesta de la herramienta",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_call_tool",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "mi-herramienta",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_list_tools",
            },
            {
                kind: "block",
                type: "mcp_get_parameter_value",
                inputs: {
                    PARAM: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "parametro",
                            },
                        },
                    },
                },
            },
        ],
    },
];
