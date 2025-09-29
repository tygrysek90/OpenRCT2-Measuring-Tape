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
 * Order a map selection to a way that start being always numerically lower than end
 * @param selection
 * @returns selection ordered in a way such that start corner is always closer to (0,0) tile and end is further into map
 */
export function orderVerifiedSelection(selection: MapSelectionVerified): MapSelectionVerified {
    return {
        start: {
            x: Math.min(selection.start.x, selection.end.x),
            y: Math.min(selection.start.y, selection.end.y)
        },
        end: {
            x: Math.max(selection.start.x, selection.end.x),
            y: Math.max(selection.start.y, selection.end.y)
        }
    };
}
