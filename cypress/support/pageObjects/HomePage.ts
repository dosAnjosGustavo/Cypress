export default class HomePage {
  goTo(url: string) {
    cy.visit(url);
  }

  login(data: any) {
    cy.get("#username").type(data.username);

    cy.get("#password").type(data.password);

    const randomUserType =
      data.userType[Math.floor(Math.random() * data.userType.length)];

    cy.get(`input[value='${randomUserType}']`).check();

    randomUserType === "user"
      ? cy.wait(300) && cy.get("button#okayBtn").click()
      : null;

    const randomRole = data.role[Math.floor(Math.random() * data.role.length)];

    cy.get(`select.form-control`).select(randomRole);

    cy.get("input#terms").check();

    cy.get("input#signInBtn").click();

    cy.wait(2000);
  }
}
