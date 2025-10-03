/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { mapTileSize } from "../common/mapTileSize"
import { ghostRemoveFromCemeteryHistory } from "./ghostActions"
import { ghostRemoveAction } from "./ghostRemoveAction"
import { GhostRemoveArgs } from "./GhostRemoveArgs"

/**
 * Ghost removing functions
 */


/**
 * Seeks ghosts on given tile, calls to remove them from map and cemetery history
 * @param xTile number of Tile 
 * @param yTile number of Tile 
 */
export function seekAndDestroy(xTile: number, yTile: number) {
    let tile = map.getTile(xTile, yTile)
    for (let i=0; i<tile.numElements; i++) {
        if (tile.elements[i].type == "small_scenery" && tile.elements[i].isGhost) {
            let elementToRemove = tile.elements[i] as SmallSceneryElement
            let ghostRemoveArgs:GhostRemoveArgs = {
                xTiles: xTile,
                yTiles: yTile,
                objectType: "small_scenery",
                objectId: elementToRemove.object,
                objectDirection: elementToRemove.direction
            }
            ghostRemoveFromCemeteryHistory(ghostRemoveArgs)
            ghostRemoveAction(ghostRemoveArgs)
        }
        if (tile.elements[i].type == "wall" && tile.elements[i].isGhost) {
            let elementToRemove = tile.elements[i] as WallElement
            let ghostRemoveArgs:GhostRemoveArgs = {
                xTiles: xTile,
                yTiles: yTile,
                objectType: "wall",
                objectId: elementToRemove.object,
                objectDirection: elementToRemove.direction
            }
            ghostRemoveFromCemeteryHistory(ghostRemoveArgs)
            ghostRemoveAction(ghostRemoveArgs)
        }
    }
}

/**
 * Calls seekAndDestroy over given area
 * @param range Map range
 */
export function seekAndDestroyArea(range: MapRange) {
    for (let x=range.leftTop.x/mapTileSize; x<=range.rightBottom.x/mapTileSize; x++) {
        for (let y=range.leftTop.y/mapTileSize; y<=range.rightBottom.y/mapTileSize; y++) {
            seekAndDestroy(x,y)
        }
    }
}

/**
 * Obliterates (completely removes) all ghosts from the map
 */
export function obliterateGhosts() {
    for (let x=1; x<map.size.x-1; x++) {
        for (let y=1; y<map.size.y-1; y++) {
            seekAndDestroy(x,y)
        }
    }
}