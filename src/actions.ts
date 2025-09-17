import { MapSelection, mapSelectionToVerified, MapSelectionVerified } from "./mapSelection";
import { MapSelectionTool, mapTileSize, ToolMode } from "./mapSelectionTool";
import { model } from "./model";
import { opositeDirection } from "./fx/opositeDirection";
import { computeDistanceInTiles } from "./fx/computeDistanceInTiles";
import { selectionMidPoint } from "./fx/selectionMidPoint";
import { determineDirection } from "./fx/determineDirection";
import { orderVerifiedSelection } from "./fx/orderVerifiedSelection";
import { noGhostsOnTile } from "./fx/noGhostsOnTile";


export var tool = new MapSelectionTool("measuring-tape", "cross_hair")
export var toolMode = <ToolMode>("off")

/**
 * Stores ghost on given tile
 * TODO: na dlaždici může být jenom jeden prvek s příznakem duch, přepsat bez použití pole
 */
interface ChosenTileElements {
    tile: Tile,
    elements: number[]
}

/**
 * Stores ghosts
 */
var cementery = Array<ChosenTileElements>(0)


function depressToolButtons() {
    console.log("here")
    model.toolButtonsPressed.area.set(false)
    model.toolButtonsPressed.tape.set(false)
}

export function onClickAreaButton() {
    onToolCancel()
    depressToolButtons()
    model.toolButtonsPressed.area.set(true)
    toolMode = "area"
    startTool()
}

export function onClickTapeButton() {
    onToolCancel()
    depressToolButtons()
    model.toolButtonsPressed.tape.set(true)
    toolMode = "tape"
    startTool()
}

export function startTool() 
{
    if (toolMode == "tape") {
        tool.setConstraint(1)
        tool.activate()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
    }

    if (toolMode == "area") {
        tool.remConstraint()
        tool.activate()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
    }
}

function onToolCancel(): void {
    //exorciseCementery()
    toolMode = "off"
}

