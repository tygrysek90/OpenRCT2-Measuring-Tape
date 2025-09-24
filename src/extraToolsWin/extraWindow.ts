/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { button, Colour, groupbox, LayoutDirection, window } from "openrct2-flexui";
import { imgbutton } from "../common/commonUiConsts";
import { bisectMapEdghesPng } from "../imgs/bisectMapEdghes";
import { centreOfMapPng } from "../imgs/centreOfMap";
import { onClickBisectEdgesButton, onClickMapCentre } from "./extraActions";

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
                    width: imgbutton.widht,
                    height: imgbutton.heigh,
                    image: bisectMapEdghesPng.image,
                    tooltip: "Bisect (to half) map edges",
                    onClick: () => onClickBisectEdgesButton()
                }),
                button({
                    width: imgbutton.widht,
                    height: imgbutton.heigh,
                    image: centreOfMapPng.image,
                    tooltip: "Find centre of map",
                    onClick: () => onClickMapCentre()
                })
            ]
        })
    ]
})