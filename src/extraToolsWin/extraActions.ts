/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { findMapCentre, findMapEdgesCentres } from "../ghosts/ghostActions";
import { onToolUp } from "../mainWin/actions";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
    onToolUp()
}

export function onClickMapCentre() {
    findMapCentre()
    onToolUp()
}