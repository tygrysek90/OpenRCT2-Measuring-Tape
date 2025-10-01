
export interface GhostRemoveArgs {
    /** x position in tiles */
    xTiles: number;
    /** y position in tiles */
    yTiles: number;
    /** OpenRCT2 ObjectType */
    objectType: ObjectType;
    /** alike LoadedObject.index */
    objectId: number;
    /** OpenRCT2 Direction */
    objectDirection: Direction;
}
