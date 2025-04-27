export const tauth = [
  {
    kind: "category",
    name: "MCP Auth",
    colour: "#7B9EA8",
    contents: [
      {
        kind: "block",
        type: "mcp_create_auth_manager",
        fields: {
          AUTH_TYPE: "oauth"
        },
        inputs: {
          SECRET: {
            shadow: {
              type: "text",
              fields: {
                TEXT: "mi-secreto-123",
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "mcp_define_resource_protected",
      },
      {
        kind: "block",
        type: "mcp_define_tool_protected",
      },
      {
        kind: "block",
        type: "mcp_generate_auth_token",
      },
      {
        kind: "block",
        type: "mcp_get_request_auth_token",
      },
      {
        kind: "block",
        type: "mcp_get_auth_user_id",
      },
      {
        kind: "block",
        type: "mcp_test_read_resource_with_auth",
      },
      {
        kind: "block",
        type: "mcp_test_call_tool_with_auth",
      },
    ],
  }
];
