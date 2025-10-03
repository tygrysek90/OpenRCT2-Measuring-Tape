/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { window, Colour, graphics, label, horizontal, button } from "openrct2-flexui";
import { removeAllPng } from "../imgs/removeAll";
import { obliterateGhosts } from "../ghosts/ghostPurge";

/**
 * Nuke Confirmation Window
 *  
 * Serves as "are you sure to obliterate all ghosts on the map" yes/no window
 */


export const nukeConfirmWin = window({
    title: "Measuring Tape",
    width: 350,
    height: "auto",
    colours: [Colour["BordeauxRed"], Colour["BordeauxRedLight"]],
    position: "center",
    content: [
        horizontal({
            content: [
                graphics({
                    width: 45,
                    height: 45,
                    onDraw(g) {
                        g.image(removeAllPng.image, 0, 0)
                    },
                }),
                label({
                    text: "{WHITE}Are you sure to remove ALL ghosts from the map?"
                })
            ]
        }),
        horizontal({
            padding: {left: "1w", right: "1w"},
            content:[
                button({
                    height: 12,
                    width: 60,
                    text: "{WHITE}Yes",
                    onClick() {
                        obliterateGhosts()
                        nukeConfirmWin.close()
                    },
                }),
                button({
                    height: 12,
                    width: 60,
                    text: "{WHITE}No",
                    onClick() {
                        nukeConfirmWin.close()
                    }
                })
            ]
        })
        
    ]
})