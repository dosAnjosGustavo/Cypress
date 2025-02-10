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

      // window.localStorage.setItem(
      //   "token",
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E2ODZhNGUyYjU0NDNiMWY0YzkxYmIiLCJ1c2VyRW1haWwiOiJsYWxvZG9zYW5qb3NAZ21haWwuY29tIiwidXNlck1vYmlsZSI6NTU0ODk5OTk5OSwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczODk2NjcwMSwiZXhwIjoxNzcwNTI0MzAxfQ.JuJtE2MolzGkg_abj74ukY1EXtNkBR4Iq7-FLe152E0"
      // );

      cy.visit("http://rahulshettyacademy.com/client");

      const randomNumber = Math.floor(Math.random() * 3);

      cy.get(".card-body button:last-of-type")
        .eq(randomNumber)
        .click({ force: true });
      let productName: string;
      cy.get(".card-body h5 b")
        .eq(randomNumber)
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

      cy.task(
        "deleteFile",
        Cypress.config("fileServerFolder") +
          "/cypress/downloads/order-invoice_lalodosanjos.xlsx"
      );

      cy.wait(1000);

      cy.window().then((win) => {
        const excelDownloadButton = () => {
          return win.document.querySelector(
            "tbody tr:nth-child(5) button:nth-child(1)"
          );
        };
        const clickButton = () => {
          excelDownloadButton().click();
        };
        if (excelDownloadButton() === null) {
          cy.wait(1000).then(() => {
            clickButton();
          });
        } else {
          clickButton();
        }
      });

      cy.wait(1000);

      cy.task(
        "excelToJsonConverter",
        Cypress.config("fileServerFolder") +
          "/cypress/downloads/order-invoice_lalodosanjos.xlsx"
      ).then((result) => {
        expect(productName).to.be.eq(result.data[1]["B"]);

        cy.log(result);
      });
    });
  });
});
