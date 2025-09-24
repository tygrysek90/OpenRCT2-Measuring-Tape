import { window, Colour, groupbox, LayoutDirection, button, horizontal, vertical, label, textbox, listview, graphics, twoway } from "openrct2-flexui"
import { objSelModel } from "./objSelModel"
import { onClickClearSearch, onClickDefault, onClickObjectList, onClickTypeList, onCurrentDraw, onHighlightObjectLust, onPreviewDraw, onSearchBoxChange } from "./objSelActions"


const objButtonHeight = 16
/**
 * Main window user interface
 */
export const objectSelectionWindow = window({
    title: "Measuring Tape - Options",
    width: {
        value: 550,
        min: 550, 
        max: 1000
    },
    height: {
        value: 450, 
        min: 450, 
        max: 1000
    },
    position: "center",
    colours: [Colour["LightBlue"], Colour["LightBlue"]],
    content: [
        // Type list selector, preview for type and buttons
        groupbox({
            direction: LayoutDirection.Horizontal,
            height: 200,
            width: "1w",
            text: "Configure", 
            content: [
                
                listview({
                    width: 200,
                    height: "1w",
                    canSelect: true,
                    selectedCell: twoway(objSelModel.typeChosen),
                    items: objSelModel.typeList,
                    onClick: (item) => onClickTypeList(item)
                }),
        
                groupbox({
                    padding: {left: "1w"},
                    width: 160,
                    content: [
                        label({
                            alignment: "centred",
                            text: objSelModel.typeChosenLabel
                        }),
                        graphics({
                            width: 114,
                            height: 114,
                            padding: {left: "1w", right: "1w", top: "1w"},
                            onDraw: (g) => onCurrentDraw(g)
                        }),
                        label({
                            padding: {bottom: "-6px"},
                            alignment: "centred",
                            text: objSelModel.typeChosenObjLabel
                        }),
                        label({
                            alignment: "centred",
                            height: 16,
                            padding: {top: 8},
                            text: objSelModel.typeChosenObjLabel2
                        })
                    ]
                }),

                groupbox({
                    padding: {left: "1w"},
                    width: 160,
                    height: "1w",
                    content: [

                        button({
                            height: objButtonHeight,
                            width: "1w",
                            text: "Set all default",
                            //isPressed: ,
                            onClick: () => onClickDefault(),
                        }),
                    ]
                })
                 
            ]
        }),
        // EVERYTHING BELOW type selector
        // two verticals
        groupbox({
            text: objSelModel.objGroupLabel,
            direction: LayoutDirection.Horizontal,
            height: "1w",
            content: [
                // LEFT vertical - list and search
                vertical({
                    content:[
                        horizontal({
                            content:[
                                textbox({
                                    text: twoway(objSelModel.objSearchFilter),
                                    maxLength: 40,
                                    tooltip: "Enter text to search object list",
                                    onChange: (text: string) => onSearchBoxChange(text)
                                }),
                                button({
                                    width: 65,
                                    height: 14,
                                    text: "Clear",
                                    onClick: () => onClickClearSearch()
                                })
                                
                            ]
                        }),
                        listview({
                        scrollbars: "vertical",
                        canSelect: true,
                        items: objSelModel.objList,
                        onHighlight: (item) => onHighlightObjectLust(item),
                        onClick: (item) => onClickObjectList(item)
                        })
                    ]
                }),
                // RIGHT vertical - preview (and future: drop-tool)
                groupbox({
                    width: 160,
                    content: [
                        vertical({
                            padding: {top: "50%", bottom:"50%"},
                            content: [
                                graphics({
                                    width: 114,
                                    height: 114,
                                    padding: {left: "1w", right: "1w", top: "1w"},
                                    onDraw: (g) => onPreviewDraw(g)
                                }),
                                label({
                                    padding: {bottom: "1w"},
                                    alignment: "centred",
                                    text: objSelModel.objSelectedName
                                }),
                            ]
                        }),
                        
                    ]
                })
            ]
        })
    ]
})