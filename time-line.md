# Codelab: (MCP & Blockly) (+ ¿generador tipado?)

Con caracter eminentemente práctico y de spike (enfangarse con código), el presente Codelab parte de [Codelab: Build a custom generator](https://blocklycodelabs.dev/codelabs/custom-generator/index.html) y se inicializa, para **crear un espacio de trabajo**, a partir de un lienzo base Blockly 11 con generador para Javascript. Ver imagen para editor, herramientas y setup:

```bash
npx @blockly/create-package app custom-generator-codelab
```

![](./PICS/mcp_0000.png)

MCP se propone, desde [Anthropic](https://www.anthropic.com/news/model-context-protocol), a finales del año pasado, a la hora de [modelizar escenas "agentic"](https://modelcontextprotocol.io/introduction) en las que varios autómatas comparten recursos en tareas orquestadas por el usuario. MCP se define como un posible protocolo para crear un primer gran estandar que permita a fabricantes, operadores e ingenieros unificar sus esfuerzos y aprovechar sinergias. 

No necesariamente toda la comunidad adoptará este protocolo. El [libro de recetas de Anthropic](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents) será distinto o parecido al [libro de recetas de OpenAI](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf), diferencias entre el [SDK de Anthropic](https://github.com/modelcontextprotocol/typescript-sdk) y el [SDK de OpenAI](https://openai.github.io/openai-agents-python/)  equivalen los mismos flujos, y, como en la guerra de las corrientes entre Tesla, Edison y los demás, está abierta la [lucha](https://en.wikipedia.org/w/index.php?title=Removal_of_Sam_Altman_from_OpenAI) (competitiva o cooperativa, que de todo hay) por las patentes, y, escoger un protocolo para la IA no es un caso ajeno a esta disputa.

Actualmente, visitando [la tabla comparativa](https://modelcontextprotocol.io/clients), una de las pocas implementaciones completas de MCP es [fast-agent](https://fast-agent.ai/) en el mundo python. ¿Objetivo terciario un 'fast-agent-ts' para la versión TypeScript?

![](./PICS/mcp_000.png)

¿Empezamos?

[PROMPT_HISTORY/00_write_a_prompt.md](./PROMPT_HISTORY/00_write_a_prompt.md).



### Plan

[PROMPT_HISTORY/01_create_a_plan.md](./PROMPT_HISTORY/01_create_a_plan.md).

[PROMPT_HISTORY/02_create_a_mark_in_the_horizon.md](./PROMPT_HISTORY/02_create_a_mark_in_the_horizon.md)

[PROMPT_HISTORY/03_expand_toolbox.md](./PROMPT_HISTORY/03_expand_toolbox.md)

