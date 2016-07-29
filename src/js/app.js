window.onload = function() {
  if(document.querySelector("#registerSignInLink")) {
    //Переворот
    var login = document.querySelector("#registerSignInLink"),
        register = document.querySelector("#loginSignUpLink");
        flipper = document.querySelector(".flipper");
        headerLogin = document.querySelector(".headers__login"),
        headerRegister = document.querySelector(".headers__register");
    login.addEventListener('click', function(e) {
      e.preventDefault();
      flipper.classList.toggle("active");
      flipper.style.height = "200px";
      headerLogin.classList.add("active");
      headerRegister.classList.remove("active");
    });
    register.addEventListener('click', function(e) {
      e.preventDefault();
      flipper.classList.toggle("active");
      flipper.style.height = "280px";
      headerRegister.classList.add("active");
      headerLogin.classList.remove("active");
    });
    //Регистрация
    (function() {
      var registerBtn = document.querySelector(".register-create-btn"),
          registerName = document.querySelector("#registerName"),
          registerEmail = document.querySelector("#registerEmail"),
          registerPass = document.querySelector("#registerPass");
      //Сам fetch
      registerBtn.addEventListener('click', function() {
        var registerInfo = {
          "name": registerName.value,
          "email": registerEmail.value,
          "password": registerPass.value
        };
        //Настройки для fetch
        myHeaders = new Headers({
          "Content-Type": "application/json"
        });
        var myInit = { 
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          redirect: 'follow',
          body: JSON.stringify(registerInfo)
        };
        fetch('/register', myInit).then(function(res) {
        });
      });
    }());
    //Авторизация
    (function() {
      var loginBtn = document.querySelector(".login-form__login-btn"),
          loginEmail = document.querySelector("#loginEmail"),
          loginPass = document.querySelector("#loginPass");
      //Сам fetch
      loginBtn.addEventListener('click', function() {
        var authInfo = {
          "email": loginEmail.value,
          "password": loginPass.value
        };
        //Настройки для fetch
        myHeaders = new Headers({
          "Content-Type": "application/json"
        });
        var myInit = { 
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          cache: 'default',
          redirect: 'follow',
          body: JSON.stringify(authInfo)
        };
        fetch('/auth', myInit).then(function(res) {
        });
      });
    }());
  }
  if(document.querySelector("#userEditBtn")) {
    var userEditBtn = document.querySelector("#userEditBtn");
    var userOffBtn = document.querySelector("#userOffBtn");
    var editHeader = document.querySelector(".edit-header");
    var userHeader = document.querySelector(".user-header");
    var userSearch = document.querySelector(".user-search");
    var editHeaderCancel = document.querySelector("#editHeaderBtnCancel");
    var editHeaderSave = document.querySelector("#editHeaderBtnSave");
    userEditBtn.addEventListener("click", function() {
      editHeader.classList.toggle("active");
      userHeader.style.opacity = 0;
      userSearch.style.opacity = 0;
    });
    editHeaderCancel.addEventListener("click", function() {
      editHeader.classList.toggle("active");
      userHeader.style.opacity = 1;
      userSearch.style.opacity = 1;
    });
    //Социальные ссылки
    var social = $(".edit-header .user-card__social-icon");
    var socialSave = $(".social-btn--save");
    var socialCancel = $(".social-btn--cansel");
    social.on("click", function(e) {
      social.removeClass("active");
      e.currentTarget.classList.add("active");
    });
    socialSave.on("click", function(e) {
      e.stopPropagation();
      var current = $(e.currentTarget.parentElement.parentElement);
      current.removeClass("active");
    });
    socialCancel.on("click", function(e) {
      e.stopPropagation();
      var current = $(e.currentTarget.parentElement.parentElement);
      var input = current.find(".user-card__social-text");
      current.removeClass("active");
      input.value = "";
    });
  }
};