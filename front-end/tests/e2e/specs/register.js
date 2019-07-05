describe('Register', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.server();
    });

    it('Form Errors', () => {
        cy.visit(`http://localhost:8080/register`);
        cy.contains('Register').click();
        cy.get(".v-messages__message").should("contain", "Name is required.");
        cy.get(".v-messages__message").should("contain", "E-mail is required.");
        cy.get(".v-messages__message").should("contain", "Password is required.");

        cy.get("[aria-label='Name']").type('ab');
        cy.get("[aria-label='E-mail']").type('ab');
        cy.get("[aria-label='Password']").type('abc');
        cy.contains('Register').click();
        cy.get(".v-messages__message").should("contain", "Name must be at least 3 characters long");
        cy.get(".v-messages__message").should("contain", "Must be valid e-mail.");
        cy.get(".v-messages__message").should("contain", "Password must be at least 8 characters long.");
    });

    it('Register Error', () => {
        cy.visit(`http://localhost:8080/register`);
        cy.route({
            method: 'POST',
            url: '**/sign-up/',
            status: 500,
            response: {},
            delay: 500,
            headers: {
                'X-Token': null,
            },
        }).as('RegisterError');

        cy.get("[aria-label='Name']").type('MR Meeseeks');
        cy.get("[aria-label='E-mail']").type('teste@teste.com');
        cy.get("[aria-label='Password']").type('senhaerrada');

        cy.contains('Register').click();
        cy.wait('@RegisterError');
        cy.contains("This email was used already.")
    });

    it('Register Success', () => {
        cy.visit(`http://localhost:8080/register`);
        cy.route({
            method: 'POST',
            url: '**/sign-up/',
            status: 200,
            response: {
                token: 'c é o bixao mesmo em?',
            },
            delay: 500,
            headers: {
                'X-Token': null,
            },
        }).as('RegisterSuccess');

        cy.get("[aria-label='Name']").type('MR Meeseeks');
        cy.get("[aria-label='E-mail']").type('teste@teste.com');
        cy.get("[aria-label='Password']").type('senhadificil');

        cy.contains('Register').click();
        cy.wait('@RegisterSuccess');
    });
});