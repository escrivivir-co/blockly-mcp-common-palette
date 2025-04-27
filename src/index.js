import * as Blockly from "blockly";
import { blocks } from "./blocks/text";
import "./blocks/mcp_blocks"; // Asegúrate que esto importe tus definiciones de bloques MCP
import { forBlock } from "./generators/javascript";
import { javascriptGenerator } from "blockly/javascript";
import { save, load } from "./serialization";
import { toolbox } from "./toolbox";
import "./index.css";
import { tutorial1XML } from "./tutorials/tutorial1";
import { tutorial2XML } from "./tutorials/tutorial2";
import { tutorial3XML } from "./tutorials/tutorial3";
import { tutorial4XML } from "./tutorials/tutorial4";
import * as monaco from "monaco-editor";

// --- Configuración Global para Workers de Monaco ---
// Necesario para que Monaco sepa dónde encontrar sus workers empaquetados por Webpack
self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        // Usar rutas absolutas desde la raíz
        if (label === "json") {
            return "/json.worker.bundle.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
            return "/css.worker.bundle.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return "/html.worker.bundle.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "/ts.worker.bundle.js";
        }
        return "/editor.worker.bundle.js";
    },
};
// --- Fin Configuración Monaco ---

// Mapa de tutoriales disponibles
const tutorials = {
    empty: null, // Proyecto vacío
    tutorial1: tutorial1XML,
    tutorial2: tutorial2XML,
    tutorial3: tutorial3XML,
    tutorial4: tutorial4XML,
    // tutorial5: tutorial5XML
};

// --- Variables Globales ---
let workspace = null;
let currentProject = "empty";
let monacoEditorInstance = null; // Instancia de Monaco

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
    Blockly.common.defineBlocks(blocks); // Asegúrate que 'blocks' incluya tus bloques MCP si no se importan con side effects
    Object.assign(javascriptGenerator.forBlock, forBlock);

    return newWorkspace;
}

/**
 * Genera y muestra el código JavaScript basado en el workspace actual
 */
