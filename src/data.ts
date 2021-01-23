import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";
import { Tracker, CreateTrackerInput, CreateEntryInput } from "./commonTypes";

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
  const id = nanoid(10);

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

const createEntry = async (
  trackerId: Tracker["id"],
  { notes = "" }: CreateEntryInput
) => {
  const entryId = nanoid(10);
  const date = Date.now().toString();
  const finalEntry = {
    id: entryId,
    date,
    notes,
  };

  await db
    .get("trackers")
    .find({ id: trackerId })
    .get("entries")
    .push(finalEntry)
    .write();

  return finalEntry;
};

export { getTrackerById, createTracker, getTrackers, createEntry };
