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

  adminAddFunds: function(funds) {
    this.funds += funds;
  },
  adminGetFunds: function(funds) {
    if (this.funds >= funds) {
      this.funds -= funds;
      return funds;
    }
  },
  adminAddAuthClient: function(client) {
    this.clientesAutorizados.push(client);
  },
  adminRemoveAuthClient: function(client) {
    if (this.validateClient(client)) {
      this.clientesAutorizados.splice(client, 1);
    }
  },

  validateClient: function(client) {
    // ToDo: nooooo!!
    return this.clientesAutorizados.indexOf(client) !== -1;
  },
  validateNumber: function(n) {
    return !isNan(n);
  },

  addFunds: function(funds) {
    this.funds += funds;
  },
  getFunds: function(funds) {
    if (this.funds >= funds) {
      this.funds -= funds;
      return funds;
    }
  }
};
