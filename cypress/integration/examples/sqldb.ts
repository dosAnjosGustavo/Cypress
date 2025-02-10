context("Test cases", function () {
  let data: any;

  this.beforeAll(() => {
    cy.sqlServer("SELECT * from Persons").then((result) => {
      data = result;
    });
  });

  const tests = 1;

  Array.from({ length: tests }, (_, i) => {
    it(`Test case ${i + 1}`, function () {
      cy.log(data);
    });
  });
});
