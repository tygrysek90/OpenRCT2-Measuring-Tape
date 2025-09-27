export var isOpen: boolean = false

export function setMainWindowOpenState(state: boolean) {
    isOpen = state
}

export function getMainWindowOpenState(): boolean {
    return isOpen
}