interface DataInterface {
  data: any;
}

// Extend Mocha's test context with additional data property
declare namespace Mocha {
  interface Context extends DataInterface {}
}

// Cypress Mochawesome Reporter Plugin
declare module "cypress-mochawesome-reporter/plugin" {
  const plugin: (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
  ) => void;
  export default plugin;
}

// Cypress Mochawesome Reporter Register
declare module "cypress-mochawesome-reporter/register" {
  const register: () => void;
  export default register;
}

// Multiple Cucumber HTML Reporter
declare module "multiple-cucumber-html-reporter" {
  // Metadata interface used by the reporter.
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

  // Custom data structure for report metadata.
  export interface CustomDataItem {
    label: string;
    value: string;
  }

  export interface CustomData {
    title: string;
    data: CustomDataItem[];
  }

  // Options for generating the report.
  export interface ReportOptions {
    jsonDir: string;
    reportPath: string;
    metadata?: Metadata;
    customData?: CustomData;
  }

  // Function to generate the report.
  export function generate(options: ReportOptions): void;

  // Default export for compatibility
  const _default: {
    generate: typeof generate;
  };

  export default _default;
}

// Cypress Custom Commands
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in via API with default values.
     * @example cy.LoginAPI()
     */
    LoginAPI(): Chainable<Element>;

    /**
     * Custom command to log in via API with specified credentials.
     * @example cy.LoginAPI("email@example.com", "pass1234")
     */
    LoginAPI(email: string, password: string): Chainable<Element>;
  }
}

// Cypress SQL Server Plugin
declare module "cypress-sql-server" {
  export function loadDBCommands(): void;

  export function loadDBPlugin(dbConfig: any): {
    "sqlServer:execute": (sql: string) => Promise<any>;
  };
}

// Extend Cypress with SQL Server Commands
interface CypressSqlServerCommands {
  sqlServer: (query: string) => Promise<any>;
}

declare namespace Cypress {
  interface Chainable extends CypressSqlServerCommands {}
}
