//**
// Based on OpenRCT2-ProxyPather by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-ProxyPather
// 
// originaly licensed under MIT License
// see licenses/mit_license_Basssiiie_ProxyPather}` */

import { error } from "./logger";

const mapTileSize = 32

/**
 * Class to specify an area on the map.
 */
export interface MapSelection
{
	start: CoordsXY;
	end?: CoordsXY;
}

/**
 * Class to specify an area on the map,
 * with both ends defined (contrary to MapSelection)
 */
export interface MapSelectionVerified
{
	start: CoordsXY;
	end: CoordsXY;
}

/**
 * Check if selection exist and is greater than one single tile
 * @param mapSelection 
 * @returns type with both ends of CoordsXY defined for sure
  */
export function mapSelectionToVerified(mapSelection: MapSelection): MapSelectionVerified | undefined {
	if (mapSelection.end != undefined) {
		if (Math.abs(mapSelection.start.x - mapSelection.end.x) >= mapTileSize || Math.abs(mapSelection.start.y - mapSelection.end.y) >= mapTileSize) {
			return {
				start: {
					x: mapSelection.start.x,
					y: mapSelection.start.y
				},
				end: {
					x: mapSelection.end.x,
					y: mapSelection.end.y
				}
			}
		}
		else {
			return undefined
		}
	}
	else {
		return undefined
	}
}

/**
 * Converts the selection to a OpenRCT2 compatible MapRange object.
 */
export function toMapRange(selection: MapSelection): MapRange | null
{
	if (!selection.start || !selection.end)
	{
		error("Selection is incomplete.");
		return null;
	}

	return {
		leftTop: {
			x: Math.min(selection.start.x, selection.end.x),
			y: Math.min(selection.start.y, selection.end.y)
		},
		rightBottom: {
			x: Math.max(selection.start.x, selection.end.x),
			y: Math.max(selection.start.y, selection.end.y)
		}
	};
}


