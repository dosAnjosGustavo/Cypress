describe("Test cases", function () {
  const tests = 1;

  for (let i = 0; i < tests; i++) {
    it(`Test case ${i + 1}`, function () {
      cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

      cy.intercept(
        {
          method: "GET",
          url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
        },
        {
          body: [
            {
              book_name: "RestAssured with Java",
              isbn: "LSA",
              aisle: "2303",
            },
          ],
        }
      ).as("bookretrievals");

      cy.get("button[class='btn btn-primary']").click();
      cy.wait("@bookretrievals").should(({ response }) => {
        expect(response?.statusCode).to.eq(200);
        expect(response?.body).to.have.length(1);
        expect(response?.body[0].book_name).to.eq("RestAssured with Java");
        expect(response?.body[0].isbn).to.eq("LSA");
        expect(response?.body[0].aisle).to.eq("2303");
      });

      cy.get("p").should("have.text", "Oops only 1 Book available");
    });
  }
});
