export type Entry = {
  id: string;
  date: Date;
  notes: string;
};

export type Tracker = {
  id: string;
  title: string;
  description: string;
  isDesirable: boolean;
  entries: Entry[];
};

export type CreateTrackerInput = Pick<Tracker, "title" | "isDesirable"> &
  Partial<Pick<Tracker, "description">>;
