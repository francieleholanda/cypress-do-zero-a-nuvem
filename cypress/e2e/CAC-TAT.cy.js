describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicacao', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
    cy.get('#firstName').type('Franciele')
    cy.get('#lastName').type('Holanda')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('Testando texto longo, Testando texto longo,Testando texto longo,Testando texto longo,Testando texto longo', {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
  })

   it('exibir mensagem de erro ao submenter o firmulário com um email com formatação inválida', ()=>{
    cy.get('#firstName').type('Franciele')
    cy.get('#lastName').type('Holanda')
    cy.get('#email').type('email@email')
    cy.get('#open-text-area').type('Testando texto longo, ')
    cy.contains('button', 'Enviar').click()

    cy.get('span.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

   it('exibir mensagem de erro ao submenter o firmulário com um telefone com formatação inválida', ()=>{
    cy.get('#phone')
      .type('testee')
      .should('be.visible', '')
  })

   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Franciele')
    cy.get('#lastName').type('Holanda')
    cy.get('#email').type('email@email.com')
    cy.get('#phone-checkbox').check().should('be.checked')
    cy.get('#open-text-area').type('Testando texto longo, ')
    cy.contains('button', 'Enviar').click()

    cy.get('span.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
    cy.get('#firstName')
      .type('Franciele')
      .should('have.value','Franciele')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Holanda')
      .should('have.value','Holanda').clear()
      .should('have.value','')
    cy.get('#email')
      .type('email@email.com')
        .should('have.value','email@email.com').clear()
        .should('have.value','')
    cy.get('#phone')
      .type('9999999')
      .clear()
      .should('have.value','')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
    cy.contains('button', 'Enviar').click()

    cy.get('span.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
  })

  it('seleciona um produto (YouTube) por seu texto', ()=>{

    cy.get('#product').select('YouTube')
      .should('have.value','youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{

    cy.get('select').select('mentoria')
      .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', ()=>{

    cy.get('select').select(1)
       .should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', ()=>{

    cy.get('[value="feedback"]').check()
       .should('have.value','feedback')
  })

  it('marca cada tipo de atendimento', ()=>{

    cy.get('input[name="atendimento-tat"]').each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca cada tipo de atendimento exp2', ()=>{

    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check()
      .should('be.checked')
    })
  })

   it('marca ambos checkboxes, depois desmarca o último', ()=>{

    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

   it('seleciona um arquivo da pasta fixtures', ()=>{

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
        //console.log(input[0].files[0].name)
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', ()=>{

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
        //console.log(input[0].files[0].name)
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json').as('arquivo')
    cy.get('#file-upload')
      .selectFile('@arquivo')
      .should(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
        //console.log(input[0].files[0].name)
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })
  
});