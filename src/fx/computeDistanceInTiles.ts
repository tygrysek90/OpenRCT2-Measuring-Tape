import { MapSelectionVerified } from "../tool/mapSelection";
import { mapTileSize } from "../tool/mapSelectionTool";

/**
 * Computes distance in tiles between two points
 * √[(x₂ - x₁)² + (y₂ - y₁)²]
 * @param verifiedSelection
 * @returns number of lenght in map Tiles (beware, not in Coords)
 */
export function computeDistanceInTiles(verifiedSelection: MapSelectionVerified): number {
    return (
        Math.sqrt((verifiedSelection.end.x - verifiedSelection.start.x) ** 2 + (verifiedSelection.end.y - verifiedSelection.start.y) ** 2)
    ) / mapTileSize + 1;
}
