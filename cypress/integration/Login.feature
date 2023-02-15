Feature: Login page

  Login page is for user to login into the dashboard

  Scenario: Login successfully
    Given I already pass the start page
    And I enter the oauth2 page
    When I enter admin email
    And I enter admin password
    And I click on Sign in button
    Then I will go to select role page
  Scenario: Login fail when enter incorrect email
  Scenario: Login fail when enter incorrect password
