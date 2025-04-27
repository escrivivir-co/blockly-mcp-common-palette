export const tstorage = [
    {
        kind: "category",
        name: "MCP Almacenamiento",
        colour: "#A65C5C",
        contents: [
            {
                kind: "block",
                type: "mcp_configure_storage",
                inputs: {
                    TYPE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "base de datos",
                            },
                        },
                    },
                    CONNECTION: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "postgres://usuario:clave@localhost/mcp_db",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_db_query",
                inputs: {
                    TABLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "tabla",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_db_insert",
                inputs: {
                    TABLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "tabla",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_db_update",
                inputs: {
                    TABLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "tabla",
                            },
                        },
                    },
                    FILTER: {
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_db_delete",
                inputs: {
                    TABLE: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "tabla",
                            },
                        },
                    },
                    FILTER: {},
                },
            },
            {
                kind: "block",
                type: "mcp_session_store",
                inputs: {
                    KEY: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "clave",
                            },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_session_retrieve",
                inputs: {
                    KEY: {
                        shadow: {
                            type: "text",
                            fields: {
                                TEXT: "clave",
                            },
                        },
                    },
                },
            },
        ],
    },
];
