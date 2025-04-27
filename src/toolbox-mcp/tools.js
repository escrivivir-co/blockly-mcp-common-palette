export const ttools = [
    {
        kind: "category",
        name: "MCP Herramientas",
        colour: "#5CA681", // Color distintivo para herramientas
        contents: [
            // --- Definición de Herramienta ---
            {
                kind: "block",
                type: "mcp_define_tool",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: { TEXT: "mi_herramienta" },
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
                            fields: { TEXT: "Descripción de la herramienta" },
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
                            fields: { TEXT: "parametro" },
                        },
                    },
                },
                // No añadimos sombra para TYPE, ya que es un dropdown
            },
            {
                kind: "block",
                type: "mcp_tool_callback",
            },
            // --- Uso dentro del Callback ---
            {
                kind: "block",
                type: "mcp_get_parameter_value",
                inputs: {
                    PARAM: { // Asegúrate que el nombre del input coincida con el bloque
                        shadow: {
                            type: "text",
                            fields: { TEXT: "parametro" },
                        },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_return_tool_response",
                inputs: {
                    TYPE: { // Input para el tipo de contenido
                        shadow: {
                            type: "text",
                            fields: { TEXT: "text" },
                        },
                    },
                    TEXT: { // Input para el contenido/texto
                        shadow: {
                            type: "text",
                            fields: { TEXT: "Resultado de la herramienta" },
                        },
                    },
                },
            },
            // --- Interacción con Herramientas (Cliente/Servidor) ---
            {
                kind: "block",
                type: "mcp_call_tool",
                inputs: {
                    NAME: {
                        shadow: {
                            type: "text",
                            fields: { TEXT: "mi_herramienta" },
                        },
                    },
                    // No añadimos sombra para PARAMS, ya que espera un objeto
                },
            },
            {
                kind: "block",
                type: "mcp_list_tools",
            },
        ],
    },
];
