import { ElementVisibility, store } from "openrct2-flexui";

export const defaults = {
currentMeasurement: "Click and drag mouse over map to measure",
currentMeasurement2: "hidden",
currentMeasurement2Visibility: <ElementVisibility>"none"
}

export const model = {
    currentMeasurement: store<string>(defaults.currentMeasurement),
    currentMeasurement2: store<string>(defaults.currentMeasurement2),
    currentMeasurement2Visibility: store<ElementVisibility>(defaults.currentMeasurement2Visibility),

    modeButtonsPressed: {
        area: store<boolean>(false),
        tape: store<boolean>(true)
    },

    showButtonsPressed: {
        ends: store<boolean>(true),
        centre: store<boolean>(true)
    },

    ghostsButtonsPressed: {
        keepOne: store<boolean>(true),
        keepAll: store<boolean>(false),
        // other two buttons in Ghosts group are clickable only
    },

    //rest of buttons are clickable only (no pressed state perservation)

     
}