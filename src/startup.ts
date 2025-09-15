import { mainWindow } from "./mainWindow";

// Register a menu item under the map icon:
export function startup() {
	if (typeof ui !== "undefined") {
		const menuItemName = "Measuring Tape";
		ui.registerMenuItem(menuItemName, () => mainWindow.open());
	}
}
