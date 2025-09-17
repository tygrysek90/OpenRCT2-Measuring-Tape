/**
 * Returns Direction on the other side of the tile,
 * usefull for walls
 * @param direction openrct2.d.ts type direction
 * @returns 
 */
export function opositeDirection(direction: Direction): Direction {
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