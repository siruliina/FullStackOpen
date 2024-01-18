describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'User 1',
      username: 'user1',
      password: 'user1_salasana'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user1', password: 'user1_salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog 1')
      cy.get('#author').type('Author 1')
      cy.get('#url').type('Url 1')
      cy.contains('add').click()
      cy.contains('Blog 1 Author 1')
    })

    describe('blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog 1',
          author: 'Author 1',
          url: 'Url 1'
        })
        cy.createBlog({
          title: 'Blog 2',
          author: 'Author 2',
          url: 'Url 2'
        })
        cy.createBlog({
          title: 'Blog 3',
          author: 'Author 3',
          url: 'Url 3'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('Blog 2').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')
        cy.contains('like').click().parent().contains('1')
        cy.contains('like').click().parent().contains('2')
      })

      it('The user that created a blog, can delete it', function() {
        cy.contains('Blog 2').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'hide')
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Blog 2')
      })
    })
  })
})