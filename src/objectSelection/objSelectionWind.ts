import { window, Colour, groupbox, LayoutDirection, button, horizontal, vertical, label, textbox, listview, graphics, twoway } from "openrct2-flexui"
import { objSelModel } from "./objSelModel"
import { onClickObjectList, onClickTypeList, onCurrentDraw, onHighlightObjectLust, onPreviewDraw } from "./objSelActions"

//const answerToLifeAndEverything = 42


/**
 * Main window user interface
 */
export const objectSelectionWindow = window({
    title: "Measuring Tape - Ghost object selection",
    width: {
        value: 450,
        min: 450, 
        max: 1000
    },
    height: {
        value: 400, 
        min: 400, 
        max: 1000
    },
    position: "center",
    colours: [Colour["LightBlue"], Colour["LightBlue"]],
    content: [
        // Type list selector
        groupbox({
            direction: LayoutDirection.Horizontal,
            height: 150,
            width: "1w",
            text: "Select a type of tape to configure…", 
            content: [
                listview({
                    width: 200,
                    height: 80,
                    //isStriped: true,
                    canSelect: true,
                    selectedCell: twoway(objSelModel.typeChosen),
                    items: objSelModel.typeList,
                    onClick: (item) => onClickTypeList(item)
                }),
                vertical({
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
                            visibility: "hidden",
                            padding: {bottom: "-6px"},
                            alignment: "centred",
                            text: objSelModel.typeChosenObjLabel
                        }),
                        label({
                            alignment: "centred",
                            text: objSelModel.typeChosenObjLabel2
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
            content: [
                // LEFT vertical - list and search
                vertical({
                    content:[
                        horizontal({
                            content:[
                                textbox({
                                /*  text?: TwoWayBindable<string> | undefined;
                                    maxLength?: Bindable<number>;
                                    onChange?: (text: string) => void;
                                    tooltip?: Bindable<string>;
                                    disabled?: Bindable<boolean>;
                                    visibility?: Bindable<ElementVisibility>;    */ 
                                text: "input"
                                }),
                                button({
                                    width: 65,
                                    height: 14,
                                    text: "Clear"
                                })
                                
                            ]
                        }),
                        listview({
                        /**
                        columns?: Partial<ListViewColumn>[] | ListViewColumnParams[] | string[] | undefined;
                        items: Bindable<ListViewItem[] | string[]>;
                        scrollbars?: ScrollbarType;
                        canSelect?: boolean;
                        selectedCell?: TwoWayBindable<RowColumn | null>;
                        isStriped?: boolean;
                        onHighlight?: (item: number, column: number) => void;
                        onClick?: (item: number, column: number) => void;
                        tooltip?: Bindable<string>;
                        disabled?: Bindable<boolean>;
                        visibility?: Bindable<ElementVisibility>; */   
                        scrollbars: "vertical",
                        canSelect: true,
                        items: objSelModel.objList,
                        onHighlight: (item) => onHighlightObjectLust(item),
                        onClick: (item) => onClickObjectList(item)
                        })
                    ]
                }),
                // RIGHT vertical - preview and drop-tool
                vertical({
                    width: 160,
                    content: [

                        button({
                            padding: {left: "1w"},
                            height: 22,
                            width: 22,
                            //width: "1w",
                            text: "[D]",
                            //isPressed: ,
                            //onClick: () => ,
                        }),

                        vertical({
                            padding: {top: "40%", bottom:"60%"},
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