declare module "cypress-mochawesome-reporter/plugin" {
  const plugin: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
  ) => void;
  export default plugin;
}

declare module "cypress-mochawesome-reporter/register" {
  const register: () => void;
  export default register;
}
