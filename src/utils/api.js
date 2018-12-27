import { tableHistory } from "../utils/tempValues";
import {
  beadPlateHistoryTop,
  beadPlateHistoryBottom
} from "../utils/tempValues";

export function getTablesHistory() {
  return Promise.resolve(tableHistory);
}

export function getBeadPlateHistory() {
  return Promise.resolve({ beadPlateHistoryTop, beadPlateHistoryBottom });
}
