/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Returns Direction on the other side of the tile,
 * useful for walls
 * @param direction openrct2.d.ts type direction
 * @returns 
 */
export function oppositeDirection(direction: Direction): Direction {
    switch (direction) {
        case 0:
            return 2
        case 1:
            return 3
        case 2:
            return 0
        case 3:
            return 1
    }
}