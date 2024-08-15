describe('User Login', () => {
    it('should login successfully with correct credentials', () => {
      cy.visit('/login'); 
      cy.get('input[name="username"]').type('newuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard'); 
      cy.contains('Welcome').should('exist'); 
    });
  
    it('should show an error for incorrect credentials', () => {
      cy.visit('/login'); 
      cy.get('input[name="username"]').type('newuser');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid credentials').should('exist');
    });

    it('should display errors for empty fields', () => {
      cy.visit('/login');
      cy.get('button[type="submit"]').click();
      cy.get('p.text-red-600').should('contain', 'Username is required');
      cy.get('input[name="username"]').type('testuser');
      cy.get('button[type="submit"]').click();
      cy.get('p.text-red-600').should('contain', 'Password is required');
    });
  });
  