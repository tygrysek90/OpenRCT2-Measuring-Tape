import { GhostConfigRow } from "../config/ghosts";
import { selectTop } from "./objSelActions";
import { objectSelectionWindow } from "./objSelectionWind";


export function openObjSelection(objSelection: GhostConfigRow) {
    objectSelectionWindow.open();
    objectSelectionWindow.focus();
    selectTop(objSelection);
}
