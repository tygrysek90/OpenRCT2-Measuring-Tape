/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { register } from "../actions"

/**
 * Ghost place action
 */

//const execute = register<SetGhostArgs>("ttt-ghost", setGhost);
const execute = register<GhostPlaceArgs>("mt-set-ghost", ghostPlace)
export function ghostPlaceAction(args:GhostPlaceArgs) {
    execute(args)
}

export interface GhostPlaceArgs {
    /** x position in tiles */
    xTiles: number,
    /** y position in tiles */
    yTiles: number,
    /** base height as in element.BaseHeight */
    zBase: number
    /** OpenRCT2 Direction type */
    direction: Direction,
    /** OpenRC2 ObjectType */
    type: ObjectType,
    /** object number (for the given object type) */
    object: number
}

function ghostPlace(args:GhostPlaceArgs) {
    let tile = map.getTile(args.xTiles, args.yTiles)
    let numElements = tile.numElements
    switch (args.type) {
        case "wall": 
            let newEl = tile.insertElement(numElements) as WallElement
            newEl.type = "wall"
            newEl.baseHeight = args.zBase
            newEl.direction = args.direction
            newEl.object = args.object
            newEl.isGhost = true
            break
        case "small_scenery":
            let newE = tile.insertElement(numElements) as SmallSceneryElement
            newE.type = "small_scenery"
            newE.baseHeight = args.zBase
            newE.object = args.object
            newE.direction = args.direction
            newE.isGhost = true
            break
    }
}