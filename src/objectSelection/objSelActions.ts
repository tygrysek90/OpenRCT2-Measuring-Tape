import { objectSelectionWindow } from "./objSelectionWind"
import { objSelModel, SelectionType } from "./objSelModel"


var selectionType: SelectionType



export function selectTop(which: SelectionType) {
    selectionType = which

    objSelModel.topPressed.forEach(button => {
        button.set(false)
    });
    objSelModel.topPressed[which].set(true)
}

export function openObjSelection(objSelection: SelectionType) {
    objectSelectionWindow.open()
    objectSelectionWindow.focus()
    console.log(objSelection)
    selectTop(objSelection)
}