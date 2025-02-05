interface dataInterface {
  data: any;
}

declare namespace Mocha {
  interface Context extends dataInterface {}
}

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

declare module "multiple-cucumber-html-reporter" {
  // Define the metadata interface used by the reporter.
  export interface Metadata {
    browser?: {
      name: string;
      version: string;
    };
    device?: string;
    platform?: {
      name: string;
      version: string;
    };
  }

  // Define a single custom data item.
  export interface CustomDataItem {
    label: string;
    value: string;
  }

  // Define the custom data structure.
  export interface CustomData {
    title: string;
    data: CustomDataItem[];
  }

  // Define the options that can be passed to the generate function.
  export interface ReportOptions {
    jsonDir: string;
    reportPath: string;
    metadata?: Metadata;
    customData?: CustomData;
    // You can extend these options with additional properties if needed.
  }

  // The generate function creates the report.
  export function generate(options: ReportOptions): void;

  // For compatibility with the default export usage.
  const _default: {
    generate: typeof generate;
  };

  export default _default;
}
