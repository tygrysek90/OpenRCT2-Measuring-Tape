//**
// Based on OpenRCT2-ProxyPather by Basssiiie, 
// https://github.com/Basssiiie/OpenRCT2-ProxyPather
// 
// originaly licensed under MIT License
// see licenses/mit_license_Basssiiie_ProxyPather}` */

import { debug } from "../logger/logger";
import { MapSelection, toMapRange } from "./mapSelection";
import { mapTileSize } from "../common/mapTileSize";

export type ToolMode = "tape" | "area" | "off"

/**
 * Tool that can select an area.
 */
export class MapSelectionTool
{

	mode: ToolMode = "off";

	/**
	 * Event that triggers when selection changes
	 */
	onMove?: (selection: MapSelection) => void;

	/**
	 * Event that triggers when mouse up (selection done)
	 */
	onUp?: () => void;

	/**
	 * Event that triggers when an area is selected.
	 */
	onSelect?: (selection: MapSelection) => void;


	/**
	 * Event that triggers when the tool is canceled via the 'escape' key or
	 * when another tool is activated.
	 */
	onCancel?: () => void;


	_isDragging = false;
	_selection: (MapSelection | null) = null;


	/**
	 * Tool that allows selecting an area.
	 * @param name The name of the tool, used as a identifier.
	 * @param cursor The cursor to use for selection.
	 */
	constructor(readonly name: string, readonly cursor: CursorType)
	{
	}

	_constrainNoodle: (number | null) = null;

	/**
	 * Sets this as the currently activated tool.
	 */
	activate(): void
	{
		const tool = ui.tool;

		if (tool && tool.id === this.name)
		{
			debug(`Tool: already active.`);
			return;
		}

		toggleGridOverlay(true);

		ui.activateTool({
			id: this.name,
			cursor: this.cursor,
			filter: ["terrain", "water"],
			onDown: a => down(this, a),
			onUp: a => up(this, a),
			onMove: a => move(this, a),
			onFinish: () => finish(this.onCancel)
		});

		debug(`Tool: activated.`);
	}


	/**
	 * Disables the tool if it is still active.
	 */
	deactivate(): void
	{
		const tool = ui.tool;
		if (tool && tool.id === this.name)
		{
			tool.cancel();
			debug(`Tool: deactivated.`);
		}
		else
		{
			debug(`Tool: already deactivated.`);
		}
	}

	/**
	 * Constraints tool from freeform square/rectangle select to mode where one side is "size" 
	 * @param size currently not supported, any number will result 1 tile wide selection
	 */
	setConstraint(size: number): void {
		this._constrainNoodle = size
	}

	/**
	 * Frees constraint previously set by setConstraint club function
	 */
	remConstraint(): void {
		this._constrainNoodle = null
	}
}


/**
 * Callback for when the tool is finished.
 */
function finish(callback?: () => void): void
{
	toggleGridOverlay(false);
	if (callback)
	{
		callback();
	}
}


/**
 * Starts selecting when the user starts pressing down.
 */
function down(tool: MapSelectionTool, args: ToolEventArgs): void
{
	const location = args.mapCoords;
	if (!location)
	{
		debug(`Tool: down at unknown location.`);
		return;
	}

	debug(`Tool: down at ${JSON.stringify(location)}.`);

	if (tool) {
		tool._isDragging = true;

		tool._selection = { start: location };
	}

	
}



/**
 * Finishes selecting when the user releases the mouse button.
 */
function up(tool: MapSelectionTool, args: ToolEventArgs): void
{
	const location = args.mapCoords;
	if (!location)
	{
		debug(`Tool: up at unknown location.`);
		return;
	}

	debug(`Tool: up at ${JSON.stringify(location)}.`);

	if (tool._selection && tool.onSelect)
	{
		tool.onSelect(tool._selection);
	}
	tool._selection = null;
	ui.tileSelection.range = null;

	if (tool.onUp) {
		tool.onUp()
	}
}


/**
 * Updates the grid every time the selection is moved.
 */
function move(tool: MapSelectionTool, args: ToolEventArgs): void
{
	if (!tool._isDragging || !tool._selection)
	{
		return;
	}

	const location = args.mapCoords;
	if (!location)
	{
		return;
	}

	tool._selection.end = location;

	if (tool._constrainNoodle) {
		if (Math.abs(tool._selection.end.x - tool._selection.start.x) > Math.abs(tool._selection.end.y - tool._selection.start.y)) {
			tool._selection.end.y = tool._selection.start.y + (tool._constrainNoodle - 1) * mapTileSize
		}
		else {
			tool._selection.end.x = tool._selection.start.x + (tool._constrainNoodle - 1) * mapTileSize
		}
	}

	const range = toMapRange(tool._selection);

	if (range)
	{
		ui.tileSelection.range = range;
	}

	if (tool._selection && tool.onMove) {
		tool.onMove(tool._selection)
	}
}


// The flag for gridlines on the map.
const viewportFlagGridlines = (1 << 7);


/**
 * Toogles the map grid overlay on or off.
 * @param value True for on, false for off.
 */
function toggleGridOverlay(value: boolean): void
{
	if (value)
	{
		ui.mainViewport.visibilityFlags |= viewportFlagGridlines;
	}
	else
	{
		ui.mainViewport.visibilityFlags &= ~(viewportFlagGridlines);
	}
}