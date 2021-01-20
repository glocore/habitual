import * as data from "./data";
import { Tracker, CreateTrackerInput, CreateEntryInput } from "./commonTypes";

const getTrackers = () => {
  return data.getTrackers();
};

const getTrackerById = (id: Tracker["id"]) => {
  return data.getTrackerById(id);
};

const createTracker = (tracker: CreateTrackerInput) => {
  return data.createTracker(tracker);
};

const createEntry = (trackerId: Tracker["id"], entry: CreateEntryInput) => {
  return data.createEntry(trackerId, entry);
};

const editTracker = () => {};

const deleteTracker = () => {};

export { getTrackers, getTrackerById, createTracker, createEntry };
