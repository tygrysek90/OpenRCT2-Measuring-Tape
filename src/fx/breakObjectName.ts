/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Break object name over line in nice way
 * @param str object name in format rctx.something.someobject
 * @returns string with {NEWLINE} inserted before second "."
 */
export function breakObjectName(str: string): string {
    let split = str.split(".")
    if (split.length == 3) {
        return `${split[0]}.${split[1]}{NEWLINE}.${split[2]}`
    }
    else {
        return str
    }
}