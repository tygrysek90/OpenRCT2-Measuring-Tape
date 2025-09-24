/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Check tile for elements with ghost flag ".isGhost"
 * @param tile openrct2.d.ts Tile, a one in-game tile
 * @returns true if there are elements with ghost flag on given tile
 */
export function noGhostsOnTile(tile: Tile): boolean {
    // TODO přepsat za použití "for" nebo "do" cyklu s vyskočením přes return (nebo break???)
    let seenGhost = false;
    tile.elements.forEach(element => {
        if (element.isGhost) {
            seenGhost = true;
        }
        else {
            seenGhost = false;
        }
    });
    return !seenGhost;
}
