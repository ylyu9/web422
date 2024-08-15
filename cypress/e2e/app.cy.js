describe('End-to-End Tests for My App', () => {

    it('should navigate to the login page if not authenticated', () => {
      cy.visit('/home'); // Attempt to visit the home page
      cy.url().should('include', '/login'); // Should be redirected to the login page
    });
  
    it('should login with valid credentials', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type('yingtong'); // Replace with valid test data
      cy.get('input[name="password"]').type('123456'); // Replace with valid test data
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home'); // Should redirect to home after login
    });
  
    it('should display products on the home page', () => {
      cy.visit('/home'); // Ensure you're logged in and navigate to home
      cy.get('.product-gallery .product').should('have.length.greaterThan', 0); // Ensure products are displayed
    });
  
    it('should add an item to the cart', () => {
      cy.visit('/home');
      cy.get('.product').first().click(); // Click on the first product (this may vary based on your layout)
      cy.get('button').contains('Add to Cart').click(); // Add product to cart
      cy.visit('/cart');
      cy.get('.cart-item').should('have.length', 1); // Verify item is in the cart
    });
  
    it('should display correct cart total', () => {
      cy.visit('/cart');
      cy.get('.cart-item').should('have.length', 1); // Verify item is in the cart
      cy.get('h2').contains('Total:').should('be.visible'); // Check that the total is displayed
    });
  
    it('should logout successfully', () => {
      cy.get('nav').contains('Logout').click(); // Assuming Logout is in the navbar
      cy.url().should('include', '/login'); // Should be redirected to the login page
    });
  
  });
  