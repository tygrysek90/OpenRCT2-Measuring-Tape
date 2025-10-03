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
import { nicelyStartTool, onClickAreaButton, onClickDismissLast, onClickDismissAll, onClickKeepAllButton, onClickKeepOneButton, onClickShowGhCentreButton, onClickShowGhEndButton, onClickTapeButton, stopTool, onClickGhostEraseCrosshair, onClickGhostEraseArea } from "./mainActions";
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
import { ghostCrosshairPng } from "../imgs/ghostCrosshair";
import { exorciseAreaPng } from "../imgs/exorciseArea";
import { atomicMushroomPng } from "../imgs/atomicMushroom";


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
            text: "Sets",
            direction: LayoutDirection.Vertical,
            content: [
                // 1st ROW - ghost keeping options (ghosts with locks)
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
                // 2st ROW - ghost removing by set (ghost with big '-' and 'x')
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
            text: "Tiles",
            direction: LayoutDirection.Vertical,
            content: [
                // ghost removing other
                horizontal({
                    content: [
                        button({
                            height: imgButtonSmall.height,
                            width: imgButtonSmall.width,
                            image: ghostCrosshairPng.image,
                            tooltip: "Clean ghosts from one tile",
                            isPressed: model.ghostSecondaryButtonsPressed.crosshair,
                            onClick: () => onClickGhostEraseCrosshair()
                        }),
                        button({
                            padding: {left: "1px", right: "1px"},
                            height: imgButtonSmall.height,
                            width: imgButtonSmall.width,
                            image: exorciseAreaPng.image,
                            tooltip: "Clean ghosts from selected area",
                            isPressed: model.ghostSecondaryButtonsPressed.area,
                            onClick: () => onClickGhostEraseArea(),
                        }),
                        button({
                            height: imgButtonSmall.height,
                            width: imgButtonSmall.width,
                            image: atomicMushroomPng.image,
                            tooltip: "Obliterate all ghosts from the map",
                            //disabled: model.ghostsButtonsDisabled.dismissAll,
                            //onClick: () => onClickDismissAll(),
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
                    padding: {left: "1px", right: "1px"},
                    height: imgButtonSmall.height,
                    width: imgButtonSmall.width,
                    image:  helpAboutPng.image,
                    tooltip: "About & Help",
                    onClick: () => aboutHelpWindow.open(),
                }),
                button({
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