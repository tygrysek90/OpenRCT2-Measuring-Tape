/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import {  shortcutCallback } from "./mainWin/actions";
import { initConfig as initPluginConfig } from "./config/ghosts";
import { mainWindow } from "./mainWin/mainWindow";

const shortcutOpenWindow: ShortcutDesc = {
	id: "measuring-tape.mainwindow.open",
	text: "Measuring Tape: Open window",
	bindings: ["ALT+T"],
	callback() {
		mainWindow.open()
		shortcutCallback()
	}
}

ui.registerShortcut(shortcutOpenWindow)
initPluginConfig()

/** Register a menu item under the map icon: */
export function startup() {
	if (typeof ui !== "undefined") {
		const menuItemName = "Measuring Tape";
		ui.registerMenuItem(menuItemName, () => mainWindow.open());
	}
}
