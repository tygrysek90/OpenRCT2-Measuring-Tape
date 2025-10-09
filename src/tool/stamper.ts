/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { dereferenceCemetery, moveStamperGhosts, addToHistory, exorciseCemetery } from "../ghosts/ghostActions";
import { debug } from "../logger/logger";
import { onClickKeepAllButton } from "../mainWin/mainActions";
import { model } from "../mainWin/mainModel";
import { toggleGridOverlay } from "./mapSelectionTool";

/**
 * Stamper 'extra' tool
 */
var rotation: Direction = 0

var digit: number = 0

export function activateStamper(dig: number) {
    // force switch to keep-all mode (otherwise, this whole function loses its meaning and use-ability)
    if (model.ghostsButtonsPressed.keepAll.get() == false) {
        onClickKeepAllButton()
    }

    addToHistory()
    dereferenceCemetery()

    digit = dig
    toggleGridOverlay(false)
    toggleGridOverlay(true)
    ui.activateTool({
        id: "measuring-tape-stamper",
        cursor: "hand_open",
        filter: ["terrain"],
        onMove: a => moveStamper(a),
        onUp: () => upStamper(),
        onFinish: () => exorciseCemetery()
    });

}

export function rotateStamper() {
    debug(`Stamper rotation ${rotation}`)
    if (rotation == 3 satisfies Direction) {
        rotation = 0 satisfies Direction
    }
    else {
        rotation = <Direction>(rotation + 1) satisfies Direction
    }
}


var lastPos: CoordsXY = {x: -1, y: -1}

function moveStamper(a: ToolEventArgs) {
    if (a.mapCoords != undefined) {
        if (lastPos.x != a.mapCoords.x || lastPos.y != a.mapCoords.y) {
            debug("stamper moves")
            moveStamperGhosts(a.mapCoords, digit, rotation)
            lastPos = a.mapCoords
        }
    }

}

function upStamper() {
    addToHistory()
    dereferenceCemetery()
}