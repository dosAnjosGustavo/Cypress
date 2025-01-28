describe("Test cases", function () {
  it("Test cases", function () {
    //Check boxes
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    const hrefOpenTab = cy.get("#opentab");

    // get href
    hrefOpenTab.then((el) => {
      const href = el.prop("href");
      cy.visit(href);

      cy.origin("https://www.qaclickacademy.com", () => {
        cy.get("div.sub-menu-bar a[href*='about.html']").click({ force: true });
      });
    });
  });
});
