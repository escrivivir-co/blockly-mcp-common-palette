import * as Blockly from 'blockly/core';

/**
 * Bloques para Prompts MCP (Versión Ampliada)
 */

// Bloque contenedor principal para definir un prompt
Blockly.Blocks['mcp_define_prompt'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Definir Prompt");
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre");
    this.appendStatementInput("DESCRIPTION")
        .setCheck("mcp_prompt_description") // Solo permite descripción
        .appendField("descripción");
    this.appendStatementInput("ARGUMENTS")
        .setCheck("mcp_prompt_argument") // Solo permite argumentos
        .appendField("argumentos");
    this.appendStatementInput("CALLBACK")
        .setCheck("mcp_prompt_callback") // Solo permite el callback
        .appendField("función callback");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(260);
    this.setTooltip("Define un prompt con nombre, descripción, argumentos y lógica de callback.");
  }
};

// Bloque para la descripción dentro de mcp_define_prompt
Blockly.Blocks['mcp_prompt_description'] = {
  init: function() {
    this.appendValueInput("DESCRIPTION")
        .setCheck("String")
        .appendField("texto descripción");
    this.setPreviousStatement(true, "mcp_prompt_description"); // Solo se conecta a la entrada DESCRIPTION
    // No tiene conexión siguiente, solo puede haber una descripción
    this.setColour(250);
    this.setTooltip("Establece el texto descriptivo para este prompt.");
  }
};

// Bloque para definir un argumento dentro de mcp_define_prompt
Blockly.Blocks['mcp_prompt_argument'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("nombre argumento");
    // Podríamos añadir un input para el tipo o descripción del argumento si fuera necesario
    this.setPreviousStatement(true, "mcp_prompt_argument"); // Se conecta a ARGUMENTS
    this.setNextStatement(true, "mcp_prompt_argument");    // Permite encadenar argumentos
    this.setColour(250);
    this.setTooltip("Define un argumento esperado por el prompt.");
  }
};

// Bloque para la función callback de prompt (modificado para encajar en mcp_define_prompt)
Blockly.Blocks['mcp_prompt_callback'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("ejecutar al llamar prompt"); // Texto más contextual
    this.appendStatementInput("CALLBACK_BODY")
        .setCheck(null); // El cuerpo puede contener cualquier lógica
    this.setPreviousStatement(true, "mcp_prompt_callback"); // Se conecta a CALLBACK
    // No tiene conexión siguiente, solo un callback por prompt
    this.setColour(260);
    this.setTooltip("Define el código que se ejecutará cuando se llame a este prompt.");
  }
};

// Bloque contenedor para retornar mensajes desde el callback
Blockly.Blocks['mcp_return_prompt_messages'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("retornar mensajes");
    this.appendStatementInput("MESSAGES")
        .setCheck("mcp_add_message"); // Solo permite añadir mensajes
    this.setPreviousStatement(true, null); // Se conecta dentro del callback
    // No tiene conexión siguiente, es una sentencia de retorno
    this.setColour(270);
    this.setTooltip("Retorna una lista de mensajes como respuesta del prompt.");
  }
};

// Bloque para añadir un mensaje individual a la respuesta
Blockly.Blocks['mcp_add_message'] = {
  init: function() {
    this.appendValueInput("ROLE")
        .setCheck("String")
        .appendField("rol");
    this.appendValueInput("CONTENT")
        .setCheck("String") // Asumimos contenido de texto simple por ahora
        .appendField("contenido");
    this.setPreviousStatement(true, "mcp_add_message"); // Se conecta a MESSAGES
    this.setNextStatement(true, "mcp_add_message");    // Permite encadenar mensajes
    this.setColour(270);
    this.setTooltip("Añade un mensaje a la lista de respuesta del prompt.");
  }
};

// Bloque para obtener la definición de un prompt (si fuera necesario en el cliente)
Blockly.Blocks['mcp_get_prompt'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("obtener prompt");
    this.setOutput(true, "Object"); // Devuelve la definición del prompt
    this.setColour(240);
    this.setTooltip("Obtiene la definición de un prompt por su nombre.");
  }
};

// Bloque para listar todos los prompts definidos
Blockly.Blocks['mcp_list_prompts'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("listar prompts");
    this.setOutput(true, "Array"); // Devuelve un array de nombres o definiciones
    this.setColour(240);
    this.setTooltip("Obtiene una lista de todos los prompts definidos.");
  }
};

// Bloque para obtener el valor de un argumento dentro del callback
Blockly.Blocks['mcp_get_argument_value'] = {
  init: function() {
    this.appendValueInput("ARG")
        .setCheck("String")
        .appendField("valor argumento");
    this.setOutput(true, null); // El tipo de salida puede variar
    this.setColour(260);
    this.setTooltip("Obtiene el valor de un argumento pasado al callback del prompt.");
    // Podríamos añadir contexto para asegurar que solo se use dentro de mcp_prompt_callback
  }
};