function updateCode() {
    // const outputDiv = document.getElementById("output"); // << ELIMINAR ESTA LÍNEA

    // Generar código JavaScript
    const code = javascriptGenerator.workspaceToCode(workspace);

    // Actualizar la visualización del código usando Monaco Editor
    if (monacoEditorInstance) {
        monacoEditorInstance.setValue(code);
    } else {
        console.warn("Instancia de Monaco Editor no inicializada todavía.");
    }

    // Limpiar salida anterior - YA NO ES NECESARIO
    // if (outputDiv) { // << ELIMINAR ESTE BLOQUE
    //     outputDiv.innerHTML = "";
    // }

    // Ejecutar el código generado (Comentado por ahora)
    // try {
    //     // eval(code);
    // } catch (error) {
    //     console.error("Error ejecutando el código generado:", error);
    //     // Mostrar error en consola es suficiente por ahora
    //     // if (outputDiv) { // << ELIMINAR ESTA LÍNEA
    //     //     outputDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    //     // }
    // }
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
            console.log(
                `Proyecto ${projectId} encontrado, longitud XML: ${projectXML.length}`
            );

            // Limpiar workspace actual
            workspace.clear();

            // Cargar el nuevo proyecto
            const dom = Blockly.utils.xml.textToDom(projectXML);
            console.log("DOM XML creado correctamente");

            Blockly.Xml.domToWorkspace(dom, workspace);
            console.log("Proyecto cargado exitosamente en el workspace");

            // Ajustar la visualización
            workspace.scrollCenter();
            Blockly.svgResize(workspace); // Llama a resize después de cargar

            // Actualizar el código generado y ejecutarlo
            updateCode(); // << Asegúrate que se llama aquí
        } catch (error) {
            console.error("Error al cargar el proyecto:", error);
            alert(
                "No se pudo cargar el proyecto. Consulta la consola para más detalles."
            );
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
    // 1. Inicializar el workspace de Blockly
    workspace = initBlockly(false);

    // 2. Inicializar Monaco Editor (con limpieza previa)
    try {
        // Limpiar cualquier instancia anterior
        if (monacoEditorInstance) {
            monacoEditorInstance.dispose();
            monacoEditorInstance = null;
        }
        
        // También limpiar el contenedor para evitar atributos persistentes
        const container = document.getElementById("monacoContainer");
        if (container) {
            container.innerHTML = '';
        }
        
        // Ahora crear una nueva instancia limpia
        monacoEditorInstance = monaco.editor.create(
            document.getElementById("monacoContainer"),
            {
                value: "// Código generado aparecerá aquí...",
                language: "javascript",
                theme: "vs-dark",
                readOnly: true,
            }
        );
        console.log("Monaco Editor inicializado.");
    } catch (error) {
        console.error("Error inicializando Monaco Editor:", error);
    }
    
    // 3. DEPRECATED

    // 4. Configurar listeners de eventos para el workspace (SOLO UNA VEZ)
    workspace.addChangeListener((e) => {
        // No guardar/actualizar durante eventos UI, arrastres o carga inicial
        if (
            e.isUiEvent ||
            workspace.isDragging() ||
            e.type === Blockly.Events.FINISHED_LOADING
        ) {
            return;
        }
        // Guardar el estado en cambios significativos
        save(workspace);
        // Actualizar el código generado y ejecutarlo
        updateCode();
    });

    // 5. Cargar el estado guardado (si existe) o el proyecto por defecto
    //    Esto puede disparar el listener anterior si carga bloques,
    //    lo cual llamará a updateCode() después de que todo esté inicializado.
    try {
        load(workspace);
        console.log("Workspace cargado desde localStorage.");
    } catch (e) {
        console.warn(
            "No se pudo cargar desde localStorage, iniciando vacío.",
            e
        );
        workspace.clear(); // Asegurar que esté vacío si la carga falla
    }

    // 6. Mostrar código inicial (basado en lo cargado o vacío)
    //    Llamar a updateCode aquí asegura que se muestre algo incluso si load no disparó el listener
    updateCode();

    // 7. Configurar el selector de proyectos
    const projectSelect = document.getElementById("projectSelect");
    if (projectSelect) {
        projectSelect.addEventListener("change", (e) => {
            loadProject(e.target.value);
        });
        console.log(
            "Selector de proyectos configurado. Opciones disponibles:",
            Object.keys(tutorials)
        );
    } else {
        console.warn("No se encontró el elemento 'projectSelect' en el DOM");
    }

    // 8. Configurar redimensionamiento automático
    window.addEventListener("resize", () => {
        Blockly.svgResize(workspace);
        if (monacoEditorInstance) {
            monacoEditorInstance.layout(); // Redimensionar Monaco también
        }
    });

    // 9. Configurar botón de descarga (Añadir esto)
    const downloadBtn = document.getElementById("downloadCodeBtn");
    if (downloadBtn && monacoEditorInstance) {
        downloadBtn.addEventListener("click", () => {
            const code = monacoEditorInstance.getValue();
            const blob = new Blob([code], { type: "text/javascript" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            // Puedes obtener el nombre del proyecto actual si lo guardas en una variable
            a.download = `${currentProject || "blockly_code"}.js`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
        console.log("Botón de descarga configurado.");
    } else {
        console.warn(
            "No se pudo configurar el botón de descarga (elemento o editor no encontrado)."
        );
    }

    // ELIMINADO: Llamada redundante a addChangeListener
    // ELIMINADO: Llamada redundante a updateCode al final
}

let appInitialized = false;

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    if (!appInitialized) {
        initApp();
        appInitialized = true;
    }
});

// Exportar funciones útiles para depuración o uso desde la consola
window.blocklyApp = {
    loadProject,
    workspace: () => workspace,
    getCurrentProject: () => currentProject,
    reset: () => {
        // Limpiar localStorage al resetear podría ser útil
        localStorage.removeItem("blocklySave"); // O el nombre de tu clave de guardado
        workspace = initBlockly(true); // Reinicia Blockly

        /*
        // Reiniciar servidor MCP si es necesario
        if (servidor && typeof servidor.resetDefinitions === 'function') {
            servidor.resetDefinitions();
        } else {
             // O recrear la instancia si no hay reset
        }*/
        updateCode(); // Actualizar UI
    },
};

// Manejo de Hot Module Replacement para evitar múltiples inicializaciones
if (module.hot) {
    module.hot.dispose(() => {
        if (monacoEditorInstance) {
            monacoEditorInstance.dispose();
            monacoEditorInstance = null;
        }
        // Limpiar otros recursos si es necesario
    });
    module.hot.accept();
}
