import * as Blockly from 'blockly/core';

/**
 * Bloques para configuración básica de componentes MCP
 */

// Bloque para crear un servidor MCP
Blockly.Blocks['mcp_create_server'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear Servidor MCP");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendValueInput("VERSION")
        .setCheck("String")
        .appendField("versión");
    this.setOutput(true, "McpServer");
    this.setColour(230);
    this.setTooltip("Crea un nuevo servidor MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para crear un cliente MCP
Blockly.Blocks['mcp_create_client'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear Cliente MCP");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendValueInput("VERSION")
        .setCheck("String")
        .appendField("versión");
    this.setOutput(true, "McpClient");
    this.setColour(230);
    this.setTooltip("Crea un nuevo cliente MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para configurar transporte stdio para servidor
Blockly.Blocks['mcp_stdio_transport_server'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Configurar Transporte Stdio (Servidor)");
    this.setOutput(true, "StdioServerTransport");
    this.setColour(230);
    this.setTooltip("Configura un transporte stdio para un servidor MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

Blockly.Blocks['mcp_stdio_transport_client'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Configurar Transporte Stdio (Cliente)");
    this.setOutput(true, "StdioClientTransport");
    this.setColour(230);
    this.setTooltip("Configura un transporte stdio para un cliente MCP");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para conectar un servidor a un transporte
Blockly.Blocks['mcp_connect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Conectar");
    this.appendValueInput("SERVER")
        .setCheck("McpServer")
        .appendField("servidor");
    this.appendValueInput("TRANSPORT")
        .setCheck(null)
        .appendField("transporte");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Conecta un servidor MCP a un transporte");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para configurar transporte HTTP para servidor
Blockly.Blocks['mcp_http_transport_server'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Configurar Transporte HTTP (Servidor)");
	  this.appendValueInput("PORT")
		  .setCheck("Number")
		  .appendField("puerto");
	  this.setOutput(true, "HttpServerTransport");
	  this.setColour(230);
	  this.setTooltip("Configura un transporte HTTP para un servidor MCP");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };
  
  // Bloque para configurar transporte HTTP para cliente
  Blockly.Blocks['mcp_http_transport_client'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Configurar Transporte HTTP (Cliente)");
	  this.appendValueInput("URL")
		  .setCheck("String")
		  .appendField("URL");
	  this.setOutput(true, "HttpClientTransport");
	  this.setColour(230);
	  this.setTooltip("Configura un transporte HTTP para un cliente MCP");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };
  
  // Bloque para conectar servidor
  Blockly.Blocks['mcp_connect'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Conectar");
	  this.appendValueInput("SERVER")
		  .setCheck(["McpServer", "McpClient"])
		  .appendField("componente");
	  this.appendValueInput("TRANSPORT")
		  .setCheck(null)
		  .appendField("transporte");
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(230);
	  this.setTooltip("Conecta un servidor o cliente MCP a un transporte");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };
  
  // Bloque para desconectar servidor
  Blockly.Blocks['mcp_disconnect'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Desconectar");
	  this.appendValueInput("SERVER")
		  .setCheck(["McpServer", "McpClient"])
		  .appendField("componente");
	  this.setPreviousStatement(true, null);
	  this.setNextStatement(true, null);
	  this.setColour(230);
	  this.setTooltip("Desconecta un servidor o cliente MCP");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };

  Blockly.Blocks['mcp_http_streamable_transport_server'] = {
	init: function() {
	  this.appendDummyInput()
		  .appendField("Configurar Transporte HTTP Streamable (Servidor)");
	  this.appendValueInput("PORT")
		  .setCheck("Number")
		  .appendField("puerto");
	  this.appendDummyInput()
		  .appendField("gestión de sesiones")
		  .appendField(new Blockly.FieldCheckbox("TRUE"), "SESSIONS");
	  this.appendDummyInput()
		  .appendField("modo")
		  .appendField(new Blockly.FieldDropdown([
			["estándar", "standard"], 
			["persistente", "persistent"]
		  ]), "MODE");
	  this.setOutput(true, "HttpStreamableServerTransport");
	  this.setColour(230);
	  this.setTooltip("Configura un transporte HTTP Streamable para un servidor MCP");
	  this.setHelpUrl("https://modelcontextprotocol.io");
	}
  };