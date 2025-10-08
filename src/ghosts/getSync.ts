/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { register } from "../actions"
import { debug } from "../logger/logger"
import { GhostRealmArgs } from "./GhostRealmArgs"

/**
 * Network sync data receiving
 * 
 * this works for multiplayer in client mode
 * once, upon joining the server
 */

interface GhostRealmSynchronization {
    designatedReceiver: number
    ghostRealm: GhostRealmArgs[]
}

const execute = register<GhostRealmSynchronization>("mt-network-welcome-sync", synchronize)
/** Places a ghost on the map via registered action (multiplayer-aware) */
export function GhostRealmSynchronizationAction(args:GhostRealmSynchronization) {
    execute(args)
}

function synchronize(sync: GhostRealmSynchronization) {
    debug("synchronize!")
}