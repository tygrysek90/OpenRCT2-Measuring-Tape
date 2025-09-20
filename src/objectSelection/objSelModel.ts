import {  store } from "openrct2-flexui"




export const objSelModel = {

    typeList: store<string[]>( ["error:", "config", "types", "not", "loaded"] ),
    typeChosen: store<RowColumn>({row: 0, column: 0}),
    typeChosenLabel: store<string>("top label"),
    typeChosenObjLabel: store<string>("1st line below image"),
    typeChosenObjLabel2: store<string>("2st line below image"),


    objGroupLabel: store<string>("Error: not initialized"),
    objList: store<string[]>( ["error:", "no", "items", "loaded", ":("]),
    objSelectedName: store<string>("")


}