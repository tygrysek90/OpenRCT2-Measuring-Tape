/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Configuration UI functions
 */

import { objSelModel } from "./objSelModel"
import { DataLoader } from "../fx/objDataLoader";
import { ghostConfig, GhostConfigRow, ghostStoreConfig, ghostUpdateConfigFromSimple, objectConfigSetDefault, simpleToProConfig } from "../config/ghosts";
import { breakObjectName } from "../fx/breakObjectName";

var loader: DataLoader

/**
 * Updates upper "type" part of object selection,
 * cleans up lower "object" part
 * @param ghostType GhostConfigRow order is observed
 */
function updateObjGroup(ghostType: GhostConfigRow) {
    loader = new DataLoader(ghostConfig[ghostType].objectType)
    
    if (objSelModel.moreOptionsCheck.get() == true) {
        objSelModel.typeChosenLabel.set(`${ghostConfig[ghostType].humanReadable}`)
        objSelModel.typeChosenObjLabel.set(loader._names[loader._identifiers.indexOf(ghostConfig[ghostType].objectIdentifer)])
        objSelModel.typeChosenObjLabel2.set(breakObjectName(`{BABYBLUE}${ghostConfig[ghostType].objectIdentifer}`))
        onSearchParamChange()
        objSelModel.objGroupLabel.set(`Pick an new object for ghost of ${ghostConfig[ghostType].humanReadable}`)
    } else {
        objSelModel.typeChosenLabel.set(`${ghostConfig[ghostType].humanReadableSimple}`)
        objSelModel.typeChosenObjLabel.set(loader._names[loader._identifiers.indexOf(ghostConfig[ghostType].objectIdentifer)])
        objSelModel.typeChosenObjLabel2.set(breakObjectName(`{BABYBLUE}${ghostConfig[ghostType].objectIdentifer}`))
        onSearchParamChange()
        objSelModel.objGroupLabel.set(`Pick an new object for ghost of ${ghostConfig[ghostType].humanReadableSimple}`)
    }
           
    objSelModel.objSearchFilter.set("")
    purgePreview()
    if (ghostConfig[ghostType].objectType == "small_scenery") {
        objSelModel.objCheckFilter.disabled.set(false)
    }
    else {
        objSelModel.objCheckFilter.disabled.set(true)
    }
}

export function onClickTypeList(item: number) {
    // the "items" in type list are in order of GhostConfigRow enum
    // only in case there is "more settings" option on
    if (objSelModel.moreOptionsCheck.get() == true) {
        updateObjGroup(item) 
    }
    else {
        updateObjGroup(simpleToProConfig[item])
    }
}


export function selectTop(which?: GhostConfigRow) {
    if (which == undefined) {
        which = 0 // when calling from more options checkbox, jump to top of the list
        objSelModel.typeChosen.set(<RowColumn>({row: 0, column: 0}))
    }
    let typeList: Array<string> = []
    ghostConfig.forEach(record => {
        if (objSelModel.moreOptionsCheck.get() == true) {
            typeList.push(record.humanReadable)
        }
        else {
            if (record.humanReadableSimple != undefined) {
                typeList.push(record.humanReadableSimple)
            }
        }
    })
    objSelModel.typeShownList.set(typeList)
    updateObjGroup(which)

}

/** Image number of currently previewed object */
var previewObjectimage: number | undefined = undefined

export function onHighlightObjectList(num: number) {
    previewObjectimage = loader.images[num]
    objSelModel.objSelectedName.set(loader.names[num])
}

export function onClickObjectList(item: number){
    let cnfRow: number
    if (objSelModel.moreOptionsCheck.get() == true) {
        cnfRow = objSelModel.typeChosen.get().row
    }
    else {
        cnfRow = simpleToProConfig[objSelModel.typeChosen.get().row]
    }
    ghostConfig[cnfRow].image = loader.images[item]
    ghostConfig[cnfRow].objectIdentifer = loader.identifiers[item]
    ghostConfig[cnfRow].objectId = loader.ids[item]
    objSelModel.typeChosenObjLabel.set(loader._names[loader._identifiers.indexOf(ghostConfig[cnfRow].objectIdentifer)])
    objSelModel.typeChosenObjLabel2.set(breakObjectName(`{BABYBLUE}${ghostConfig[cnfRow].objectIdentifer}`))
    if (objSelModel.moreOptionsCheck.get() == true) {
        ghostStoreConfig()
    }
    else {
        ghostUpdateConfigFromSimple()
        ghostStoreConfig()
    }
}

export function onPreviewDraw(g: GraphicsContext) {
    if (previewObjectimage != undefined) {
        g.image(previewObjectimage, 55, 80)
    }
}

export function onCurrentDraw(g: GraphicsContext) {
    let gcr: number
    if (objSelModel.moreOptionsCheck.get() == true) {
        gcr = objSelModel.typeChosen.get().row
    }
    else {
        gcr = 0
    }
    g.image(ghostConfig[gcr].image, 55, 80)
  
}

export function onSearchParamChange() {
    let searchIn = objSelModel.objSearchFilter.get()
    let isFilter = objSelModel.objCheckFilter.value.get()
    loader.filter(searchIn,isFilter)
    objSelModel.objList.set(loader.namesWithIdentifiers)
}

export function onClickClearSearch() {
    objSelModel.objSearchFilter.set("")
    onSearchParamChange()
}

export function onClickDefault() {
    let selectedRow = objSelModel.typeChosen.get().row
    objectConfigSetDefault()
    selectTop(selectedRow)
}

export function purgePreview() {
    previewObjectimage = undefined
    objSelModel.objSelectedName.set("")
}