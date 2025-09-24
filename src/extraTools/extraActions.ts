import { findMapCentre, findMapEdgesCentres } from "../mainWindow/actions";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
}

export function onClickMapCentre() {
    findMapCentre()
}