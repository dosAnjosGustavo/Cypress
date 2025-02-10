describe("Download and upload files", () => {
  it("Download file", () => {
    cy.visit("https://rahulshettyacademy.com/upload-download-test/index.html");

    const filePath =
      Cypress.config("fileServerFolder") + "/cypress/downloads/download.xlsx";

    cy.task("deleteFile", filePath);

    cy.wait(1000);

    cy.window().then((win) => {
      const excelDownloadButton = () => {
        return win.document.querySelector("#downloadButton");
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

    const searchText = "Apple";
    const replaceText = "350";

    cy.task("writeExcelTest", {
      searchText,
      replaceText,
      change: { colChange: 2 },
      filePath,
    });

    cy.get("#fileinput.upload").selectFile(filePath);

    cy.contains(searchText)
      .parent()
      .parent()
      .find("#cell-4-undefined")
      .should("have.text", replaceText);
  });
});
