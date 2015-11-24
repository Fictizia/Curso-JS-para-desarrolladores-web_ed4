/**
 * Clase 4
 * Ejercicios Repaso - Cajero Automático
 */

var CajeroBitCoins = {
  empresa: 'CIRSA',
  tipo: 'BitCoins',
  materiales: ['Piedra', 'Papel', 'Tijeras'],
  // cm
  dimensiones: {
    alto: 170,
    ancho: 50,
    profundo: 60
  },
  moneda: 'EUR',
  clientesAutorizados: [],
  funds: 0,

  addFunds: function(funds) {
    if (!this.validateNumber(funds)) {
      return {
        error: true,
        text: 'Por favor, dame BitCoins en formato numérico'
      };
    }

    this.funds += funds;
    return funds;
  },

  getFunds: function(funds) {
    if (!this.validateNumber(funds)) {
      return {
        error: true,
        text: 'Por favor, pídeme Bitcoins en formato numérico.'
      };
    }

    if (this.funds < funds) {
      return {
        error: true,
        text: 'Lo siento, no tengo suficientes Bitcoins'
      };
    }

    if (this.funds >= funds) {
      this.funds -= funds;
      return funds;
    }
  },

  addAuthClient: function(client) {
    this.clientesAutorizados.push(client);
  },
  removeAuthClient: function(client) {
    if (this.validateClient(client)) {
      this.clientesAutorizados.splice(this.clientesAutorizados.indexOf(client), 1);
    }
  },

  validateClient: function(client) {
    return this.clientesAutorizados.indexOf(client) !== -1;
  },

  validateNumber: function(n) {
    return typeof n === 'number' && !isNaN(n);
  }
};
