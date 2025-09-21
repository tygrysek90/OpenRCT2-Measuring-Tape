import { button, Colour, groupbox, LayoutDirection, window } from "openrct2-flexui";
import { imgbutton } from "../commonUiConsts";
import { bisectMapEdghesPng } from "../imgs/bisectMapEdghes";
import { centreOfMapPng } from "../imgs/centreOfMap";
import { onClickBisectEdgesButton, onClickMapCentre } from "./extraActions";

/**
 * Extra tools window definition
 */
export const extraWindow = window({
    title: "Measuring Tape",
    width: "auto",
    height: "auto",
    position: "center",
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            direction: LayoutDirection.Horizontal,
            text: "Extra tools",
            content:[
                button({
                    width: imgbutton.widht,
                    height: imgbutton.heigh,
                    image: bisectMapEdghesPng.image,
                    tooltip: "Bisect (to half) map edges",
                    onClick: () => onClickBisectEdgesButton()
                }),
                button({
                    width: imgbutton.widht,
                    height: imgbutton.heigh,
                    image: centreOfMapPng.image,
                    tooltip: "Find centre of map",
                    onClick: () => onClickMapCentre()
                })
            ]
        })
    ]
})