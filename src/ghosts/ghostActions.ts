/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Ghost position calculating and runtime storing functions
 */

import { GhostConfigRow, ghostConfig } from "../config/ghosts"
import { computeDistanceInTiles } from "../fx/computeDistanceInTiles"
import { determineDirection } from "../fx/determineDirection"
import { oppositeDirection } from "../fx/oppositeDirection"
import { orderVerifiedSelection } from "../fx/orderVerifiedSelection"
import { selectionMidPoint } from "../fx/selectionMidPoint"
import { tool } from "../tool/tool"
import { model } from "../mainWin/mainModel"
import { MapSelectionVerified, mapSelectionToVerified } from "../tool/mapSelection"
import { mapTileSize } from "../common/mapTileSize"
import { ghostPlaceAction } from "./ghostPlaceAction"
import { ghostRemoveAction } from "./ghostRemoveAction"
import { GhostRemoveArgs } from "./GhostRemoveArgs"
import { debug } from "../logger/logger"



/** Stores ghosts (current working set) */
var cemetery: Array<GhostRemoveArgs> = []

/** Stores history of ghosts (old working sets) */
var cemeteryHistory: GhostRemoveArgs[][] = []

/** Stores last selection in case of visibility or object parameter change and thus ghost manipulation */
var lastVerifiedSelection: MapSelectionVerified | undefined


/**
 * Removes current working set from map and empties cemetery (current working set "stack")
 */
export function exorciseCemetery() {
    cemetery.forEach(ghostStored => {
            ghostRemoveAction(ghostStored)
    })
    cemetery = []
}

/**
 * Removes reference of current working set from cemetery (memory), doesn't touch ghosts
 */
export function dereferenceCemetery() {
    cemetery = []
}


/**
 * Goes through cemeteryHistory (the memory of past measured sets, removes single piece in set)
 * @param ghostRemoveArgs 
 */
export function ghostRemoveFromCemeteryHistory(ghostRemoveArgs: GhostRemoveArgs) {
    let temporary: GhostRemoveArgs[][] = []
    cemeteryHistory.forEach(historyLine => {
        let temporaryLine: GhostRemoveArgs[] = []
        historyLine.forEach(ghost => {
            debug(`${JSON.stringify([ghost, ghostRemoveArgs])}`)
            if (!(ghost.objectDirection == ghostRemoveArgs.objectDirection && 
                ghost.objectId == ghostRemoveArgs.objectId &&
                ghost.objectType == ghostRemoveArgs.objectType &&
                ghost.xTiles == ghostRemoveArgs.xTiles &&
                ghost.yTiles == ghostRemoveArgs.yTiles)) 
                {
                temporaryLine.push(ghost)

            }
            else {
                debug(`removing from history ${JSON.stringify(ghostRemoveArgs)}`)

            }
        })
        temporary.push(temporaryLine)
    })
    cemeteryHistory = []
    cemeteryHistory = temporary.slice()
}


/**
 * Removes last ghost set from history and projects updated history
 */
export function removeLastFromHistory() {
    let historyLine = cemeteryHistory.pop()
    //exorciseCemetery()
    historyLine?.forEach(ghost => {
        ghostRemoveAction(ghost)
    })
}


/**
 * Purges history
 */
export function eraseHistory() {
    cemeteryHistory = []
    //exorciseCemetery()
}


/**
 * Checks whether there is no current working ghost set *nor* any ghosts stored 
 * @returns true when there are no ghost to project or remove
 */
export function isNoGhostHistory(): boolean {
    return cemetery.length == 0 && cemeteryHistory.length == 0
}


/**
 * Adds current working ghost set to history
 */
export function addToHistory() {
    cemeteryHistory.push(cemetery.slice())
}


/**
 * Moves ghosts based on new selection area
 */
