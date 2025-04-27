[English](./README-en.md)

# MCP Blockly Studio

- [time-line.md](./time-line.md) White paper.
- [Repo](https://jsanchezamai.github.io/blockly-mcp-common-palette)
- [Editor Showcase](https://jsanchezamai.github.io/blockly-mcp-common-palette)
- [Editor Blockly](https://jsanchezamai.github.io/blockly-mcp-common-palette/dist/)

A visual programming environment for creating Model Context Protocol (MCP) applications using Google's Blockly.

[Demo https://jsanchezamai.github.io/blockly-mcp-common-palette](https://jsanchezamai.github.io/blockly-mcp-common-palette)

![MCP Blockly Studio Interface](./PICS/mcp_monaco.png)

## Overview

MCP Blockly Studio provides a block-based approach to building applications that follow the [Model Context Protocol](https://modelcontextprotocol.io/introduction) specification. The project uses the [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) to create compatible servers, clients, and other components.

Users can:
- Create MCP servers with various resources and tools
- Build clients that interact with MCP servers
- Configure different transport types (stdio, streamable HTTP)
- Implement authentication, notifications, and prompts
- Test with built-in tutorial projects
- Export generated JavaScript code

## Tutorial Projects

MCP Blockly Studio includes several tutorial projects:

1. **Echo Server**: A basic MCP server that echoes messages sent by clients
2. **Weather Client**: An MCP client that connects to a weather service API
3. **Task Assistant**: A task management server with OAuth authentication
4. **Image Generator**: A server that generates images with progress notifications

![Tutorial Example](./PICS/mcp_tutorial_1_echo.png)

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run start` to launch the development server
4. Select a tutorial project from the dropdown or create your own from scratch
5. Modify the blocks in the workspace
6. View the generated JavaScript code in the editor panel
7. Download the code using the "Download Code" button

## Project Structure

File [time-line.md](./time-line.md) is main changeLog to get overall view of the project. At folder [PROMPT_HISTORY](./PROMPT_HISTORY/) there is stored the in deep theory for the timeline.

- `src/` - Source code for the application
  - `blocks/` - Custom Blockly block definitions
  - `toolbox-mcp/` - MCP-specific toolbox categories
  - `generators/` - Code generators for translating blocks to JavaScript
- `PICS/` - Project screenshots and images
- `mcp-ts-sdk/` - MCP TypeScript SDK (included as a dependency)

## Built With

- [Blockly](https://developers.google.com/blockly)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Webpack](https://webpack.js.org/)

## Community Contributions

MCP Blockly Studio is an open-source project and we welcome community contributions! Here are some ways you can help:

- **Report bugs** by opening issues on our [GitHub repository](https://github.com/jsanchezamai/blockly-mcp-common-palette/issues)
- **Suggest new features** that would make the tool more useful
- **Submit pull requests** to fix issues or add capabilities
- **Create tutorials** showing how to build MCP applications with our tool
- **Fork the project** to create your own specialized version

We're especially interested in contributions that:
- Add new block types for MCP functionality
- Improve code generation
- Enhance the UI/UX
- Add more examples and tutorials
- Improve documentation

Check our [open issues](https://github.com/jsanchezamai/blockly-mcp-common-palette/issues) to find good starting points for contribution!


## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
