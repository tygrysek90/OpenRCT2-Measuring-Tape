/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { MapSelectionVerified } from "../tool/mapSelection";

/**
 * Find a direction of wall that can be placed on the end on selected area
 * works well for selections 1 tile wide in either axis
 * @param selection
 * @returns
 */
export function determineDirection(selection: MapSelectionVerified): Direction {
    // 1st determine general axis
    let xLength = Math.abs(selection.start.x - selection.end.x);
    let yLength = Math.abs(selection.start.y - selection.end.y);
    if (xLength > yLength) {
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
