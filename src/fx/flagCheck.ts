/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/


/**
 * Checks for a bit flag
 * @param what a bitmask number to be checked
 * @param flag a flag to be seeked in *what*
 * @returns true if flag is present, false otherwise
 */
export function hasFlag(what: number, flag: number): boolean {
    if ((what & flag) == flag) {
        return true
    }
    else {
        return false
    }
}


/**
 * Checks for bit flags 
 * (same as hasFlag, but accepts un array of numbers)
 * @param what bitmask number to be checked
 * @param flags array of flags
 * @returns true if __all flags__ are present, false otherwise
 */
export function hasFlags(what: number, flags: number[]): boolean {
    for (let i=0; i<flags.length; i++) {
        if (!hasFlag(what, flags[i])) {
            return false
        }
    }
    return true
}

export function hasOneFlagOf(what: number, flags: number[]): boolean {
    for (let i=0; i<flags.length; i++) {
        if (hasFlag(what, flags[i])) {
            return true
        }
    }
    return false
}