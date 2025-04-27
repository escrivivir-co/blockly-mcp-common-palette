import './setup';
import './resources';
import './tools';
import './host';
import './auth';
import './notifications';
import './prompts';
import './storage';
import './notifications'; // Añadir esta línea
import './streaming'; // Añadir esta línea

// Importaciones para generadores
import '../generators/javascript/mcp_setup';
import '../generators/javascript/mcp_resources';
import '../generators/javascript/mcp_tools';
import '../generators/javascript/mcp_host';
import '../generators/javascript/mcp_auth';
import '../generators/javascript/mcp_notifications'; // Añadir esta línea
import '../generators/javascript/mcp_streaming'; // Añadir esta línea
// También importar los generadores adicionales si existen

// Este archivo importa todos los bloques y generadores de MCP
console.log('MCP Blocks cargados');