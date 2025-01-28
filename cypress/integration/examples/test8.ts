describe("Test cases", function () {
  const tests = 1;

  for (let i = 0; i < tests; i++) {
    it(`Test case ${i + 1}`, function () {
      //Check boxes
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

      // function to click on an element
      const click = (el: string, times: number = 1) => {
        for (let i = 0; i < times; i++) {
          cy.get(el).click();
        }
      };

      const year = "2027";
      const month = "6";
      const day = "15";
      const expectedList = [month, day, year];

      click(".react-date-picker__calendar-button");

      // click twice on the navigation label
      click(".react-calendar__navigation__label", 2);

      // click on the year 2027
      cy.get(".react-calendar__decade-view__years")
        .contains(Number(year))
        .click();

      // click on the month july by child index
      cy.get("button.react-calendar__year-view__months__month")
        .children()
        .eq(Number(month) - 1)
        .click();

      // cy.get(".react-calendar__year-view__months").contains("julho").click();

      // click on the day 15
      // cy.get(".react-calendar__month-view__days").contains("15").click();
      cy.contains("abbr", Number(day)).click();

      // check the input value
      // cy.get(".react-date-picker__inputGroup input").should(
      //   "have.value",
      //   "2027-06-15"
      // );

      cy.get(".react-date-picker__inputGroup__input").each((el, i) => {
        cy.wrap(el).should("have.value", expectedList[i]);
      });
    });
  }
});
