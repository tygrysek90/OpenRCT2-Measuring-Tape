import { GhostConfigRow } from "../config/ghosts";
import { selectTop } from "./objSelActions";
import { objectSelectionWindow } from "./objSelectionWind";


export function openObjSelection() {
    objectSelectionWindow.open();
    objectSelectionWindow.focus();
    selectTop(GhostConfigRow.tape_start);
}
