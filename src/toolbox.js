import { tcommon } from './toolbox-blockly/common';
import { tsetup } from './toolbox-mcp/setup';
import { tresources } from './toolbox-mcp/resources';
import { ttools } from './toolbox-mcp/tools';
import { tprompts } from './toolbox-mcp/prompts';
import { tevents } from './toolbox-mcp/events';
import { tauth } from './toolbox-mcp/auth';
import { tstorage } from './toolbox-mcp/storage';
import { tapp } from './toolbox-mcp/app';

/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

export const toolbox = {
    kind: "categoryToolbox",
    contents: [
        ...tcommon,
		{
			kind: "sep",
		},
		...tapp,
        ...tsetup,
		{
			kind: "sep",
		},
        ...tresources,
        ...ttools,
        ...tprompts,
		{
			kind: "sep",
		},
        ...tevents,
		{
			kind: "sep",
		},
        ...tauth,
		{
			kind: "sep",
		},
        ...tstorage,
    ],
};