export function moveGhosts() {
    if (tool._selection != null) {
        if (tool._selection.end?.x != undefined && tool._selection.end.y != undefined) {
            // clean up working stack
            exorciseCemetery()
            debug("CEMETERY EMPTIED")

            let verifiedSelection = mapSelectionToVerified(tool._selection)
            if (verifiedSelection != undefined) {
                if (tool.mode == "tape") {
                    if (model.showButtonsPressed.ends.get()) {
                        findGhostEnd(verifiedSelection)
                        findGhostStart(verifiedSelection)
                    }
                    if (model.showButtonsPressed.centre.get()) {
                        findGhostCentreLine(verifiedSelection)
                    }
                }
                if (tool.mode == "area") {
                    if (model.showButtonsPressed.ends.get()) {
                        findGhostCorners(verifiedSelection)
                    }
                    if (model.showButtonsPressed.centre.get()) {
                        findGhostCentreOfArea(verifiedSelection)
                    }
                }
            }
            //remember last selection in case of ghost manipulation
            lastVerifiedSelection = verifiedSelection
        }
    }
    else {
        if (lastVerifiedSelection != undefined) {
            exorciseCemetery()

            if (tool.mode == "tape") {
                if (model.showButtonsPressed.ends.get()) {
                    findGhostEnd(lastVerifiedSelection)
                    findGhostStart(lastVerifiedSelection)
                }
                if (model.showButtonsPressed.centre.get()) {
                    findGhostCentreLine(lastVerifiedSelection)
                }
            }
            if (tool.mode == "area") {
                if (model.showButtonsPressed.ends.get()) {
                    findGhostCorners(lastVerifiedSelection)
                }
                if (model.showButtonsPressed.centre.get()) {
                    findGhostCentreOfArea(lastVerifiedSelection)
                }
            }
        }
    }
}

/**
 * Finds height to place ghost at given tile
 * @param tile OpenRCT2 Tile reference
 * @returns height of land, if its sloped, height+1 and if there’s water, returns water level (so the ghost will not be sunken underwater)
 */
export function determineGoodHeight(tile: Tile): number | undefined {
    let retVal: number | undefined
    tile.elements.forEach(element => {
        if (element.type == "surface") {
            if (element.waterHeight == 0) {
                if (element.slope == 0) {
                    retVal = element.baseHeight
                }
                else {
                    retVal = element.baseHeight + 1
                }
            }
            else {
                retVal = element.waterHeight/8
            }
        }
    })
    return retVal
}


/**
 * Place a ghost on the game map and write into cemetery storage
 * @param type 
 * @param tile 
 * @param direction 
 */
function setGhost(type: GhostConfigRow, xTile: number, yTile: number, direction: Direction) {
    let tile = map.getTile(xTile, yTile)
    let goodHeight = determineGoodHeight(tile)

    //if (noGhostsOnTile(tile) && goodHeight != undefined) {
    if (goodHeight != undefined) {

        ghostPlaceAction({
            xTiles: tile.x,
            yTiles: tile.y,
            zBase: goodHeight,
            direction: direction,
            type: ghostConfig[type].objectType,
            object: ghostConfig[type].objectId
        })       

        cemetery.push({
            xTiles: tile.x,
            yTiles: tile.y,
            objectType: ghostConfig[type].objectType,
            objectId: ghostConfig[type].objectId,
            objectDirection: direction,
        })
    }
}


/**
 * Place a ghost on end of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostEnd(verifiedSelection: MapSelectionVerified): void {
    let xTile = verifiedSelection.end.x/mapTileSize
    let yTile = verifiedSelection.end.y/mapTileSize
    setGhost(GhostConfigRow.tape_end, xTile, yTile, determineDirection(verifiedSelection))
}


/**
 * Place ghost on start of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostStart(verifiedSelection: MapSelectionVerified): void {
    let xTile = verifiedSelection.start.x/mapTileSize
    let yTile = verifiedSelection.start.y/mapTileSize
    setGhost(GhostConfigRow.tape_start, xTile, yTile, oppositeDirection(determineDirection(verifiedSelection)))
}


/**
 * Place ghost in corners of selection (for square area)
 * @param verifiedSelection 
 */
