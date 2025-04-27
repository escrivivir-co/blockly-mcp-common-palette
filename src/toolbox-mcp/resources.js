export const tresources = [
    {
        kind: "category",
        name: "MCP Recursos",
        colour: "#A65C81",
        contents: [
            // --- Definición de Recursos ---
            {
                kind: "block",
                type: "mcp_define_resource_static",
                inputs: {
                    NAME: {
                        shadow: { type: "text", fields: { TEXT: "mi_recurso_estatico" } },
                    },
                    URI: {
                        shadow: { type: "text", fields: { TEXT: "static://valor" } },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_define_resource_dynamic", // Nuevo bloque para plantillas
                inputs: {
                    NAME: {
                        shadow: { type: "text", fields: { TEXT: "mi_recurso_dinamico" } },
                    },
                    TEMPLATE_URI: { // URI con placeholders como {param}
                        shadow: { type: "text", fields: { TEXT: "dynamic://items/{itemId}" } },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_resource_callback", // Usado por ambos tipos de definición
            },
            // --- Dentro del Callback ---
            {
                kind: "block",
                type: "mcp_return_resource_content",
                inputs: {
                    URI: { // La URI específica que se está retornando
                        shadow: { type: "text", fields: { TEXT: "" } }, // Dejar vacío, se suele obtener de la entrada del callback
                    },
                    TEXT: {
                        shadow: { type: "text", fields: { TEXT: "Contenido del recurso" } },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_get_template_variable", // Nuevo: Para obtener {itemId} dentro del callback dinámico
                inputs: {
                    VAR_NAME: {
                        shadow: { type: "text", fields: { TEXT: "itemId" } },
                    },
                },
            },
             // --- Interacción con Recursos (Cliente/Servidor) ---
            {
                kind: "block",
                type: "mcp_read_resource",
                inputs: {
                    URI: {
                        shadow: { type: "text", fields: { TEXT: "dynamic://items/123" } },
                    },
                },
            },
            {
                kind: "block",
                type: "mcp_list_resources",
            },
            // mcp_resource_metadata podría ser útil si se implementa la capacidad
            // {
            //     kind: "block",
            //     type: "mcp_resource_metadata",
            // },
        ],
    },
];
