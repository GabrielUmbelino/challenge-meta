import projects from "../support/mock/projects"
import {
    user
} from "../support/mock/vuexSession"
describe("Projects", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.server()
    })
    it('Get Projects Success', () => {
        cy.route({
            method: 'get',
            url: '**/projects',
            status: 200,
            response: projects,
            delay: 500,
        }).as('RegisterSuccess')
        cy.doLogin()
        cy.wait("@RegisterSuccess")
        for (const project of projects) {
            cy.contains(project.name)
        }
    })
    it('Create Project', () => {
        cy.route({
            method: 'get',
            url: '**/projects',
            status: 200,
            response: projects,
            delay: 500,
        }).as('GetProjectSuccess')
        cy.route({
            method: 'post',
            url: '**/projects',
            status: 201,
            response: projects,
            delay: 500,
        }).as('CreatedProjectSuccess')

        cy.doLogin()
        cy.wait("@GetProjectSuccess")
        cy.get(".create-project .headline").should("contain", "New Project")
        cy.get(".create-project .v-input input").type("Portal Gun")
        cy.get(".create-project button.v-btn").click()
        cy.wait("@CreatedProjectSuccess")
        cy.contains("Project created successfully.")
    })
    it('Edit Project', () => {
        cy.route({
            method: 'get',
            url: '**/projects',
            status: 200,
            response: projects,
            delay: 500,
        }).as('GetProjectSuccess')
        const {
            _id
        } =
        user;
        cy.route({
            method: 'put',
            url: `**/projects/${_id}`,
            status: 200,
            response: projects,
            delay: 500,
        }).as('UpdateProjectSuccess')

        cy.doLogin()
        cy.wait("@GetProjectSuccess")
        cy.get(".layout .container > div .flex:first-child .v-card__title .text-xs-center .v-btn:first-child").click();
        cy.get(".layout .container > div .flex:first-child .v-card__title input").type("Portal Gun")
        cy.get(".layout .container > div .flex:first-child .v-card__title .text-xs-center .v-btn:first-child").click();
        cy.wait("@UpdateProjectSuccess")
        cy.contains("Project edited successfully.")
    })
})