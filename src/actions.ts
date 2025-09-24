import { MapSelection, mapSelectionToVerified, MapSelectionVerified } from "./mapSelection";
import { MapSelectionTool, mapTileSize, ToolMode } from "./mapSelectionTool";
import { defaults, model } from "./mainWindow/mainModel";
import { opositeDirection } from "./fx/opositeDirection";
import { computeDistanceInTiles } from "./fx/computeDistanceInTiles";
import { selectionMidPoint } from "./fx/selectionMidPoint";
import { determineDirection } from "./fx/determineDirection";
import { orderVerifiedSelection } from "./fx/orderVerifiedSelection";
import { noGhostsOnTile } from "./fx/noGhostsOnTile";
import { ElementVisibility } from "openrct2-flexui";
import { ghostConfig, GhostConfigRow } from "./config/ghosts";


export var tool = new MapSelectionTool("measuring-tape", "cross_hair")
export var toolMode = <ToolMode>("off")


/**
 * Self descriptory, isn't it?
 */
//type GhostType = "wall" | "corner" | "square"

/**
 * Stores a ghost on given tile
 */
interface TileWithGhost {
    tile: Tile,
    elementIndex: number,
    ghostType: GhostConfigRow
    ghostDirection?: Direction
}


/**
 * Stores ghosts
 */
var cementery: Array<TileWithGhost> = []

var cementeryHistory: TileWithGhost[][] = []

/**
 * Stores last selection in case of ghost manipulation
 */
var lastVerifiedSelection: MapSelectionVerified | undefined

// GROUPBOX (measurement)
function setDeafultMeasurementLabels() {
    model.currentMeasurement2Visibility.set(defaults.currentMeasurement2Visibility)
    model.currentMeasurement2.set(defaults.currentMeasurement2)
    model.currentMeasurement.set(defaults.currentMeasurement)
}
// END GRUPBOX (measuremet)

// GROUPBOX "Mode"
function depressToolButtons() {
    model.modeButtonsPressed.area.set(false)
    model.modeButtonsPressed.tape.set(false)
}

export function onClickAreaButton() {
    onToolCancel()
    depressToolButtons()
    setDeafultMeasurementLabels()
    model.modeButtonsPressed.area.set(true)
    toolMode = "area"
    startTool()
}

export function onClickTapeButton() {
    onToolCancel()
    depressToolButtons()
    setDeafultMeasurementLabels()
    model.modeButtonsPressed.tape.set(true)
    toolMode = "tape"
    startTool()
}
// END GROUPBOX "Mode"

// GROUPBOX "Show Ghosts"
export function onClickShowGhEndButton() {
    model.showButtonsPressed.ends.set(!model.showButtonsPressed.ends.get())
    moveGhosts()
}

export function onClickShowGhCentreButton() {
    model.showButtonsPressed.centre.set(!model.showButtonsPressed.centre.get())
    moveGhosts()
}
// END GROUPBOX "Show Ghosts"

// GROUPBOX "Ghosts"
function setDissmisButtonsDisability() {
    // tvl to je logika
    if (model.ghostsButtonsPressed.keepOne.get() == false && model.ghostsButtonsPressed.keepAll.get() == false) {
        model.ghostsButtonsDisabled.dissmissLast.set(true)
        model.ghostsButtonsDisabled.dissmiisAll.set(true)
    }
    if (model.ghostsButtonsPressed.keepOne.get() == true || model.ghostsButtonsPressed.keepAll.get() == true) {
        model.ghostsButtonsDisabled.dissmissLast.set(false)
        model.ghostsButtonsDisabled.dissmiisAll.set(false)
    }
    if (cementery.length == 0 && cementeryHistory.length == 0) {
        model.ghostsButtonsDisabled.dissmissLast.set(true)
        model.ghostsButtonsDisabled.dissmiisAll.set(true)
    }
    if (model.ghostsButtonsPressed.keepAll.get() == false) {
        model.ghostsButtonsDisabled.dissmiisAll.set(true)
    }
}

