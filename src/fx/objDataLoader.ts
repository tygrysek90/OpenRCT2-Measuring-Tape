import { debug } from "../logger"


/**
 * Stores loaded data per given ObjectType
 */
export class DataLoader {

    /**
     * Alike LoadedObject.index: number - The index of the loaded object for the object type.
     */
    ids: number[] = []
    /**
     * Alike LoadedImageObject.baseImageId: number
     */
    images: number[] = []
    /**
     * Alike LoadedObject.name: string - The name in the user's current language.
     */
    names: string[] = []
    /**
     * Alike LoadedObject.identifier: string - The unique identifier of the object, e.g. "rct2.burgb". For legacy DAT objects, the identifier will be in a format similar to "09F55405|DirtGras|B9B19A7F"
     */
    identifiers: string [] = []
    /**
     * Name in human readable form combined with identifier in gray
     */
    namesWithIdentifiers: string[] = []

    /**
     * unfiltered data below
     */
    _ids: number[] = []
    _images:number[] = []
    _names: string[] = []
    _identifiers: string [] = []
    _namesWithIdentifiers: string[] = []

    constructor(objectType: ObjectType) {
    /**
     * Loads data from the game
     * @param objectType openrct2.d.ts ObjectType
     */
        let loadedObjects:LoadedObject[] = objectManager.getAllObjects(objectType)


        loadedObjects.forEach(object => {
            this._ids.push(object.index)
            this._images.push(context.getObject(objectType, object.index).baseImageId)
            this._names.push(object.name)
            this._identifiers.push(object.identifier)
            this._namesWithIdentifiers.push(`${object.name}  {GREY}(${object.identifier})`)
        })
        this._populateArrays()
        debug("dataLoader: Loaded "+objectType.valueOf())
        for (let cunt = 0; cunt < this.ids.length; cunt++) {
            debug(`id ${this.ids[cunt].toString()} : image ${this.images[cunt].toString()} : ${this.names[cunt]}`)
        }
    }

    _populateArrays() {
        this.ids = this._ids.slice()
        this.images = this._images.slice()
        this.names = this._names.slice()
        this.identifiers = this._identifiers.slice()
        this.namesWithIdentifiers = this._namesWithIdentifiers.slice()
    }

    _emptyArrays() {
        this.ids = []
        this.images = []
        this.names = []
        this.identifiers = []
        this.namesWithIdentifiers = []
    }

    filter(searchedString: string) {
        this._emptyArrays()
        for (let i=0; i<this._ids.length; i++) {
            if (this._namesWithIdentifiers[i].search(searchedString) > -1) {
                this.ids.push(this._ids[i])
                this.images.push(this._images[i])
                this.names.push(this._names[i])
                this.identifiers.push(this._identifiers[i])
                this.namesWithIdentifiers.push(this._namesWithIdentifiers[i])
            }
        }
    }
		
}