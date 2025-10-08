/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/** Interface for passing arguments to ghostPlaceAction */
export interface GhostRealmArgs {
    /** x position in tiles */
    xTile: number;
    /** y position in tiles */
    yTile: number;
    /** base height as in element.BaseHeight */
    zBase?: number;
    /** OpenRCT2 Direction type */
    direction: Direction;
    /** OpenRC2 ObjectType */
    type: ObjectType;
    /** object number (for the given object type) */
    object: number;
}
