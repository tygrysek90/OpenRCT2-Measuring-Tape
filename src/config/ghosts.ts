/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Configuration of ghost objects
 */

import { DataLoader } from "../fx/objDataLoader"
import { readParkStorage, writeParkStorage } from "./parkStorage"
import { configs, sharedStorageGet, sharedStorageSet } from "./sharedStorage"


export enum GhostConfigRow  { "tape_start" , "tape_mid_edge" , "mid_tile" , "tape_end" , "area_corner" , "area_centre_x", "area_centre_uneven" }

interface GhostConfig {
    /** Config option name for UI */
    humanReadable: string
    /** Config option name for simple Mode UI */
    humanReadableSimple?: string
    /** Define which rows are affected by this row in simple mode */
    controlsAsWell?: GhostConfigRow[]
    /** Alike LoadedImageObject.baseImageId: number */
    image: number 
    /** Alike LoadedObject.identifier: string */
    objectIdentifer: string
    /** Alike LoadedObject.index: number */
    objectId: number,
    /** OpenRCT2 ObjectType */
    objectType: ObjectType
    
}

/** Which original row does it control in simple mode
 * this is hardcoded, since for now there is no need to calculate
 * translation matrix every time run time. Let's save electricity :)
 */
export const simpleToProConfig = [0, 2, 4]

/**
 * Default config, position in array is determined by GhostConfigRow enum
 */
function defaultConfig(): Array<GhostConfig> {
    return [
        {//0
            humanReadable: "Tape start", 
            humanReadableSimple: "Edges of tiles", 
            controlsAsWell: [GhostConfigRow.tape_mid_edge, GhostConfigRow.tape_end, GhostConfigRow.area_centre_uneven], 
            image: 0,  
            objectIdentifer: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType:"wall", 
        },
        {//1   
            // simple mode: tape start copy
            humanReadable: "Tape centre (on edge)",
            image: 0,  
            objectIdentifer: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType: "wall", 
        },
        {//2
            humanReadable: "Centre (on tile)", 
            humanReadableSimple: "Full tiles", 
            controlsAsWell: [GhostConfigRow.area_centre_x],
            image: 0,  
            objectIdentifer: "rct2.scenery_small.brbase", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//3
            // simple mode: tape start copy
            humanReadable: "Tape end", 
            image: 0,  
            objectIdentifer: 
            "rct2.scenery_wall.wallcb32",
            objectId: 0, 
            objectType:"wall",
        },
        {//4
            humanReadable: "Area corner",
            image: 0, 
            humanReadableSimple: "Area corners", 
            objectIdentifer: "rct2.scenery_small.cwfcrv33", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//5
            // simple mode: copy mid_tile ("centre on tile")
            humanReadable: "Area centre (edge ❌)", 
            image: 0,  
            objectIdentifer: "rct2.scenery_small.brbase", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//6
            // simple mode: tape start copy
            humanReadable: "Area centre (uneven)",
            image: 0,  
            objectIdentifer: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType: "wall",
        },

]}

/**
 * Stores configuration of ghosts, position in array is determined by GhostConfigRow enum
 */
export var ghostConfig: Array<GhostConfig>

function populateGhostConfig() {
    let loaders: Array<DataLoader> = []
 
    let loadersOrder: Array<ObjectType> = []
    
    loaders.push(new DataLoader("wall"))
    loadersOrder.push("wall")
    loaders.push(new DataLoader("small_scenery"))
    loadersOrder.push("small_scenery")

    ghostConfig.forEach(config => {
        let loaderArrPos = loadersOrder.indexOf(config.objectType)
        let inLoaderIndex = loaders[loaderArrPos].identifiers.indexOf(config.objectIdentifer)
        config.image = loaders[loaderArrPos].images[inLoaderIndex]
        config.objectId = loaders[loaderArrPos].ids[inLoaderIndex]
    })
}

export function initConfig() {
    ghostConfig = defaultConfig()
    let maybeSharedStorage = sharedStorageGet<Array<string>>(configs.sequential)
    let maybeConfig = readParkStorage()
    if (maybeSharedStorage != undefined) {
        for (let i=0; i<ghostConfig.length; i++) {
            ghostConfig[i].objectIdentifer = maybeSharedStorage[i]
        }
    }
    if (maybeConfig != undefined) {
        for (let i=0; i<ghostConfig.length; i++) {
            ghostConfig[i].objectIdentifer = maybeConfig[i]
        }
    }
    populateGhostConfig()
}

export function objectConfigSetDefault() {
    ghostConfig = defaultConfig()
    populateGhostConfig()
    ghostStoreConfig()

}

export function ghostStoreConfig() {
    let sequential: Array<string> = []
    ghostConfig.forEach(configLine => {
        sequential.push(configLine.objectIdentifer)
    })
    writeParkStorage(sequential)
}

export function ghostUpdateConfigFromSimple() {
    ghostConfig.forEach(config => {
        if (config.controlsAsWell != undefined) {
            config.controlsAsWell.forEach(item => {
                ghostConfig[item].image = config.image
                ghostConfig[item].objectId = config.objectId
                ghostConfig[item].objectIdentifer = config.objectIdentifer
            })
        }
    })
}

export function ghostSharedStorageSave(){
    let sequential: Array<string> = []
    ghostConfig.forEach(configLine => {
        sequential.push(configLine.objectIdentifer)
    })
    sharedStorageSet(configs.sequential, sequential)
}

export function ghostSharedStorageLoad() {
    ghostConfig = defaultConfig()
    let maybeSharedStorage = sharedStorageGet<Array<string>>(configs.sequential)
    if (maybeSharedStorage != undefined) {
        for (let i=0; i<ghostConfig.length; i++) {
            ghostConfig[i].objectIdentifer = maybeSharedStorage[i]
        }
    }
    populateGhostConfig()
    ghostStoreConfig()
}