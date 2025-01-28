export default class ConfirmationPage {
  selectCountryAndPurchase() {
    cy.get("#country").type("United States");

    // wait disappear the loading spinner div.lds-ellipsis

    if (cy.get("div.lds-ellipsis").should("exist")) {
      // wait 2 seconds before checking the spinner again
      // cy.wait(2000);
      cy.get("div.lds-ellipsis").should("not.exist");
    }

    cy.get(".suggestions > ul > li > a")
      .contains("United States of America")
      .click();

    cy.get("input#checkbox2").check({ force: true });

    cy.get("input[value='Purchase']").click();
  }
}
