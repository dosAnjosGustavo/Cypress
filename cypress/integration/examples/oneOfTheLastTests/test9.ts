import CartPage from "../../../support/pageObjects/CartPage";
import ConfirmationPage from "../../../support/pageObjects/ConfirmationPage";
import HomePage from "../../../support/pageObjects/HomePage";
import ProductPage from "../../../support/pageObjects/ProductPage";

describe("Test cases", function () {
  let testData: any;

  before(function () {
    cy.fixture("example").then(function (data) {
      testData = data;
    });
  });

  const homepage = new HomePage();
  const productPage = new ProductPage();
  const cartPage = new CartPage();
  const confirmationPage = new ConfirmationPage();

  const tests = 1;

  const url = Cypress.env("url");

  for (let i = 0; i < tests; i++) {
    it(`Test case ${i + 1}`, function () {
      homepage.goTo(url + "/loginpagePractise");

      homepage.login(testData);

      // check if all the products are displayed
      productPage.checkProducts(testData);

      productPage.addProductToCart();

      // Check if the products on the cart page are the same as the ones added and the total price is correct as well
      cartPage.checkCartPage();

      confirmationPage.selectCountryAndPurchase();
    });
  }
});
