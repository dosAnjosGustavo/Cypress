export default class CartPage {
  checkCartPage() {
    cy.get("tbody")
      .children()
      .then((rows) => {
        let sum = 0; // Inicialize a soma

        for (let i = 0; i < rows.length - 2; i++) {
          let quantity = 0;
          let price = 0;
          let subtotal = 0;

          // Obtenha a quantidade
          cy.get("input.form-control")
            .eq(i)
            .invoke("val")
            .then((val) => {
              quantity = Number(val);
            });

          // Obtenha o preço
          cy.get("tr td:nth-child(3) strong")
            .eq(i)
            .invoke("text")
            .then((text) => {
              price = Number(text.split(" ")[1].trim());
            });

          // Obtenha o subtotal
          cy.get("tr td:nth-child(4) strong")
            .eq(i)
            .invoke("text")
            .then((text) => {
              subtotal = Number(text.split(" ")[1].trim());

              // Acumule o subtotal na soma
              sum += subtotal;
            });
        }

        // Verifique a soma total no final
        cy.get("td.text-right h3 strong")
          .invoke("text")
          .then((text) => {
            const totalDisplayed = Number(text.split(" ")[1].trim());

            // Verifique se a soma calculada é igual ao total exibido
            expect(sum).to.be.equal(totalDisplayed);
          });
      });
    cy.get(".btn.btn-success").click();
  }
}
