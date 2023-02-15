# What the heck is BDD?

BDD (Behaverial Driven Development) is the way to use conversation and concrete example to elaborate how the test should be.

# Speak up the requirement

For example, when we already gather the requirement for "login process", we would have the mental model in our head like this:

> "When I enter the sign in page, and I enter the correct credential, and I click on sign in button, then I should be redirected to the main dashboard."

we could write to the _"scenario"_ like this (in the example use Gherkin syntax):

```gherkin
Feature: Login process

  Scenario: Login success
    When I enter the sign in page
    And I enter the correct email
    And I enter the correct password
    And I click on sign in button
    Then I should be redirected to the main dashboard
```

You can see that **it's easy to read about what the test case could do**, because we try to use human speaking language to explain the test case.

# Now it's time for fun part

Then we, as the developer, could map each line in to reusable function like so:

```ts
// import reserve keywords from BDD library
import { When, Then } from "cucumber";

When("When I enter the sign in page", function () {
  e2eTools.goto("http://login_url/login");
});

When("I enter the correct email", function () {
  e2eTools.find('input[name="email"]').type("admin@example.com");
});

When("I enter the correct password", function () {
  e2eTools.find('input[name="password"]').type("password");
});

When("I click on sign in button", function () {
  e2eTools.find("button", "Sign in").click();
});

Then("I should be redirected to the main dashboard", function () {
  e2eTools.url().shouldMatch("http://dashboard_url");
});
```

You can see that I refer e2e testing framework as the `e2eTools`.

Why? Because we can use _any_ e2e tools to achieve the test goal.

# "What is different from our belove Cypress or Playwright (or any e2e tools)?"

I think BDD is whole another higher level to e2e. All we want to do is write the functions that human could read too.

I will use Jest (JavaScript test framework) as an example.

```ts
describe("Login page", function () {
  it("should able to login and be redirected to main dashboard", function () {
    // a dashboard class
    MainDashboard.enter();
    MainDashboard.shouldNotLogin();

    // a login page class
    LoginPage.typeCorrectCredential();
    LoginPage.clickOnSignIn();

    MainDashboard.shouldLogin();
  });
});
```

The main point is, **we try to make it readable by wrap every business flow into a method**.

So, BDD is the method that help us elaborate the test case using "Speak language".

And we can use any e2e tools to help us test the scenario.
