/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

//**
// Based on OpenRCT2-RideVehicleEditor by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor
// 
// originally licensed under MIT License
// see licenses/mit_license_Basssiiie_OpenRCT2-RideVehicleEditor}` */


/**
 * Checks whether the target is null or not.
 */
export function isNull(target: unknown): target is null
{
	return (target === null);
}


/**
 * Checks if the index is a valid index for this array.
 * @param array The array to check.
 * @param index The index to check.
 */
export function isValidIndex(array: unknown[] | null, index: number | null): boolean
{
	return (array != null && index != null && index >= 0 && index < array.length);
}

/**
 * Gets the item at the index if the index is a valid index for this array.
 * @param array The array to check.
 * @param index The index to check.
 */
export function getAtIndex<T>(array: T[] | null, index: number | null): T | null
{
	return (array != null && index != null && index >= 0 && index < array.length) ? array[index] : null;
}

/**
 * Gets index of the first matching item. Returns -1 if no items match the predicate.
 * @param array The array to check.
 * @param predicate The function to match the items against.
 */
export function findIndex<T>(array: T[], predicate: (item: T) => boolean): number | null
{
	for (let idx = 0, end = array.length; idx < end; idx++)
	{
		if (predicate(array[idx]))
		{
			return idx;
		}
	}
	return null;
}

/**
 * Gets the first matching item. Returns null if no items match the predicate.
 * @param array The array to check.
 * @param predicate The function to match the items against.
 */
export function find<T>(array: T[], predicate: (item: T) => boolean): T | null
{
	const idx = findIndex(array, predicate);
	return (isNull(idx)) ? null : array[idx];
}