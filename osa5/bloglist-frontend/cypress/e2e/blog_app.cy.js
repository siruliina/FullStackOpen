describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User 1',
      username: 'user1',
      password: 'user1_salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user1')
      cy.get('#password').type('user1_salasana')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('User 1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user2')
      cy.get('#password').type('user1_salasana')
      cy.get('#login-button').click()

      cy.contains('Log in to application')
      cy.contains('wrong credentials')
    })
  })
})