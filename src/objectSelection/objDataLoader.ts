import { debug } from "../logger"


/**
 * Stores loaded data per given ObjectType
 */
export class DataLoader {

    /**
     * Alike LoadedObject.index: number - The index of the loaded object for the object type.
     */
    ids: number[]
    /**
     * Alike LoadedImageObject.baseImageId: number
     */
    images: number[]
    /**
     * Alike LoadedObject.name: string - The name in the user's current language.
     */
    names: string[]
    /**
     * Alike LoadedObject.identifier: string - The unique identifier of the object, e.g. "rct2.burgb". For legacy DAT objects, the identifier will be in a format similar to "09F55405|DirtGras|B9B19A7F"
     */
    identifiers: string []
    /**
     * Name in human readable form combined with identifier in gray
     */
    namesWithIdentifiers: string[]

    constructor(objectType: ObjectType) {
    /**
     * Loads data from the game
     * @param objectType openrct2.d.ts ObjectType
     */
        let loadedObjects:LoadedObject[] = objectManager.getAllObjects(objectType)

        this.ids = []
        this.images = []
        this.names = []
        this.identifiers = []
        this.namesWithIdentifiers = []
        loadedObjects.forEach(object => {
            this.ids.push(object.index)
            this.images.push(context.getObject(objectType, object.index).baseImageId)
            this.names.push(object.name)
            this.identifiers.push(object.identifier)
            this.namesWithIdentifiers.push(`${object.name}  {GREY}(${object.identifier})`)
        })
        debug("dataLoader: Loaded "+objectType.valueOf())
        for (let cunt = 0; cunt < this.ids.length; cunt++) {
            debug(`id ${this.ids[cunt].toString()} : image ${this.images[cunt].toString()} : ${this.names[cunt]}`)
        }
    }
		
}