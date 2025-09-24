import { button, Colour, groupbox, horizontal, label, LayoutDirection, window } from "openrct2-flexui";
import { model } from "./mainModel";
import { onClickAreaButton, onClickDisimissLast, onClickDissmissAll, onClickKeepAllButton, onClickKeepOneButton, onClickShowGhCentreButton, onClickShowGhEndButton, onClickTapeButton } from "./actions";
import { openObjSelection } from "../objectSelection/openObjSelection";
import { SpriteIds } from "../common/spriteIds";
import { tapePng } from "../imgs/tape";
import { endsPng } from "../imgs/ends";
import { centrePng } from "../imgs/centre";
import { lockOnePng } from "../imgs/lockOne";
import { lockAllPng } from "../imgs/lockAll";
import { removeOnePng } from "../imgs/removeOne";
import { removeAllPng } from "../imgs/removeAll";
import { helpAboutPng } from "../imgs/helpAbout";
import { extraPng } from "../imgs/extra";
import { vrenchPng } from "../imgs/vrench";
import { pluginVersion } from "../version";
import { extraWindow } from "../extraTools/extraWindow";
import { answerToLifeAndEverything, imgbutton, imgbuttonSmall } from "../common/commonUiConsts";
import { aboutHelpWindow } from "../aboutHelp/aboutHelpWin";


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
            //text: "Measurement",
            direction: LayoutDirection.Vertical,
            height: answerToLifeAndEverything,
            content: [
                label({
                    //padding: {"left": "6px", "top":"1w", "bottom": "1w"},
                    text: model.currentMeasurement
                }),
                label({
                    //padding: {"left": "6px", "top":"1w", "bottom": "1w"},
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
                    height: imgbutton.heigh,
                    width: imgbutton.widht,
                    image: tapePng.image,
                    border: false,
                    tooltip: "Measuring tape",
                    isPressed: model.modeButtonsPressed.tape,
                    onClick: () => onClickTapeButton(),
                }),
                button({
                    height: imgbutton.heigh,
                    width: imgbutton.widht,
                    image: SpriteIds.SPR_G2_MOUNTAIN_TOOL_EVEN,
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
                    height: imgbutton.heigh,
                    width: imgbutton.widht,
                    image: endsPng.image,
                    tooltip: "Ends",
                    isPressed: model.showButtonsPressed.ends,
                    onClick: () => onClickShowGhEndButton(),
                }),
                button({
                    height: imgbutton.heigh,
                    width: imgbutton.widht,
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
                            height: imgbutton.heigh,
                            width: imgbutton.widht,
                            image: lockOnePng.image,
                            tooltip: "Keep 1 set",
                            isPressed: model.ghostsButtonsPressed.keepOne,
                            onClick: () => onClickKeepOneButton(),
                        }),
                        button({
                            height: imgbutton.heigh,
                            width: imgbutton.widht,
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
                           height: imgbutton.heigh,
                            width: imgbutton.widht,
                            image: removeOnePng.image,
                            tooltip: "Dismiss last",
                            disabled: model.ghostsButtonsDisabled.dissmissLast,
                            onClick: () => onClickDisimissLast(),
                        }),
                        button({
                            height: imgbutton.heigh,
                            width: imgbutton.widht,
                            image: removeAllPng.image,
                            tooltip: "Dismiss all",
                            disabled: model.ghostsButtonsDisabled.dissmiisAll,
                            onClick: () => onClickDissmissAll(),
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
                    height: imgbuttonSmall.heigh,
                    width: imgbuttonSmall.widht,
                    image: vrenchPng.image,
                    tooltip: "Configure",
                    onClick: () => openObjSelection(0), // the parameter is unused
                }),
                button({
                    height: imgbuttonSmall.heigh,
                    width: imgbuttonSmall.widht,
                    image:  helpAboutPng.image,
                    tooltip: "About & Help",
                    onClick: () => aboutHelpWindow.open(),
                }),
                button({
                    padding: {left: "1px", right: "1px"},
                    height: imgbuttonSmall.heigh,
                    width: imgbuttonSmall.widht,
                    image: extraPng.image,
                    tooltip: "Extra tools",
                    onClick: () => extraWindow.open(),
                }),

            ]
        }),
        groupbox({
            content: [
                label({
                    //height: 18,
                    //padding: {top: 2},
                    disabled: true,
                    alignment: "centred",
                    text: `${pluginVersion}`
                })
            ]
        })
    ]
})