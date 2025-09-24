import { MapSelectionVerified } from "../tool/mapSelection";

/**
 * Returns midpoint (centre) of selection
 * ( (x1 + x2) / 2, (y1 + y2) / 2 )
 * @param verifiedSelection
 * @returns midpoint in precise CordsXY (not in Tiles count)
 */
export function selectionMidPoint(verifiedSelection: MapSelectionVerified): CoordsXY {
    return {
        x: (verifiedSelection.start.x + verifiedSelection.end.x) / 2,
        y: (verifiedSelection.start.y + verifiedSelection.end.y) / 2,
    };
}
