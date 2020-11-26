/* eslint-disable no-undef */
describe("Add to Order button", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:300/api/auth/sign_up",
      response: "fixture:successful_sign_up.json",
      headers: {
        uid: "hej@gmail.com",
        access_token: "whatever",
        client: "123456",
        token_type: "Bearer",
        expiry: 1766900,
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:300/api/auth/products",
      response: "fixture:product_data.json",
    });
    cy.visit("/");
  });

  describe("when user is NOt authenticated", () => {
    it("is expected to be hidden", () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get("button").should("not.be.visible");
      });
    });
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      cy.get('[data-cy="register-cta"]').click();
      cy.get('[data-cy="email"]').type("hej@gmail.com");
      cy.get('[data-cy="password]').type("password");
      cy.get('[data-cy="password_confirmation"]').type("password");
      cy.get('[data-cy="register]').click();
    });
    it("is expected to be visible", () => {
      cy.get('[data-cy="product-1"]').within(() => {
        cy.get("button").should("be.visible");
      });
    });
  });
});
