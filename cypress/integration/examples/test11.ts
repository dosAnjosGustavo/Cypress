describe("Test cases", function () {
  const tests = 1;

  for (let i = 0; i < tests; i++) {
    it(`Test case ${i + 1}`, function () {
      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

      cy.intercept(
        "GET",
        "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
        (req) => {
          req.url =
            "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";

          req.continue((res) => {
            // expect(res.statusCode).to.eq(403);
          });
        }
      ).as("dummyUrl");

      cy.get("button[class='btn btn-primary']").click();

      cy.wait("@dummyUrl");
    });
  }
});
