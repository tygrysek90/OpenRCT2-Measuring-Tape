import { findMapCentre, findMapEdgesCentres } from "../ghosts/ghostActions";
import { onToolUp } from "../mainWin/actions";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
    onToolUp()
}

export function onClickMapCentre() {
    findMapCentre()
    onToolUp()
}