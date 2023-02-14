import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When("user enter the ewaas", () => {
  cy.visit(Cypress.env("ewaas_url"));
});

Then("there will be the Sign in button", () => {
  cy.get("span").should("contain.text", "Sign in");
});
