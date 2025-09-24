import { findMapCentre, findMapEdgesCentres } from "../ghosts/ghostActions";
import { onToolUp } from "../mainWindow/actions";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
    onToolUp()
}

export function onClickMapCentre() {
    findMapCentre()
    onToolUp()
}