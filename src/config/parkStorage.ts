import { debug } from "../logger/logger"

const persistenceVersion: string = "P"
const persistenceVersionValue: number = 1

const sequentialKey: string = "S"

export var parkStorage = context.getParkStorage()

export function writeParkStorage(sequential: Array<string>) {
    parkStorage.set(persistenceVersion, persistenceVersionValue)
    parkStorage.set(sequentialKey, sequential)
}

export function readParkStorage(): Array<string> | undefined {
    
    if (parkStorage.get(persistenceVersion) == persistenceVersionValue) {
        debug("reading park storage")
        return parkStorage.get(sequentialKey)
    }
    else {
        return undefined
    }
}