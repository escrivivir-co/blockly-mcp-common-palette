import * as Blockly from "blockly/core";

/**
 * Bloques para streaming de recursos en MCP
 */

// Bloque para definir un recurso con streaming
Blockly.Blocks["mcp_define_resource_streaming"] = {
    init: function () {
        this.appendDummyInput().appendField("Definir Recurso con Streaming");
        this.appendValueInput("NAME").setCheck("String").appendField("nombre");
        this.appendValueInput("URI").setCheck("String").appendField("URI");
        this.appendStatementInput("CALLBACK")
            .setCheck(null)
            .appendField("callback");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Define un recurso MCP con capacidad de streaming");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para iniciar el streaming de un recurso
Blockly.Blocks["mcp_stream_resource_start"] = {
    init: function () {
        this.appendDummyInput().appendField("Iniciar Streaming de Recurso");
        this.appendValueInput("TYPE").setCheck("String").appendField("tipo");
        this.appendValueInput("TEXT").setCheck("String").appendField("datos");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Inicia el streaming de datos para un recurso");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para actualizar el streaming de un recurso
Blockly.Blocks["mcp_stream_resource_update"] = {
    init: function () {
        this.appendDummyInput().appendField("Actualizar Streaming de Recurso");
        this.appendValueInput("TYPE").setCheck("String").appendField("tipo");
        this.appendValueInput("TEXT").setCheck("String").appendField("datos");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip(
            "Envía una actualización en el streaming de un recurso"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para completar el streaming de un recurso
Blockly.Blocks["mcp_stream_resource_complete"] = {
    init: function () {
        this.appendDummyInput().appendField("Completar Streaming de Recurso");
        this.appendValueInput("TYPE").setCheck("String").appendField("tipo");
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("datos finales");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip(
            "Completa el streaming de un recurso enviando los datos finales"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para esperar un tiempo determinado
Blockly.Blocks["mcp_wait"] = {
    init: function () {
        this.appendDummyInput().appendField("Esperar");
        this.appendValueInput("MILLISECONDS")
            .setCheck("Number")
            .appendField("milisegundos");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Espera un tiempo determinado en milisegundos");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para generar un ID único
Blockly.Blocks["mcp_generate_id"] = {
    init: function () {
        this.appendDummyInput().appendField("Generar ID Único");
        this.appendValueInput("PREFIX")
            .setCheck("String")
            .appendField("prefijo");
        this.setOutput(true, "String");
        this.setColour(120);
        this.setTooltip(
            "Genera un identificador único con el prefijo especificado"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};
