/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Main window
 * GUI data model
 */

import { ElementVisibility, store } from "openrct2-flexui";

export const defaults = {
currentMeasurement: "Click and drag",
currentMeasurement2: "hidden",
currentMeasurement2Visibility: <ElementVisibility>"hidden"
}

export const model = {
    currentMeasurement: store<string>(defaults.currentMeasurement),
    currentMeasurement2: store<string>(defaults.currentMeasurement2),
    currentMeasurement2Visibility: store<ElementVisibility>(defaults.currentMeasurement2Visibility),

    modeButtonsPressed: {
        area: store<boolean>(false),
        tape: store<boolean>(true)
    },

    showButtonsPressed: {
        ends: store<boolean>(true),
        centre: store<boolean>(true)
    },

    ghostsButtonsPressed: {
        keepOne: store<boolean>(true),
        keepAll: store<boolean>(false),
        // other two buttons in Ghosts group are clickable only
    },
    //rest of buttons are clickable only (no pressed state perservation)

    ghostsButtonsDisabled: {
        dissmissLast: store<boolean>(true),
        dissmiisAll: store<boolean>(true)
    }
     
}