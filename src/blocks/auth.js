import * as Blockly from "blockly/core";

/**
 * Bloques para autenticación en MCP
 */

// Bloque para crear un gestor de autenticación
Blockly.Blocks["mcp_create_auth_manager"] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Crear Gestor de Autenticación")
            .appendField(
                new Blockly.FieldDropdown([
                    ["OAuth", "oauth"],
                    ["Basic", "basic"],
                    ["JWT", "jwt"],
                ]),
                "AUTH_TYPE"
            );
        this.appendValueInput("SECRET")
            .setCheck("String")
            .appendField("secreto");
        this.setOutput(true, "AuthManager");
        this.setColour(160);
        this.setTooltip(
            "Crea un gestor de autenticación para proteger recursos y herramientas"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para definir un recurso protegido
Blockly.Blocks["mcp_define_resource_protected"] = {
    init: function () {
        this.appendDummyInput().appendField("Definir Recurso Protegido");
        this.appendValueInput("NAME").setCheck("String").appendField("nombre");
        this.appendValueInput("URI").setCheck("String").appendField("URI");
        this.appendValueInput("AUTH_MANAGER")
            .setCheck("AuthManager")
            .appendField("autenticación");
        this.appendStatementInput("CALLBACK")
            .setCheck(null)
            .appendField("callback");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip(
            "Define un recurso MCP protegido que requiere autenticación"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para definir una herramienta protegida
Blockly.Blocks["mcp_define_tool_protected"] = {
    init: function () {
        this.appendDummyInput().appendField("Definir Herramienta Protegida");
        this.appendValueInput("NAME").setCheck("String").appendField("nombre");
        this.appendValueInput("AUTH_MANAGER")
            .setCheck("AuthManager")
            .appendField("autenticación");
        this.appendStatementInput("CONFIG")
            .setCheck(null)
            .appendField("configuración");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip(
            "Define una herramienta MCP protegida que requiere autenticación"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para generar un token de autenticación
Blockly.Blocks["mcp_generate_auth_token"] = {
    init: function () {
        this.appendDummyInput().appendField("Generar Token de Autenticación");
        this.appendValueInput("AUTH_MANAGER")
            .setCheck("AuthManager")
            .appendField("gestor");
        this.appendValueInput("USER_ID")
            .setCheck("String")
            .appendField("ID de usuario");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Genera un token de autenticación para un usuario");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para obtener el token de autenticación de la solicitud actual
Blockly.Blocks["mcp_get_request_auth_token"] = {
    init: function () {
        this.appendDummyInput().appendField("Obtener Token de Solicitud");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip(
            "Obtiene el token de autenticación de la solicitud actual"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para obtener el ID de usuario de un token
Blockly.Blocks["mcp_get_auth_user_id"] = {
    init: function () {
        this.appendDummyInput().appendField("Obtener ID de Usuario del Token");
        this.appendValueInput("AUTH_TOKEN")
            .setCheck("String")
            .appendField("token");
        this.appendValueInput("AUTH_MANAGER")
            .setCheck("AuthManager")
            .appendField("gestor");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip(
            "Obtiene el ID de usuario asociado con un token de autenticación"
        );
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para leer un recurso con autenticación
Blockly.Blocks["mcp_test_read_resource_with_auth"] = {
    init: function () {
        this.appendDummyInput().appendField("Leer Recurso con Autenticación");
        this.appendValueInput("CLIENT")
            .setCheck("McpClient")
            .appendField("cliente");
        this.appendValueInput("URI").setCheck("String").appendField("URI");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Lee un recurso MCP utilizando autenticación");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};

// Bloque para llamar a una herramienta con autenticación
Blockly.Blocks["mcp_test_call_tool_with_auth"] = {
    init: function () {
        this.appendDummyInput().appendField(
            "Llamar Herramienta con Autenticación"
        );
        this.appendValueInput("CLIENT")
            .setCheck("McpClient")
            .appendField("cliente");
        this.appendValueInput("TOOL_NAME")
            .setCheck("String")
            .appendField("herramienta");
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("mensaje");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Llama a una herramienta MCP utilizando autenticación");
        this.setHelpUrl("https://modelcontextprotocol.io");
    },
};
