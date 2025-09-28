/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import {  store } from "openrct2-flexui"


/**
 * Configuration
 * UI data model
 */


export const objSelModel = {
    typeShownList: store<string[]>( ["error:", "config", "types", "not", "loaded"] ),
    typeChosen: store<RowColumn>({row: 0, column: 0}),
    typeChosenLabel: store<string>("top label"),
    typeChosenObjLabel: store<string>("1st line below image"),
    typeChosenObjLabel2: store<string>("2st line below image"),

    objGroupLabel: store<string>("Error: not initialized"),
    /** Input field for searching */
    objSearchFilter: store<string>(""),
    /** Checkbox for scenery filter */
    objCheckFilter: {
        value: store<boolean>(true),
        disabled: store<boolean>(false)
    } ,
    objList: store<string[]>( ["error:", "no", "items", "loaded", ":("]),
    objSelectedName: store<string>(""),

    moreOptionsCheck: store<boolean>(false)
}