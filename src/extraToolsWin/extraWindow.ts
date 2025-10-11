/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { button, Colour, FlexibleLayoutContainer, groupbox, horizontal, LayoutDirection, window } from "openrct2-flexui";
import { imgButton, imgButtonSmall } from "../common/commonUiConsts";
import { onClickBisectEdgesButton, onClickMapCentre, onClickStamper, onClickStamperRotate } from "./extraActions";
import { pluginGraphics } from "../graphics/pluginGraphics";


function dialAlike(): FlexibleLayoutContainer {
    let rowInside:FlexibleLayoutContainer = []
    
    let dial: FlexibleLayoutContainer = []

    for (let r=0; r<3; r++) {
        for (let c=0; c<3; c++) {
            let p = (r*3+c)+1
            rowInside.push(button({
                width: imgButtonSmall.width,
                height: imgButtonSmall.height,
                text: "{WHITE}"+p.toString(),
                onClick: () => onClickStamper(p),
            }))
        }
        dial.push(horizontal({
            content: rowInside.slice()
        }))
        rowInside = []
    }
    dial.push(
        horizontal({
                content: [    
                    button({width: imgButtonSmall.width,
                                height: imgButtonSmall.height,
                                text: "",
                                visibility: "hidden"}),
                    button({width: imgButtonSmall.width,
                            height: imgButtonSmall.height,
                            text: "{WHITE}0",
                            onClick: () => onClickStamper(0)}),
                    button({width: imgButtonSmall.width,
                            height: imgButtonSmall.height,
                            image: 5169,
                            onClick: () => onClickStamperRotate()})
                ]
        })
    )      
    return dial
}
 


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
                    height: imgButton.height,
                    image: pluginGraphics.bisectMapEdges.image,
                    tooltip: "Bisect (to half) map edges",
                    onClick: () => onClickBisectEdgesButton()
                }),
                button({
                    width: imgButton.width,
                    height: imgButton.height,
                    image: pluginGraphics.centreOfMap.image,
                    tooltip: "Find centre of map",
                    onClick: () => onClickMapCentre()
                })
            ]
        }),
        groupbox({
            text: "Rubber stamp",
            content: dialAlike()
        })
    ]
})