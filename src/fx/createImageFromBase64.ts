/*****************************************************************************
 * Copyright (c) 2025 Ríša Szlachta (tygrysek90)
 * 
 * https://github.com/tygrysek90/OpenRCT2-Measuring-Tape
 * 
 * OpenRCT2-Measuring-Tape
 * is licensed under the GNU General Public License version 3.
 *****************************************************************************/

/*****************************************************************************
 * This source file uses excerpts from The OpenRCT2 plug-in "WorldPainter"
 * licensed under the GNU General Public License version 3.
 *
 * "WorldPainter" Copyright (c) 2024 Sadret 
 * 
 * retrieved from 
 * https://github.com/Sadret/openrct2-worldpainter/blob/v1.0.0/src/types.ts
 * https://github.com/Sadret/openrct2-worldpainter/blob/v1.0.0/src/Images.ts
 * 
 * Thanks to Sadret for this nice function :)
 *****************************************************************************/


export type ImageData = {
    image: number;
    width: number;
    height: number;
};


export function createImageFromBase64(base64: string): ImageData {
    const range = ui.imageManager.allocate(1);
    if (!range) throw new Error("[WP] Cannot allocate image from image manager.");
    const id = range.start;
    ui.imageManager.setPixelData(id, {
        type: "png",
        palette: "closest",
        data: base64,
    });
    const info = ui.imageManager.getImageInfo(id);
    if (!info) throw new Error("[WP] Cannot get image info from image manager.");
    return {
        image: info.id,
        width: info.width,
        height: info.height,
    };
}