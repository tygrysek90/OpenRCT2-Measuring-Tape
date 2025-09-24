import { objSelModel } from "./objSelModel"
import { DataLoader } from "../fx/objDataLoader";
import { ghostConfig, GhostConfigRow, ghostStoreConfig, objectConfigSetDefault } from "../config/ghosts";
import { breakObjectName } from "../fx/breakObjectName";

var loader: DataLoader

function updateObjGroup(ghostType: GhostConfigRow) {
    loader = new DataLoader(ghostConfig[ghostType].objectType)
    objSelModel.typeChosenLabel.set(`${ghostConfig[ghostType].humanReadable}`)
    objSelModel.typeChosenObjLabel.set(loader._names[loader._identifiers.indexOf(ghostConfig[ghostType].objectIdentifer)])
    objSelModel.typeChosenObjLabel2.set(breakObjectName(`{BABYBLUE}${ghostConfig[ghostType].objectIdentifer}`))
    objSelModel.objList.set(loader.namesWithIdentifiers)
    objSelModel.objGroupLabel.set(`Select an new object for ghost of ${ghostConfig[ghostType].humanReadable}`)
}

export function onClickTypeList(item: number) {
    // the "items" in type list are in order of GhostConfigRow enum
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
    ghostConfig[objSelModel.typeChosen.get().row].objectIdentifer = loader.identifiers[item]
    ghostConfig[objSelModel.typeChosen.get().row].objectId = loader.ids[item]
    ghostStoreConfig()
    objSelModel.typeChosenObjLabel.set(loader._names[loader._identifiers.indexOf(ghostConfig[objSelModel.typeChosen.get().row].objectIdentifer)])
    objSelModel.typeChosenObjLabel2.set(breakObjectName(`{BABYBLUE}${ghostConfig[objSelModel.typeChosen.get().row].objectIdentifer}`))
}

export function getShownObjectImage(): number {
    return previewObjectimage
}

export function onPreviewDraw(g: GraphicsContext) {
    g.image(previewObjectimage, 55, 80)
}

export function onCurrentDraw(g: GraphicsContext) {
    g.image(ghostConfig[objSelModel.typeChosen.get().row].image, 55, 80)
  
}

export function onSearchBoxChange(text: string) {
    loader.filter(text)
    console.log(text, loader.namesWithIdentifiers)
    objSelModel.objList.set(loader.namesWithIdentifiers)
}

export function onClickClearSearch() {
    objSelModel.objSearchFilter.set("")
    onSearchBoxChange("")
}

export function onClickDefault() {
    let selectedRow = objSelModel.typeChosen.get().row
    objectConfigSetDefault()
    console.log("defaulting seletion: "+selectedRow.toString())
    selectTop(selectedRow)
}