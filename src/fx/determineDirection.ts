import { MapSelectionVerified } from "../tool/mapSelection";

/**
 * Find a direction of wall that can be placed on the end on selected area
 * works well for selections 1 tile wide in either axis
 * @param selection
 * @returns
 */
export function determineDirection(selection: MapSelectionVerified): Direction {
    // 1st determine general axis
    let xLenght = Math.abs(selection.start.x - selection.end.x);
    let yLenght = Math.abs(selection.start.y - selection.end.y);
    if (xLenght > yLenght) {
        // 2nd determine end on that axis
        if (selection.start.x < selection.end.x) {
            return 2;
        }
        else {
            return 0;
        }
    }
    else {
        if (selection.start.y < selection.end.y) {
            return 1;
        }
        else {
            return 3;
        }
    }
}
