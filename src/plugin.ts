/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/// <reference path="../lib/openrct2.d.ts" />

import { startup } from "./startup";
import { pluginVersion } from "./version";

registerPlugin({
	name: "Measuring Tape",
	version: pluginVersion,
	authors: [ "Ríša Szlachta (tygrysek90)" ],
	type: "remote",
	licence: "GPL-3.0-only",
	/**
	 * This field determines which OpenRCT2 API version to use. 
	 *
	 * API version 110 starts at OpenRCT2 0.4.25 (released 2025-08-03) and is know to go up to 0.4.27
	 * at the moment of writing in current development at commit 
	 * 310056b71c4b60101f9f557037352cd7cf6a66b8 as of 8th of (spook)October 2025
	**/
	targetApiVersion: 110,
	main: startup,
});