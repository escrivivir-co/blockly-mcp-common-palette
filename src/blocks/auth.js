export const tauth = [
    {
        kind: "category",
        name: "MCP Autenticación",
        colour: "#815CA6",
        contents: [
            {
                kind: "block",
                type: "mcp_configure_oauth",
                inputs: {
                    URL_PROVIDER: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "https://auth.example.com",
                            },
                        },
                    },
                    CLIENT_ID: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "mi-cliente",
                            },
                        },
                    },
                    SCOPE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "read write",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_define_protected_resource",
            },
            {
                kind: "block",
                type: "mcp_define_protected_tool",
            },
            {
                kind: "block",
                type: "mcp_verify_permissions",
                inputs: {
                    PERMISSION: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "read",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_get_auth_token",
            },
            {
                kind: "block",
                type: "mcp_get_auth_user",
            },
        ],
    },
];
