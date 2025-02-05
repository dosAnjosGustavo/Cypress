const report = require("multiple-cucumber-html-reporter");
import fs from "fs";
import path from "path";

function getFormattedDate(): string {
  const date = new Date();

  // Month names array
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];

  const day = date.getDate();
  const suffix = (day: number): string => {
    if (day > 3 && day < 21) return "th"; // covers 11th, 12th, 13th, etc.
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 24h to 12h format

  const seconds = date.getSeconds().toString().padStart(2, "0");

  const timeZone =
    Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value || "";

  return `${month} ${day}${suffix(
    day
  )} ${date.getFullYear()}, ${hours}:${minutes}:${seconds} ${ampm} ${timeZone}`;
}

function getCycleNumber(): string {
  return `B${new Date().getFullYear()}${
    new Date().getMonth() + 1
  }${new Date().getDate()}.${Math.floor(Math.random() * 10000)}`;
}

// Read execution times from file (adjust the path if needed)
let executionTimes: { startTime?: string; endTime?: string } = {};
const executionTimesPath = path.join(
  process.cwd(),
  "cypress",
  "executionTimes.json"
);
try {
  const timesData = fs.readFileSync(executionTimesPath, "utf-8");
  executionTimes = JSON.parse(timesData);
} catch (err) {
  console.error("Error reading execution times:", err);
}

// Format an ISO string to a more readable format.
function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString();
}

report.generate({
  jsonDir: "./cypress/CucumberReports",
  reportPath: "cypress/CucumberReports/cucumber-htmlreport.html",
  metadata: {
    browser: {
      name: "chrome",
      version: "100",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11 Pro",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "RSA Project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: getCycleNumber() },
      {
        label: "Execution Start Time",
        value: process.env.EXECUTION_START_TIME || getFormattedDate(),
      },
      {
        label: "Execution End Time",
        value: process.env.EXECUTION_END_TIME || getFormattedDate(),
      },
    ],
  },
});
