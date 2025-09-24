/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

//**
// Based on OpenRCT2-ProxyPather by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-ProxyPather
// 
// originaly licensed under MIT License
// see .licenses/mit_license_Basssiiie_ProxyPather}` */

/**
 * Returns the build configuration of the plugin.
 */
export const buildConfiguration = "__BUILD_CONFIGURATION__";


/**
 * Returns true if the current build is a production build.
 */
// @ts-expect-error: boolean expression is affected by build variable replacement.
export const isProduction = (buildConfiguration === "production");


/**
 * Returns true if the current build is a production build.
 */
// @ts-expect-error: boolean expression is affected by build variable replacement.
export const isDevelopment = (buildConfiguration === "development");


/**
 * Logs a message is debug mode is enabled, or does nothing otherwise.
 * @param message The error message to be logged.
 */
export function debug(message: string): void
{
	if (isDevelopment)
	{
		console.log(message);
	}
}


/**
 * Logs an error message with an optional method name for specifying the origin.
 * @param message The error message to be logged.
 * @param method The method specifying where the error occured.
 */
export function error(message: string, method?:string): void
{
	console.log((method)
		? `Error (${method}): ${message}`
		: `Error: ${message}`);
}