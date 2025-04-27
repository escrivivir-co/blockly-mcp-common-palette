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
    // Usamos un input de sentencias para anidar descripción, parámetros y callback
    this.appendStatementInput("CONFIG")
        .setCheck(['mcp_tool_description', 'mcp_tool_parameter', 'mcp_tool_callback'])
        .appendField("configuración");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160); // Color base para definición
    this.setTooltip("Define una nueva herramienta con descripción, parámetros y lógica.");
  }
};

// Bloque para añadir descripción a una herramienta
Blockly.Blocks['mcp_tool_description'] = {
  init: function() {
    this.appendValueInput("DESCRIPTION")
        .setCheck("String")
        .appendField("descripción");
    this.setPreviousStatement(true, "mcp_tool_description"); // Solo se conecta a CONFIG
    this.setNextStatement(true, ['mcp_tool_parameter', 'mcp_tool_callback']); // Puede ir seguido de parámetros o callback
    this.setColour(150);
    this.setTooltip("Establece la descripción de la herramienta.");
  }
};

// Bloque para definir parámetros de herramienta (Simplificado)
Blockly.Blocks['mcp_tool_parameter'] = {
	init: function() {
	  this.appendValueInput("NAME")
		  .setCheck("String")
		  .appendField("parámetro nombre");
	  // Eliminamos el input para TYPE
	  // this.appendDummyInput()
	  //     .appendField("tipo")
	  //     .appendField(new Blockly.FieldDropdown(zodParameterTypes), "TYPE");
	  this.setPreviousStatement(true, ['mcp_tool_description', 'mcp_tool_parameter']);
	  this.setNextStatement(true, ['mcp_tool_parameter', 'mcp_tool_callback']);
	  this.setColour(150);
	  this.setTooltip("Define un parámetro de entrada para la herramienta (tipo genérico).");
	}
  };
// Bloque para el callback de herramienta
Blockly.Blocks['mcp_tool_callback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ejecutar al llamar herramienta");
    this.appendStatementInput("CALLBACK_BODY")
        .setCheck(null); // El cuerpo puede contener cualquier lógica
    this.setPreviousStatement(true, ['mcp_tool_description', 'mcp_tool_parameter', 'mcp_tool_callback']); // Se conecta a CONFIG o después de descripción/parámetros
    // No tiene conexión siguiente dentro de la definición
    this.setColour(160);
    this.setTooltip("Define el código que se ejecutará cuando se llame a esta herramienta.");
  }
};

// Bloque para obtener valor de parámetro de herramienta (dentro del callback)
Blockly.Blocks['mcp_get_parameter_value'] = {
  init: function() {
    this.appendValueInput("PARAM") // Nombre del input consistente
        .setCheck("String")
        .appendField("valor parámetro");
    this.setOutput(true, null); // El tipo de salida puede variar
    this.setColour(170); // Color para operaciones dentro del callback
    this.setTooltip("Obtiene el valor de un parámetro pasado al callback de la herramienta.");
    // Idealmente, añadiríamos contexto para asegurar que solo se use dentro de mcp_tool_callback
  }
};

// Bloque para retornar respuesta de herramienta (dentro del callback)
Blockly.Blocks['mcp_return_tool_response'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("retornar respuesta herramienta");
    this.appendValueInput("TYPE") // Input para el tipo de contenido
        .setCheck("String")
        .appendField("tipo contenido");
    this.appendValueInput("TEXT") // Input para el contenido/texto
        .setCheck("String") // Asumimos texto por ahora, podría ser 'any'
        .appendField("contenido");
    this.setPreviousStatement(true, null); // Se conecta dentro del callback
    // No tiene conexión siguiente, es una sentencia de retorno
    this.setColour(170);
    this.setTooltip("Retorna el resultado de la ejecución de la herramienta.");
  }
};

// --- Bloques Faltantes Implementados ---

// Bloque para llamar a una herramienta (Cliente/Servidor)
Blockly.Blocks['mcp_call_tool'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("llamar herramienta");
    this.appendValueInput("PARAMS")
        .setCheck("Object") // Espera un objeto con los parámetros
        .appendField("con parámetros");
    this.setOutput(true, null); // La salida depende de lo que retorne la herramienta
    this.setColour(180); // Color para interacción con herramientas
    this.setTooltip("Llama a una herramienta definida por su nombre y pasa parámetros.");
  }
};

// Bloque para listar herramientas disponibles (Cliente/Servidor)
Blockly.Blocks['mcp_list_tools'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("listar herramientas");
    this.setOutput(true, "Array"); // Devuelve un array de nombres o definiciones
    this.setColour(180);
    this.setTooltip("Obtiene una lista de todas las herramientas disponibles.");
  }
};