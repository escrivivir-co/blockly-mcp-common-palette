import * as Blockly from 'blockly/core';

/**
 * Bloques para Host MCP y testing
 */

// Bloque para crear un host MCP
Blockly.Blocks['mcp_create_host'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Crear Host MCP");
	  this.appendValueInput("NAME")
		  .setCheck("String")
		  .appendField("nombre");
	  this.setOutput(true, "McpHost");
	  this.setColour(120);
	  this.setTooltip("Crea un nuevo host MCP para gestionar servidores y clientes");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };
  
  // Bloque para añadir servidor al host
  Blockly.Blocks['mcp_host_add_server'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Agregar Servidor a Host");
	  this.appendValueInput("HOST")
		  .setCheck("McpHost")
		  .appendField("host");
	  this.appendValueInput("SERVER_ID")
		  .setCheck("String")
		  .appendField("id");
	  this.appendValueInput("SERVER")
		  .setCheck("McpServer")
		  .appendField("servidor");
	  this.appendValueInput("TRANSPORT")
		  .setCheck(null)
		  .appendField("transporte");
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(120);
	  this.setTooltip("Añade un servidor MCP al host");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };
  
  // Bloque para añadir cliente al host
  Blockly.Blocks['mcp_host_add_client'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Agregar Cliente a Host");
	  this.appendValueInput("HOST")
		  .setCheck("McpHost")
		  .appendField("host");
	  this.appendValueInput("CLIENT_ID")  // Este nombre debe coincidir con el usado en el generador
		  .setCheck("String")
		  .appendField("id");
	  this.appendValueInput("CLIENT")
		  .setCheck("McpClient")
		  .appendField("cliente");
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(120);
	  this.setTooltip("Añade un cliente MCP al host");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };

// Bloque para iniciar el host
Blockly.Blocks['mcp_host_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Iniciar Host");
    this.appendValueInput("HOST")
        .setCheck("McpHost")
        .appendField("host");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Inicia el host MCP y sus componentes");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para detener el host
Blockly.Blocks['mcp_host_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Detener Host");
    this.appendValueInput("HOST")
        .setCheck("McpHost")
        .appendField("host");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Detiene el host MCP y sus componentes");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para crear cliente de prueba
Blockly.Blocks['mcp_create_test_client'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear Cliente de Prueba");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.setOutput(true, "McpClient");
    this.setColour(120);
    this.setTooltip("Crea un cliente MCP para pruebas");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para probar lectura de recurso
Blockly.Blocks['mcp_test_read_resource'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Leer Recurso");
    this.appendValueInput("CLIENT")
        .setCheck("McpClient")
        .appendField("cliente");
    this.appendValueInput("URI")
        .setCheck("String")
        .appendField("uri");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Prueba la lectura de un recurso desde un cliente");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para probar llamada a herramienta
Blockly.Blocks['mcp_test_call_tool'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Llamar Herramienta");
    this.appendValueInput("CLIENT")
        .setCheck("McpClient")
        .appendField("cliente");
    this.appendValueInput("TOOL_NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendValueInput("MESSAGE")
        .setCheck("String")
        .appendField("mensaje");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Prueba la llamada a una herramienta desde un cliente");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para ejecutar secuencia de prueba
Blockly.Blocks['mcp_test_run_sequence'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Ejecutar Secuencia de Prueba");
    this.appendStatementInput("SEQUENCE")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Ejecuta una secuencia de prueba con cliente MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para manejar eventos del host
Blockly.Blocks['mcp_host_on_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Cuando ocurra evento")
        .appendField(new Blockly.FieldTextInput("test-complete"), "EVENT");
    this.appendValueInput("HOST")
        .setCheck("McpHost")
        .appendField("en host");
    this.appendStatementInput("HANDLER")
        .setCheck(null)
        .appendField("ejecutar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Maneja un evento emitido por el host MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para emitir eventos del host
Blockly.Blocks['mcp_host_emit_event'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Emitir evento");
    this.appendValueInput("HOST")
        .setCheck("McpHost")
        .appendField("host");
    this.appendValueInput("EVENT_NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendValueInput("DATA")
        .setCheck(null)
        .appendField("datos");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("Emite un evento desde el host MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};