import * as Blockly from 'blockly/core';

/**
 * Bloques para herramientas MCP
 */

// Bloque para definir una herramienta
Blockly.Blocks['mcp_define_tool'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Definir Herramienta");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendStatementInput("CONFIG")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Define una herramienta para un servidor MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para añadir descripción a una herramienta
Blockly.Blocks['mcp_tool_description'] = {
  init: function() {
    this.appendValueInput("DESCRIPTION")
        .setCheck("String")
        .appendField("descripción");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Establece la descripción de una herramienta");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para definir parámetros de herramienta
Blockly.Blocks['mcp_tool_parameter'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("parámetro");
    this.appendDummyInput()
        .appendField("tipo")
        .appendField(new Blockly.FieldDropdown([
          ["string", "string"], 
          ["number", "number"], 
          ["boolean", "boolean"]
        ]), "TYPE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Define un parámetro para una herramienta");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para el callback de herramienta
Blockly.Blocks['mcp_tool_callback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("función callback");
    this.appendStatementInput("CALLBACK_BODY")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Función callback para procesar una llamada a la herramienta");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para retornar respuesta de herramienta
Blockly.Blocks['mcp_return_tool_response'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Retornar Respuesta de Herramienta");
    this.appendValueInput("TYPE")
        .setCheck("String")
        .appendField("tipo");
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("texto");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("Retorna una respuesta a la llamada de herramienta");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para obtener valor de parámetro de herramienta
Blockly.Blocks['mcp_get_parameter_value'] = {
  init: function() {
    this.appendValueInput("PARAM")
        .setCheck("String")
        .appendField("obtener parámetro");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip("Obtiene el valor de un parámetro de la herramienta");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};