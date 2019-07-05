import projects from "../support/mock/projects"
import {
    user
} from "../support/mock/vuexSession"
const {
    _id
} =
user
describe("Tasks", () => {
    beforeEach(() => {
        cy.clearLocalStorage()
        cy.server()
    })
    it('Get Tasks Success', () => {
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
            for (const task of project.tasks) {
                cy.contains(task.name);
            }

        }
    })
    it('Create Task', () => {
        cy.route({
            method: 'get',
            url: '**/projects',
            status: 200,
            response: projects,
            delay: 500,
        }).as('GetProjectSuccess')
        cy.route({
            method: 'put',
            url: `**/projects/${projects[0]._id}`,
            status: 200,
            response: projects,
            delay: 500,
        }).as('CreatedProjectSuccess')

        cy.doLogin()
        cy.wait("@GetProjectSuccess")
        cy.get(".container > div .flex:first-child .create-task input[aria-label='Name']").type("Create the gun")
        cy.get(".container > div .flex:first-child .create-task button").click()

        cy.wait("@CreatedProjectSuccess")
        cy.contains("Task created successfully.")
    })
    it('Edit Task', () => {
        cy.route({
            method: 'get',
            url: '**/projects',
            status: 200,
            response: projects,
            delay: 500,
        }).as('GetProjectSuccess')

        cy.route({
            method: 'put',
            url: `**/projects/${projects[0]._id}`,
            status: 200,
            response: projects,
            delay: 500,
        }).as('UpdateTaskSuccess')

        cy.doLogin()
        cy.wait("@GetProjectSuccess")
        cy.get(".container > div .flex:first-child .todo li:first-child .task .v-btn:nth-child(2)").click()
        cy.get(".container > div .flex:first-child .todo li:first-child .task .md4 input").type("Save Morty");
        cy.get(".container > div .flex:first-child .todo li:first-child .task .md4 .v-btn:first-child").click()
    })
})