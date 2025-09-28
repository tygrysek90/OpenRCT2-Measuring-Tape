/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Configuration window
 * GUI definition
 */

import { window, Colour, groupbox, LayoutDirection, button, horizontal, vertical, label, textbox, listview, graphics, twoway, checkbox } from "openrct2-flexui"
import { objSelModel } from "./objSelModel"
import { onClickClearSearch, onClickDefault, onClickObjectList, onClickTypeList, purgePreview, onCurrentDraw, onHighlightObjectList, onPreviewDraw, onSearchParamChange, selectTop } from "./objSelActions"


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
            text: "Select and pick below {BABYBLUE}- the current configuration is saved with the park", 
            content: [
                // Ghost type object selector
                // 1 of 3 columns (leftmost)
                listview({
                    width: 200,
                    height: "1w",
                    canSelect: true,
                    selectedCell: twoway(objSelModel.typeChosen),
                    items: objSelModel.typeShownList,
                    onClick: (item) => onClickTypeList(item)
                }),
                // Currently selected ghost
                // 2 of 3 columns (centre)
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
                // Options
                // 3 of 3 column (rightmost)
                groupbox({
                    padding: {left: "1w"},
                    width: 160,
                    height: "1w",
                    content: [

                        label({
                            height:26,
                            text: "Personal profile:{NEWLINE}{BABYBLUE}(saved in the game config.)"
                        }),
                        button({
                            height: objButtonHeight,
                            width: "1w",
                            text: "Save as default",
                            tooltip: "Save as your personal default for all new parks (game configuration storage)"
                            //isPressed: ,
                            //onClick: () => onClickDefault(),
                        }),
                        button({
                            height: objButtonHeight,
                            width: "1w",
                            text: "Load defaults",
                            tooltip: "Load your personal defaults (from game configuration storage)",
                            //isPressed: ,
                            //onClick: () => onClickDefault(),
                        }),
                        button({
                            height: objButtonHeight,
                            width: "1w",
                            text: "{BABYBLUE}Load plugin defaults",
                            //isPressed: ,
                            onClick: () => onClickDefault(),
                        }),

                        label({
                            padding: {top: "100%"},
                            text: "{BABYBLUE}Profi mode:"
                        }),
                        checkbox({
                            text: "More setting options",
                            isChecked: twoway(objSelModel.moreOptionsCheck),
                            onChange: () => selectTop()
                        })

                        
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
                                    onChange: () => onSearchParamChange()
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
                            onHighlight: (item) => onHighlightObjectList(item),
                            onClick: (item) => onClickObjectList(item)
                        }),
                        checkbox({
                            disabled: objSelModel.objCheckFilter.disabled,
                            height: 8,
                            text: "Filter unfit small scenery {BABYBLUE} - trees, swamps, cocks, 1/4 tiles",
                            isChecked: twoway(objSelModel.objCheckFilter.value),
                            onChange: () => onSearchParamChange()
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
    ],
    onClose: () => purgePreview()
})