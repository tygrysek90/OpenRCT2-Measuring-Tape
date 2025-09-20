import {  shortcutCallback } from "./actions";
import { initConfig as initPluginConfig } from "./config/ghosts";
import { mainWindow } from "./mainWindow";

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

// Register a menu item under the map icon:
export function startup() {
	if (typeof ui !== "undefined") {
		const menuItemName = "Measuring Tape";
		ui.registerMenuItem(menuItemName, () => mainWindow.open());
	}
}
