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
