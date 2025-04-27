import * as Blockly from 'blockly/core';

Blockly.Blocks['mcp_configure_storage'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("configurar almacenamiento");
    this.appendValueInput("TYPE")
        .setCheck("String")
        .appendField("tipo");
    this.appendValueInput("CONNECTION")
        .setCheck("String")
        .appendField("conexión");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(180);
  }
};

Blockly.Blocks['mcp_db_query'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("db query");
    this.appendValueInput("TABLE")
        .setCheck("String")
        .appendField("tabla");
    this.setOutput(true);
    this.setColour(210);
  }
};

Blockly.Blocks['mcp_db_insert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("db insert");
    this.appendValueInput("TABLE")
        .setCheck("String")
        .appendField("tabla");
    this.appendValueInput("DATA")
        .setCheck("Object")
        .appendField("datos");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
  }
};

Blockly.Blocks['mcp_db_update'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("db update");
    this.appendValueInput("TABLE")
        .setCheck("String")
        .appendField("tabla");
    this.appendValueInput("FILTER")
        .setCheck("Object")
        .appendField("filtro");
    this.appendValueInput("DATA")
        .setCheck("Object")
        .appendField("datos");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
  }
};

Blockly.Blocks['mcp_db_delete'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("db delete");
    this.appendValueInput("TABLE")
        .setCheck("String")
        .appendField("tabla");
    this.appendValueInput("FILTER")
        .setCheck("Object")
        .appendField("filtro");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
  }
};

Blockly.Blocks['mcp_session_store'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("session store");
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField("clave");
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField("valor");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(300);
  }
};

Blockly.Blocks['mcp_session_retrieve'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("session retrieve");
    this.appendValueInput("KEY")
        .setCheck("String")
        .appendField("clave");
    this.setOutput(true);
    this.setColour(300);
  }
};