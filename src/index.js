/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from "blockly";
import { blocks } from "./blocks/text";
import "./blocks/mcp_blocks";
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";
import "./index.css";
import { tutorial1XML } from "./tutorials/tutorial1";

// Mapa de tutoriales disponibles
const tutorials = {
  empty: null, // Proyecto vacío
  tutorial1: tutorial1XML,
  // Agregar los demás cuando estén disponibles
  // tutorial2: tutorial2XML,
  // tutorial3: tutorial3XML,
  // tutorial4: tutorial4XML,
  // tutorial5: tutorial5XML
};

let workspace = null;
let currentProject = "empty";

/**
 * Inicializa o reinicia el entorno de Blockly
 * @param {boolean} cleanExisting - Si es true, limpia cualquier instancia existente
 * @returns {Blockly.Workspace} - La instancia del workspace
 */
function initBlockly(cleanExisting = true) {
  // Limpiar recursos existentes si es necesario
  if (cleanExisting && workspace) {
    // Guardar el estado actual si existe un workspace
    try {
      save(workspace);
    } catch (e) {
      console.warn("No se pudo guardar el estado del workspace", e);
    }
    
    // Limpiar el workspace actual
    workspace.dispose();
  }

  // Limpiar elementos UI de Blockly que puedan haber quedado
  const blocklyElements = document.querySelectorAll(
    ".blocklyWidgetDiv, .blocklyTooltipDiv, .blocklyDropDownDiv"
  );
  blocklyElements.forEach((elem) => {
    if (elem && elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }
  });

  // Inicializar el nuevo workspace
  const newWorkspace = Blockly.inject("blocklyDiv", {
    toolbox: toolbox,
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    },
    trashcan: true,
    scrollbars: true,
    sounds: true,
  });

  // Registrar bloques y generador
  Blockly.common.defineBlocks(blocks);
  Object.assign(javascriptGenerator.forBlock, forBlock);

  return newWorkspace;
}

/**
 * Genera y muestra el código JavaScript basado en el workspace actual
 */
function updateCode() {
  const codeDiv = document.getElementById("generatedCode").firstChild;
  const outputDiv = document.getElementById("output");
  
  // Generar código JavaScript
  const code = javascriptGenerator.workspaceToCode(workspace);
  
  // Actualizar la visualización del código
  codeDiv.innerText = code;
  
  // Limpiar salida anterior
  outputDiv.innerHTML = "";
  
  // Ejecutar el código generado (con precaución)
  try {
    // En un entorno de producción, considera alternativas a eval()
    eval(code);
  } catch (error) {
    console.error("Error ejecutando el código generado:", error);
    outputDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
  }
}

/**
 * Carga un proyecto tutorial o crea uno vacío
 * @param {string} projectId - El ID del proyecto a cargar
 */
function loadProject(projectId) {
  console.log(`Intentando cargar proyecto: ${projectId}`);
  
  // Guardar el proyecto actual antes de cambiar
  currentProject = projectId;
  
  if (projectId === "empty") {
    console.log("Creando proyecto vacío");
    workspace.clear();
    updateCode();
    return;
  }
  
  const projectXML = tutorials[projectId];
  if (projectXML) {
    try {
      console.log(`Proyecto ${projectId} encontrado, longitud XML: ${projectXML.length}`);
      
      // Limpiar workspace actual
      workspace.clear();
      
      // Cargar el nuevo proyecto
      const dom = Blockly.utils.xml.textToDom(projectXML);
      console.log("DOM XML creado correctamente");
      
      Blockly.Xml.domToWorkspace(dom, workspace);
      console.log("Proyecto cargado exitosamente en el workspace");
      
      // Ajustar la visualización
      workspace.scrollCenter();
      Blockly.svgResize(workspace);
      
      // Actualizar el código generado
      updateCode();
    } catch (error) {
      console.error("Error al cargar el proyecto:", error);
      alert("No se pudo cargar el proyecto. Consulta la consola para más detalles.");
    }
  } else {
    console.error("Proyecto no encontrado:", projectId);
    alert(`El proyecto "${projectId}" no está disponible todavía.`);
  }
}

/**
 * Inicializa la aplicación
 */
function initApp() {
  // Inicializar el workspace de Blockly
  workspace = initBlockly(false);
  
  // Configurar listeners de eventos para el workspace
  workspace.addChangeListener((e) => {
    // No guardar durante eventos UI o arrastres
    if (e.isUiEvent || workspace.isDragging()) return;
    if (e.type === Blockly.Events.FINISHED_LOADING) return;
    
    // Guardar el estado
    save(workspace);
    
    // Actualizar el código generado
    updateCode();
  });
  
  // Cargar el estado guardado (si existe)
  load(workspace);
  
  // Mostrar código inicial
  updateCode();
  
  // Configurar el selector de proyectos
  const projectSelect = document.getElementById("projectSelect");
  if (projectSelect) {
    projectSelect.addEventListener("change", (e) => {
      loadProject(e.target.value);
    });
    console.log("Selector de proyectos configurado. Opciones disponibles:", Object.keys(tutorials));
  } else {
    console.warn("No se encontró el elemento 'projectSelect' en el DOM");
  }
  
  // Configurar redimensionamiento automático
  window.addEventListener('resize', () => {
    Blockly.svgResize(workspace);
  });
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initApp);

// Exportar funciones útiles para depuración o uso desde la consola
window.blocklyApp = {
  loadProject,
  workspace: () => workspace,
  getCurrentProject: () => currentProject,
  reset: () => {
    workspace = initBlockly(true);
    updateCode();
  }
};
