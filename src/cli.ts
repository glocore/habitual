import * as inquirer from "inquirer";
import { Tracker } from "./commonTypes";
import { getTrackers, getTrackerById, createTracker } from "./core";
import { createEntry } from "./data";

const init = async () => {
  while (true) {
    console.clear();
    await rootEnquirer();
  }
};

const rootEnquirer = async () => {
  const trackers = getTrackers();

  let choices = [
    { name: "Create habit tracker", value: "create" },
    new inquirer.Separator(),
  ];

  if (!trackers.length) {
    choices.push(new inquirer.Separator("No active habit trackers."));
  } else {
    choices.push(new inquirer.Separator("Active habit trackers:"));
    choices = choices.concat(
      trackers.map((tracker) => {
        return {
          name: tracker.title,
          value: tracker.id,
        };
      })
    );
  }

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Habitual CLI",
      choices,
    },
  ]);

  if (answers.action === "create") {
    await createTrackerInquirer();
  } else {
    await trackerSummaryEnquirer(answers.action);
  }
};

const createTrackerInquirer = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Title",
    },
    {
      type: "input",
      name: "description",
      message: "Description (optional)",
    },
    {
      type: "list",
      name: "isDesirable",
      message: "Is this habit good for you?",
      choices: [
        {
          name: "Yes, I'm trying to build this habit.",
          value: true,
          short: "Yes",
        },
        {
          name: "No, I'm trying to break this habit.",
          value: false,
          short: "No",
        },
      ],
    },
  ]);

  const { title, description, isDesirable } = answers;
  const tracker = await createTracker({ title, description, isDesirable });
  console.log("\nNew habit tracker created:");
  printTrackerBrief(tracker);

  await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Actions",
      choices: [{ name: "Go to main menu", value: "back" }],
    },
  ]);
};

const trackerSummaryEnquirer = async (trackerId: Tracker["id"]) => {
  const tracker = getTrackerById(trackerId);
  console.clear();
  printTrackerBrief(tracker);

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Actions",
      choices: [
        { name: "Go back", value: "back" },
        { name: "Log an entry", value: "createEntry" },
        { name: "Edit this tracker", value: "edit" },
        { name: "Delete this tracker", value: "delete" },
      ],
    },
  ]);

  if (answers.action === "createEntry") {
    await createEntryEnquirer(tracker);
  }
};

const createEntryEnquirer = async (tracker: Tracker) => {
  console.clear();
  printTrackerBrief(tracker);

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "notes",
      message: "Notes (optional)",
    },
  ]);

  const entry = await createEntry(tracker.id, { notes: answers.notes });
  const { notes } = entry;

  console.log("\nNew entry logged");
  console.log(notes);

  await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Actions",
      choices: [{ name: "Go to main menu", value: "back" }],
    },
  ]);
};

const printTrackerBrief = (tracker: Tracker) => {
  console.log(tracker.title);

  if (tracker.description) {
    console.log(tracker.description);
  }

  console.log(
    tracker.isDesirable
      ? "You are building this habit."
      : "You are breaking this habit."
  );

  console.log("\n");
};

init();
