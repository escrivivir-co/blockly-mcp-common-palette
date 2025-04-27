export const tutorial4XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="host">host</variable>
    <variable id="servidor">servidor</variable>
    <variable id="transporte">transporte</variable>
    <variable id="clienteTest">clienteTest</variable>
    <variable id="notificador">notificador</variable>
  </variables>
  
  <!-- Crear Host MCP -->
  <block type="variables_set" id="set_host" x="20" y="20">
    <field name="VAR" id="host">host</field>
    <value name="VALUE">
      <block type="mcp_create_host">
        <value name="NAME">
          <block type="text">
            <field name="TEXT">Host de Generación de Imágenes</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <!-- Crear Sistema de Notificaciones -->
      <block type="variables_set" id="set_notification">
        <field name="VAR" id="notificador">notificador</field>
        <value name="VALUE">
          <block type="mcp_create_notification_system">
            <field name="NOTIFICATION_TYPE">realtime</field>
            <value name="CHANNEL">
              <block type="text">
                <field name="TEXT">imagen-generada</field>
              </block>
            </value>
          </block>
        </value>
        <next>
          <!-- Crear Servidor MCP -->
          <block type="variables_set" id="set_server">
            <field name="VAR" id="servidor">servidor</field>
            <value name="VALUE">
              <block type="mcp_create_server">
                <value name="NAME">
                  <block type="text">
                    <field name="TEXT">Generador de Imágenes</field>
                  </block>
                </value>
                <value name="VERSION">
                  <block type="text">
                    <field name="TEXT">1.0.0</field>
                  </block>
                </value>
              </block>
            </value>
            <next>
              <!-- Configurar transporte HTTP Streamable -->
              <block type="variables_set" id="set_transport">
                <field name="VAR" id="transporte">transporte</field>
                <value name="VALUE">
                  <block type="mcp_http_streamable_transport_server">
                    <value name="PORT">
                      <block type="math_number">
                        <field name="NUM">3000</field>
                      </block>
                    </value>
                    <field name="SESSIONS">TRUE</field>
                    <field name="MODE">streaming</field>
                  </block>
                </value>
                <next>
                  <!-- Definir recurso de estado -->
                  <block type="mcp_define_resource_static">
                    <value name="NAME">
                      <block type="text">
                        <field name="TEXT">status</field>
                      </block>
                    </value>
                    <value name="URI">
                      <block type="text">
                        <field name="TEXT">status://generator</field>
                      </block>
                    </value>
                    <statement name="CALLBACK">
                      <block type="mcp_return_resource_content">
                        <value name="URI">
                          <block type="text">
                            <field name="TEXT">uri</field>
                          </block>
                        </value>
                        <value name="TEXT">
                          <block type="text">
                            <field name="TEXT">{"status": "online", "service": "Generador de Imágenes MCP v1.0"}</field>
                          </block>
                        </value>
                      </block>
                    </statement>
                    <next>
                      <!-- Definir recurso de imágenes (streaming) -->
                      <block type="mcp_define_resource_streaming">
                        <value name="NAME">
                          <block type="text">
                            <field name="TEXT">imagenes</field>
                          </block>
                        </value>
                        <value name="URI">
                          <block type="text">
                            <field name="TEXT">imagen://{id}</field>
                          </block>
                        </value>
                        <statement name="CALLBACK">
                          <block type="variables_set">
                            <field name="VAR">id</field>
                            <value name="VALUE">
                              <block type="text">
                                <field name="TEXT">{id}</field>
                              </block>
                            </value>
                            <next>
                              <block type="mcp_stream_resource_start">
                                <value name="TYPE">
                                  <block type="text">
                                    <field name="TEXT">image/progress</field>
                                  </block>
                                </value>
                                <value name="TEXT">
                                  <block type="text_join">
                                    <mutation items="3"></mutation>
                                    <value name="ADD0">
                                      <block type="text">
                                        <field name="TEXT">{"id": "</field>
                                      </block>
                                    </value>
                                    <value name="ADD1">
                                      <block type="variables_get">
                                        <field name="VAR">id</field>
                                      </block>
                                    </value>
                                    <value name="ADD2">
                                      <block type="text">
                                        <field name="TEXT">", "status": "iniciando", "progress": 0}</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="controls_for">
                                    <field name="VAR">i</field>
                                    <value name="FROM">
                                      <block type="math_number">
                                        <field name="NUM">1</field>
                                      </block>
                                    </value>
                                    <value name="TO">
                                      <block type="math_number">
                                        <field name="NUM">5</field>
                                      </block>
                                    </value>
                                    <value name="BY">
                                      <block type="math_number">
                                        <field name="NUM">1</field>
                                      </block>
                                    </value>
                                    <statement name="DO">
                                      <block type="mcp_stream_resource_update">
                                        <value name="TYPE">
                                          <block type="text">
                                            <field name="TEXT">image/progress</field>
                                          </block>
                                        </value>
                                        <value name="TEXT">
                                          <block type="text_join">
                                            <mutation items="5"></mutation>
                                            <value name="ADD0">
                                              <block type="text">
                                                <field name="TEXT">{"id": "</field>
                                              </block>
                                            </value>
                                            <value name="ADD1">
                                              <block type="variables_get">
                                                <field name="VAR">id</field>
                                              </block>
                                            </value>
                                            <value name="ADD2">
                                              <block type="text">
                                                <field name="TEXT">", "status": "procesando", "progress": </field>
                                              </block>
                                            </value>
                                            <value name="ADD3">
                                              <block type="math_arithmetic">
                                                <field name="OP">MULTIPLY</field>
                                                <value name="A">
                                                  <block type="variables_get">
                                                    <field name="VAR">i</field>
                                                  </block>
                                                </value>
                                                <value name="B">
                                                  <block type="math_number">
                                                    <field name="NUM">20</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <value name="ADD4">
                                              <block type="text">
                                                <field name="TEXT">}</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="mcp_wait">
                                            <value name="MILLISECONDS">
                                              <block type="math_number">
                                                <field name="NUM">500</field>
                                              </block>
                                            </value>
                                          </block>
                                        </next>
                                      </block>
                                    </statement>
                                    <next>
                                      <block type="mcp_stream_resource_complete">
                                        <value name="TYPE">
                                          <block type="text">
                                            <field name="TEXT">image/complete</field>
                                          </block>
                                        </value>
                                        <value name="TEXT">
                                          <block type="text_join">
                                            <mutation items="3"></mutation>
                                            <value name="ADD0">
                                              <block type="text">
                                                <field name="TEXT">{"id": "</field>
                                              </block>
                                            </value>
                                            <value name="ADD1">
                                              <block type="variables_get">
                                                <field name="VAR">id</field>
                                              </block>
                                            </value>
                                            <value name="ADD2">
                                              <block type="text">
                                                <field name="TEXT">", "status": "completado", "progress": 100, "url": "https://example.com/generated-image.jpg"}</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <next>
                                          <block type="mcp_send_notification">
                                            <value name="NOTIFICATION_SYSTEM">
                                              <block type="variables_get">
                                                <field name="VAR" id="notificador">notificador</field>
                                              </block>
                                            </value>
                                            <value name="EVENT">
                                              <block type="text">
                                                <field name="TEXT">imagen-generada</field>
                                              </block>
                                            </value>
                                            <value name="DATA">
                                              <block type="text_join">
                                                <mutation items="3"></mutation>
                                                <value name="ADD0">
                                                  <block type="text">
                                                    <field name="TEXT">{"id": "</field>
                                                  </block>
                                                </value>
                                                <value name="ADD1">
                                                  <block type="variables_get">
                                                    <field name="VAR">id</field>
                                                  </block>
                                                </value>
                                                <value name="ADD2">
                                                  <block type="text">
                                                    <field name="TEXT">", "message": "¡Tu imagen ha sido generada con éxito!"}</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </statement>
                        <next>
                          <!-- Definir herramienta de generación de imágenes -->
                          <block type="mcp_define_tool">
                            <value name="NAME">
                              <block type="text">
                                <field name="TEXT">generar_imagen</field>
                              </block>
                            </value>
                            <statement name="CONFIG">
                              <block type="mcp_tool_description">
                                <value name="DESCRIPTION">
                                  <block type="text">
                                    <field name="TEXT">Genera una imagen a partir de un prompt</field>
                                  </block>
                                </value>
                                <next>
                                  <block type="mcp_tool_parameter">
                                    <value name="NAME">
                                      <block type="text">
                                        <field name="TEXT">prompt</field>
                                      </block>
                                    </value>
                                    <field name="TYPE">string</field>
                                    <next>
                                      <block type="mcp_tool_parameter">
                                        <value name="NAME">
                                          <block type="text">
                                            <field name="TEXT">estilo</field>
                                          </block>
                                        </value>
                                        <field name="TYPE">string</field>
                                        <next>
                                          <block type="mcp_tool_callback">
                                            <statement name="CALLBACK_BODY">
                                              <block type="variables_set">
                                                <field name="VAR">prompt</field>
                                                <value name="VALUE">
                                                  <block type="mcp_get_parameter_value">
                                                    <value name="PARAM">
                                                      <block type="text">
                                                        <field name="TEXT">prompt</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="variables_set">
                                                    <field name="VAR">estilo</field>
                                                    <value name="VALUE">
                                                      <block type="mcp_get_parameter_value">
                                                        <value name="PARAM">
                                                          <block type="text">
                                                            <field name="TEXT">estilo</field>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </value>
                                                    <next>
                                                      <block type="variables_set">
                                                        <field name="VAR">id</field>
                                                        <value name="VALUE">
                                                          <block type="mcp_generate_id">
                                                            <value name="PREFIX">
                                                              <block type="text">
                                                                <field name="TEXT">img</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <next>
                                                          <block type="mcp_return_tool_response">
                                                            <value name="TYPE">
                                                              <block type="text">
                                                                <field name="TEXT">streaming</field>
                                                              </block>
                                                            </value>
                                                            <value name="TEXT">
                                                              <block type="text_join">
                                                                <mutation items="7"></mutation>
                                                                <value name="ADD0">
                                                                  <block type="text">
                                                                    <field name="TEXT">{"id": "</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD1">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">id</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD2">
                                                                  <block type="text">
                                                                    <field name="TEXT">", "prompt": "</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD3">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">prompt</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD4">
                                                                  <block type="text">
                                                                    <field name="TEXT">", "estilo": "</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD5">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">estilo</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD6">
                                                                  <block type="text">
                                                                    <field name="TEXT">", "status": "iniciado", "recurso": "imagen://</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD7">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">id</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD8">
                                                                  <block type="text">
                                                                    <field name="TEXT">"}</field>
                                                                  </block>
                                                                </value>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </statement>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </statement>
                            <next>
                              <!-- Herramienta para registrar suscripción a notificaciones -->
                              <block type="mcp_define_tool">
                                <value name="NAME">
                                  <block type="text">
                                    <field name="TEXT">suscribir_notificaciones</field>
                                  </block>
                                </value>
                                <statement name="CONFIG">
                                  <block type="mcp_tool_description">
                                    <value name="DESCRIPTION">
                                      <block type="text">
                                        <field name="TEXT">Suscribe al cliente a notificaciones de imágenes generadas</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="mcp_tool_parameter">
                                        <value name="NAME">
                                          <block type="text">
                                            <field name="TEXT">cliente_id</field>
                                          </block>
                                        </value>
                                        <field name="TYPE">string</field>
                                        <next>
                                          <block type="mcp_tool_callback">
                                            <statement name="CALLBACK_BODY">
                                              <block type="variables_set">
                                                <field name="VAR">clienteId</field>
                                                <value name="VALUE">
                                                  <block type="mcp_get_parameter_value">
                                                    <value name="PARAM">
                                                      <block type="text">
                                                        <field name="TEXT">cliente_id</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="mcp_register_notification_subscriber">
                                                    <value name="NOTIFICATION_SYSTEM">
                                                      <block type="variables_get">
                                                        <field name="VAR" id="notificador">notificador</field>
                                                      </block>
                                                    </value>
                                                    <value name="SUBSCRIBER_ID">
                                                      <block type="variables_get">
                                                        <field name="VAR">clienteId</field>
                                                      </block>
                                                    </value>
                                                    <value name="CHANNEL">
                                                      <block type="text">
                                                        <field name="TEXT">imagen-generada</field>
                                                      </block>
                                                    </value>
                                                    <next>
                                                      <block type="mcp_return_tool_response">
                                                        <value name="TYPE">
                                                          <block type="text">
                                                            <field name="TEXT">texto</field>
                                                          </block>
                                                        </value>
                                                        <value name="TEXT">
                                                          <block type="text_join">
                                                            <mutation items="3"></mutation>
                                                            <value name="ADD0">
                                                              <block type="text">
                                                                <field name="TEXT">{"success": true, "message": "Suscripción registrada para cliente: </field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD1">
                                                              <block type="variables_get">
                                                                <field name="VAR">clienteId</field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD2">
                                                              <block type="text">
                                                                <field name="TEXT">"}</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </statement>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </statement>
                                <next>
                                  <!-- Agregar servidor al host -->
                                  <block type="mcp_host_add_server">
                                    <value name="HOST">
                                      <block type="variables_get">
                                        <field name="VAR" id="host">host</field>
                                      </block>
                                    </value>
                                    <value name="SERVER_ID">
                                      <block type="text">
                                        <field name="TEXT">generador-imagenes</field>
                                      </block>
                                    </value>
                                    <value name="SERVER">
                                      <block type="variables_get">
                                        <field name="VAR" id="servidor">servidor</field>
                                      </block>
                                    </value>
                                    <value name="TRANSPORT">
                                      <block type="variables_get">
                                        <field name="VAR" id="transporte">transporte</field>
                                      </block>
                                    </value>
                                    <next>
                                      <!-- Crear cliente de prueba -->
                                      <block type="variables_set">
                                        <field name="VAR" id="clienteTest">clienteTest</field>
                                        <value name="VALUE">
                                          <block type="mcp_create_test_client">
                                            <value name="NAME">
                                              <block type="text">
                                                <field name="TEXT">Cliente Test</field>
                                              </block>
                                            </value>
                                          </block>
                                        </value>
                                        <next>
                                          <!-- Agregar cliente al host -->
                                          <block type="mcp_host_add_client">
                                            <value name="HOST">
                                              <block type="variables_get">
                                                <field name="VAR" id="host">host</field>
                                              </block>
                                            </value>
                                            <value name="CLIENT_ID">
                                              <block type="text">
                                                <field name="TEXT">cliente-test</field>
                                              </block>
                                            </value>
                                            <value name="CLIENT">
                                              <block type="variables_get">
                                                <field name="VAR" id="clienteTest">clienteTest</field>
                                              </block>
                                            </value>
                                            <next>
                                              <!-- Configurar manejo de eventos -->
                                              <block type="mcp_host_on_event">
                                                <field name="EVENT">test-complete</field>
                                                <value name="HOST">
                                                  <block type="variables_get">
                                                    <field name="VAR" id="host">host</field>
                                                  </block>
                                                </value>
                                                <statement name="HANDLER">
                                                  <block type="mcp_host_stop">
                                                    <value name="HOST">
                                                      <block type="variables_get">
                                                        <field name="VAR" id="host">host</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </statement>
                                                <next>
                                                  <!-- Configurar manejo de notificaciones -->
                                                  <block type="mcp_client_on_notification">
                                                    <value name="CLIENT">
                                                      <block type="variables_get">
                                                        <field name="VAR" id="clienteTest">clienteTest</field>
                                                      </block>
                                                    </value>
                                                    <value name="CHANNEL">
                                                      <block type="text">
                                                        <field name="TEXT">imagen-generada</field>
                                                      </block>
                                                    </value>
                                                    <statement name="HANDLER">
                                                      <block type="text_print">
                                                        <value name="TEXT">
                                                          <block type="text_join">
                                                            <mutation items="2"></mutation>
                                                            <value name="ADD0">
                                                              <block type="text">
                                                                <field name="TEXT">Notificación recibida: </field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD1">
                                                              <block type="variables_get">
                                                                <field name="VAR">data</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </statement>
                                                    <next>
                                                      <!-- Iniciar host -->
                                                      <block type="mcp_host_start">
                                                        <value name="HOST">
                                                          <block type="variables_get">
                                                            <field name="VAR" id="host">host</field>
                                                          </block>
                                                        </value>
                                                        <next>
                                                          <!-- Ejecutar secuencia de prueba -->
                                                          <block type="mcp_test_run_sequence">
                                                            <statement name="SEQUENCE">
                                                              <!-- Verificar estado del servicio -->
                                                              <block type="mcp_test_read_resource">
                                                                <value name="CLIENT">
                                                                  <block type="variables_get">
                                                                    <field name="VAR" id="clienteTest">clienteTest</field>
                                                                  </block>
                                                                </value>
                                                                <value name="URI">
                                                                  <block type="text">
                                                                    <field name="TEXT">status://generator</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <!-- Suscribirse a notificaciones -->
                                                                  <block type="mcp_test_call_tool">
                                                                    <value name="CLIENT">
                                                                      <block type="variables_get">
                                                                        <field name="VAR" id="clienteTest">clienteTest</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="TOOL_NAME">
                                                                      <block type="text">
                                                                        <field name="TEXT">suscribir_notificaciones</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="MESSAGE">
                                                                      <block type="text">
                                                                        <field name="TEXT">{"cliente_id": "cliente-test"}</field>
                                                                      </block>
                                                                    </value>
                                                                    <next>
                                                                      <!-- Solicitar generación de imagen -->
                                                                      <block type="mcp_test_call_tool">
                                                                        <value name="CLIENT">
                                                                          <block type="variables_get">
                                                                            <field name="VAR" id="clienteTest">clienteTest</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="TOOL_NAME">
                                                                          <block type="text">
                                                                            <field name="TEXT">generar_imagen</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="MESSAGE">
                                                                          <block type="text">
                                                                            <field name="TEXT">{"prompt": "Un paisaje montañoso con lagos", "estilo": "realista"}</field>
                                                                          </block>
                                                                        </value>
                                                                        <next>
                                                                          <!-- Esperar para darle tiempo al streaming -->
                                                                          <block type="mcp_wait">
                                                                            <value name="MILLISECONDS">
                                                                              <block type="math_number">
                                                                                <field name="NUM">3000</field>
                                                                              </block>
                                                                            </value>
                                                                            <next>
                                                                              <!-- Emitir evento de completado -->
                                                                              <block type="mcp_host_emit_event">
                                                                                <value name="HOST">
                                                                                  <block type="variables_get">
                                                                                    <field name="VAR" id="host">host</field>
                                                                                  </block>
                                                                                </value>
                                                                                <value name="EVENT_NAME">
                                                                                  <block type="text">
                                                                                    <field name="TEXT">test-complete</field>
                                                                                  </block>
                                                                                </value>
                                                                                <value name="DATA">
                                                                                  <block type="text">
                                                                                    <field name="TEXT">{success: true}</field>
                                                                                  </block>
                                                                                </value>
                                                                              </block>
                                                                            </next>
                                                                          </block>
                                                                        </next>
                                                                      </block>
                                                                    </next>
                                                                  </block>
                                                                </next>
                                                              </block>
                                                            </statement>
                                                          </block>
                                                        </next>
                                                      </block>
                                                    </next>
                                                  </block>
                                                </next>
                                              </block>
                                            </next>
                                          </block>
                                        </next>
                                      </block>
                                    </next>
                                  </block>
                                </next>
                              </block>
                            </next>
                          </block>
                        </next>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
`;