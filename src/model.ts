import { store } from "openrct2-flexui";

export const model = {
    currentMeasurement: store<string>("Click and drag mouse"),
    currentMeasurement2: store<string>("over map to measure"),


    toolButtonsPressed: {
        area: store<boolean>(false),
        tape: store<boolean>(true)
    }
}