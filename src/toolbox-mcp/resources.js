export const tresources = [
    {
        kind: "category",
        name: "MCP Recursos",
        colour: "#A65C81",
        contents: [
            {
                kind: "block",
                type: "mcp_define_resource_static",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "recurso",
                            },
                        },
                    },
                    URI: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "ejemplo://recurso",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_define_resource_template",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "plantilla",
                            },
                        },
                    },
                    TEMPLATE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "ejemplo://{param}",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_resource_callback",
            },
            {
                kind: "block",
                type: "mcp_return_resource_content",
                inputs: {
                    URI: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "",
                            },
                        },
                    },
                    TEXT: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "Contenido del recurso",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_resource_metadata",
            },
            {
                kind: "block",
                type: "mcp_read_resource",
                inputs: {
                    URI: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "ejemplo://recurso",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_list_resources",
            },
            {
                kind: "block",
                type: "mcp_get_template_variables",
            },
        ],
    },
];
