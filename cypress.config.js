const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "xn3q5j",
  reporter: "cypress-mochawesome-reporter",
  video: true,
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      // on("before:run", async (details) => {
      //   console.log("override before:run");
      //   await beforeRunHook(details);
      // });
      // on("after:run", async () => {
      //   console.log("override after:run");
      //   await afterRunHook();
      // });
    },
    specPattern: "cypress/integration/**/*.{js,ts}",
  },
  // component: {
  //   specPattern: "cypress/component/**/*.{js,ts}",
  // },
});
