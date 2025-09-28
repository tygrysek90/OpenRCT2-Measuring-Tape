/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { GhostConfigRow } from "../config/ghosts";
import { selectTop } from "./objSelActions";
import { objectSelectionWindow } from "./objSelectionWind";


export function openObjSelection() {
    objectSelectionWindow.open();
    objectSelectionWindow.focus();
    
    selectTop(GhostConfigRow.tape_start);
}
