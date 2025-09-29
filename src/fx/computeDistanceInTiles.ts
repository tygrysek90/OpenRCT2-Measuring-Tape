/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

import { MapSelectionVerified } from "../tool/mapSelection";
import { mapTileSize } from "../common/mapTileSize";

/**
 * Computes distance in tiles between two points
 * √[(x₂ - x₁)² + (y₂ - y₁)²]
 * @param verifiedSelection
 * @returns number of length in map Tiles (beware, not in Coords)
 */
export function computeDistanceInTiles(verifiedSelection: MapSelectionVerified): number {
    return (
        Math.sqrt((verifiedSelection.end.x - verifiedSelection.start.x) ** 2 + (verifiedSelection.end.y - verifiedSelection.start.y) ** 2)
    ) / mapTileSize + 1;
}
