import { ToolMode } from "../tool/mapSelectionTool";

export const startToolMode = {
    savedToolMode: <ToolMode>("tape"),

    get() {
        return this.savedToolMode
    },
    
    set(v : ToolMode) {
        this.savedToolMode = v;
    }
    
}