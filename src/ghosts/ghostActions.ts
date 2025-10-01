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
import { noGhostsOnTile } from "../fx/noGhostsOnTile"
import { oppositeDirection } from "../fx/oppositeDirection"
import { orderVerifiedSelection } from "../fx/orderVerifiedSelection"
import { selectionMidPoint } from "../fx/selectionMidPoint"
import { tool } from "../tool/tool"
import { model } from "../mainWin/mainModel"
import { MapSelectionVerified, mapSelectionToVerified } from "../tool/mapSelection"
import { mapTileSize } from "../common/mapTileSize"
import { ghostPlaceAction, GhostPlaceArgs } from "./ghostPlaceAction"
import { ghostRemoveAction, GhostRemoveArgs } from "./ghostRemoveAction"



/**
 * Stores a ghost on given tile
 */
interface TileWithGhost {
    tile: Tile,
    elementIndex: number,
    ghostType: GhostConfigRow
    ghostDirection?: Direction
}

/** Stores ghosts (current working set) */
var cemetery: Array<TileWithGhost> = []

/** Stores history of ghosts (old working sets) */
var cemeteryHistory: TileWithGhost[][] = []

/** Stores last selection in case of visibility or object parameter change and thus ghost manipulation */
var lastVerifiedSelection: MapSelectionVerified | undefined


/**
 * Remove ghosts out of internal store
 * and load history of ghosts if desired
 */
export function exorciseCemetery() {
    cemetery.forEach(ghostStored => {
            //ghostStored.tile.removeElement(ghostStored.elementIndex)
            ghostRemoveAction(<GhostRemoveArgs>{
                xTiles: ghostStored.tile.x,
                yTiles: ghostStored.tile.y,
                index: ghostStored.elementIndex
            })
    });  
    cemetery = []
    if (model.ghostsButtonsPressed.keepAll.get() == true) {
        summonOldGhosts()
    } 
}

/**
 * Project cemeteryHistory on the game map via setGhost
 */
export function summonOldGhosts() {
    cemeteryHistory.forEach(historyRecord => {
        historyRecord.forEach(ghost => {
            cemetery.push(ghost)
            setGhost(ghost.ghostType, ghost.tile, ghost.ghostDirection)
        })
    });
}


/**
 * Removes last ghost set from history and projects updated history
 */
export function removeLastFromHistory() {
    cemeteryHistory.pop()
    exorciseCemetery()
    summonOldGhosts()
}


/**
 * Purges history
 */
export function eraseHistory() {
    cemeteryHistory = []
    exorciseCemetery()
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
function setGhost(type: GhostConfigRow, tile: Tile, direction?: Direction) {
    let goodHeight = determineGoodHeight(tile)

    if (noGhostsOnTile(tile) && goodHeight != undefined) {
        ghostPlaceAction(<GhostPlaceArgs>{
            xTiles: tile.x,
            yTiles: tile.y,
            zBase: goodHeight,
            direction: direction??<Direction>(0),
            type: ghostConfig[type].objectType,
            object: ghostConfig[type].objectId
        })       
        

        let ghosts: TileWithGhost = {
            tile: tile,
            elementIndex: tile.numElements-1,
            ghostType: type,
            ghostDirection: direction
        } 

        cemetery.push(ghosts)
    }
}


/**
 * Place a ghost on end of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostEnd(verifiedSelection: MapSelectionVerified): void {
    let tile = map.getTile(verifiedSelection.end.x/mapTileSize, verifiedSelection.end.y/mapTileSize)
    setGhost(GhostConfigRow.tape_end, tile, determineDirection(verifiedSelection))
}


/**
 * Place ghost on start of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostStart(verifiedSelection: MapSelectionVerified): void {
    let tile = map.getTile(verifiedSelection.start.x/mapTileSize, verifiedSelection.start.y/mapTileSize)
    setGhost(GhostConfigRow.tape_start, tile, oppositeDirection(determineDirection(verifiedSelection)))
}


/**
 * Place ghost in corners of selection (for square area)
 * @param verifiedSelection 
 */
function findGhostCorners(verifiedSelection: MapSelectionVerified): void {
    // TODO-low: observe pattern and form "for" cycle
    let cornerMinMin = map.getTile(Math.min(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), Math.min(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize))
    let cornerMinMax = map.getTile(Math.min(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), Math.max(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize))
    let cornerMaxMax = map.getTile(Math.max(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), Math.max(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize))
    let cornerMaxMin = map.getTile(Math.max(verifiedSelection.start.x/mapTileSize, verifiedSelection.end.x/mapTileSize), Math.min(verifiedSelection.start.y/mapTileSize, verifiedSelection.end.y/mapTileSize))

    setGhost(GhostConfigRow.area_corner, cornerMinMin, <Direction>(0))
    setGhost(GhostConfigRow.area_corner, cornerMinMax, <Direction>(1))
    setGhost(GhostConfigRow.area_corner, cornerMaxMax, <Direction>(2))
    setGhost(GhostConfigRow.area_corner, cornerMaxMin, <Direction>(3))
}


/**
 * Places ghost in centre of selection (for square areas)
 * @param verifiedSelection 
 */
function findGhostCentreOfArea(verifiedSelection: MapSelectionVerified) {
    let midPoint = selectionMidPoint(verifiedSelection)

    // 1 st case: sides length are odd numbers
    if ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        setGhost(GhostConfigRow.mid_tile, map.getTile(midPoint.x/mapTileSize, midPoint.y/mapTileSize))
    }
    // 2nd case: sides lengths are even numbers
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_x, map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize), <Direction>(2))
        setGhost(GhostConfigRow.area_centre_x, map.getTile( (midPointOfOrdered.x/mapTileSize)+1, (midPointOfOrdered.y/mapTileSize)+1 ), <Direction>(4)  )
    }
    // 3rd & 4rd case : sides are one even and one odd 
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_uneven, map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize), <Direction>(2))
    }
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre_uneven, map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize), <Direction>(1))
    }
}


/**
 * Places ghost in centre of selection (for 1 tile wide selections)
 * @param verifiedSelection 
 */
function findGhostCentreLine(verifiedSelection: MapSelectionVerified): void {
    let midPoint = selectionMidPoint(verifiedSelection)
    let distanceInTiles = computeDistanceInTiles(verifiedSelection)
    let tileMidpoint = map.getTile(midPoint.x/mapTileSize, midPoint.y/mapTileSize)

    if (distanceInTiles > 4) {
        if (distanceInTiles % 2 == 0) {
            let direction: Direction
            if (Math.abs(verifiedSelection.start.x - verifiedSelection.end.x) > Math.abs(verifiedSelection.start.y - verifiedSelection.end.y)) {
                direction = 2
            }
            else {
                direction = 1
            }
            setGhost(GhostConfigRow.tape_mid_edge, tileMidpoint, direction)
        }
        else {
            setGhost(GhostConfigRow.mid_tile, tileMidpoint)
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