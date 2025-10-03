/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Main window
 * GUI functions
 */

import { ElementVisibility } from "openrct2-flexui";
import { MapSelection, toMapRange } from "../tool/mapSelection";
import { mapTileSize } from "../common/mapTileSize";
import { defaults, model } from "./mainModel";
import { addToHistory, dereferenceCemetery, eraseHistory, exorciseCemetery, isNoGhostHistory, moveGhosts, removeLastFromHistory } from "../ghosts/ghostActions";
import { tool } from "../tool/tool";
import { ToolMode } from "../tool/mapSelectionTool";
import { startToolMode } from "../config/toolMode";
import { seekAndDestroy, seekAndDestroyArea } from "../ghosts/ghostPurge";

// GROUPBOX (measurement)
function setDefaultMeasurementLabels() {
    model.currentMeasurement2Visibility.set(defaults.currentMeasurement2Visibility)
    model.currentMeasurement2.set(defaults.currentMeasurement2)
    model.currentMeasurement.set(defaults.currentMeasurement)
}
// END GROUPBOX (measurement)

// GROUPBOX "Mode"
function depressToolButtons() {
    model.modeButtonsPressed.area.set(false)
    model.modeButtonsPressed.tape.set(false)
    //
    model.ghostSecondaryButtonsPressed.crosshair.set(false)
    model.ghostSecondaryButtonsPressed.area.set(false)
}

function commonToolDepress() {
    onToolCancel()
    depressToolButtons()
    setDefaultMeasurementLabels()
}

export function onClickAreaButton() {
    if (model.modeButtonsPressed.area.get()) {
        stopTool()
        commonToolDepress()
    }
    else {
        depressToolButtons()
        model.modeButtonsPressed.area.set(true)
        tool.mode = "area"
        startTool()
    }
    
}

