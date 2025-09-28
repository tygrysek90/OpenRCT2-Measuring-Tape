/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * for storing configuration game-wide
 */


export const configs = {
    moreObjectOptions: "moreObjectOptions",
    sequential: "sequential"
}


/* Code in this file is sourced from
 * The OpenRCT2 plugin "Scenery Manager",
 * (which is) licensed under the GNU General Public License version 3.
 * Copyright (c) 2020-2025 Sadret
 * retrieved from:
 * https://github.com/Sadret/openrct2-scenery-manager/blob/6795a6205b2bda054251237fd658da205015c4ad/src/persistence/Storage.ts#L11-L22
 * 
 * (only the functions are renamed with sharedStorage prefix
 * yeah, i had to spell it out, there is this historical
 * thingy with two 'S' letters... so... nope...)
*/


const namespace = "measuring-tape";
const storagePrefix = namespace + ".";

export function sharedStorageHas(key: string): boolean {
    return context.sharedStorage.has(storagePrefix + key);
}

export function sharedStorageGet<S>(key: string): S | undefined {
    return context.sharedStorage.get(storagePrefix + key);
}

export function sharedStorageSet<S>(key: string, value: S): void {
    context.sharedStorage.set(storagePrefix + key, value);
}