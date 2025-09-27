/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { nicelyStartDefaultTool } from "./mainWin/actions";
import { getMainWindowOpenState, setMainWindowOpenState } from "./mainWin/isOpen";
import { mainWindow } from "./mainWin/mainWindow";

const shortcutOpenWindow: ShortcutDesc = {
	id: "measuring-tape.mainwindow.open",
	text: "Measuring Tape: Open & measure",
	bindings: ["ALT+T"],
	callback() {
		openMainWindowIfNotAllready()
	}
}

ui.registerShortcut(shortcutOpenWindow)

function openMainWindowIfNotAllready() {
	if (getMainWindowOpenState() == false) {
		mainWindow.open()
		setMainWindowOpenState(true)
	}
	else {
		mainWindow.focus()
		nicelyStartDefaultTool()
	}
}

/** Register a menu item under the map icon: */
export function startup() {
	if (typeof ui !== "undefined") {
		const menuItemName = "Measuring Tape";
		ui.registerMenuItem(menuItemName, () => openMainWindowIfNotAllready());
	}
}
