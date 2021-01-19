import * as inquirer from "inquirer";
import { Tracker } from "./commonTypes";
import { getTrackers, getTrackerById, createTracker } from "./core";
inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { name: "List habit trackers", value: "list" },
        { name: "Create habit tracker", value: "create" },
      ],
    },
  ])
  .then((answers) => {
    if (answers.action === "list") {
      trackerInquirer();
    }
    if (answers.action === "create") {
      createTrackerInquirer();
    }
  });

const trackerInquirer = () => {
  const trackers = getTrackers();
  const prompt = inquirer.createPromptModule();

  prompt([
    {
      type: "list",
      name: "tracker",
      message: "Select tracker",
      choices: trackers.map((tracker) => {
        return {
          name: tracker.title,
          value: tracker.id,
        };
      }),
    },
  ]).then((answers) => {
    const tracker = getTrackerById(answers.tracker);
    printTrackerBrief(tracker);
  });
};

const createTrackerInquirer = () => {
  const prompt = inquirer.createPromptModule();

  prompt([
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
        { name: "Yes, I'm trying to build this habit.", value: true },
        { name: "No, I'm trying to break this habit.", value: false },
      ],
    },
  ]).then(async (answers) => {
    const { title, description, isDesirable } = answers;
    const tracker = await createTracker({ title, description, isDesirable });
    console.log("New habit tracker created:");
    printTrackerBrief(tracker);
  });
};

const printTrackerBrief = (tracker: Tracker) => {
  console.log(tracker.title);

  if (tracker.description) {
    console.log(tracker.description);
  }

  console.log(
    tracker.isDesirable
      ? "You are trying to build this habit."
      : "You are trying to break this habit."
  );
};
