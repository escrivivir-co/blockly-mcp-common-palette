export const tsetup = [
	{
		kind: "category",
		name: "MCP Setup",
		colour: "#5C81A6",
		contents: [
			{
				kind: "block",
				type: "mcp_create_server",
				inputs: {
					NAME: {
						shadow: {
							type: "text",
							fields: {
								TEXT: "Mi Servidor",
							},
						},
					},
					VERSION: {
						shadow: {
							type: "text",
							fields: {
								TEXT: "1.0.0",
							},
						},
					},
				},
			},
			{
				kind: "block",
				type: "mcp_create_client",
				inputs: {
					NAME: {
						shadow: {
							type: "text",
							fields: {
								TEXT: "Mi Cliente",
							},
						},
					},
					VERSION: {
						shadow: {
							type: "text",
							fields: {
								TEXT: "1.0.0",
							},
						},
					},
				},
			},
			{
				kind: "block",
				type: "mcp_stdio_transport_server",
			},
			{
				kind: "block",
				type: "mcp_stdio_transport_client",
			},
			{
				kind: "block",
				type: "mcp_http_transport_server",
				inputs: {
					PORT: {
						shadow: {
							type: "math_number",
							fields: {
								NUM: 3000,
							},
						},
					},
				},
			},
			{
				kind: "block",
				type: "mcp_http_transport_client",
				inputs: {
					URL: {
						shadow: {
							type: "text",
							fields: {
								TEXT: "http://localhost:3000/mcp",
							},
						},
					},
				},
			},
			{
				kind: "block",
				type: "mcp_connect",
			},
			{
				kind: "block",
				type: "mcp_disconnect",
			},
		],
	}];