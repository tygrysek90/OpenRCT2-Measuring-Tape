import { button, Colour, groupbox, label, LayoutDirection, window } from "openrct2-flexui";
import { model } from "./model";
import { onClickAreaButton, onClickTapeButton } from "./actions";


/**
 * Main window user interface
 */
export const mainWindow = window({
    title: "Measuring Tape",
    width: 174,
    height: 400,
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            text: "Measurement",
            content: [
                label({
                    text: model.currentMeasurement
                }),
                label({
                    text: model.currentMeasurement2
                }),

            ]
        }),
        groupbox({
            text: "Type",
            direction: LayoutDirection.Horizontal,
            content: [
                button({
                    text: "Tape",
                    isPressed: model.toolButtonsPressed.tape,
                    onClick: () => onClickTapeButton(),
                }),
                button({
                    text: "Area",
                    isPressed: model.toolButtonsPressed.area,
                    onClick: () => onClickAreaButton(),

                })
            ]
        })

    ]

})