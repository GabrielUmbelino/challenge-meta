describe("Login", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.server();
    });
    it("Form Errors", () => {
        cy.visit(`http://localhost:8080/login`);
        cy.contains('Login').click();
        cy.get(".v-messages__message").should("contain", "E-mail is required.");
        cy.get(".v-messages__message").should("contain", "Password is required.");

        cy.get("[aria-label='E-mail']").type('ab');
        cy.get("[aria-label='Password']").type('abc');
        cy.contains('Login').click();
        cy.get(".v-messages__message").should("contain", "Must be valid e-mail.");
        cy.get(".v-messages__message").should("contain", "Password must be at least 8 characters long.");

    })
    it("Login Error", () => {
        cy.visit(`http://localhost:8080/login`);
        cy.route({
            method: "POST",
            url: "**/sign-in",
            status: 401,
            response: {},
            delay: 500,
            headers: {
                "X-Token": null
            }
        }).as('LoginError');

        cy.get("[aria-label='E-mail']").type('mrmeeseeks@gmail.com');
        cy.get("[aria-label='Password']").type('livingishard');
        cy.contains("Login").click();

        cy.wait("@LoginError");
    });
    it("Login Success", () => {
        cy.visit(`http://localhost:8080/login`);
        cy.route({
            method: "POST",
            url: "**/sign-in",
            status: 200,
            response: {
                token: 'c é o bixao mesmo em?',
            },
            delay: 500,
            headers: {
                "X-Token": null
            }
        }).as('LoginSuccess');

        cy.get("[aria-label='E-mail']").type('mrmeeseeks@gmail.com');
        cy.get("[aria-label='Password']").type('livingishard');
        cy.contains("Login").click();
        cy.wait("@LoginSuccess");
    });


})