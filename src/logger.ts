//**
// Based on OpenRCT2-ProxyPather by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-ProxyPather
// 
// originaly licensed under MIT License
// see ../license/mit_license_Basssiiie_ProxyPather}` */

// todo: this cannot be hardcoded
const isDevelopment:boolean = true

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