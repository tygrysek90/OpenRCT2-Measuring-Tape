/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { debug } from "../logger/logger";
import { GhostRealmArgs } from "./GhostRealmArgs";

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