/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { debug } from "../logger/logger";
import { GhostRealmSynchronizationAction } from "./synchronization";
import { GhostRealmArgs } from "./GhostRealmArgs";
import { registerWithoutPermissions } from "../actions";
import { isServer } from "../environment";

/**
 * Ghost storage for **multiplayer server**
 */
var ghostServerStorage: GhostRealmArgs[] = []

export function ghostServerStorageAdd(args: GhostRealmArgs) {
    debug("[MT] multiplayer server: adding e ghost")
    ghostServerStorage.push(args)
}


export function ghostServerStorageRem(args: GhostRealmArgs) {
    debug("[MT] multiplayer server: rem a ghost")
    let temporary: GhostRealmArgs[] = []
    ghostServerStorage.forEach(ghost => {
        //debug(`${JSON.stringify([ghost, args])}`)
        if (!(ghost.direction == args.direction && 
            ghost.object == args.object &&
            ghost.type == args.type &&
            ghost.xTile == args.xTile &&
            ghost.yTile == args.yTile)) 
            {
            temporary.push(ghost)

        }
        else {
            debug(`removing from SS ${JSON.stringify(args)}`)

        }
    })
    ghostServerStorage = []
    ghostServerStorage = temporary.slice()
}


interface playerId {
    id:number
}

const execute = registerWithoutPermissions<playerId>("mt-network-ask-sync", sendSync)
export function requestSync() {
    debug(`requestSync ${network.currentPlayer.id}`)
    execute({id: network.currentPlayer.id.valueOf()})
}

function sendSync(pid: playerId) {
    if (isServer()) {
        ghostServerStorage.forEach(piece => {
            GhostRealmSynchronizationAction({
                designatedReceiver: pid.id,
                ghostRealmPiece: piece
            })
        })
    }
}

