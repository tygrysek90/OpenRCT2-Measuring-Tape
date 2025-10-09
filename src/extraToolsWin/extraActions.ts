/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { findMapCentre, findMapEdgesCentres } from "../ghosts/ghostActions";
import { onGhostActionFinish } from "../mainWin/mainActions";
import { activateStamper, rotateStamper } from "../tool/stamper";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
    onGhostActionFinish()
}

export function onClickMapCentre() {
    findMapCentre()
    onGhostActionFinish()
}

export function onClickStamper(n: number) {
    activateStamper(n)
}

export function onClickStamperRotate() {
    rotateStamper()
}