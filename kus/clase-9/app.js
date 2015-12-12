(function() {
  var form = document.querySelector('#form');
  var contactList = document.querySelector('#contact-list');

  form.addEventListener('submit', saveContact);
  if (localStorage.length) {
    printContacts();
  }


  function saveContact(e) {
    e.preventDefault();

    var data = {
      name: this.nombre.value,
      tel: this.tfno.value,
      email: this.email.value
    };

    localStorage.setItem('key-' + data.name, JSON.stringify(data));

    printContacts();
  }

  function restoreFormData(key) {
    var data = JSON.parse(localStorage.getItem('key-' + key));
    form.nombre.value = data.name;
    form.tfno.value = data.tel;
    form.email.value = data.email;
    form.nombre.focus();
  }

  function printContacts() {
    contactList.innerHTML = '';
    var buttons = '<button class="btn-edit">Editar</button><button class="btn-delete">Eliminar</button>';

    for (var key in localStorage) {
      var data = JSON.parse(localStorage.getItem(key)),
          li = document.createElement('li'),
          divName = document.createElement('div'),
          divTel = document.createElement('div'),
          divEmail = document.createElement('div'),
          editButtons = document.createElement('div');

        editButtons.className = 'edit';
        editButtons.setAttribute('data-name', data.name);
        editButtons.innerHTML = buttons;
        editButtons.addEventListener('click', onClickEdit);

        divName.innerHTML = data.name;
        divEmail.innerHTML = data.email;
        divTel.innerHTML = data.tel;

      li.appendChild(divName);
      li.appendChild(divEmail);
      li.appendChild(divTel);
      li.appendChild(editButtons);

      contactList.appendChild(li);
    }

    function onClickEdit(e) {
      var dataName;
      if (e.target.nodeName === 'BUTTON') {
        dataName = e.target.parentNode.getAttribute('data-name');
      } else {
        dataName = e.target.getAttribute('data-name');
      }

      if (e.target.className === 'btn-edit') {
        console.log('editar', dataName);
        restoreFormData(dataName);
        return;
      }

      if (e.target.className === 'btn-delete') {
        console.log('borrar',dataName);
        if (confirm('¿Seguro que deseas borrar a ' + dataName + '?')) {
          localStorage.removeItem(dataName);
          printContacts();
        }

        return;
      }
    }
  }
})();
