import { button, Colour, groupbox, horizontal, label, LayoutDirection, vertical, window } from "openrct2-flexui";
import { model } from "./model";
import { onClickAreaButton, onClickDisimissLast, onClickDissmissAll, onClickKeepAllButton, onClickKeepOneButton, onClickShowGhCentreButton, onClickShowGhEndButton, onClickTapeButton } from "./actions";
import { openObjSelection } from "./objectSelection/openObjSelection";

const buttonHeight = 26
const answerToLifeAndEverything = 42

/**
 * Main window user interface
 */
export const mainWindow = window({
    title: "Measuring Tape",
    width: 300,
    height: "auto",
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            //text: "Measurement",
            direction: LayoutDirection.Horizontal,
            height: answerToLifeAndEverything,
            content: [
                label({
                    padding: {"left": "6px", "top":"1w", "bottom": "1w"},
                    text: model.currentMeasurement
                }),
                label({
                    padding: {"left": "6px", "top":"1w", "bottom": "1w"},
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
                    height: buttonHeight,
                    text: "Tape",
                    isPressed: model.modeButtonsPressed.tape,
                    onClick: () => onClickTapeButton(),
                }),
                button({
                    height: buttonHeight,
                    text: "Area",
                    isPressed: model.modeButtonsPressed.area,
                    onClick: () => onClickAreaButton(),

                })
            ]
        }),
        groupbox({
            text: "Show Ghosts",
            direction: LayoutDirection.Horizontal,
            content: [
                button({
                    height: buttonHeight,
                    width: "1w",
                    text: "Ends",
                    isPressed: model.showButtonsPressed.ends,
                    onClick: () => onClickShowGhEndButton(),
                }),
                button({
                    height: buttonHeight,
                    width: "1w",
                    text: "Centre",
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
                            height: buttonHeight,
                            width: "1w",
                            text: "Keep 1 set",
                            isPressed: model.ghostsButtonsPressed.keepOne,
                            onClick: () => onClickKeepOneButton(),
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Keep all",
                            isPressed: model.ghostsButtonsPressed.keepAll,
                            onClick: () => onClickKeepAllButton(),
                        }),
                    ]
                }),
                horizontal({
                    content: [
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Dismiss last",
                            disabled: model.ghostsButtonsDisabled.dissmissLast,
                            onClick: () => onClickDisimissLast(),
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Dismiss all",
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
                vertical({
                    content: [
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Configure…",
                            //isPressed: ,
                            onClick: () => openObjSelection(0), // the parameter is unused
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Extra tools…",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                    ]
                }),
                vertical({
                    content: [
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Help…",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "About…",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                    ]
                }),

            ]
        }),

    ]

})