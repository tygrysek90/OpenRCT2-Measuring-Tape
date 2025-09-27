/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Ghost placing and runtime storing functions
 */

import { GhostConfigRow, ghostConfig } from "../config/ghosts"
import { computeDistanceInTiles } from "../fx/computeDistanceInTiles"
import { determineDirection } from "../fx/determineDirection"
import { noGhostsOnTile } from "../fx/noGhostsOnTile"
import { opositeDirection } from "../fx/opositeDirection"
import { orderVerifiedSelection } from "../fx/orderVerifiedSelection"
import { selectionMidPoint } from "../fx/selectionMidPoint"
import { tool } from "../tool/tool"
import { model } from "../mainWin/mainModel"
import { MapSelectionVerified, mapSelectionToVerified } from "../tool/mapSelection"
import { mapTileSize } from "../common/mapTileSize"



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
var cementery: Array<TileWithGhost> = []

/** Stores history of ghosts (old working sets) */
var cementeryHistory: TileWithGhost[][] = []

/** Stores last selection in case of visibility or object parameter change and thus ghost manipulation */
var lastVerifiedSelection: MapSelectionVerified | undefined


/**
 * Remove ghosts out of internal store
 * and load history of ghosts if desired
 */
export function exorciseCementery() {
    cementery.forEach(ghostStored => {
            ghostStored.tile.removeElement(ghostStored.elementIndex)
    });  
    cementery = []
    if (model.ghostsButtonsPressed.keepAll.get() == true) {
        summonOldGhosts()
    } 
}

/**
 * Project cementeryHistory on the game map via setGhost
 */
export function summonOldGhosts() {
    cementeryHistory.forEach(historyRecord => {
        historyRecord.forEach(ghost => {
            cementery.push(ghost)
            setGhost(ghost.ghostType, ghost.tile, ghost.ghostDirection)
        })
    });
}


/**
 * Removes last ghost set from history and projects updated history
 */
export function removeLastFromHistory() {
    cementeryHistory.pop()
    exorciseCementery()
    summonOldGhosts()
}


/**
 * Purges history
 */
export function eraseHistory() {
    cementeryHistory = []
    exorciseCementery()
}


/**
 * TODO: naming 
 * @returns TODO...
 */
export function isHistory(): boolean {
    return cementery.length == 0 && cementeryHistory.length == 0
}


/**
 * Adds current working ghost set to history
 */
export function addToHistory() {
    cementeryHistory.push(cementery.slice())
}


/**
 * Moves ghosts based on new selection area
 */
export function moveGhosts() {
    if (tool._selection != null) {
        if (tool._selection.end?.x != undefined && tool._selection.end.y != undefined) {
            // clean up working stack
            exorciseCementery()

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
            //remeber last selection in case of ghost manipulation
            lastVerifiedSelection = verifiedSelection
        }
    }
    else {
        if (lastVerifiedSelection != undefined) {
            exorciseCementery()

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
 * @returns height of land, if its sloped, height+1 and if theres water, returns water level (so the ghost will not be sunked underwater)
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
 * Place a ghost on the game map and write into cementery storage
 * @param type 
 * @param tile 
 * @param direction 
 */
function setGhost(type: GhostConfigRow, tile: Tile, direction?: Direction) {
    let goodHeight = determineGoodHeight(tile)

    if (noGhostsOnTile(tile) && goodHeight != undefined) {
        // two cases: a wall or a small scenery
        switch (ghostConfig[type].objectType) {
            case "wall": 
                if (direction != undefined) {
                    let newE = tile.insertElement(tile.numElements) as WallElement
                    newE.type = "wall"
                    newE.baseHeight = goodHeight
                    newE.direction = direction
                    newE.object = ghostConfig[type].objectId
                    newE.isGhost = true
                }
                break
            case "small_scenery":
                let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
                newE.type = "small_scenery"
                newE.baseHeight = goodHeight
                newE.object = ghostConfig[type].objectId
                newE.direction = direction??<Direction>(0)
                newE.isGhost = true
        }

        let ghosts: TileWithGhost = {
            tile: tile,
            elementIndex: tile.numElements-1,
            ghostType: type,
            ghostDirection: direction
        } 

        cementery.push(ghosts)
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
    setGhost(GhostConfigRow.tape_start, tile, opositeDirection(determineDirection(verifiedSelection)))
}


/**
 * Place ghost in corners of selection (for square area)
 * @param verifiedSelection 
 */
function findGhostCorners(verifiedSelection: MapSelectionVerified): void {
    // TODO: observe pattern and form "for" cycle
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

    // 1 st case: sides lenght are odd numbers
    if ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        setGhost(GhostConfigRow.area_centre, map.getTile(midPoint.x/mapTileSize, midPoint.y/mapTileSize))
    }
    // 2nd case: sides leghts are even numbers
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhost(GhostConfigRow.area_centre, map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize), <Direction>(2))
        setGhost(GhostConfigRow.area_centre, map.getTile( (midPointOfOrdered.x/mapTileSize)+1, (midPointOfOrdered.y/mapTileSize)+1 ), <Direction>(4)  )
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
            setGhost(GhostConfigRow.tape_mid_tile, tileMidpoint)
        }
    }
}

/** Self explanatory */
function mapSizeToCoordsXYAsSelection(): CoordsXY {
    let mapsize = map.size // this is in tiles!  

    return {
        x: (mapsize.x-2)*mapTileSize,
        y: (mapsize.y-2)*mapTileSize
    }
} 

/**
 * Finds centers of each map edge
 * (extra fn)
 */
export function findMapEdgesCentres() {
    let mapsize = map.size // this is in tiles!  
    mapsize.x = (mapsize.x-2)*mapTileSize
    mapsize.y = (mapsize.y-2)*mapTileSize

    findGhostCentreLine({start:{x:32, y:32},end:{x: mapsize.x, y: 32}})
    findGhostCentreLine({start:{x: mapsize.x, y:32},end:{x: mapsize.x, y: mapsize.y}})
    findGhostCentreLine({start:{x: mapsize.x, y: mapsize.y},end:{x: 32, y: mapsize.y}})
    findGhostCentreLine({start:{x:32, y:mapsize.y},end:{x: 32, y: 32}})

    
}

/**
 * Finds centre of the game map
 * (extra fn)
 */
export function findMapCentre() {
    findGhostCentreOfArea({start: {x:mapTileSize,y:mapTileSize}, end:mapSizeToCoordsXYAsSelection()})
}  