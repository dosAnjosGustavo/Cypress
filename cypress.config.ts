const browserify = require("@cypress/browserify-preprocessor");
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  require("cypress-mochawesome-reporter/plugin")(on);
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify({
      ...preprendTransformerToOptions(config, browserify.defaultOptions),
      typescript: require.resolve("typescript"),
      plugin: [["tsify", { project: "tsconfig.json" }]],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: "xn3q5j",
  reporter: "cypress-mochawesome-reporter",
  video: true,
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
    theme: "dark",
  },
  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/integration/examples/BDD/*.feature",
  },
});
