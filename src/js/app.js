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
          return res.json();
        }).then(function(data) {

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
        var authInfo = JSON.stringify(authInfo);
        $.ajax({
          url: '/auth',
          method: 'POST',
          contentType: 'application/json',
          data: authInfo,
          success: function(){
            location = '/user';
          }
        });
      });
    }());
  }
  if(document.querySelector("#userEditBtn")) {
    var userEditBtn = document.querySelector("#userEditBtn");
    var userOffBtn = document.querySelector("#userOffBtn");
    var editHeader = document.querySelector(".edit-header");
    var userHeader = document.querySelector(".user-header");
    var userHeaderTop = document.querySelector(".edit-header__top");
    var userFooter = document.querySelector(".user-footer");
    var userSearch = document.querySelector(".user-search");
    var editHeaderCancel = document.querySelector("#editHeaderBtnCancel");
    var editHeaderSave = $("#editHeaderBtnSave");
    var editHeaderAvatar = $("#editHeaderAvatar");
    var editHeaderBg = $("#editHeaderBg");

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
    editHeaderAvatar.on("change", function(e) {
      var userEditAvatarWrap = document.querySelector(".user-edit__avatar-wrapper");
      var userEditAvatar = document.querySelector(".user-edit__avatar");
      var userAvatar = document.querySelector(".user-card__photo");
      var file = e.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var dataUrl = e.target.result;
        var image = new Image();
        image.width = 128;
        image.onload = function() {

        };
        image.src = dataUrl;
        document.querySelector(".user-edit__avatar").remove();
        userEditAvatarWrap.appendChild(image);
        image.classList.add("user-edit__avatar");
      };
      reader.readAsDataURL(file);
    });
    editHeaderBg.on("change", function(e) {
      var userEditBg = $("#editHeaderBg");
      var reader = new FileReader();
      var file = e.currentTarget.files[0];
      reader.onload = function(e) {
        var dataUrl = e.target.result;
        userHeader.style = "background-image: url(" + dataUrl + ");";
        userHeaderTop.style = "background-image: url(" + dataUrl + ");";
        userFooter.style = "background-image: url(" + dataUrl + ");";
      };
      reader.readAsDataURL(file);
    });
    //Обновление пользовательских данных
    editHeaderSave.on("click", function() {
      var data = new FormData($('#userEditForm')[0]);
      console.log(data);
      console.log(document.querySelector("#editHeaderAvatar").value);
      console.log(document.querySelector("#editHeaderBg").value);
      $.ajax({
          url: '/profile',
          type: 'POST',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            if(data.isValid) {
              location.reload();
            }
          }
      });
    });
    //Добавление альбома
    var addAlbumBtn = document.querySelector(".photo-btn.photo-btn--album");
    var addAlbumModal = document.querySelector(".album__upload");
    var addAlbumCancel = document.querySelector(".album__upload.__cancel__btn");
    var addAlbumClose = document.querySelector("img.album__upload__close");
    var albumThumbInput = document.querySelector("#albumUploadThumb");
    var albumThumb = document.querySelector(".album__upload__preview");
    var addAlbumSave = document.querySelector(".album__upload.__save__btn");
    albumThumbInput.addEventListener("change", function(e) {
      var file = e.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        var dataUrl = e.target.result;
        albumThumb.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
    addAlbumBtn.addEventListener("click", function() {
      addAlbumModal.classList.add("active");
    });
    addAlbumCancel.addEventListener("click", function() {
      addAlbumModal.classList.remove("active");
    });
    addAlbumClose.addEventListener("click", function() {
      addAlbumModal.classList.remove("active");
    });
    addAlbumSave.addEventListener("click", function(e) {
      var data = new FormData($('#addAlbomForm')[0]);
      console.log(data);
      $.ajax({
          url: '/addAlbum',
          type: 'POST',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            if(data.isValid) {
              location.reload();
            }
          }
      });
    });
  }
};