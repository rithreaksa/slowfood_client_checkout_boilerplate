/* eslint-disable no-undef */
describe("user views menus", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  describe("if there are products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: "fixture:product_data.json",
      });
    });

    it("successfully", () => {
      cy.get("#index").within(() => {
        cy.contains("Spaghetti and Meatballs");
        cy.contains("Salad");
        cy.contains("Ice Cream");
      });
    });
  });

  describe("when the are NO products", () => {
    before(() => {
      cy.server();
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/products",
        response: { "products": [] },
      });
    });

    it("unsuccessfully", () => {
      cy.get("#index").should("not.exist");
    });
  });
});