export function onClickKeepOneButton() {
    if (model.ghostsButtonsPressed.keepOne.get() == true) {
        exorciseCementery()
    }
    model.ghostsButtonsPressed.keepOne.set(!model.ghostsButtonsPressed.keepOne.get())
    model.ghostsButtonsPressed.keepAll.set(false)
    setDissmisButtonsDisability()
}

export function onClickKeepAllButton() {
    if (model.ghostsButtonsPressed.keepAll.get() == true) {
        exorciseCementery()
    }
    model.ghostsButtonsPressed.keepAll.set(!model.ghostsButtonsPressed.keepAll.get())
    model.ghostsButtonsPressed.keepOne.set(false)
    setDissmisButtonsDisability()
}

export function onClickDisimissLast() {
    cementeryHistory.pop()
    exorciseCementery()
    summonOldGhosts()
    setDeafultMeasurementLabels()
    setDissmisButtonsDisability()

}

export function onClickDissmissAll() {
    cementeryHistory = []
    exorciseCementery()
    setDeafultMeasurementLabels()
    setDissmisButtonsDisability()
}
// END GROUPBOX "Ghosts"


export function startTool() 
{
    if (toolMode == "tape") {
        tool.setConstraint(1)
        tool.activate()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
        tool.onUp = () => onToolUp();  
    }

    if (toolMode == "area") {
        tool.remConstraint()
        tool.activate()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
    }
}

/**
 * Generally canceling tool via ESC or when another tool (eg. place scenery or footpath) gets invoked
 */
function onToolCancel(): void {
    if (!(model.ghostsButtonsPressed.keepOne.get() || model.ghostsButtonsPressed.keepAll.get())) {
    exorciseCementery()
    }
    setDeafultMeasurementLabels()
    setDissmisButtonsDisability()

    toolMode = "off"
}

/**
 * Bound to tool.onMove(...)
 * @param selection 
 */
