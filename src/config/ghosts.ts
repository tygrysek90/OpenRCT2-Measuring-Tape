import { DataLoader } from "../fx/objDataLoader"

export enum GhostConfigRow  { "tape_start" , "tape_mid_edge" , "tape_mid_tile" , "tape_end" , "area_corner" , "area_centre" }

interface GhostConfig {
    humanReadable: string
    image: number 
    objectIdentifer: string
    objectType: ObjectType
    shown: boolean,
}

/**
 * Stores configuration of ghosts, position in array is determined by GhostType enum
 */
export var ghostConfig: Array<GhostConfig> = [
    {humanReadable: "Tape start", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectType:"wall", shown: true},
    {humanReadable: "Tape centre (on edge)", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectType: "wall", shown: true},
    {humanReadable: "Tape centre (on tile)", image: 0,  objectIdentifer: "rct2.scenery_small.brbase", objectType: "small_scenery", shown: true},
    {humanReadable: "Tape end", image: 0,  objectIdentifer: "rct2.scenery_wall.wallcb32", objectType:"wall" ,shown: true},
    {humanReadable: "Area corner", image: 0,  objectIdentifer: "rct2.scenery_small.cwfcrv33", objectType: "small_scenery",shown: true},
    {humanReadable: "Area centre", image: 0,  objectIdentifer: "rct2.scenery_small.brbase", objectType: "small_scenery" ,shown: true},

]

function populateGhostConfig() {
    ghostConfig.forEach(config => {
        let loader = new DataLoader(config.objectType)
        for (let i=0; i<loader.identifiers.length; i++) {
            if (config.objectIdentifer == loader.identifiers[i]) {
                config.image = loader.images[i]
            }
        }
    }) 
}

export function initConfig() {
    populateGhostConfig()
}