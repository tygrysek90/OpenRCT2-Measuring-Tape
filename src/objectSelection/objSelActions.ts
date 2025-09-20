import { objSelModel } from "./objSelModel"
import { DataLoader } from "./objDataLoader";
import { ghostConfig, GhostConfigRow } from "../config/ghosts";

var loader: DataLoader


function updateObjGroup(ghostType: GhostConfigRow) {
    loader = new DataLoader(ghostConfig[ghostType].objectType)
    objSelModel.typeChosenLabel.set(ghostConfig[ghostType].humanReadable)
    objSelModel.typeChosenObjLabel2.set(ghostConfig[ghostType].objectIdentifer)
    objSelModel.objList.set(loader.namesWithIdentifiers)
    objSelModel.objGroupLabel.set(`Select an new object for ghost of ${ghostConfig[ghostType].humanReadable}`)
}

export function onClickTypeList(item: number) {
    // the "items" in type list are in order of GhostType enum
    updateObjGroup(item) 
}

export function selectTop(which: GhostConfigRow) {
    let typeList: Array<string> = []
    ghostConfig.forEach(record => {
        typeList.push(record.humanReadable)
    })
    objSelModel.typeList.set(typeList)
    updateObjGroup(which)
    
    
}

export function GetCurrentlySelectedObjectImage(): number {
    return 1
}

var previewObjectimage: number = -1

export function onHighlightObjectLust(num: number) {
    previewObjectimage = loader.images[num]
    objSelModel.objSelectedName.set(loader.names[num])
}

export function onClickObjectList(item: number){
    ghostConfig[objSelModel.typeChosen.get().row].image = loader.images[item]
}

export function getShonObectImafe(): number {
    return previewObjectimage
}

export function onPreviewDraw(g: GraphicsContext) {
    g.image(previewObjectimage, 55, 80)
}

export function onCurrentDraw(g: GraphicsContext) {
    g.image(ghostConfig[objSelModel.typeChosen.get().row].image, 55, 80)
  
}