function updateMeasurementTape(selection: MapSelection): void {
    let lengthX = Math.abs(selection.start.x-(selection.end?.x??0))/mapTileSize
    let lengthY = Math.abs(selection.start.y-(selection.end?.y??0))/mapTileSize


    if (toolMode == "tape") {
        model.currentMeasurement.set(`Length: {BLACK}${Math.max(lengthX,lengthY)+1} blocks`)
        model.currentMeasurement2.set("")
    }
    if (toolMode == "area") {
        model.currentMeasurement.set(`Size: {BLACK}${lengthX+1} x ${lengthY+1} blocks`)
        model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)} blocks`)
    }
    moveGhosts()
}


export function	shortcutCallback()
{
    if (toolMode == "off") {
        toolMode = "tape"
        startTool()
    }

}


/**
 * Remove ghosts out of internal store
 */
function exorciseCementery() {
    cementery.forEach(tileElements => {
        tileElements.elements.forEach(ghostIndex => {
            tileElements.tile.removeElement(ghostIndex)
        });
    });  
   
    cementery = []
}

/**
 * Moves ghosts based on new selection area
 */
function moveGhosts() {
    if (tool._selection != null) {
        if (tool._selection.end?.x != undefined && tool._selection.end.y != undefined) {
            exorciseCementery()

            let verifiedSelection = mapSelectionToVerified(tool._selection)
            if (verifiedSelection != undefined) {
                if (toolMode == "tape") {
                    findGhostEnd(verifiedSelection)
                    findGhostStart(verifiedSelection)
                    findGhostCentreLine(verifiedSelection)
                }
                if (toolMode == "area") {
                    findGhostCorners(verifiedSelection)
                    findGhostCentreOfArea(verifiedSelection)
                }
            }
        }
    }
}

function setGhost(tile: Tile, direction: Direction) {
    if (noGhostsOnTile(tile)) {
        let newE = tile.insertElement(tile.numElements) as WallElement
        newE.type = "wall"
        newE.baseHeight = tile.getElement(0).baseHeight
        newE.direction = direction
        newE.object = 84
        newE.isGhost = true

        let ghosts: ChosenTileElements = {
            tile: tile,
            elements: [tile.numElements-1]
        } 

        cementery.push(ghosts)
    }
}

 function setGhostScenery(tile: Tile, direction: Direction) {
    if (noGhostsOnTile(tile)) {
        let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
        newE.type = "small_scenery"
        newE.baseHeight = tile.getElement(0).baseHeight
        newE.object = 80
        newE.direction = direction
        newE.isGhost = true

        let ghosts: ChosenTileElements = {
            tile: tile,
            elements: [tile.numElements-1]
        } 

        cementery.push(ghosts)
    }
} 


function setGhostScenery3(tile: Tile) {
    if (noGhostsOnTile(tile)) {
        let newE = tile.insertElement(tile.numElements) as SmallSceneryElement
        newE.type = "small_scenery"
        newE.baseHeight = tile.getElement(0).baseHeight
        newE.object = 14
        newE.direction = <Direction>(0)
        newE.isGhost = true

        let ghosts: ChosenTileElements = {
            tile: tile,
            elements: [tile.numElements-1]
        } 

        cementery.push(ghosts)
    }
} 
/* 
function setGhostPath(tile: Tile) {
    if (noGhostsOnTile(tile)) {

        let newE = tile.insertElement(tile.numElements) as FootpathElement
        newE.type = "footpath"
        newE.edges = 0
        newE.corners = 0
        newE.isBlockedByVehicle = false
        newE.isWide = false
        newE.isQueue = false

        newE.baseHeight = tile.getElement(0).baseHeight
        newE.isGhost = true

        let ghosts: ChosenTileElements = {
            tile: tile,
            elements: [tile.numElements-1]
        } 

        cementery.push(ghosts)
    }
} */

/**
 * Place a ghost on end of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostEnd(verifiedSelection: MapSelectionVerified): void {
    let tile = map.getTile(verifiedSelection.end.x/mapTileSize, verifiedSelection.end.y/mapTileSize)
    setGhost(tile, determineDirection(verifiedSelection))
}


/**
 * Place ghost on start of selection (for 1 tile wide area)
 * @param verifiedSelection 
 */
function findGhostStart(verifiedSelection: MapSelectionVerified): void {
    let tile = map.getTile(verifiedSelection.start.x/mapTileSize, verifiedSelection.start.y/mapTileSize)
    setGhost(tile, opositeDirection(determineDirection(verifiedSelection)))
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

    setGhostScenery(cornerMinMin, <Direction>(0))
    setGhostScenery(cornerMinMax, <Direction>(1))
    setGhostScenery(cornerMaxMax, <Direction>(2))
    setGhostScenery(cornerMaxMin, <Direction>(3))
}

/**
 * Places ghost in centre of selection (for square areas)
 * @param verifiedSelection 
 */
function findGhostCentreOfArea(verifiedSelection: MapSelectionVerified) {
    let midPoint = selectionMidPoint(verifiedSelection)

    // 1 st case: sides lenght are odd numbers
    if ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 0 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 0) {
        setGhostScenery3(map.getTile(midPoint.x/mapTileSize, midPoint.y/mapTileSize))
    }
    // 2nd case: sides leghts are even numbers
    if  ((Math.abs(verifiedSelection.start.x-verifiedSelection.end.x)/mapTileSize)%2 == 1 && (Math.abs(verifiedSelection.start.y-verifiedSelection.end.y)/mapTileSize)%2 == 1) {
        let orderedSelection = orderVerifiedSelection(verifiedSelection)
        let midPointOfOrdered = selectionMidPoint(orderedSelection)
        setGhostScenery3(map.getTile(midPointOfOrdered.x/mapTileSize, midPointOfOrdered.y/mapTileSize))
        setGhostScenery3(map.getTile( (midPointOfOrdered.x/mapTileSize)+1, (midPointOfOrdered.y/mapTileSize)+1 )    )
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
            setGhost(tileMidpoint, direction)
        }
        else {
            setGhostScenery3(tileMidpoint)
        }
    }
}

