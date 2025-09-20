import { DataLoader } from "../fx/objDataLoader"

export enum GhostConfigRow  { "tape_start" , "tape_mid_edge" , "tape_mid_tile" , "tape_end" , "area_corner" , "area_centre" }

interface GhostConfig {
    /** Config option name for UI */
    humanReadable: string
    /** Alike LoadedImageObject.baseImageId: number */
    image: number 
    /** Alike LoadedObject.identifier: string */
    objectIdentifer: string
    /** Alike LoadedObject.index: number */
    objectId: number,
    /** OpenRCT2 ObjectType */
    objectType: ObjectType
    /** NOT IMPLEMENTED if is shown in config list */
    shown: boolean,
}

/**
 * Default config, position in array is determined by GhostConfigRow enum
 */
function defaultConfig(): Array<GhostConfig> {
    return [
    {humanReadable: "Tape start", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectId: 0, objectType:"wall", shown: true},
    {humanReadable: "Tape centre (on edge)", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectId: 0, objectType: "wall", shown: true},
    {humanReadable: "Tape centre (on tile)", image: 0,  objectIdentifer: "rct2.scenery_small.brbase", objectId: 0, objectType: "small_scenery", shown: true},
    {humanReadable: "Tape end", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectId: 0, objectType:"wall" ,shown: true},
    {humanReadable: "Area corner", image: 0,  objectIdentifer: "rct2.scenery_small.cwfcrv33", objectId: 0, objectType: "small_scenery",shown: true},
    {humanReadable: "Area centre", image: 0,  objectIdentifer: "rct2.scenery_small.brbase", objectId: 0, objectType: "small_scenery" ,shown: true},

]}

/**
 * Stores configuration of ghosts, position in array is determined by GhostConfigRow enum
 */
export var ghostConfig: Array<GhostConfig>

function populateGhostConfig() {
    ghostConfig.forEach(config => {
        let loader = new DataLoader(config.objectType)
        for (let i=0; i<loader.identifiers.length; i++) {
            if (config.objectIdentifer == loader.identifiers[i]) {
                config.image = loader.images[i]
                config.objectId = loader.ids[i]
            }
        }
    }) 
}

export function initConfig() {
    ghostConfig = defaultConfig()
    populateGhostConfig()
}

export function objectConfigSetDefault() {
    initConfig()
}