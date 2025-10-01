/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { nicelyStartTool, stopTool } from "./mainWin/actions";
import { mainWindowIsOpen } from "./mainWin/isOpen";
import { mainWindow } from "./mainWin/mainWindow";
import { startToolMode } from "./config/toolMode";
import { registerActions } from "./actions";


const shortcuts: Array<ShortcutDesc> = [
	{
		id: "measuring-tape.mainwindow.open",
		text: "[MT] Open & measure",
		bindings: ["ALT+T"],
		callback() {
			openMainWindowIfNotAlready();
		}
	},
	{
		id: "measuring-tape.mainwindow.open-tape",
		text: "[MT] Tape tool",
		bindings: [""],
		callback() {
			startToolMode.set("tape");
			openMainWindowIfNotAlready();
		}
	},
	{
		id: "measuring-tape.mainwindow.open-area",
		text: "[MT] Area tool",
		bindings: [""],
		callback() {
			startToolMode.set("area");
			openMainWindowIfNotAlready();
		}
	}
];

export function registerShortcuts() {
	shortcuts.forEach(shortcut => {
		ui.registerShortcut(shortcut);
	});
}

export function openMainWindowIfNotAlready() {
	if (mainWindowIsOpen.get() == false) {
		mainWindow.open()
		mainWindowIsOpen.set(true)
	}
	else {
		mainWindow.focus()
		stopTool()
		nicelyStartTool(startToolMode.get())
	}
}

/** Register a menu item under the map icon: */
export function startup() {
	registerActions()
	if (typeof ui !== "undefined") {
		registerShortcuts()
		const menuItemName = "Measuring Tape";
		ui.registerMenuItem(menuItemName, () => openMainWindowIfNotAlready());
	}
}
