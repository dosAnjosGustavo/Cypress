import cypress from "cypress";

const neatCsv = require("neat-csv");

describe("Test cases", function () {
  const tests = 1;
  Array.from({ length: tests }, (_, i) => {
    it(`Test case ${i + 1}`, async function () {
      cy.LoginAPI().then(() => {
        cy.visit("http://rahulshettyacademy.com/client", {
          onBeforeLoad(win) {
            // @ts-ignore
            win.localStorage.setItem("token", Cypress.env("token"));
          },
        });
      });

      cy.get(".card-body button:last-of-type").eq(2).click({ force: true });
      let productName: string;
      cy.get(".card-body h5 b")
        .eq(2)
        .then(function ($el) {
          cy.log($el.text());
          productName = $el.text();
        });
      cy.get("[routerlink*='cart']").click();
      cy.contains("Checkout").click();
      cy.get("select.input.ddl").each(($el, index) => {
        $el.click();

        let random =
          index === 0
            ? Math.floor(Math.random() * 12)
            : Math.floor(Math.random() * 31);

        cy.wrap($el)
          .find("option")
          .eq(random)
          .then(($option) => {
            cy.wrap($el).select($option.val());
          });

        // if value minus than 10, add a 0 before
        cy.wrap($el).should(
          "have.value",
          (random + 1).toString().padStart(2, "0")
        );
      });

      cy.get("[placeholder*='Select Country']").type("br");
      cy.get(".ta-results button").each(($el) => {
        if ($el.text().trim() === "Brazil") {
          cy.wrap($el).click();
        }
      });
      cy.get(".action__submit").click();

      cy.get(".order-summary button").each(($el) => {
        if ($el.text().trim() === "Click To Download Order Details in CSV") {
          cy.wrap($el).click();
        }
      });

      // download a file by clicking on a button

      Cypress.config("fileServerFolder");

      cy.readFile(
        Cypress.config("fileServerFolder") +
          "/cypress/downloads/order-invoice_lalodosanjos.csv"
      ).then(async (fileContent) => {
        const csv = await neatCsv(fileContent);
        cy.log(csv[0]["Product Name"]);
        expect(productName).to.be.eq(csv[0]["Product Name"]);
      });
    });
  });
});

// http://rahulshettyacademy.com/client/dashboard/dash