function updateMeasurementTape(selection: MapSelection): void {
    let lengthX = Math.abs(selection.start.x-(selection.end?.x??0))/mapTileSize
    let lengthY = Math.abs(selection.start.y-(selection.end?.y??0))/mapTileSize


    if (toolMode == "tape") {
        model.currentMeasurement.set(`Length: {WHITE}${Math.max(lengthX,lengthY)+1}`)
        model.currentMeasurement2Visibility.set(<ElementVisibility>("none"))
    }
    if (toolMode == "area") {
        model.currentMeasurement.set(`Size: {WHITE}${lengthX+1} x ${lengthY+1}`)
        model.currentMeasurement2Visibility.set(<ElementVisibility>("visible"))
        model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)}`)
    }
    //console.log(JSON.stringify(tool._selection))
    moveGhosts()
}


/**
 * this should be for ALT+T keyboard shortcut
 * start a tool instantly, no wait, no extra clicks, just go for it
 */
export function	shortcutCallback()
{
    if (toolMode == "off") {
        toolMode = "tape"
        startTool()
    }

}


/**
 * Remove ghosts out of internal store
 * and load history of ghosts if desired
 */
function exorciseCementery() {
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
function summonOldGhosts() {
    cementeryHistory.forEach(historyRecord => {
        historyRecord.forEach(ghost => {
            cementery.push(ghost)
            setGhost(ghost.ghostType, ghost.tile, ghost.ghostDirection)
        })
    });
}


/**
 * This is generally on L Mouse Button release after dragging area
 */
function onToolUp() {
    if (model.ghostsButtonsPressed.keepOne.get() == false && model.ghostsButtonsPressed.keepAll.get() == false) {
        exorciseCementery() 
    }
    if (model.ghostsButtonsPressed.keepAll.get() ==  true) {
        cementeryHistory.push(cementery.slice())
    }
    setDissmisButtonsDisability()
   
}


/**
 * Moves ghosts based on new selection area
 */
function moveGhosts() {
    if (tool._selection != null) {
        if (tool._selection.end?.x != undefined && tool._selection.end.y != undefined) {
            // clean up working stack
            exorciseCementery()

            let verifiedSelection = mapSelectionToVerified(tool._selection)
            if (verifiedSelection != undefined) {
                if (toolMode == "tape") {
                    if (model.showButtonsPressed.ends.get()) {
                        findGhostEnd(verifiedSelection)
                        findGhostStart(verifiedSelection)
                    }
                    if (model.showButtonsPressed.centre.get()) {
                        findGhostCentreLine(verifiedSelection)
                    }
                }
                if (toolMode == "area") {
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

            if (toolMode == "tape") {
                if (model.showButtonsPressed.ends.get()) {
                    findGhostEnd(lastVerifiedSelection)
                    findGhostStart(lastVerifiedSelection)
                }
                if (model.showButtonsPressed.centre.get()) {
                    findGhostCentreLine(lastVerifiedSelection)
                }
            }
            if (toolMode == "area") {
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
 * Place a ghost on the game map and write into cementery storage
 * @param type 
 * @param tile 
 * @param direction 
 */
function setGhost(type: GhostConfigRow, tile: Tile, direction?: Direction) {
    if (noGhostsOnTile(tile)) {
        // two cases: a wall or a small scenery
        switch (ghostConfig[type].objectType) {
            case "wall": 
                if (direction != undefined) {
                    let newE = tile.insertElement(tile.numElements) as WallElement
                    newE.type = "wall"
                    newE.baseHeight = tile.getElement(0).baseHeight
                    newE.direction = direction
                    newE.object = ghostConfig[type].objectId
                    newE.isGhost = true
                }
                break
            case "small_scenery":
                let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
                newE.type = "small_scenery"
                newE.baseHeight = tile.getElement(0).baseHeight
                newE.object = ghostConfig[type].objectId
                newE.direction = direction??<Direction>(0)
                newE.isGhost = true
        }
/*         if (type == "wall" && direction != undefined) {
            let newE = tile.insertElement(tile.numElements) as WallElement
            newE.type = "wall"
            newE.baseHeight = tile.getElement(0).baseHeight
            newE.direction = direction
            newE.object = 84
            newE.isGhost = true
        }
        if (type == "corner" && direction != undefined) {
            let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
            newE.type = "small_scenery"
            newE.baseHeight = tile.getElement(0).baseHeight
            newE.object = 80
            newE.direction = direction
            newE.isGhost = true
        }
        if (type == "square") {
            let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
            newE.type = "small_scenery"
            newE.baseHeight = tile.getElement(0).baseHeight
            newE.object = 14
            newE.direction = <Direction>(0)
            newE.isGhost = true
        } */

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
        setGhost(GhostConfigRow.area_centre, map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize))
        setGhost(GhostConfigRow.area_centre, map.getTile( (midPointOfOrdered.x/mapTileSize)+1, (midPointOfOrdered.y/mapTileSize)+1 )    )
    }
    // TODO: there is a third case
    // ale jako co tam dát?
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


function mapSizeToCoordsXYAsSelection(): CoordsXY {
    let mapsize = map.size // this is in tiles!  

    return {
        x: (mapsize.x-2)*mapTileSize,
        y: (mapsize.y-2)*mapTileSize
    }
}


export function findMapEdgesCentres() {
    let mapsize = map.size // this is in tiles!  
    mapsize.x = (mapsize.x-2)*mapTileSize
    mapsize.y = (mapsize.y-2)*mapTileSize

    //console.log(JSON.stringify(mapsize))

    findGhostCentreLine({start:{x:32, y:32},end:{x: mapsize.x, y: 32}})
    findGhostCentreLine({start:{x: mapsize.x, y:32},end:{x: mapsize.x, y: mapsize.y}})
    findGhostCentreLine({start:{x: mapsize.x, y: mapsize.y},end:{x: 32, y: mapsize.y}})
    findGhostCentreLine({start:{x:32, y:mapsize.y},end:{x: 32, y: 32}})

    onToolUp()
}

export function findMapCentre() {
    findGhostCentreOfArea({start: {x:mapTileSize,y:mapTileSize}, end:mapSizeToCoordsXYAsSelection()})
    onToolUp()
}