describe("Test cases", function () {
  it("Test cases", function () {
    //Check boxes
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    const mouseHover = cy.get(
      // "#mousehover"
      ".mouse-hover-content"
    );

    mouseHover.invoke("show");

    cy.contains("Top")
      .click
      // { force: true }
      ();

    mouseHover.invoke("hide");

    cy.url().should("include", "top");

    // finish test
    cy.log("Test has been completed!");
  });
});
