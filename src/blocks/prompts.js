export const tprompts = [
    {
        kind: "category",
        name: "MCP Prompts",
        colour: "#A6815C",
        contents: [
            {
                kind: "block",
                type: "mcp_define_prompt",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "mi-prompt",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_prompt_description",
                inputs: {
                    DESCRIPTION: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Descripción del prompt",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_prompt_argument",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "argumento",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_prompt_callback",
            },
            {
                kind: "block",
                type: "mcp_return_prompt_messages",
            },
            {
                kind: "block",
                type: "mcp_add_message",
                inputs: {
                    ROLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "user",
                            },
                        },
                    },
                    CONTENT: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Contenido del mensaje",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_get_prompt",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "mi-prompt",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_list_prompts",
            },
            {
                kind: "block",
                type: "mcp_get_argument_value",
                inputs: {
                    ARG: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "argumento",
                            },
                        },
                    },
                },
            },
        ],
    },
];
