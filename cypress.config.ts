const browserify = require("@cypress/browserify-preprocessor");
const sqlServer = require("cypress-sql-server");
import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprendTransformerToOptions } from "@badeball/cypress-cucumber-preprocessor/browserify";
import "dotenv/config";
import fs from "fs";
import excelToJson from "convert-excel-to-json";
import ExcelJs from "exceljs";

async function readExcel(worksheet: any, searchText: string) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row: any, rowNumber: number) => {
    row.eachCell((cell: any, colNumber: number) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

const dbSettings = {
  userName: process.env.LOGIN,
  password: process.env.PASSWORD,
  server: process.env.SERVERNAME,
  options: {
    database: process.env.DB,
    encrypt: true,
    rowCollectionOnRequestCompletion: true,
  },
};

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  require("cypress-mochawesome-reporter/plugin")(on);
  await addCucumberPreprocessorPlugin(on, config);

  on("task", sqlServer.loadDBPlugin(dbSettings));

  on("task", {
    excelToJsonConverter(filePath) {
      return excelToJson({
        source: fs.readFileSync(filePath),
      });
    },
  });

  on("task", {
    deleteFile(filePath) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(`Error removing file: ${err}`);
          return null;
        }

        console.log(`File ${filePath} has been successfully removed.`);
        return null;
      });
      return null;
    },
  });

  on(
    "file:preprocessor",
    browserify({
      ...preprendTransformerToOptions(config, browserify.defaultOptions),
      typescript: require.resolve("typescript"),
      plugin: [["tsify", { project: "tsconfig.json" }]],
    })
  );

  on("task", {
    async writeExcelTest({ searchText, replaceText, change, filePath }) {
      const workbook = new ExcelJs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet("Sheet1");
      const output = await readExcel(worksheet, searchText);

      const cell = worksheet!.getCell(
        output.row,
        output.column + change.colChange
      );
      cell.value = replaceText;
      return workbook.xlsx
        .writeFile(filePath)
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    },
  });

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
    specPattern: "cypress/integration/examples/",
  },
});
