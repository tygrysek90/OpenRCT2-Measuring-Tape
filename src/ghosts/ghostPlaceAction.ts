/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { register } from "../actions"
import { GhostPlaceArgs } from "./GhostPlaceArgs"

/**
 * Ghost place action
 */
const execute = register<GhostPlaceArgs>("mt-set-ghost", ghostPlace)
/** Places a ghost on the map via registered action (multiplayer-aware) */
export function ghostPlaceAction(args:GhostPlaceArgs) {
    execute(args)
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