export function onClickTapeButton() {
    if (model.modeButtonsPressed.tape.get()) {
        stopTool()
        commonToolDepress()
    }
    else {
        depressToolButtons()
        model.modeButtonsPressed.tape.set(true)
        tool.mode = "tape"
        startTool()
    }
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
function setDismissButtonsDisability() {
    // tvl to je logika
    if (model.ghostsButtonsPressed.keepOne.get() == false && model.ghostsButtonsPressed.keepAll.get() == false) {
        model.ghostsButtonsDisabled.dismissLast.set(true)
        model.ghostsButtonsDisabled.dismissAll.set(true)
    }
    if (model.ghostsButtonsPressed.keepOne.get() == true || model.ghostsButtonsPressed.keepAll.get() == true) {
        model.ghostsButtonsDisabled.dismissLast.set(false)
        model.ghostsButtonsDisabled.dismissAll.set(false)
    }
    if (isNoGhostHistory()) {
        model.ghostsButtonsDisabled.dismissLast.set(true)
        model.ghostsButtonsDisabled.dismissAll.set(true)
    }
    if (model.ghostsButtonsPressed.keepAll.get() == false) {
        model.ghostsButtonsDisabled.dismissAll.set(true)
    }
}

export function onClickKeepOneButton() {
    if (model.ghostsButtonsPressed.keepOne.get() == true) {
        exorciseCemetery()
    }
    model.ghostsButtonsPressed.keepOne.set(!model.ghostsButtonsPressed.keepOne.get())
    model.ghostsButtonsPressed.keepAll.set(false)
    setDismissButtonsDisability()
}

export function onClickKeepAllButton() {
    if (model.ghostsButtonsPressed.keepOne.get() == true) {
        addToHistory()
    }
    if (model.ghostsButtonsPressed.keepAll.get() == true) {
        exorciseCemetery()
    }
    model.ghostsButtonsPressed.keepAll.set(!model.ghostsButtonsPressed.keepAll.get())
    model.ghostsButtonsPressed.keepOne.set(false)
    setDismissButtonsDisability()
}

export function onClickDismissLast() {
    removeLastFromHistory()
    setDefaultMeasurementLabels()
    setDismissButtonsDisability()

}

export function onClickDismissAll() {
    eraseHistory()
    setDefaultMeasurementLabels()
    setDismissButtonsDisability()
}
// END GROUPBOX "Ghosts"

// GROUPBOX "Ghost Precise"
export function onClickGhostEraseCrosshair() {
    setDefaultMeasurementLabels()
    if (model.ghostSecondaryButtonsPressed.crosshair.get()) {
        stopTool()
        commonToolDepress()
    }
    else {
        depressToolButtons()
        model.ghostSecondaryButtonsPressed.crosshair.set(true)
        tool.mode = "erase-one"
        startTool()
    }
}

export function onClickGhostEraseArea() {
    setDefaultMeasurementLabels()
    if (model.ghostSecondaryButtonsPressed.area.get()) {
        stopTool()
        commonToolDepress()
    }
    else {
        depressToolButtons()
        model.ghostSecondaryButtonsPressed.area.set(true)
        tool.mode = "erase-area"
        startTool()
    }
}

// TOOL ACTIONS (the tool is bound to main window)

/**
 * Generally cancelling tool via ESC or when another tool (eg. place scenery or footpath) gets invoked
 */
export function onToolCancel(): void {
    if (!(model.ghostsButtonsPressed.keepOne.get() || model.ghostsButtonsPressed.keepAll.get())) {
    exorciseCemetery()
    }
    setDefaultMeasurementLabels()
    setDismissButtonsDisability()
    depressToolButtons()
    tool.mode = "off"
}


var lastStart: CoordsXY = {x:-32,y:-32}
var lastLengthX: number = -1
var lastLengthY: number = -1
/**
 * Bound to tool.onMove(...)
 * @param selection 
 */
function updateMeasurementTape(selection: MapSelection): void {
    let lengthX = Math.abs(selection.start.x-(selection.end?.x??0))/mapTileSize
    let lengthY = Math.abs(selection.start.y-(selection.end?.y??0))/mapTileSize

    if (lastStart == selection.start) {
        if (lastLengthX != lengthX || lastLengthY != lengthY) {
            if (tool.mode == "tape") {
                model.currentMeasurement.set(`Length: {WHITE}${Math.max(lengthX,lengthY)+1}`)
                model.currentMeasurement2Visibility.set(<ElementVisibility>("none"))
                moveGhosts()

            }
            if (tool.mode == "area") {
                model.currentMeasurement.set(`Size: {WHITE}${lengthX+1} x ${lengthY+1}`)
                model.currentMeasurement2Visibility.set(<ElementVisibility>("visible"))
                model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)}`)
                moveGhosts()

            }
            if (tool.mode == "erase-area") {
                model.currentMeasurement.set(`{LIGHTPINK}Remove: {WHITE}${lengthX+1} x ${lengthY+1}`)
                model.currentMeasurement2Visibility.set(<ElementVisibility>("visible"))
                model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)}`)
            }

            lastLengthX = lengthX
            lastLengthY = lengthY

        }
    }
    else {
        if (tool.mode == "tape") {
            model.currentMeasurement.set(`Length: {WHITE}${Math.max(lengthX,lengthY)+1}`)
            model.currentMeasurement2Visibility.set(<ElementVisibility>("none"))
            moveGhosts()

        }
        if (tool.mode == "area") {
            model.currentMeasurement.set(`Size: {WHITE}${lengthX+1} x ${lengthY+1}`)
            model.currentMeasurement2Visibility.set(<ElementVisibility>("visible"))
            model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)}`)
            moveGhosts()
        }
        if (tool.mode == "erase-area") {
            model.currentMeasurement.set(`{LIGHTPINK}Remove: {WHITE}${lengthX+1} x ${lengthY+1}`)
            model.currentMeasurement2Visibility.set(<ElementVisibility>("visible"))
            model.currentMeasurement2.set(`Area: {GREY}${(lengthX+1)*(lengthY+1)}`)
        }

        lastLengthX = lengthX
        lastLengthY = lengthY
        lastStart = selection.start
    }
}

export function setMeasurementTapeEraseOne() {
    if (tool.mode == "erase-one") {
        model.currentMeasurement.set(`{LIGHTPINK}Clear one tile`)
        model.currentMeasurement2Visibility.set("hidden" satisfies ElementVisibility)
        model.currentMeasurement2.set(``)
    }
}


export function stopTool(){
    tool.deactivate()
}


/**
 * Starts the measuring tool
 */
export function startTool() 
{
    if (tool.mode == "tape") {
        startToolMode.set("tape")
        tool.setConstraint(1)
        tool.activate()
        tool.onDown = () => onGhostActionStart()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
        tool.onUp = () => onGhostActionFinish();  
    }

    if (tool.mode == "area") {
        startToolMode.set("area")
        tool.remConstraint()
        tool.activate()
        tool.onDown = () => onGhostActionStart()
        tool.onCancel = () => onToolCancel()
        tool.onMove = (selection) => updateMeasurementTape(selection);  
        tool.onUp = () => onGhostActionFinish();  

    }

    if (tool.mode == "erase-one") {
        startToolMode.set("erase-one")
        tool.activate()
        setMeasurementTapeEraseOne()
        tool.onCancel = () => onToolCancel()
        tool.onUp = (args: CoordsXY) => onEraserOneUp(args)
    }

    if (tool.mode == "erase-area") {
        startToolMode.set("erase-area")
        tool.remConstraint()
        tool.activate()
        tool.onCancel = () => onToolCancel()
        tool.onDown = (coords: CoordsXY) => onEraseAreaStart(coords)
        tool.onMove = (selection) => updateMeasurementTape(selection)
        tool.onUp = (coords: CoordsXY) => onEraseAreaFinish(coords);
    }
}


/**
 * this should be for ALT+T keyboard shortcut
 * start a tool instantly, no wait, no extra clicks, just go for it
 */
export function	nicelyStartTool(whichMode: ToolMode)
{
    if (tool.mode == "off") {
        if (whichMode != undefined) {
            tool.mode = whichMode
        }
        depressToolButtons()
        if (whichMode == "tape") {
            model.modeButtonsPressed.tape.set(true)
        }
        if (whichMode == "area") {
            model.modeButtonsPressed.area.set(true)
        }
        startTool()
    }
}


export function onGhostActionStart() {
    if (model.ghostsButtonsPressed.keepOne.get() == true) { 
        exorciseCemetery()
        dereferenceCemetery()
    }
    if (model.ghostsButtonsPressed.keepAll.get() == true) {
        dereferenceCemetery()
    }
}

/**
 * This is generally on L Mouse Button release after dragging area
 * it also gets called from extraActions
 */
export function onGhostActionFinish() {
    if (model.ghostsButtonsPressed.keepOne.get() == false && model.ghostsButtonsPressed.keepAll.get() == false) {
        exorciseCemetery() 
    }
    if (model.ghostsButtonsPressed.keepAll.get() ==  true) {
        addToHistory()
    }
    setDismissButtonsDisability()
}



/// ERASER tool FUNCTIONS

/**
 * On click to remove ghosts from one tile (ghost in crosshair button)
 * @param args 
 */
export function onEraserOneUp(args: CoordsXY) {
    seekAndDestroy(args.x/mapTileSize, args.y/mapTileSize)
}

/** Stores start of area erasing function */
var eraserStart: CoordsXY
/**
 * On mouse down for erase area mode
 * @param coords 
 */
export function onEraseAreaStart(coords: CoordsXY) {
    eraserStart = coords
}

/**
 * On mouse up for erase area mode
 * @param coords 
 */
export function onEraseAreaFinish(coords: CoordsXY) {
    let range = toMapRange({
        start: eraserStart,
        end: coords
    })
    if (range != null) {
        seekAndDestroyArea(range)
    }
}