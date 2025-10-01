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
 * GUI definition
 */

import { button, Colour, groupbox, horizontal, label, LayoutDirection, window } from "openrct2-flexui";
import { model } from "./mainModel";
import { nicelyStartTool, onClickAreaButton, onClickDismissLast, onClickDismissAll, onClickKeepAllButton, onClickKeepOneButton, onClickShowGhCentreButton, onClickShowGhEndButton, onClickTapeButton, stopTool } from "./mainActions";
import { tapePng } from "../imgs/tape";
import { endsPng } from "../imgs/ends";
import { centrePng } from "../imgs/centre";
import { lockOnePng } from "../imgs/lockOne";
import { lockAllPng } from "../imgs/lockAll";
import { removeOnePng } from "../imgs/removeOne";
import { removeAllPng } from "../imgs/removeAll";
import { helpAboutPng } from "../imgs/helpAbout";
import { extraPng } from "../imgs/extra";
import { wrenchPng } from "../imgs/wrench";
import { pluginVersionReadable } from "../version";
import { answerToLifeAndEverything, imgButton, imgButtonSmall } from "../common/commonUiConsts";
import { aboutHelpWindow } from "../aboutHelp/aboutHelpWin";
import { openObjSelection } from "../configWin/openObjSelection";
import { extraWindow } from "../extraToolsWin/extraWindow";
import { measureAreaPng } from "../imgs/measureArea";
import { initConfig } from "../config/ghosts";
import { startToolMode } from "../config/toolMode";
import { mainWindowIsOpen } from "./isOpen";


/**
 * Main window user interface
 */
export const mainWindow = window({
    title: "Measuring Tape",
    width: 116,
    height: "auto",
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            direction: LayoutDirection.Vertical,
            height: answerToLifeAndEverything,
            content: [
                label({
                    text: model.currentMeasurement,
                }),
                label({
                    text: model.currentMeasurement2,
                    visibility: model.currentMeasurement2Visibility
                }),

            ]
        }),
        groupbox({
            text: "Mode",
            direction: LayoutDirection.Horizontal,
            content: [
                button({
                    height: imgButton.height,
                    width: imgButton.width,
                    image: tapePng.image,
                    border: false,
                    tooltip: "Measuring tape",
                    isPressed: model.modeButtonsPressed.tape,
                    onClick: () => onClickTapeButton(),
                }),
                button({
                    height: imgButton.height,
                    width: imgButton.width,
                    image: measureAreaPng.image,
                    tooltip: "Area",
                    isPressed: model.modeButtonsPressed.area,
                    onClick: () => onClickAreaButton(),

                })
            ]
        }),
        groupbox({
            text: "Show",
            direction: LayoutDirection.Horizontal,
            content: [
                button({
                    height: imgButton.height,
                    width: imgButton.width,
                    image: endsPng.image,
                    tooltip: "Ends",
                    isPressed: model.showButtonsPressed.ends,
                    onClick: () => onClickShowGhEndButton(),
                }),
                button({
                    height: imgButton.height,
                    width: imgButton.width,
                    image: centrePng.image,
                    tooltip: "Centre",
                    isPressed: model.showButtonsPressed.centre,
                    onClick: () => onClickShowGhCentreButton(),
                }),
           ]
        }),
        groupbox({
            text: "Ghosts",
            direction: LayoutDirection.Vertical,
            content: [
                horizontal({
                    content: [
                        button({
                            height: imgButton.height,
                            width: imgButton.width,
                            image: lockOnePng.image,
                            tooltip: "Keep 1 set",
                            isPressed: model.ghostsButtonsPressed.keepOne,
                            onClick: () => onClickKeepOneButton(),
                        }),
                        button({
                            height: imgButton.height,
                            width: imgButton.width,
                            image: lockAllPng.image,
                            tooltip: "Keep all",
                            isPressed: model.ghostsButtonsPressed.keepAll,
                            onClick: () => onClickKeepAllButton(),
                        }),
                    ]
                }),
                horizontal({
                    content: [
                        button({
                           height: imgButton.height,
                            width: imgButton.width,
                            image: removeOnePng.image,
                            tooltip: "Dismiss last",
                            disabled: model.ghostsButtonsDisabled.dismissLast,
                            onClick: () => onClickDismissLast(),
                        }),
                        button({
                            height: imgButton.height,
                            width: imgButton.width,
                            image: removeAllPng.image,
                            tooltip: "Dismiss all",
                            disabled: model.ghostsButtonsDisabled.dismissAll,
                            onClick: () => onClickDismissAll(),
                        }),
                    ]
                }),
            ]
        }),
        groupbox({
            text: "Extras",
            direction: LayoutDirection.Horizontal,
            content: [
                button({
                    height: imgButtonSmall.height,
                    width: imgButtonSmall.width,
                    image: wrenchPng.image,
                    tooltip: "Configure",
                    onClick: () => openObjSelection(), 
                }),
                button({
                    height: imgButtonSmall.height,
                    width: imgButtonSmall.width,
                    image:  helpAboutPng.image,
                    tooltip: "About & Help",
                    onClick: () => aboutHelpWindow.open(),
                }),
                button({
                    padding: {left: "1px", right: "1px"},
                    height: imgButtonSmall.height,
                    width: imgButtonSmall.width,
                    image: extraPng.image,
                    tooltip: "Extra tools",
                    onClick: () => extraWindow.open(),
                }),

            ]
        }),
        groupbox({
            content: [
                label({
                    disabled: true,
                    alignment: "centred",
                    text: pluginVersionReadable
                })
            ]
        })
    ],
    onOpen() {
        mainWindowIsOpen.set(true)
        initConfig()
        nicelyStartTool(startToolMode.get())
    },
    onClose() {
        stopTool()
        mainWindowIsOpen.set(false)
    }
})