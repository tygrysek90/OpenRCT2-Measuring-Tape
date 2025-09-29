/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/


/**
 * Versioning and release naming
 */

import { build } from "./environment"

/** Primary version designation */
const version : string = "0.1.2"

/** Release name */
function name():string {
    if (build.isDevelopment) {
        return "(development)"
    }
    else { // release
        switch (version) {
            case "0.1":
                return "“Bari“"
            case "0.2":
                return "“Foggia“"
            default:
                return "" // this should not happen!
        }
    }
}


/**
 * 
 * @returns en empty string in case of production build, -dev suffix in topaz coulour otherwise 
 */
function suffix(): string{
    if (build.isDevelopment) {
        return "{TOPAZ}-dev"
    }
    else {
        return ""
    }
}


/** plugin version with 'v-' prefix */
export const pluginVersion = `v-${version}${suffix()}`

/** plugin version with 'v.' prefix */
export const pluginVersionReadable = `v.${version}${suffix()}`

/** 
 * plugin version with: 
 * development spelled out
 * or release name
 */
export const pluginVersionReadableWithName = `${pluginVersionReadable} ${name()}`