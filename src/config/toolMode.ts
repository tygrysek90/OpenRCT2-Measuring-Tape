/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/


import { ToolMode } from "../tool/mapSelectionTool";

export const startToolMode = {
    savedToolMode: <ToolMode>("tape"),

    get() {
        return this.savedToolMode
    },
    
    set(v : ToolMode) {
        this.savedToolMode = v;
    }
    
}