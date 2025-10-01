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
	 * This field determines which OpenRCT2 API version to use. It's best to always use the
	 * latest release version, unless you want to use specific versions from a newer develop
	 * version. Version 70 equals the v0.4.4 release.
	 * @see https://github.com/OpenRCT2/OpenRCT2/blob/v0.4.4/src/openrct2/scripting/ScriptEngine.h#L50
	 */
	targetApiVersion: 70,
	main: startup,
});