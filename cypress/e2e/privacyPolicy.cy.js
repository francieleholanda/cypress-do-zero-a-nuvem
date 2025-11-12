describe('Central de Atendimento ao Cliente TAT - Política de Privacidade', () => {
  beforeEach(() =>{
    cy.visit('./src/privacy.html')
  })
  
  it.only('testa a página da política de privacidade de forma independente',() => {
   cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
   cy.contains('p', 'Talking About Testing').should('be.visible')
  })

})