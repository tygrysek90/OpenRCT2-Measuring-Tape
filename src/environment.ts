/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/**
 * Build env observation
 * 
 * this depends on @rollup/plugin-replace replacing contents 
 * of the first constant at roll-up time 
 * see rollup.config.js around line 74 for definition
 */

//**
// Based on OpenRCT2-ProxyPather by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-ProxyPather
// 
// originally licensed under MIT License
// see .licenses/mit_license_Basssiiie_ProxyPather}` */

/**
 * Returns the build configuration of the plugin.
 */
const buildConfiguration = "__BUILD_CONFIGURATION__";

/**
 * Build type definition
 */
export const build = {
    /**
     * Returns true if the current build is a production build.
     */
    // @ts-expect-error: boolean expression is affected by build variable replacement.
    isProduction: (buildConfiguration === "production"),


    /**
     * Returns true if the current build is a production build.
     */
    // @ts-expect-error: boolean expression is affected by build variable replacement.
    isDevelopment: (buildConfiguration === "development"),

}



//**
// Based on OpenRCT2-RideVehicleEditor by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-RideVehicleEditor
// 
// originally licensed under MIT License
// see licenses/mit_license_Basssiiie_OpenRCT2-RideVehicleEditor}` */

/**
 * Returns true if the player is in a multiplayer server, or false if it is a singleplayer game.
 */
export function isMultiplayer(): boolean
{
	return (network.mode !== "none");
}