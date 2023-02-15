import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

function inOAuth2Page(callback: () => void) {
  return cy.origin(Cypress.env("oauth2_url"), callback);
}

Given("I already pass the start page", () => {
  cy.visit(Cypress.env("ewaas_url"));
  cy.contains("Sign in").click();
});

Given("I enter the oauth2 page", () => {
  inOAuth2Page(() => () => {
    cy.url().should("contain", Cypress.env("oauth2_url"));
  });
});

When("I enter admin email", () => {
  inOAuth2Page(() => {
    cy.get('input[name="email"]').type(Cypress.env("admin_email"));
  });
});

When("I enter admin password", () => {
  inOAuth2Page(() => {
    cy.get('input[name="password"]').type(Cypress.env("admin_password"));
  });
});

When("I click on Sign in button", () => {
  inOAuth2Page(() => {
    cy.contains("Sign In").click();
  });
});

Then("I will go to select role page", () => {
  cy.url().should("equal", `${Cypress.env("ewaas_url")}/switch`);
});
