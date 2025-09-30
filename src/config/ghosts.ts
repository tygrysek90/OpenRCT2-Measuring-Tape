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
    objectIdentifier: string
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
            objectIdentifier: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType:"wall", 
        },
        {//1   
            // simple mode: tape start copy
            humanReadable: "Tape centre (on edge)",
            image: 0,  
            objectIdentifier: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType: "wall", 
        },
        {//2
            humanReadable: "Centre (on tile)", 
            humanReadableSimple: "Full tiles", 
            controlsAsWell: [GhostConfigRow.area_centre_x],
            image: 0,  
            objectIdentifier: "rct2.scenery_small.brbase", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//3
            // simple mode: tape start copy
            humanReadable: "Tape end", 
            image: 0,  
            objectIdentifier: 
            "rct2.scenery_wall.wallcb32",
            objectId: 0, 
            objectType:"wall",
        },
        {//4
            humanReadable: "Area corner",
            image: 0, 
            humanReadableSimple: "Area corners", 
            objectIdentifier: "rct2.scenery_small.cwfcrv33", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//5
            // simple mode: copy mid_tile ("centre on tile")
            humanReadable: "Area centre (edge ❌)", 
            image: 0,  
            objectIdentifier: "rct2.scenery_small.brbase", 
            objectId: 0, 
            objectType: "small_scenery",
        },
        {//6
            // simple mode: tape start copy
            humanReadable: "Area centre (uneven)",
            image: 0,  
            objectIdentifier: "rct2.scenery_wall.wallcb32", 
            objectId: 0, 
            objectType: "wall",
        },

]}

/**
 * Stores configuration of ghosts, position in array is determined by GhostConfigRow enum
 */
export var ghostConfig: Array<GhostConfig>


/**
 * 
 * @param reallyPopulate set false for "dry run"
 * @returns true if all object names are found in current setting (are useable)
 */
function populateGhostConfig(reallyPopulate: boolean): boolean {
    let loaders: Array<DataLoader> = []
 
    let loadersOrder: Array<ObjectType> = []
    
    loaders.push(new DataLoader("wall"))
    loadersOrder.push("wall")
    loaders.push(new DataLoader("small_scenery"))
    loadersOrder.push("small_scenery")

    for (let i=0; i<ghostConfig.length; i++) {
        let loaderArrPos = loadersOrder.indexOf(ghostConfig[i].objectType)
        let inLoaderIndex = loaders[loaderArrPos].identifiers.indexOf(ghostConfig[i].objectIdentifier)
        if (inLoaderIndex > -1) {
            if (!reallyPopulate) { 
                ghostConfig[i].image = loaders[loaderArrPos].images[inLoaderIndex]
                ghostConfig[i].objectId = loaders[loaderArrPos].ids[inLoaderIndex]
            }
        }
        else {
            return false
        }
    }
    return true
}

/**
 * Edge case handling for ghost object loading, try to load at least something
 * @returns false when there is absolutely no wall or no small scenery to load as a ghost
 */
function populateGhostConfigFail(): boolean {
    let loaders: Array<DataLoader> = []
 
    let loadersOrder: Array<ObjectType> = []
    
    loaders.push(new DataLoader("wall"))
    loadersOrder.push("wall")
    loaders.push(new DataLoader("small_scenery"))
    loadersOrder.push("small_scenery")

    for (let i=0; i<ghostConfig.length; i++) {
        let loaderArrPos = loadersOrder.indexOf(ghostConfig[i].objectType)
        if (loaders[loaderArrPos].images.length != 0) {
            ghostConfig[i].image = loaders[loaderArrPos].images[0]
            ghostConfig[i].objectId = loaders[loaderArrPos].ids[0]
        }
        else {
            return false
        }
    }
    return true

}

/**
 * 
 * @returns true when object names were loaded from plugin shared storage
 */
function loadSharedStorage() {
    let maybeSharedStorage = sharedStorageGet<Array<string>>(configs.sequential)
    if (maybeSharedStorage != undefined) {
        for (let i=0; i<ghostConfig.length; i++) {
            ghostConfig[i].objectIdentifier = maybeSharedStorage[i]
        }
        return true
    }
    else {
        return false
    }
}

/**
 * Load configuration from park storage
 * @returns true when object names were loaded from park storage
 */
function loadParkStorage():boolean {
    let maybeConfig = readParkStorage()
    if (maybeConfig != undefined) {
        for (let i=0; i<ghostConfig.length; i++) {
            ghostConfig[i].objectIdentifier = maybeConfig[i]
        }
        return true
    }
    else {
        return false
    }
}

/**
 * 
 * @returns false when it's not possible to load any object at all and use ghosts
 */
export function initConfig():boolean {
    ghostConfig = defaultConfig() // ghostConfig is empty upon creation!

    // let's go in order 
    // in-park config -> user profile (shared storage) -> default ->  fallback (just pick first one) -> total fail
    if (loadParkStorage()) {
        if (populateGhostConfig(false)) {
            populateGhostConfig(true)
            return true
        }
    }
    if (loadSharedStorage()) {
        if (populateGhostConfig(false)) {
            populateGhostConfig(true)
            return true
        }
        else{
            ui.showError("Tape measure", "Personal configuration not applicable due to missing objects, falling back to plugin defaults")
        }
    }
    ghostConfig = defaultConfig()
    if (populateGhostConfig(false)) {
        populateGhostConfig(true)
        return true
    }
    if (populateGhostConfigFail()) {
        return true
    }

    // this could happen only when park has 0 small scenery or 0 walls loaded
    ui.showError("Tape measure", "No useable objects found, ghost functionality will be disabled")
    return false
}

export function objectConfigSetDefault() {
    ghostConfig = defaultConfig()
    populateGhostConfig(true)
    ghostStoreConfig()
}

export function ghostStoreConfig() {
    let sequential: Array<string> = []
    ghostConfig.forEach(configLine => {
        sequential.push(configLine.objectIdentifier)
    })
    writeParkStorage(sequential)
}

export function ghostUpdateConfigFromSimple() {
    ghostConfig.forEach(config => {
        if (config.controlsAsWell != undefined) {
            config.controlsAsWell.forEach(item => {
                ghostConfig[item].image = config.image
                ghostConfig[item].objectId = config.objectId
                ghostConfig[item].objectIdentifier = config.objectIdentifier
            })
        }
    })
}

export function ghostSharedStorageSave(){
    let sequential: Array<string> = []
    ghostConfig.forEach(configLine => {
        sequential.push(configLine.objectIdentifier)
    })
    sharedStorageSet(configs.sequential, sequential)
}

export function ghostSharedStorageLoad() {
    ghostConfig = defaultConfig()
    loadSharedStorage()
    populateGhostConfig(true)
    ghostStoreConfig()
}