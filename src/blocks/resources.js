import * as Blockly from 'blockly/core';

/**
 * Bloques para recursos MCP
 */

// Bloque para definir un recurso estático
Blockly.Blocks['mcp_define_resource_static'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Definir Recurso Estático");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendValueInput("URI")
        .setCheck("String")
        .appendField("uri");
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .appendField("función callback");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Define un recurso estático para un servidor MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para el callback de recurso
Blockly.Blocks['mcp_resource_callback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Recursos - Función Callback");
    this.appendStatementInput("CALLBACK_BODY")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Función callback para procesar una solicitud de recurso");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para retornar contenido de recurso
Blockly.Blocks['mcp_return_resource_content'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Retornar Contenido de Recurso");
    this.appendValueInput("URI")
        .setCheck("String")
        .appendField("uri");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("texto");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Retorna un objeto de contenido de recurso");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};