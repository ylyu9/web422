describe('User Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('/register'); 
      cy.get('input[name="username"]').type('newuser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('User registered successfully').should('exist');
    });
  
    it('should display error for mismatched passwords', () => {
        cy.visit('/register'); 
        cy.get('input[name="username"]').type('newuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password456'); 
        cy.get('button[type="submit"]').click();
        cy.contains('Passwords do not match').should('exist');
      });
      
    it('should show an error for an already taken username', () => {
      cy.visit('/register'); 
      cy.get('input[name="username"]').type('existinguser');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Username already taken').should('exist');
    });
  });
  