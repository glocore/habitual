import * as data from "./data";
import { Tracker, CreateTrackerInput } from "./commonTypes";

const getTrackers = () => {
  return data.getTrackers();
};

const getTrackerById = (id: Tracker["id"]) => {
  return data.getTrackerById(id);
};

const createTracker = (tracker: CreateTrackerInput) => {
  return data.createTracker(tracker);
};

const editTracker = () => {};

const deleteTracker = () => {};

export { getTrackers, getTrackerById, createTracker };
