export default class ProductPage {
  checkProducts(data: any) {
    cy.get("app-card-list")
      .children("app-card")
      .then((cards) => {
        for (let i = 0; i < cards.length; i++) {
          const card = cards[i];
          const cardNameElement = card.querySelector("h4.card-title a");
          const cardName = cardNameElement ? cardNameElement.textContent : "";
          const cardPriceElement = card.querySelector("h5");
          const cardPrice = cardPriceElement
            ? cardPriceElement.textContent
            : "";

          type ProductType = {
            name: string;
            price: number;
          };

          const product = data.products.find(
            (product: ProductType) =>
              product.name === cardName &&
              product.price === Number(cardPrice?.slice(1))
          );

          expect(product).to.not.be.undefined;

          cy.log("Product found:", product);
        }
      });
  }

  // there are 4 app-card elements inside the app-card-list; I want to click randomly on one or more of them (could be 1 or 4) and randomly the quantity of times max 4 each of them

  randomQuantity = () => Math.floor(Math.random() * 10) + 1;

  addProductToCart() {
    cy.get("app-card-list")
      .children("app-card")
      .then((cards) => {
        let productsAddedToCart = 0;
        for (let i = 0; i < cards.length; i++) {
          if (Math.random() < 0.5) {
            productsAddedToCart++;
            for (let j = 0; j < this.randomQuantity(); j++) {
              cy.get("app-card").eq(i).find("button").click();
            }
          }
        }

        if (!productsAddedToCart) {
          const randomCard = Math.floor(Math.random() * cards.length);
          cy.get("app-card").eq(randomCard).find("button").click();
        }
      });

    cy.get("a.nav-link.btn.btn-primary").click();
  }
}