function findGhostCorners(verifiedSelection: MapSelectionVerified): void {
    // TODO-low: observe pattern and form "for" cycle
    setGhost(GhostConfigRow.area_corner, 
        Math.min(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), 
        Math.min(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize), 0 satisfies Direction)
    setGhost(GhostConfigRow.area_corner, 
        Math.min(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), 
        Math.max(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize), 1 satisfies Direction)
    setGhost(GhostConfigRow.area_corner, 
        Math.max(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), 
        Math.max(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize), 2 satisfies Direction)
    setGhost(GhostConfigRow.area_corner, 
        Math.max(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), 
        Math.min(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize), 3 satisfies Direction)

}


/**
 * Places ghost in centre of selection (for square areas)
 * @param verifiedSelection 
 */
function findGhostCentreOfArea(verifiedSelection: MapSelectionVerified) {
    let midPoint = selectionMidPoint(verifiedSelection)

    // 1 st case: sides length are odd numbers
    if ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        setGhost(GhostConfigRow.mid_tile, midPoint.x/mapTileSize, midPoint.y/mapTileSize, 0 satisfies Direction)
    }
    // 2nd case: sides lengths are even numbers
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_x, midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize, 2 satisfies Direction)
        setGhost(GhostConfigRow.area_centre_x, (midPointOfOrdered.x/mapTileSize)+1, (midPointOfOrdered.y/mapTileSize)+1 , 0 satisfies Direction  )
    }
    // 3rd & 4rd case : sides are one even and one odd 
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_uneven, midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize, 2 satisfies Direction)
    }
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_uneven, midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize, 1 satisfies Direction)
    }
}


/**
 * Places ghost in centre of selection (for 1 tile wide selections)
 * @param verifiedSelection 
 */
function findGhostCentreLine(verifiedSelection: MapSelectionVerified): void {
    let midPoint = selectionMidPoint(verifiedSelection)
    let distanceInTiles = computeDistanceInTiles(verifiedSelection)

    if (distanceInTiles > 4) {
        if (distanceInTiles % 2 == 0) {
            let direction: Direction
            if (Math.abs(verifiedSelection.start.x - verifiedSelection.end.x) > Math.abs(verifiedSelection.start.y - verifiedSelection.end.y)) {
                direction = 2
            }
            else {
                direction = 1
            }
            setGhost(GhostConfigRow.tape_mid_edge, midPoint.x/mapTileSize, midPoint.y/mapTileSize, direction)
        }
        else {
            setGhost(GhostConfigRow.mid_tile, midPoint.x/mapTileSize, midPoint.y/mapTileSize, 0 satisfies Direction)
        }
    }
}

/** Self explanatory */
function mapSizeToCoordsXYAsSelection(): CoordsXY {
    let mapSize = map.size // this is in tiles!  

    return {
        x: (mapSize.x-2)*mapTileSize,
        y: (mapSize.y-2)*mapTileSize
    }
} 

/**
 * Finds centers of each map edge
 * (extra fn)
 */
export function findMapEdgesCentres() {
    let mapSize = map.size // this is in tiles!  
    mapSize.x = (mapSize.x-2)*mapTileSize
    mapSize.y = (mapSize.y-2)*mapTileSize

    findGhostCentreLine({start:{x:32, y:32},end:{x: mapSize.x, y: 32}})
    findGhostCentreLine({start:{x: mapSize.x, y:32},end:{x: mapSize.x, y: mapSize.y}})
    findGhostCentreLine({start:{x: mapSize.x, y: mapSize.y},end:{x: 32, y: mapSize.y}})
    findGhostCentreLine({start:{x:32, y:mapSize.y},end:{x: 32, y: 32}})

    
}

/**
 * Finds centre of the game map
 * (extra fn)
 */
export function findMapCentre() {
    findGhostCentreOfArea({start: {x:mapTileSize,y:mapTileSize}, end:mapSizeToCoordsXYAsSelection()})
}  