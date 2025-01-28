import "cypress-iframe";

describe("Demo", () => {
  it("Demo", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // iframe
    cy.frameLoaded("#courses-iframe");
    cy.iframe().find("a[href*='mentorship']").eq(0).click();

    cy.iframe().find(".courses-block").should("have.length", 12);

    // finish test
    cy.log("Test has been completed!");
  });
});
