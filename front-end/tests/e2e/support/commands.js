import vuexSession from "./mock/vuexSession";

Cypress.Commands.add("doLogin", () => {
    cy.visit(`http://localhost:8080/login`);
    cy.route({
        method: "POST",
        url: "**/sign-in",
        status: 200,
        response: vuexSession,
        delay: 500,
        headers: {
            "X-Token": null
        }
    }).as('LoginSuccess');

    cy.get("[aria-label='E-mail']").type('mrmeeseeks@gmail.com');
    cy.get("[aria-label='Password']").type('livingishard');
    cy.contains("Login").click();
    cy.wait("@LoginSuccess");
})