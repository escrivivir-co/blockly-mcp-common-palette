export const tapp = [
    {
        kind: "category",

        name: "MCP Host",

        colour: "#5270A6",

        contents: [
            {
                kind: "block",

                type: "mcp_create_host",

                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "Mi Host MCP",
                            },
                        },
                    },
                },
            },

            {
                kind: "block",

                type: "mcp_host_add_server",
            },

            {
                kind: "block",

                type: "mcp_host_add_client",

                inputs: {
                    CLIENT_NAME: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "cliente-test",
                            },
                        },
                    },
                },
            },

            {
                kind: "block",

                type: "mcp_host_start",
            },

            {
                kind: "block",

                type: "mcp_host_stop",
            },

            {
                kind: "block",

                type: "mcp_create_test_client",

                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "Cliente Test",
                            },
                        },
                    },
                },
            },

            {
                kind: "block",

                type: "mcp_test_read_resource",

                inputs: {
                    URI: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "info://server",
                            },
                        },
                    },
                },
            },

            {
                kind: "block",

                type: "mcp_test_call_tool",

                inputs: {
                    TOOL_NAME: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "eco",
                            },
                        },
                    },

                    MESSAGE: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "¡Hola MCP!",
                            },
                        },
                    },
                },
            },

            {
                kind: "block",

                type: "mcp_test_run_sequence",
            },

            {
                kind: "block",

                type: "mcp_host_on_event",
            },

            {
                kind: "block",

                type: "mcp_host_emit_event",

                inputs: {
                    EVENT_NAME: {
                        shadow: {
                            type: "text",

                            fields: {
                                TEXT: "test-complete",
                            },
                        },
                    },
                },
            },
        ],
    },
];
