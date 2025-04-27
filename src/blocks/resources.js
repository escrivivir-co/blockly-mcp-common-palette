import * as Blockly from "blockly/core";

/**
 * Bloques para recursos MCP
 */

// Bloque para definir un recurso estático
Blockly.Blocks["mcp_define_resource_static"] = {
    init: function () {
        this.appendDummyInput().appendField("Definir Recurso Estático");
        this.appendValueInput("NAME").setCheck("String").appendField("nombre");
        this.appendValueInput("URI").setCheck("String").appendField("uri exacta");
        this.appendStatementInput("CALLBACK")
            .setCheck("mcp_resource_callback") // Solo permite el callback
            .appendField("función callback");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Define un recurso estático para un servidor MCP (URI fija).");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para definir un recurso dinámico (con plantilla URI)
Blockly.Blocks["mcp_define_resource_dynamic"] = {
    init: function () {
        this.appendDummyInput().appendField("Definir Recurso Dinámico");
        this.appendValueInput("NAME").setCheck("String").appendField("nombre");
        this.appendValueInput("TEMPLATE_URI").setCheck("String").appendField("plantilla uri (ej: data://{id})");
        this.appendStatementInput("CALLBACK")
            .setCheck("mcp_resource_callback") // Solo permite el callback
            .appendField("función callback");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Define un recurso dinámico usando una plantilla URI con variables.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};


// Bloque para el callback de recurso (común a estático y dinámico)
Blockly.Blocks["mcp_resource_callback"] = {
    init: function () {
        this.appendDummyInput().appendField("al solicitar recurso");
        this.appendStatementInput("CALLBACK_BODY").setCheck(null); // Cuerpo del callback
        this.setPreviousStatement(true, "mcp_resource_callback"); // Se conecta a los bloques de definición
        // No tiene conexión siguiente
        this.setColour(290);
        this.setTooltip("Define el código a ejecutar cuando se solicita este recurso.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para retornar contenido de recurso (dentro del callback)
Blockly.Blocks["mcp_return_resource_content"] = {
    init: function () {
        this.appendDummyInput().appendField("Retornar Contenido de Recurso");
        this.appendValueInput("URI").setCheck("String").appendField("uri específica"); // La URI exacta que se retorna
        this.appendValueInput("TEXT").setCheck("String").appendField("contenido (texto)");
        this.setPreviousStatement(true, null); // Se usa dentro del callback
        // No tiene conexión siguiente, es un retorno
        this.setColour(300); // Color ligeramente diferente para operaciones dentro del callback
        this.setTooltip("Retorna el contenido para la URI solicitada.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para obtener variable de plantilla URI (dentro del callback dinámico)
Blockly.Blocks["mcp_get_template_variable"] = {
    init: function () {
        this.appendValueInput("VAR_NAME")
            .setCheck("String")
            .appendField("valor variable plantilla"); // ej: 'itemId' de data://items/{itemId}
        this.setOutput(true, "String"); // Asume que las variables son strings
        this.setColour(300);
        this.setTooltip("Obtiene el valor de una variable de la plantilla URI dentro del callback.");
        this.setHelpUrl("https://modelcontextprotocol.io");
        // Idealmente, añadir contexto para asegurar que solo se use dentro de mcp_resource_callback de un recurso dinámico
    },
};

// --- Bloques Faltantes Implementados ---

// Bloque para leer un recurso (Cliente/Servidor)
Blockly.Blocks["mcp_read_resource"] = {
    init: function () {
        this.appendValueInput("URI")
            .setCheck("String")
            .appendField("leer recurso");
        this.setOutput(true, null); // La salida es el contenido del recurso (puede ser complejo)
        this.setColour(310); // Color para interacción con recursos
        this.setTooltip("Lee el contenido de un recurso por su URI.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para listar recursos (Cliente/Servidor)
Blockly.Blocks["mcp_list_resources"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("listar recursos");
        this.setOutput(true, "Array"); // Devuelve un array de definiciones/URIs
        this.setColour(310);
        this.setTooltip("Obtiene una lista de los recursos disponibles en el servidor.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para metadatos (Opcional, si se implementa)
/*
Blockly.Blocks["mcp_resource_metadata"] = {
    init: function() {
        this.appendDummyInput()
            .appendField("metadatos recurso");
        // ... definir inputs/outputs para metadatos ...
        this.setColour(290);
        this.setTooltip("Define o recupera metadatos asociados a un recurso.");
        this.setHelpUrl("https://modelcontextprotocol.io");
    }
};
*/
