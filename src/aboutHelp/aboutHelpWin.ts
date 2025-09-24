/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * About/Help (two tab window)
 * GUI definition
 */

import { Colour, FlexibleLayoutContainer, graphics, label, LayoutDirection, listview, tab, tabwindow, vertical,  } from "openrct2-flexui";
import { pluginVersion } from "../version";
import { iPng } from "../imgs/i";
import { questionMarkPng } from "../imgs/questionMark";
import { tygrysek90Png } from "../imgs/tygrysek90";
import { toMapRange } from "../tool/mapSelection";

const tabHeight = 200


const aboutLines = [
    "",
    "Copyright © 2025 {TOPAZ}Ríša Szlachta (tygrysek90)",
    "", 
    "{BABYBLUE}https://github.com/tygrysek90/OpenRCT2-Measuring-Tape",
    "",
    "OpenRCT2-Measuring-Tape",
    "is licensed under the GNU General Public License version 3.",
    "",
    "",
    "{BABYBLUE}visit web for updates,",
    "{BABYBLUE}choose \"Watch\" -> \"Custom\" -> \"Releases\" to get notifications",
    "",
    "",
    "",
    `This plugin uses awesome works from {TOPAZ}Basssiiie:`,
    "",
    `OpenRCT2-Simple-Typescript-Template`, 
    "OpenRCT2-FlexUI",
    "OpenRCT2-ProxyPather",
    "",
    "And utilizes tiny piece of code from {TOPAZ}Sadret",
    "",
    "Some of button images are made on basis of g2.dat icons",
    "originally by {TOPAZ}OpenRCT2 Authors"
    ]

const helpLines = [
    "",
    "{YELLOW}A message from the author of the plugin:",
    "",
    "I hope all user interface and functions are",
    "enough self explanatory. If you need help, ",
    "want to suggest or ask for a feature to be",
    "added, report an bug or cooperate in some ",
    "way, feel free to contact me, via ",
    "{BABYBLUE} OpenRCT2 discord channel ",
    "{BABYBLUE} #plugin @tygrysek90 or DM,",
    "or via {BABYBLUE}GitHub (if you would like",
    "to make issue for bug report)",
    "",
    "Have a pleasing day!"
]

function makeLabels(lines: Array<string>):FlexibleLayoutContainer {
    let a:FlexibleLayoutContainer = []
    

    lines.forEach(line => {
        a.push(label({
            padding: {top: -6},
            text: line
        }))
    })


    return a
}


export const aboutHelpWindow = tabwindow({
    title: `Measuring Tape - ${pluginVersion} - Info`,
    width: 360,
    height: "auto" ,
    position: "center",
    colours: [Colour.DarkBrown, Colour.DarkBrown, Colour.Grey],
    tabs: [
        tab({image: iPng.image,
            content: makeLabels(aboutLines)
        }),
        tab({image: questionMarkPng.image,
            direction: LayoutDirection.Horizontal,
            content: [
                vertical({
                    content: [
                        graphics({
                            padding: {top: 34},
                            width: 100,
                            height: 100,
                            onDraw(g) {
                                g.image(tygrysek90Png.image, 0, 0)
                            },
                        })
                    ]
                }),
                vertical({
                    padding: {left: 12},
                    content: makeLabels(helpLines)
                })
                
            ]
        })
    ]

})