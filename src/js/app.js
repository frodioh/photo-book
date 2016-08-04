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
    var currentBg;
    var currentAvatar;
    //Выход
    var userOffBtn = document.querySelector("#userOffBtn");
    userOffBtn.addEventListener("click", function(e) {
      data = JSON.stringify({
      });
      $.ajax({
          url: '/deleteSession',
          type: 'POST',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            if(data.isValid) {
              location = "/";
            }
          }
      });
    });
    //Функция для обновления информации на странице
    function userUpdate() {
      $.ajax({
          url: '/userUpdate',
          type: 'POST',
          data: {},
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            photos = data.photos;
            alboms = data.alboms;
            uInfo = data.userInfo;

            //Обновление информации пользователя
            var userHeader = document.querySelector(".user-header");
            var userFooter = document.querySelector(".user-footer");
            var userName = document.querySelector(".user-card__name");
            var userInfo = document.querySelector(".user-card__descr");
            var social = document.querySelectorAll(".user-card__social-icon");
            var socialVk = social[0];
            var socialFb = social[1];
            var socialTwitter = social[2];
            var socialGooglePlus = social[3];
            var socialEmail = social[4];
            //Форма редактирования пользователя
            var editHeaderTop = document.querySelector(".edit-header__top");
            var editName = document.querySelector(".user-edit__name");
            var editCaption = document.querySelector(".user-edit__caption");
            var editSocial = document.querySelectorAll(".edit-header .user-card__social-text");
            var editSocialVk = editSocial[0];
            var editSocialFb = editSocial[1];
            var editSocialTwitter = editSocial[2];
            var editSocialGooglePlus = editSocial[3];
            var editSocialEmail = editSocial[4];

            var editAvatar = document.querySelector("img.user-edit__avatar");
            var userPhoto = document.querySelector("img.user-card__photo");

            console.log(editAvatar);
            console.log(userPhoto);

            userHeader.style = "background-image: url(" + uInfo.bgLink + ");";
            userFooter.style = "background-image: url(" + uInfo.bgLink + ");";
            editHeaderTop.style = "background-image: url(" + uInfo.bgLink + ");";
            userPhoto.src = currentAvatar;
            userName.innerHTML = uInfo.name;
            userInfo.innerHTML = uInfo.info;
            socialVk.setAttribute("href", uInfo.social.vk);
            socialFb.setAttribute("href", uInfo.social.fb);
            socialTwitter.setAttribute("href", uInfo.social.twitter);
            socialGooglePlus.setAttribute("href", uInfo.social.googlePlus);
            socialEmail.setAttribute("href", uInfo.social.email);
            editAvatar.src = currentAvatar;
            editName.setAttribute("value", uInfo.name);
            editCaption.innerHTML = uInfo.info;
            editSocialVk.setAttribute("value", uInfo.social.vk);
            editSocialFb.setAttribute("value", uInfo.social.fb);
            editSocialTwitter.setAttribute("value", uInfo.social.twitter);
            editSocialGooglePlus.setAttribute("value", uInfo.social.googlePlus);
            editSocialEmail.setAttribute("value", uInfo.social.email);

            var photoContainer = document.querySelector(".photo-items");
            photoContainer.innerHTML = '';
            var albumContainer = document.querySelector(".albom-items");
            var addAlbum = document.querySelector(".photo-btn.photo-btn--album");
            addAlbum = albumContainer.removeChild(addAlbum);
            albumContainer.innerHTML = '';
            albumContainer.appendChild(addAlbum);

            photos.forEach(function(item) {
              var photoLink = "/media/" + item.userId + "/albums/" + item.albomId + "/" + item._id + ".jpg";
              var userLink = "/user/" + item.userId;
              var albumLink = "/album/" + item.albomId;
              var userAvatar = "/media/" + item.userId + "/avatar/avatar.jpg";
              //Создание элемента фотографии
              var photoItem = document.createElement('article');
              photoItem.classList.add('photo-item');
              photoItem.classList.add('photo-item--user');
              photoItem.innerHTML = '<a href="#" style="background-image: url(' + photoLink + ');" class="photo-item__photo"></a><div class="photo-item__info"><a href="' + userLink + '" class="photo-item__user"><img src="' + userAvatar + '" class="photo-item__user-photo"></a><div class="photo-item__descr"><a href="' + albumLink + '" class="photo-item__title">' + item.title + '</a><div class="photo-item__social"><div class="photo-item__comments"><div class="photo-item__comments-icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="17.209px" viewBox="0 0 20 17.209" enable-background="new 0 0 20 17.209" xml:space="preserve"><path fill="#d6d6d6" d="M10.154,0.002C4.632-0.107,0.086,3.296,0.001,7.602C-0.028,9.1,0.485,10.509,1.4,11.715l0,0 c1.573,2.021-0.144,5.494-0.144,5.494l5.068-2.183c1.092,0.345,2.279,0.546,3.522,0.57c5.522,0.108,10.068-3.294,10.153-7.6 C20.084,3.69,15.676,0.111,10.154,0.002 M5.725,9.038c-0.68,0-1.232-0.551-1.232-1.231s0.552-1.232,1.232-1.232 s1.232,0.552,1.232,1.232S6.406,9.038,5.725,9.038 M9.831,9.038c-0.681,0-1.232-0.551-1.232-1.231S9.15,6.575,9.831,6.575 s1.231,0.552,1.231,1.232S10.512,9.038,9.831,9.038 M13.937,9.038c-0.681,0-1.231-0.551-1.231-1.231s0.551-1.232,1.231-1.232 s1.231,0.552,1.231,1.232S14.617,9.038,13.937,9.038"/></svg></div><div class="photo-item__comments-text">0</div></div><div class="photo-item__likes"><div class="photo-item__likes-icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="16.858px" viewBox="0 0 20 16.858" enable-background="new 0 0 20 16.858" xml:space="preserve"><path fill="#d6d6d6" d="M20,5.287C20,2.367,17.633,0,14.713,0C12.653,0,10.872,1.181,10,2.901C9.127,1.181,7.348,0,5.287,0 C2.367,0,0,2.367,0,5.287c0,5.522,8.869,11.571,10,11.571S20,10.836,20,5.287z"/></svg></div><div class="photo-item__likes-text">0</div></div></div></div></div><a href="' + albumLink + '" class="photo-item__album"><div class="photo-item__album-icon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="18.182px" viewBox="0 0 20 18.182" enable-background="new 0 0 20 18.182" xml:space="preserve"><g id="miu"><g id="Artboard-1" transform="translate(-467.000000, -299.000000)"><g id="slice" transform="translate(215.000000, 119.000000)"></g><path id="editor-album-collection-glyph" d="M467.128,302.637c-0.071,0-0.128,0.053-0.128,0.117v14.311 c0,0.064,0.057,0.117,0.128,0.117h19.744c0.071,0,0.128-0.053,0.128-0.117v-14.311c0-0.065-0.057-0.117-0.128-0.117H467.128z M468.818,299v0.909h16.363V299H468.818z M467.909,300.818v0.909h18.182v-0.909H467.909z"/></g></g></svg></div><div class="photo-item__album-text">' + item.albomName + '</div></a>';
              photoContainer.appendChild(photoItem);
            });

            alboms.forEach(function(item) {
              var userLink = "/user/" + item.userId;
              var userAvatar = "/media/" + item.userId + "/avatar/avatar.jpg";
              var albumLink = "/album/" + item._id;
              var albumThumbLink = "/media/" + item.userId + "/albums/" + item._id + "/" + item.thumb + ".jpg";

              //Создание элемента альбома
              var albumItem = document.createElement('article');
              albumItem.classList.add('album-item');
              albumItem.classList.add('album-item--user');
              albumItem.innerHTML = '<a href="' + albumLink + '" style="background-image: url(' + albumThumbLink + ');" class="album-item__photo"></a><div class="album-item__info"><button id="albumItemEdit" class="album-item__edit"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><path d="M18.394,6.313c-0.549-0.909-1.227-1.798-2.057-2.622c-0.838-0.833-1.743-1.516-2.669-2.064L15.294,0 c0,0,2.354,0,3.529,1.176C20,2.353,20,4.706,20,4.706L18.394,6.313z M4.706,20H0v-4.706l0.564-0.565 c0.957,0.454,1.907,1.09,2.763,1.944c0.856,0.857,1.492,1.806,1.943,2.762L4.706,20z M17.036,7.67L6.628,18.077 c-0.549-0.908-1.227-1.8-2.056-2.623c-0.838-0.834-1.744-1.516-2.67-2.063L12.33,2.965c0.956,0.45,1.907,1.087,2.762,1.942 C15.949,5.764,16.586,6.714,17.036,7.67z"/></svg></button><a href="#" class="album-item__title">' + item.title + '</a></div>';
              albumContainer.appendChild(albumItem);
            });

            document.querySelector('.album__upload.__modal').classList.remove('active');
          }
      });
    };
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
        currentAvatar = dataUrl;
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
        currentBg = dataUrl;
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
              userUpdate();
              document.querySelector("#userEditForm").classList.remove("active");
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
              userUpdate();
            }
          }
      });
    });
  }
};