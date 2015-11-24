(function() {
  var addClientBtn = document.querySelector('#add-client');
  var removeClientBtn = document.querySelector('#remove-client');
  var addFundsBtn = document.querySelector('#add-funds');
  var getFundsBtn = document.querySelector('#get-funds');
  var fundsInput = document.querySelector('#funds');
  var clientsInput = document.querySelector('#client');
  var bitcoinsOutput = document.querySelector('#bitcoins');
  var authClientsOutput = document.querySelector('#auth-clients');
  var clientCount = document.querySelector('#client-count');

  function updateFundsOutput() {
    if (CajeroBitCoins.funds > bitcoinsOutput.value) {
      bitcoinsOutput.classList.remove('decreased');
      bitcoinsOutput.classList.add('increased');
    } else {
      bitcoinsOutput.classList.remove('increased');
      bitcoinsOutput.classList.add('decreased');
    }
    var to = setTimeout(function() {
      clearTimeout(to);
      bitcoinsOutput.classList.remove('decreased') ;
      bitcoinsOutput.classList.remove('increased') ;
    }, 600);

    bitcoinsOutput.value = CajeroBitCoins.funds;
  }

  function updateClientsOutput() {
    authClientsOutput.textContent = CajeroBitCoins.clientesAutorizados.join(', ');
    clientCount.textContent = CajeroBitCoins.clientesAutorizados.length;
  }

  function clearInput(input) {
    input.value = '';
    input.focus();
  }

  addFundsBtn.addEventListener('click', function() {
    CajeroBitCoins.addFunds( parseInt(fundsInput.value) );
    clearInput(fundsInput);
    updateFundsOutput();
  });

  getFundsBtn.addEventListener('click', function() {
    CajeroBitCoins.getFunds( parseInt(fundsInput.value) );
    clearInput(fundsInput);
    updateFundsOutput();
  });

  addClientBtn.addEventListener('click', function() {
    CajeroBitCoins.addAuthClient( clientsInput.value );
    clearInput(clientsInput);
    updateClientsOutput();
  });

  removeClientBtn.addEventListener('click', function() {
    CajeroBitCoins.removeAuthClient( clientsInput.value );
    clearInput(clientsInput);
    updateClientsOutput();
  });

})();
