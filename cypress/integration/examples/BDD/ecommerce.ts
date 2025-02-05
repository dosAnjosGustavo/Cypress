import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../support/pageObjects/HomePage";
import ProductPage from "../../../support/pageObjects/ProductPage";
import CartPage from "../../../support/pageObjects/CartPage";
import ConfirmationPage from "../../../support/pageObjects/ConfirmationPage";

const homePage = new HomePage();
const productPage = new ProductPage();
const cartPage = new CartPage();
const confirmationPage = new ConfirmationPage();

type Data = { rawTable: string[][] };

Given("I open Ecommerce page", () => {
  homePage.goTo(Cypress.env("url") + "/loginpagePractise");
});

When("I fill the form details", function (this, data: any) {
  homePage.login(this.data);
});

When("I fill the form details and login", function (this, data: Data) {
  cy.log("data:", data);
  this.data.username = data.rawTable[1][0];
  this.data.password = data.rawTable[1][1];
  homePage.login(this.data);
});

Then("I check if all the products are displayed", function () {
  productPage.checkProducts(this.data);
});

Then("I add products to the cart", function () {
  productPage.addProductToCart();
});

Then(
  "I check if the products on the cart page are the same as the ones added and the total price is correct as well",
  function () {
    cartPage.checkCartPage();
  }
);

Then("I select country and purchase", function () {
  confirmationPage.selectCountryAndPurchase();
});
