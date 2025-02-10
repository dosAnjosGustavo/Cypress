describe("Test cases", function () {
  const tests = 1;

  for (let i = 0; i < tests; i++) {
    it(`Test case ${i + 1}`, function () {
      cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
        name: "Learfddsn Automation",
        isbn: "absggadfsd",
        aisle: "125454354",
        author: "John f6oe",
      }).then(function (response) {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("Msg", "successfully added");
      });
    });
  }
});
