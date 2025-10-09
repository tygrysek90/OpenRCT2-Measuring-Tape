import { GhostRealmArgs } from "./GhostRealmArgs";

/**
 * Network sync data receiving
 *
 * this works for multiplayer in client mode
 * once, upon joining the server
 */
export interface GhostRealmSynchronization {
    designatedReceiver: number;
    ghostRealm: GhostRealmArgs[];
}