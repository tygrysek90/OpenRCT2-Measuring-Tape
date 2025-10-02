/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { register } from "../actions"
import { GhostRemoveArgs } from "./GhostRemoveArgs"

/**
 * Ghost remove action
 */
const execute = register<GhostRemoveArgs>("mt-remove-ghost", ghostRemove)
/** Removes a ghost via registered action (multiplayer-compatible) */
export function ghostRemoveAction(args:GhostRemoveArgs) {
    execute(args)
}

export function ghostRemove(args: GhostRemoveArgs) {
    let tile = map.getTile(args.xTiles, args.yTiles)
    for (let i=0; i<tile.numElements; i++) {
        switch (tile.elements[i].type) {
            case "small_scenery":
                let smallScE = tile.elements[i] as SmallSceneryElement
                if (args.objectType == "small_scenery" && smallScE.isGhost == true && smallScE.object == args.objectId && smallScE.direction == args.objectDirection) {
                    tile.removeElement(i)
                }
                break
            case "wall":
                let wallE = tile.elements[i] as WallElement
                if (args.objectType == "wall" && wallE.isGhost == true && wallE.object == args.objectId && wallE.direction == args.objectDirection ) {
                    tile.removeElement(i)
                }
        }
    }

}