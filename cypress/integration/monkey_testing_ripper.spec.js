describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomLink(monkeysLeft) {
    if (monkeysLeft > 0) {
        cy.get('a').then($items => {
            var randomItem = $items.get(getRandomInt(0, $items.length));
            if (!Cypress.dom.isHidden(randomItem)) {
                cy.wrap(randomItem).click({ force: true });
                monkeysLeft -= 1;
            }
            cy.wait(1000);
            randomLink(monkeysLeft);
        });
    }
}

function randomTextInput(monkeysLeft) {
    if (monkeysLeft > 0) {
        cy.get('input').then($items => {
            var randomItem = $items.get(getRandomInt(0, $items.length));
            if (!Cypress.dom.isHidden(randomItem)) {
                cy.wrap(randomItem).type('This is a monkey', { force: true });
                monkeysLeft -= 1;
            }
            cy.wait(1000);
            randomTextInput(monkeysLeft);
        });
    }
}

function randomButton(monkeysLeft) {
    if (monkeysLeft > 0) {
        cy.get('button').then($items => {
            var randomItem = $items.get(getRandomInt(0, $items.length));
            if (!Cypress.dom.isHidden(randomItem)) {
                cy.wrap(randomItem).click({ force: true });
                monkeysLeft -= 1;
            }
            cy.wait(1000);
            randomButton(monkeysLeft);
        });
    }
}

function randomEvent(monkeysLeft) {
    if (monkeysLeft > 0) {
        var action = getRandomInt(1, 3);
        if (action === 1) {
            randomLink(1);
        } else if (action === 2) {
            randomButton(1);
        } else {
            randomTextInput(1);
        }
        cy.wait(1000);
        randomEvent(monkeysLeft-1);
    }
}