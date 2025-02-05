Feature: End to end Ecommerce validation

  @Regression
  Scenario: Validate the user is able to purchase a product
    Given I open Ecommerce page
    When I fill the form details
    And I check if all the products are displayed
    And I add products to the cart
    And I check if the products on the cart page are the same as the ones added and the total price is correct as well
    Then I select country and purchase

  @Smoke
  Scenario Outline: Validate the user is able to purchase a product (cucumber data table)
    Given I open Ecommerce page
    When I fill the form details and login
    | username              | password |
    | rahulshettyacademy    | learning |
    And I check if all the products are displayed
    And I add products to the cart
    And I check if the products on the cart page are the same as the ones added and the total price is correct as well
    Then I select country and purchase

  @Regression
  Scenario: Validate the user is able to purchase a product
    Given I open Ecommerce page
    When I fill the form details
    And I check if all the products are displayed
    And I add products to the cart
    And I check if the products on the cart page are the same as the ones added and the total price is correct as well
    Then I select country and purchase