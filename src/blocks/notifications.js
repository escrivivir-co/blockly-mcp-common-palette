import * as Blockly from 'blockly/core';

/**
 * Bloques para sistema de notificaciones en MCP
 */

// Bloque para crear un sistema de notificaciones
Blockly.Blocks['mcp_create_notification_system'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Crear Sistema de Notificaciones")
        .appendField(new Blockly.FieldDropdown([
          ["Tiempo Real", "realtime"], 
          ["Cola", "queue"], 
          ["Webhook", "webhook"]
        ]), "NOTIFICATION_TYPE");
    this.appendValueInput("CHANNEL")
        .setCheck("String")
        .appendField("canal");
    this.setOutput(true, "NotificationSystem");
    this.setColour(180);
    this.setTooltip("Crea un sistema de notificaciones para enviar alertas a los clientes");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para enviar una notificación
Blockly.Blocks['mcp_send_notification'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Enviar Notificación");
    this.appendValueInput("NOTIFICATION_SYSTEM")
        .setCheck("NotificationSystem")
        .appendField("sistema");
    this.appendValueInput("EVENT")
        .setCheck("String")
        .appendField("evento");
    this.appendValueInput("DATA")
        .setCheck("String")
        .appendField("datos");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("Envía una notificación a todos los clientes suscritos");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para registrar un suscriptor de notificaciones
Blockly.Blocks['mcp_register_notification_subscriber'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Registrar Suscriptor de Notificaciones");
    this.appendValueInput("NOTIFICATION_SYSTEM")
        .setCheck("NotificationSystem")
        .appendField("sistema");
    this.appendValueInput("SUBSCRIBER_ID")
        .setCheck("String")
        .appendField("ID suscriptor");
    this.appendValueInput("CHANNEL")
        .setCheck("String")
        .appendField("canal");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
    this.setTooltip("Registra un cliente como suscriptor de notificaciones");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};

// Bloque para configurar manejador de notificaciones en cliente
Blockly.Blocks['mcp_client_on_notification'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Al Recibir Notificación");
    this.appendValueInput("CLIENT")
        .setCheck("McpClient")
        .appendField("cliente");
    this.appendValueInput("CHANNEL")
        .setCheck("String")
        .appendField("canal");
    this.appendStatementInput("HANDLER")
        .setCheck(null)
        .appendField("ejecutar");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("Configura un manejador para cuando se reciben notificaciones");
    this.setHelpUrl("https://modelcontextprotocol.io");
  }
};
