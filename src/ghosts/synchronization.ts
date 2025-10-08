/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/



import { registerWithoutPermissions } from "../actions"
import { isMultiplayer } from "../environment"
import { error } from "../logger/logger"
import { GhostRealmSynchronization } from "./GhostRealmArgs"


/**
 * Network sync data receiving
 *
 * this works for multiplayer in client mode
 * once, upon joining the server
 */

const execute = registerWithoutPermissions<GhostRealmSynchronization>("mt-network-welcome-sync", synchronize)
/** Places a ghost on the map via registered action (multiplayer-aware) */
export function GhostRealmSynchronizationAction(args:GhostRealmSynchronization) {
    execute(args)
}

function synchronize(sync: GhostRealmSynchronization) {
    if (isMultiplayer()) {
        if (sync.designatedReceiver == network.currentPlayer.id) {
                let tile = map.getTile(sync.ghostRealmPiece.xTile, sync.ghostRealmPiece.yTile)
                let numElements = tile.numElements
                if (sync.ghostRealmPiece.zBase != undefined) {
                    switch (sync.ghostRealmPiece.type) {
                        case "wall": 
                            let newEl = tile.insertElement(numElements) as WallElement
                            newEl.type = "wall"
                            newEl.baseHeight = sync.ghostRealmPiece.zBase
                            newEl.direction = sync.ghostRealmPiece.direction
                            newEl.object = sync.ghostRealmPiece.object
                            newEl.isGhost = true
                            break
                        case "small_scenery":
                            let newE = tile.insertElement(numElements) as SmallSceneryElement
                            newE.type = "small_scenery"
                            newE.baseHeight = sync.ghostRealmPiece.zBase
                            newE.object = sync.ghostRealmPiece.object
                            newE.direction = sync.ghostRealmPiece.direction
                            newE.isGhost = true
                            break
                    }
                }
                else {
                    error("Call to create a ghost without zBase specified occurred.")
                }
        }
    }
}
