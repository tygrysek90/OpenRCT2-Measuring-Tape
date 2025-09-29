/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { button, Colour, groupbox, LayoutDirection, window } from "openrct2-flexui";
import { imgButton } from "../common/commonUiConsts";
import { centreOfMapPng } from "../imgs/centreOfMap";
import { onClickBisectEdgesButton, onClickMapCentre } from "./extraActions";
import { bisectMapEdgesPng } from "../imgs/bisectMapEdges";

/**
 * Extra tools window definition
 */
export const extraWindow = window({
    title: "Measuring Tape",
    width: "auto",
    height: "auto",
    position: "center",
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            direction: LayoutDirection.Horizontal,
            text: "Extra tools",
            content:[
                button({
                    width: imgButton.width,
                    height: imgButton.heigh,
                    image: bisectMapEdgesPng.image,
                    tooltip: "Bisect (to half) map edges",
                    onClick: () => onClickBisectEdgesButton()
                }),
                button({
                    width: imgButton.width,
                    height: imgButton.heigh,
                    image: centreOfMapPng.image,
                    tooltip: "Find centre of map",
                    onClick: () => onClickMapCentre()
                })
            ]
        })
    ]
})