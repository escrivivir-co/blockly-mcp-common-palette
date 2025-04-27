export const tutorial3XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="host">host</variable>
    <variable id="servidor">servidor</variable>
    <variable id="transporte">transporte</variable>
    <variable id="clienteTest">clienteTest</variable>
    <variable id="authManager">authManager</variable>
  </variables>
  
  <!-- Crear Host MCP -->
  <block type="variables_set" id="set_host" x="20" y="20">
    <field name="VAR" id="host">host</field>
    <value name="VALUE">
      <block type="mcp_create_host">
        <value name="NAME">
          <block type="text">
            <field name="TEXT">Host de Asistente de Tareas</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <!-- Crear Gestor de Autenticación -->
      <block type="variables_set" id="set_auth_manager">
        <field name="VAR" id="authManager">authManager</field>
        <value name="VALUE">
          <block type="mcp_create_auth_manager">
            <field name="AUTH_TYPE">oauth</field>
            <value name="SECRET">
              <block type="text">
                <field name="TEXT">mi-secreto-muy-seguro-123</field>
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
                    <field name="TEXT">Asistente de Tareas</field>
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
                    <field name="MODE">standard</field>
                  </block>
                </value>
                <next>
                  <!-- Definir recurso de autenticación -->
                  <block type="mcp_define_resource_static">
                    <value name="NAME">
                      <block type="text">
                        <field name="TEXT">auth</field>
                      </block>
                    </value>
                    <value name="URI">
                      <block type="text">
                        <field name="TEXT">auth://login</field>
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
                            <field name="TEXT">{"message": "Use la herramienta login para autenticarse"}</field>
                          </block>
                        </value>
                      </block>
                    </statement>
                    <next>
                      <!-- Definir herramienta de login -->
                      <block type="mcp_define_tool">
                        <value name="NAME">
                          <block type="text">
                            <field name="TEXT">login</field>
                          </block>
                        </value>
                        <statement name="CONFIG">
                          <block type="mcp_tool_description">
                            <value name="DESCRIPTION">
                              <block type="text">
                                <field name="TEXT">Autentica al usuario en el sistema</field>
                              </block>
                            </value>
                            <next>
                              <block type="mcp_tool_parameter">
                                <value name="NAME">
                                  <block type="text">
                                    <field name="TEXT">username</field>
                                  </block>
                                </value>
                                <field name="TYPE">string</field>
                                <next>
                                  <block type="mcp_tool_parameter">
                                    <value name="NAME">
                                      <block type="text">
                                        <field name="TEXT">password</field>
                                      </block>
                                    </value>
                                    <field name="TYPE">string</field>
                                    <next>
                                      <block type="mcp_tool_callback">
                                        <statement name="CALLBACK_BODY">
                                          <block type="variables_set">
                                            <field name="VAR">username</field>
                                            <value name="VALUE">
                                              <block type="mcp_get_parameter_value">
                                                <value name="PARAM">
                                                  <block type="text">
                                                    <field name="TEXT">username</field>
                                                  </block>
                                                </value>
                                              </block>
                                            </value>
                                            <next>
                                              <block type="variables_set">
                                                <field name="VAR">password</field>
                                                <value name="VALUE">
                                                  <block type="mcp_get_parameter_value">
                                                    <value name="PARAM">
                                                      <block type="text">
                                                        <field name="TEXT">password</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="controls_if">
                                                    <mutation else="1"></mutation>
                                                    <value name="IF0">
                                                      <block type="logic_operation">
                                                        <field name="OP">AND</field>
                                                        <value name="A">
                                                          <block type="logic_compare">
                                                            <field name="OP">EQ</field>
                                                            <value name="A">
                                                              <block type="variables_get">
                                                                <field name="VAR">username</field>
                                                              </block>
                                                            </value>
                                                            <value name="B">
                                                              <block type="text">
                                                                <field name="TEXT">usuario1</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <value name="B">
                                                          <block type="logic_compare">
                                                            <field name="OP">EQ</field>
                                                            <value name="A">
                                                              <block type="variables_get">
                                                                <field name="VAR">password</field>
                                                              </block>
                                                            </value>
                                                            <value name="B">
                                                              <block type="text">
                                                                <field name="TEXT">clave123</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </value>
                                                    <statement name="DO0">
                                                      <block type="variables_set">
                                                        <field name="VAR">token</field>
                                                        <value name="VALUE">
                                                          <block type="mcp_generate_auth_token">
                                                            <value name="AUTH_MANAGER">
                                                              <block type="variables_get">
                                                                <field name="VAR" id="authManager">authManager</field>
                                                              </block>
                                                            </value>
                                                            <value name="USER_ID">
                                                              <block type="variables_get">
                                                                <field name="VAR">username</field>
                                                              </block>
                                                            </value>
                                                          </block>
                                                        </value>
                                                        <next>
                                                          <block type="mcp_return_tool_response">
                                                            <value name="TYPE">
                                                              <block type="text">
                                                                <field name="TEXT">auth</field>
                                                              </block>
                                                            </value>
                                                            <value name="TEXT">
                                                              <block type="text_join">
                                                                <mutation items="3"></mutation>
                                                                <value name="ADD0">
                                                                  <block type="text">
                                                                    <field name="TEXT">{"success": true, "message": "Login correcto", "token": "</field>
                                                                  </block>
                                                                </value>
                                                                <value name="ADD1">
                                                                  <block type="variables_get">
                                                                    <field name="VAR">token</field>
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
                                                    </statement>
                                                    <statement name="ELSE">
                                                      <block type="mcp_return_tool_response">
                                                        <value name="TYPE">
                                                          <block type="text">
                                                            <field name="TEXT">error</field>
                                                          </block>
                                                        </value>
                                                        <value name="TEXT">
                                                          <block type="text">
                                                            <field name="TEXT">{"success": false, "message": "Credenciales incorrectas"}</field>
                                                          </block>
                                                        </value>
                                                      </block>
                                                    </statement>
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
                          <!-- Definir recurso protegido de tareas -->
                          <block type="mcp_define_resource_protected">
                            <value name="NAME">
                              <block type="text">
                                <field name="TEXT">tareas</field>
                              </block>
                            </value>
                            <value name="URI">
                              <block type="text">
                                <field name="TEXT">tareas://lista</field>
                              </block>
                            </value>
                            <value name="AUTH_MANAGER">
                              <block type="variables_get">
                                <field name="VAR" id="authManager">authManager</field>
                              </block>
                            </value>
                            <statement name="CALLBACK">
                              <block type="variables_set">
                                <field name="VAR">userId</field>
                                <value name="VALUE">
                                  <block type="mcp_get_auth_user_id">
                                    <value name="AUTH_TOKEN">
                                      <block type="mcp_get_request_auth_token"></block>
                                    </value>
                                    <value name="AUTH_MANAGER">
                                      <block type="variables_get">
                                        <field name="VAR" id="authManager">authManager</field>
                                      </block>
                                    </value>
                                  </block>
                                </value>
                                <next>
                                  <block type="mcp_return_resource_content">
                                    <value name="URI">
                                      <block type="text">
                                        <field name="TEXT">uri</field>
                                      </block>
                                    </value>
                                    <value name="TEXT">
                                      <block type="text_join">
                                        <mutation items="3"></mutation>
                                        <value name="ADD0">
                                          <block type="text">
                                            <field name="TEXT">{"tareas": ["Comprar leche", "Llamar al médico", "Reunión de trabajo"], "usuario": "</field>
                                          </block>
                                        </value>
                                        <value name="ADD1">
                                          <block type="variables_get">
                                            <field name="VAR">userId</field>
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
                            </statement>
                            <next>
                              <!-- Definir herramienta para añadir tarea (protegida) -->
                              <block type="mcp_define_tool_protected">
                                <value name="NAME">
                                  <block type="text">
                                    <field name="TEXT">agregar_tarea</field>
                                  </block>
                                </value>
                                <value name="AUTH_MANAGER">
                                  <block type="variables_get">
                                    <field name="VAR" id="authManager">authManager</field>
                                  </block>
                                </value>
                                <statement name="CONFIG">
                                  <block type="mcp_tool_description">
                                    <value name="DESCRIPTION">
                                      <block type="text">
                                        <field name="TEXT">Agrega una nueva tarea a la lista</field>
                                      </block>
                                    </value>
                                    <next>
                                      <block type="mcp_tool_parameter">
                                        <value name="NAME">
                                          <block type="text">
                                            <field name="TEXT">tarea</field>
                                          </block>
                                        </value>
                                        <field name="TYPE">string</field>
                                        <next>
                                          <block type="mcp_tool_callback">
                                            <statement name="CALLBACK_BODY">
                                              <block type="variables_set">
                                                <field name="VAR">tarea</field>
                                                <value name="VALUE">
                                                  <block type="mcp_get_parameter_value">
                                                    <value name="PARAM">
                                                      <block type="text">
                                                        <field name="TEXT">tarea</field>
                                                      </block>
                                                    </value>
                                                  </block>
                                                </value>
                                                <next>
                                                  <block type="variables_set">
                                                    <field name="VAR">userId</field>
                                                    <value name="VALUE">
                                                      <block type="mcp_get_auth_user_id">
                                                        <value name="AUTH_TOKEN">
                                                          <block type="mcp_get_request_auth_token"></block>
                                                        </value>
                                                        <value name="AUTH_MANAGER">
                                                          <block type="variables_get">
                                                            <field name="VAR" id="authManager">authManager</field>
                                                          </block>
                                                        </value>
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
                                                            <mutation items="5"></mutation>
                                                            <value name="ADD0">
                                                              <block type="text">
                                                                <field name="TEXT">{"success": true, "message": "Tarea añadida correctamente", "tarea": "</field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD1">
                                                              <block type="variables_get">
                                                                <field name="VAR">tarea</field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD2">
                                                              <block type="text">
                                                                <field name="TEXT">", "usuario": "</field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD3">
                                                              <block type="variables_get">
                                                                <field name="VAR">userId</field>
                                                              </block>
                                                            </value>
                                                            <value name="ADD4">
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
                                        <field name="TEXT">asistente-tareas</field>
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
                                                          <!-- Consultar recurso no autenticado -->
                                                          <block type="mcp_test_read_resource">
                                                            <value name="CLIENT">
                                                              <block type="variables_get">
                                                                <field name="VAR" id="clienteTest">clienteTest</field>
                                                              </block>
                                                            </value>
                                                            <value name="URI">
                                                              <block type="text">
                                                                <field name="TEXT">auth://login</field>
                                                              </block>
                                                            </value>
                                                            <next>
                                                              <!-- Intentar acceder a recurso protegido (debe fallar) -->
                                                              <block type="mcp_test_read_resource">
                                                                <value name="CLIENT">
                                                                  <block type="variables_get">
                                                                    <field name="VAR" id="clienteTest">clienteTest</field>
                                                                  </block>
                                                                </value>
                                                                <value name="URI">
                                                                  <block type="text">
                                                                    <field name="TEXT">tareas://lista</field>
                                                                  </block>
                                                                </value>
                                                                <next>
                                                                  <!-- Login correcto -->
                                                                  <block type="mcp_test_call_tool">
                                                                    <value name="CLIENT">
                                                                      <block type="variables_get">
                                                                        <field name="VAR" id="clienteTest">clienteTest</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="TOOL_NAME">
                                                                      <block type="text">
                                                                        <field name="TEXT">login</field>
                                                                      </block>
                                                                    </value>
                                                                    <value name="MESSAGE">
                                                                      <block type="text">
                                                                        <field name="TEXT">{"username": "usuario1", "password": "clave123"}</field>
                                                                      </block>
                                                                    </value>
                                                                    <next>
                                                                      <!-- Acceder a recurso protegido (ahora debe funcionar) -->
                                                                      <block type="mcp_test_read_resource_with_auth">
                                                                        <value name="CLIENT">
                                                                          <block type="variables_get">
                                                                            <field name="VAR" id="clienteTest">clienteTest</field>
                                                                          </block>
                                                                        </value>
                                                                        <value name="URI">
                                                                          <block type="text">
                                                                            <field name="TEXT">tareas://lista</field>
                                                                          </block>
                                                                        </value>
                                                                        <next>
                                                                          <!-- Llamar a herramienta protegida -->
                                                                          <block type="mcp_test_call_tool_with_auth">
                                                                            <value name="CLIENT">
                                                                              <block type="variables_get">
                                                                                <field name="VAR" id="clienteTest">clienteTest</field>
                                                                              </block>
                                                                            </value>
                                                                            <value name="TOOL_NAME">
                                                                              <block type="text">
                                                                                <field name="TEXT">agregar_tarea</field>
                                                                              </block>
                                                                            </value>
                                                                            <value name="MESSAGE">
                                                                              <block type="text">
                                                                                <field name="TEXT">{"tarea": "Enviar informe mensual"}</field>
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
</xml>
`;
