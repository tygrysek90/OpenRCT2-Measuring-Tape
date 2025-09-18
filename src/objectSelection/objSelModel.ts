import { store } from "openrct2-flexui"

export type ObjectSelectionType = "tape-ends" | "tape-centre" | "area-ends" | "area-centre"

export enum SelectionType {
    "tape-ends",
    "tape-centre",
    "area-ends",
    "area-centre"
}


export const objSelModel = {

    topPressed: [store<boolean>(false), store<boolean>(false), store<boolean>(false), store<boolean>(false),]

}