export const tstreaming = [
  {
    kind: "category",
    name: "MCP Streaming",
    colour: "#76A5AF",
    contents: [
      {
        kind: "block",
        type: "mcp_define_resource_streaming",
      },
      {
        kind: "block",
        type: "mcp_stream_resource_start",
      },
      {
        kind: "block",
        type: "mcp_stream_resource_update",
      },
      {
        kind: "block",
        type: "mcp_stream_resource_complete",
      },
      {
        kind: "block",
        type: "mcp_wait",
        inputs: {
          MILLISECONDS: {
            shadow: {
              type: "math_number",
              fields: {
                NUM: 1000,
              },
            },
          },
        },
      },
      {
        kind: "block",
        type: "mcp_generate_id",
        inputs: {
          PREFIX: {
            shadow: {
              type: "text",
              fields: {
                TEXT: "id",
              },
            },
          },
        },
      },
    ],
  }
];