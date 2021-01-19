import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { v1 as uuidV1 } from "uuid";
import { Tracker, CreateTrackerInput } from "./commonTypes";

const adapter = new FileSync<{ trackers: Tracker[] }>("db.json");
const db = lowdb(adapter);

db.defaults({ trackers: [] }).write();

const getTrackerById = (id: Tracker["id"]) => {
  const result = db.get("trackers").find({ id }).value();

  return result;
};

const createTracker = async ({
  title,
  description = "",
  isDesirable,
}: CreateTrackerInput) => {
  const id = uuidV1();

  const tracker = {
    id,
    title,
    description,
    isDesirable,
    entries: [],
  };

  await db.get("trackers").push(tracker).write();

  return tracker;
};

const getTrackers = () => {
  const result = db.get("trackers").value();

  return result;
};

export { getTrackerById, createTracker, getTrackers };
