// import fs from "fs";
// import path from "path";

// const executionTimesPath = path.join(
//   __dirname,
//   "../../cypress/executionTimes.json"
// );

// console.log("executionTimesPath:", executionTimesPath);

// export default (
//   on: Cypress.PluginEvents,
//   config: Cypress.PluginConfigOptions
// ) => {
//   // Capture the start time when the test run begins.
//   on("before:run", () => {
//     const startTime = new Date().toISOString();
//     fs.writeFileSync(executionTimesPath, JSON.stringify({ startTime }), {
//       encoding: "utf-8",
//     });
//   });

//   // Capture the end time when the test run finishes.
//   on("after:run", () => {
//     let data: { startTime?: string; endTime?: string } = {};
//     try {
//       const fileContents = fs.readFileSync(executionTimesPath, "utf-8");
//       data = JSON.parse(fileContents);
//     } catch (err) {
//       console.error("Error reading execution times:", err);
//     }
//     data.endTime = new Date().toISOString();
//     fs.writeFileSync(executionTimesPath, JSON.stringify(data), {
//       encoding: "utf-8",
//     });
//   });

//   return config;
// };
