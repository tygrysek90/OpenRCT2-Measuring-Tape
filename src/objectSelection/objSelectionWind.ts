import { window, Colour, groupbox, LayoutDirection, button, horizontal, vertical, label, textbox, listview, graphics, Padding } from "openrct2-flexui"
import { objSelModel, SelectionType } from "./objSelModel"
import { selectTop } from "./objSelActions"

const buttonHeight = 26
//const answerToLifeAndEverything = 42

const topButtonWidht = 100
const topButtonPadding: Padding = {right:-5, bottom: -6}

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
        value: 300, 
        min: 300, 
        max: 1000
    },
    position: "center",
    colours: [Colour["LightBlue"], Colour["LightBlue"]],
    content: [
        // Type (tab-alike) buttons
        horizontal({
            content: [
                button({
                    height: buttonHeight,
                    width: topButtonWidht,
                    padding: topButtonPadding,
                    text: "Tape ends",
                    isPressed: objSelModel.topPressed[SelectionType["tape-ends"]],
                    onClick: () => selectTop(SelectionType["tape-ends"]),
                }),
                button({
                    height: buttonHeight,
                    width: topButtonWidht,
                    padding: topButtonPadding,
                    text: "Tape centre",
                    isPressed: objSelModel.topPressed[SelectionType["tape-centre"]],
                    onClick: () => selectTop(SelectionType["tape-centre"]),
                }),
                button({
                    height: buttonHeight,
                    width: topButtonWidht,
                    padding: topButtonPadding,
                    text: "Area ends",
                    isPressed: objSelModel.topPressed[SelectionType["area-ends"]],
                    onClick: () => selectTop(SelectionType["area-ends"]),
                }),
                button({
                    height: buttonHeight,
                    width: topButtonWidht,
                    padding: topButtonPadding,
                    text: "Area centre",
                    isPressed: objSelModel.topPressed[SelectionType["area-centre"]],
                    onClick: () => selectTop(SelectionType["area-centre"]),
                }),
            ]
        }),
        // EVERYTHING BELOW type buttons
        // two verticals
        groupbox({
            //text: "Object selection",
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
                        items: ["item", "item2", "item3"] 
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
                                    onDraw(g) {
                                        g.colour = 14
                                        g.stroke = 63
                                        g.box(0,0,113,113)
                                        g.line(0,0,114,114)
                                    },
                                }),
                                label({
                                    padding: {bottom: "1w"},
                                    alignment: "centred",
                                    text: "object readable name"
                                }),
                            ]
                        }),
                        
                    ]
                })
            ]
        })
    ]
})