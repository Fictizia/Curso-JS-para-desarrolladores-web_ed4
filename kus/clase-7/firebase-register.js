(function(window) {
  // fb refs
  var ref = new Firebase("https://fictiziajs.firebaseio.com/fb-ejemplos/escritura");
  var usersRef = ref.child('users');

  var form = document.querySelector('#register');
  var list = document.querySelector('.users-list');
  var heading = document.querySelector('.users-heading');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var email = this.email.value;
    var name = this.name.value;

    usersRef.orderByChild('email')
      .equalTo(email)
      .once('value', function(data) {
        var userFound = data.val();
        if (userFound !== null) {
          alert('¡Este usuario ya está registrado!');
        } else {
          usersRef.push({
            name: name,
            email: email
          });
        }
      });
  });

  // print user list
  usersRef.on('child_added', function(data) {
    var usersData = data.val();
    var li = document.createElement('li');
    li.innerHTML = '<strong>' + usersData.name + '</strong>' + ' ' + usersData.email;
    list.appendChild(li);
    list.removeAttribute('hidden');
    heading.textContent = 'Lista de usuarios';
  });
})(window);

