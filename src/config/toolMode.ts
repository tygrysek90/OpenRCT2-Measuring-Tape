import { ToolMode } from "../tool/mapSelectionTool";

export const savedToolMode = {
    savedToolMode: <ToolMode>("area"),

    get() {
        return this.savedToolMode
    },
    
    set(v : ToolMode) {
        this.savedToolMode = v;
    }
    
}