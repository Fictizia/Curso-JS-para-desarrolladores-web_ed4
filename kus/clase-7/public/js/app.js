(function(window) {

  // fb refs
  var ref = new Firebase("https://fictiziajs.firebaseio.com/fb-ejemplos/escritura");
  var usersRef = ref.child('users');

  // elements
  var btnGithub = document.querySelector('#btn-github');
  var form = document.querySelector('#form-register');
  var list = document.querySelector('.list-group');
  var alert = document.querySelector('#alert');

  // event listeners
  form.addEventListener('submit', formSubmit);
  btnGithub.addEventListener('click', loginWithGithub);
  usersRef.on('child_added', printUserList);

  function formSubmit(e) {
    e.preventDefault();
    var userData = {
      name: this.name.value,
      email: this.email.value
    };
    register(userData);
  }

  function loginWithGithub() {
    usersRef.authWithOAuthPopup('github', function(error, authData) {
      if (error) {
        showAlert('error', error);
      } else {
        console.log(authData);
        var user = {
          name: authData.github.displayName,
          picture: authData.github.profileImageURL,
          uid: authData.uid,
          url: authData.github.cachedUserProfile.html_url
        };
        register(user);
        displayUserProfile(user);
      }
    });
  }

  function displayUserProfile(user) {
    var userPicture = document.createElement('img');
    userPicture.src = user.picture;
    document.querySelector('.user-picture').appendChild(userPicture);

    document.querySelector('.user-name').innerHTML = 'Hola ' + '<b>' + user.name + '</b>';
    userPicture.onload = function() {
      document.querySelector('.user-profile').removeAttribute('hidden');
    }
  }

  function register(userData) {
    if (userData.uid) { // github user
      usersRef.orderByChild('uid')
        .equalTo(userData.uid)
        .once('value', function(data) {
          addUser(userData, data); // ToDo: dudas sobre el data...
        });
      return;
    }

    // email user
    usersRef.orderByChild('email')
      .equalTo(userData.email)
      .once('value', function(data) {
        addUser(userData, data);
      });
  }

  function addUser(userData, data) {
    var msg, alertType = 'success';

    var userFound = data.val();
    if (userFound !== null) { // user exits
      alertType = 'info';
      msg = '<strong>Hola ' + userData.name + '</strong> <br>¡Bienvenido de nuevo!';
    } else { // add new user
      msg = '<strong>Hola ' + userData.name + '</strong> <br>¡Bienvenido a FictiziApp!';
      usersRef.push(userData);
    }

    showAlert(alertType, msg);
    displayUserList();
  }

  function displayUserList() {
    document.querySelector('#register').classList.add('hide');
    document.querySelector('#user-list').classList.remove('hide');
  }

  function printUserList(data) {
    var usersData = data.val();
    var li = document.createElement('li');
    li.classList.add('list-group-item');

    var name = document.createElement('strong');
    name.textContent = usersData.name;
    li.appendChild(name);

    if (usersData.email) {
      var email = document.createElement('span');
      email.className = 'text-muted';
      email.textContent = usersData.email;
      li.appendChild(email);
    }

    if (usersData.url) {
      var url = document.createElement('span');
      url.className = 'text-muted';
      url.textContent = usersData.url;
      li.appendChild(url);
    }

    if (usersData.picture) {
      var img = document.createElement('img');
      img.className = 'img-circle';
      img.width = '30';
      img.src = usersData.picture;
      li.appendChild(img);
    }

    list.appendChild(li);
    list.removeAttribute('hidden');
  }

  function showAlert(type, msg) {
    var classSuffix = type || 'success';
    alert.innerHTML = msg;
    alert.classList.add('alert-' + classSuffix);
    alert.classList.remove('hide');
  }

})(window);

