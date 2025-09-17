import { button, Colour, groupbox, horizontal, label, LayoutDirection, vertical, window } from "openrct2-flexui";
import { model } from "./model";
import { onClickAreaButton, onClickTapeButton } from "./actions";


const buttonHeight = 26

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
            
            height: 42,
            content: [
                label({
                    padding: {"left": "6px", "top":"1w", "bottom": "1w"},
                    text: model.currentMeasurement
                }),
                label({
                    padding: {"left": "6px", "top":"1w", "bottom": "1w"},
                    text: model.currentMeasurement2
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
                    isPressed: model.toolButtonsPressed.tape,
                    onClick: () => onClickTapeButton(),
                }),
                button({
                    height: buttonHeight,
                    text: "Area",
                    isPressed: model.toolButtonsPressed.area,
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
                    //isPressed: ,
                    //onClick: () => ,
                }),
                button({
                    height: buttonHeight,
                    width: "1w",
                    text: "Centre",
                    //isPressed: ,
                    //onClick: () => ,
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
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Keep all",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                    ]
                }),
                horizontal({
                    content: [
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Dismiss instantly",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Dismiss all",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                    ]
                }),
            ]
        }),
        groupbox({
            text: "Configure Ghosts",
            direction: LayoutDirection.Horizontal,
            content: [
                vertical({
                    content: [
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Tape ends…",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Tape centre…",
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
                            text: "Area ends…",
                            //isPressed: ,
                            //onClick: () => ,
                        }),
                        button({
                            height: buttonHeight,
                            width: "1w",
                            text: "Area centre…",
                            //isPressed: ,
                            //onClick: () => ,
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
                            text: "Configure more…",
                            //isPressed: ,
                            //onClick: () => ,
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