/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Ghost remove action
 */

export interface GhostRemoveArgs {
    /** x position in tiles */
    xTiles: number,
    /** y position in tiles */
    yTiles: number,
    /** element index in tile */
    index: number
}

export function ghostRemoveAction(args: GhostRemoveArgs) {
    let tile = map.getTile(args.xTiles, args.yTiles)
    tile.removeElement(args.index)
}