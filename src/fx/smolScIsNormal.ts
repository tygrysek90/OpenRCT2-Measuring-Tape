import { SMALL_SCENERY_FLAGS } from "../common/smallSceneryFlags";
import { hasOneFlagOf } from "./flagCheck";

export function smolScIsNormal(objectId: number): boolean {
    let object = objectManager.getObject("small_scenery", objectId)

    if (hasOneFlagOf(object.flags, 
        [
            SMALL_SCENERY_FLAGS.SMALL_SCENERY_FLAG_FULL_TILE, 
            SMALL_SCENERY_FLAGS.SMALL_SCENERY_FLAG_DIAGONAL, 
        ])) {
            return true
        }
    else {
        return false
    }
}