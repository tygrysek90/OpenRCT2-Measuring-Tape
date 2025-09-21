import { findMapCentre, findMapEdgesCentres } from "../actions";

export function onClickBisectEdgesButton() {
    findMapEdgesCentres()
}

export function onClickMapCentre() {
    findMapCentre()
}