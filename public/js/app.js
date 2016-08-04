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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclNpZ25JbkxpbmtcIikpIHtcclxuICAgIC8v0J/QtdGA0LXQstC+0YDQvtGCXHJcbiAgICB2YXIgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyU2lnbkluTGlua1wiKSxcclxuICAgICAgICByZWdpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5TaWduVXBMaW5rXCIpO1xyXG4gICAgICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZsaXBwZXJcIik7XHJcbiAgICAgICAgaGVhZGVyTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcnNfX2xvZ2luXCIpLFxyXG4gICAgICAgIGhlYWRlclJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJzX19yZWdpc3RlclwiKTtcclxuICAgIGxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgZmxpcHBlci5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XHJcbiAgICAgIGhlYWRlckxvZ2luLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGhlYWRlclJlZ2lzdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHJlZ2lzdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgZmxpcHBlci5zdHlsZS5oZWlnaHQgPSBcIjI4MHB4XCI7XHJcbiAgICAgIGhlYWRlclJlZ2lzdGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGhlYWRlckxvZ2luLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIC8v0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVnaXN0ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZ2lzdGVyLWNyZWF0ZS1idG5cIiksXHJcbiAgICAgICAgICByZWdpc3Rlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyTmFtZVwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyRW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyRW1haWxcIiksXHJcbiAgICAgICAgICByZWdpc3RlclBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyUGFzc1wiKTtcclxuICAgICAgLy/QodCw0LwgZmV0Y2hcclxuICAgICAgcmVnaXN0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVnaXN0ZXJJbmZvID0ge1xyXG4gICAgICAgICAgXCJuYW1lXCI6IHJlZ2lzdGVyTmFtZS52YWx1ZSxcclxuICAgICAgICAgIFwiZW1haWxcIjogcmVnaXN0ZXJFbWFpbC52YWx1ZSxcclxuICAgICAgICAgIFwicGFzc3dvcmRcIjogcmVnaXN0ZXJQYXNzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL9Cd0LDRgdGC0YDQvtC50LrQuCDQtNC70Y8gZmV0Y2hcclxuICAgICAgICBteUhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBteUluaXQgPSB7IFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBoZWFkZXJzOiBteUhlYWRlcnMsXHJcbiAgICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgICBjYWNoZTogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVnaXN0ZXJJbmZvKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZmV0Y2goJy9yZWdpc3RlcicsIG15SW5pdCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG4gICAgLy/QkNCy0YLQvtGA0LjQt9Cw0YbQuNGPXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBsb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9naW4tZm9ybV9fbG9naW4tYnRuXCIpLFxyXG4gICAgICAgICAgbG9naW5FbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5FbWFpbFwiKSxcclxuICAgICAgICAgIGxvZ2luUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5QYXNzXCIpO1xyXG4gICAgICAvL9Ch0LDQvCBmZXRjaFxyXG4gICAgICBsb2dpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhdXRoSW5mbyA9IHtcclxuICAgICAgICAgIFwiZW1haWxcIjogbG9naW5FbWFpbC52YWx1ZSxcclxuICAgICAgICAgIFwicGFzc3dvcmRcIjogbG9naW5QYXNzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYXV0aEluZm8gPSBKU09OLnN0cmluZ2lmeShhdXRoSW5mbyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHVybDogJy9hdXRoJyxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgIGRhdGE6IGF1dGhJbmZvLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbG9jYXRpb24gPSAnL3VzZXInO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiAgfVxyXG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckVkaXRCdG5cIikpIHtcclxuICAgIHZhciBjdXJyZW50Qmc7XHJcbiAgICB2YXIgY3VycmVudEF2YXRhcjtcclxuICAgIC8v0JLRi9GF0L7QtFxyXG4gICAgdmFyIHVzZXJPZmZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJPZmZCdG5cIik7XHJcbiAgICB1c2VyT2ZmQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL2RlbGV0ZVNlc3Npb24nLFxyXG4gICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgbG9jYXRpb24gPSBcIi9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgLy/QpNGD0L3QutGG0LjRjyDQtNC70Y8g0L7QsdC90L7QstC70LXQvdC40Y8g0LjQvdGE0L7RgNC80LDRhtC40Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1XHJcbiAgICBmdW5jdGlvbiB1c2VyVXBkYXRlKCkge1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL3VzZXJVcGRhdGUnLFxyXG4gICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YToge30sXHJcbiAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIHBob3RvcyA9IGRhdGEucGhvdG9zO1xyXG4gICAgICAgICAgICBhbGJvbXMgPSBkYXRhLmFsYm9tcztcclxuICAgICAgICAgICAgdUluZm8gPSBkYXRhLnVzZXJJbmZvO1xyXG5cclxuICAgICAgICAgICAgLy/QntCx0L3QvtCy0LvQtdC90LjQtSDQuNC90YTQvtGA0LzQsNGG0LjQuCDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuICAgICAgICAgICAgdmFyIHVzZXJIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaGVhZGVyXCIpO1xyXG4gICAgICAgICAgICB2YXIgdXNlckZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1mb290ZXJcIik7XHJcbiAgICAgICAgICAgIHZhciB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jYXJkX19uYW1lXCIpO1xyXG4gICAgICAgICAgICB2YXIgdXNlckluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItY2FyZF9fZGVzY3JcIik7XHJcbiAgICAgICAgICAgIHZhciBzb2NpYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnVzZXItY2FyZF9fc29jaWFsLWljb25cIik7XHJcbiAgICAgICAgICAgIHZhciBzb2NpYWxWayA9IHNvY2lhbFswXTtcclxuICAgICAgICAgICAgdmFyIHNvY2lhbEZiID0gc29jaWFsWzFdO1xyXG4gICAgICAgICAgICB2YXIgc29jaWFsVHdpdHRlciA9IHNvY2lhbFsyXTtcclxuICAgICAgICAgICAgdmFyIHNvY2lhbEdvb2dsZVBsdXMgPSBzb2NpYWxbM107XHJcbiAgICAgICAgICAgIHZhciBzb2NpYWxFbWFpbCA9IHNvY2lhbFs0XTtcclxuICAgICAgICAgICAgLy/QpNC+0YDQvNCwINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcbiAgICAgICAgICAgIHZhciBlZGl0SGVhZGVyVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LWhlYWRlcl9fdG9wXCIpO1xyXG4gICAgICAgICAgICB2YXIgZWRpdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItZWRpdF9fbmFtZVwiKTtcclxuICAgICAgICAgICAgdmFyIGVkaXRDYXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWVkaXRfX2NhcHRpb25cIik7XHJcbiAgICAgICAgICAgIHZhciBlZGl0U29jaWFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lZGl0LWhlYWRlciAudXNlci1jYXJkX19zb2NpYWwtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGVkaXRTb2NpYWxWayA9IGVkaXRTb2NpYWxbMF07XHJcbiAgICAgICAgICAgIHZhciBlZGl0U29jaWFsRmIgPSBlZGl0U29jaWFsWzFdO1xyXG4gICAgICAgICAgICB2YXIgZWRpdFNvY2lhbFR3aXR0ZXIgPSBlZGl0U29jaWFsWzJdO1xyXG4gICAgICAgICAgICB2YXIgZWRpdFNvY2lhbEdvb2dsZVBsdXMgPSBlZGl0U29jaWFsWzNdO1xyXG4gICAgICAgICAgICB2YXIgZWRpdFNvY2lhbEVtYWlsID0gZWRpdFNvY2lhbFs0XTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlZGl0QXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImltZy51c2VyLWVkaXRfX2F2YXRhclwiKTtcclxuICAgICAgICAgICAgdmFyIHVzZXJQaG90byA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbWcudXNlci1jYXJkX19waG90b1wiKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVkaXRBdmF0YXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyUGhvdG8pO1xyXG5cclxuICAgICAgICAgICAgdXNlckhlYWRlci5zdHlsZSA9IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgdUluZm8uYmdMaW5rICsgXCIpO1wiO1xyXG4gICAgICAgICAgICB1c2VyRm9vdGVyLnN0eWxlID0gXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyB1SW5mby5iZ0xpbmsgKyBcIik7XCI7XHJcbiAgICAgICAgICAgIGVkaXRIZWFkZXJUb3Auc3R5bGUgPSBcImJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHVJbmZvLmJnTGluayArIFwiKTtcIjtcclxuICAgICAgICAgICAgdXNlclBob3RvLnNyYyA9IGN1cnJlbnRBdmF0YXI7XHJcbiAgICAgICAgICAgIHVzZXJOYW1lLmlubmVySFRNTCA9IHVJbmZvLm5hbWU7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvLmlubmVySFRNTCA9IHVJbmZvLmluZm87XHJcbiAgICAgICAgICAgIHNvY2lhbFZrLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdUluZm8uc29jaWFsLnZrKTtcclxuICAgICAgICAgICAgc29jaWFsRmIuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCB1SW5mby5zb2NpYWwuZmIpO1xyXG4gICAgICAgICAgICBzb2NpYWxUd2l0dGVyLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdUluZm8uc29jaWFsLnR3aXR0ZXIpO1xyXG4gICAgICAgICAgICBzb2NpYWxHb29nbGVQbHVzLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdUluZm8uc29jaWFsLmdvb2dsZVBsdXMpO1xyXG4gICAgICAgICAgICBzb2NpYWxFbWFpbC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHVJbmZvLnNvY2lhbC5lbWFpbCk7XHJcbiAgICAgICAgICAgIGVkaXRBdmF0YXIuc3JjID0gY3VycmVudEF2YXRhcjtcclxuICAgICAgICAgICAgZWRpdE5hbWUuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdUluZm8ubmFtZSk7XHJcbiAgICAgICAgICAgIGVkaXRDYXB0aW9uLmlubmVySFRNTCA9IHVJbmZvLmluZm87XHJcbiAgICAgICAgICAgIGVkaXRTb2NpYWxWay5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB1SW5mby5zb2NpYWwudmspO1xyXG4gICAgICAgICAgICBlZGl0U29jaWFsRmIuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdUluZm8uc29jaWFsLmZiKTtcclxuICAgICAgICAgICAgZWRpdFNvY2lhbFR3aXR0ZXIuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdUluZm8uc29jaWFsLnR3aXR0ZXIpO1xyXG4gICAgICAgICAgICBlZGl0U29jaWFsR29vZ2xlUGx1cy5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB1SW5mby5zb2NpYWwuZ29vZ2xlUGx1cyk7XHJcbiAgICAgICAgICAgIGVkaXRTb2NpYWxFbWFpbC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB1SW5mby5zb2NpYWwuZW1haWwpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHBob3RvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG90by1pdGVtc1wiKTtcclxuICAgICAgICAgICAgcGhvdG9Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBhbGJ1bUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxib20taXRlbXNcIik7XHJcbiAgICAgICAgICAgIHZhciBhZGRBbGJ1bSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG8tYnRuLnBob3RvLWJ0bi0tYWxidW1cIik7XHJcbiAgICAgICAgICAgIGFkZEFsYnVtID0gYWxidW1Db250YWluZXIucmVtb3ZlQ2hpbGQoYWRkQWxidW0pO1xyXG4gICAgICAgICAgICBhbGJ1bUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgYWxidW1Db250YWluZXIuYXBwZW5kQ2hpbGQoYWRkQWxidW0pO1xyXG5cclxuICAgICAgICAgICAgcGhvdG9zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICAgIHZhciBwaG90b0xpbmsgPSBcIi9tZWRpYS9cIiArIGl0ZW0udXNlcklkICsgXCIvYWxidW1zL1wiICsgaXRlbS5hbGJvbUlkICsgXCIvXCIgKyBpdGVtLl9pZCArIFwiLmpwZ1wiO1xyXG4gICAgICAgICAgICAgIHZhciB1c2VyTGluayA9IFwiL3VzZXIvXCIgKyBpdGVtLnVzZXJJZDtcclxuICAgICAgICAgICAgICB2YXIgYWxidW1MaW5rID0gXCIvYWxidW0vXCIgKyBpdGVtLmFsYm9tSWQ7XHJcbiAgICAgICAgICAgICAgdmFyIHVzZXJBdmF0YXIgPSBcIi9tZWRpYS9cIiArIGl0ZW0udXNlcklkICsgXCIvYXZhdGFyL2F2YXRhci5qcGdcIjtcclxuICAgICAgICAgICAgICAvL9Ch0L7Qt9C00LDQvdC40LUg0Y3Qu9C10LzQtdC90YLQsCDRhNC+0YLQvtCz0YDQsNGE0LjQuFxyXG4gICAgICAgICAgICAgIHZhciBwaG90b0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhcnRpY2xlJyk7XHJcbiAgICAgICAgICAgICAgcGhvdG9JdGVtLmNsYXNzTGlzdC5hZGQoJ3Bob3RvLWl0ZW0nKTtcclxuICAgICAgICAgICAgICBwaG90b0l0ZW0uY2xhc3NMaXN0LmFkZCgncGhvdG8taXRlbS0tdXNlcicpO1xyXG4gICAgICAgICAgICAgIHBob3RvSXRlbS5pbm5lckhUTUwgPSAnPGEgaHJlZj1cIiNcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgcGhvdG9MaW5rICsgJyk7XCIgY2xhc3M9XCJwaG90by1pdGVtX19waG90b1wiPjwvYT48ZGl2IGNsYXNzPVwicGhvdG8taXRlbV9faW5mb1wiPjxhIGhyZWY9XCInICsgdXNlckxpbmsgKyAnXCIgY2xhc3M9XCJwaG90by1pdGVtX191c2VyXCI+PGltZyBzcmM9XCInICsgdXNlckF2YXRhciArICdcIiBjbGFzcz1cInBob3RvLWl0ZW1fX3VzZXItcGhvdG9cIj48L2E+PGRpdiBjbGFzcz1cInBob3RvLWl0ZW1fX2Rlc2NyXCI+PGEgaHJlZj1cIicgKyBhbGJ1bUxpbmsgKyAnXCIgY2xhc3M9XCJwaG90by1pdGVtX190aXRsZVwiPicgKyBpdGVtLnRpdGxlICsgJzwvYT48ZGl2IGNsYXNzPVwicGhvdG8taXRlbV9fc29jaWFsXCI+PGRpdiBjbGFzcz1cInBob3RvLWl0ZW1fX2NvbW1lbnRzXCI+PGRpdiBjbGFzcz1cInBob3RvLWl0ZW1fX2NvbW1lbnRzLWljb25cIj48c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIxNy4yMDlweFwiIHZpZXdCb3g9XCIwIDAgMjAgMTcuMjA5XCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDIwIDE3LjIwOVwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PHBhdGggZmlsbD1cIiNkNmQ2ZDZcIiBkPVwiTTEwLjE1NCwwLjAwMkM0LjYzMi0wLjEwNywwLjA4NiwzLjI5NiwwLjAwMSw3LjYwMkMtMC4wMjgsOS4xLDAuNDg1LDEwLjUwOSwxLjQsMTEuNzE1bDAsMCBjMS41NzMsMi4wMjEtMC4xNDQsNS40OTQtMC4xNDQsNS40OTRsNS4wNjgtMi4xODNjMS4wOTIsMC4zNDUsMi4yNzksMC41NDYsMy41MjIsMC41N2M1LjUyMiwwLjEwOCwxMC4wNjgtMy4yOTQsMTAuMTUzLTcuNiBDMjAuMDg0LDMuNjksMTUuNjc2LDAuMTExLDEwLjE1NCwwLjAwMiBNNS43MjUsOS4wMzhjLTAuNjgsMC0xLjIzMi0wLjU1MS0xLjIzMi0xLjIzMXMwLjU1Mi0xLjIzMiwxLjIzMi0xLjIzMiBzMS4yMzIsMC41NTIsMS4yMzIsMS4yMzJTNi40MDYsOS4wMzgsNS43MjUsOS4wMzggTTkuODMxLDkuMDM4Yy0wLjY4MSwwLTEuMjMyLTAuNTUxLTEuMjMyLTEuMjMxUzkuMTUsNi41NzUsOS44MzEsNi41NzUgczEuMjMxLDAuNTUyLDEuMjMxLDEuMjMyUzEwLjUxMiw5LjAzOCw5LjgzMSw5LjAzOCBNMTMuOTM3LDkuMDM4Yy0wLjY4MSwwLTEuMjMxLTAuNTUxLTEuMjMxLTEuMjMxczAuNTUxLTEuMjMyLDEuMjMxLTEuMjMyIHMxLjIzMSwwLjU1MiwxLjIzMSwxLjIzMlMxNC42MTcsOS4wMzgsMTMuOTM3LDkuMDM4XCIvPjwvc3ZnPjwvZGl2PjxkaXYgY2xhc3M9XCJwaG90by1pdGVtX19jb21tZW50cy10ZXh0XCI+MDwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaG90by1pdGVtX19saWtlc1wiPjxkaXYgY2xhc3M9XCJwaG90by1pdGVtX19saWtlcy1pY29uXCI+PHN2ZyB2ZXJzaW9uPVwiMS4xXCIgaWQ9XCJMYXllcl8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHg9XCIwcHhcIiB5PVwiMHB4XCIgd2lkdGg9XCIyMHB4XCIgaGVpZ2h0PVwiMTYuODU4cHhcIiB2aWV3Qm94PVwiMCAwIDIwIDE2Ljg1OFwiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAyMCAxNi44NThcIiB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPjxwYXRoIGZpbGw9XCIjZDZkNmQ2XCIgZD1cIk0yMCw1LjI4N0MyMCwyLjM2NywxNy42MzMsMCwxNC43MTMsMEMxMi42NTMsMCwxMC44NzIsMS4xODEsMTAsMi45MDFDOS4xMjcsMS4xODEsNy4zNDgsMCw1LjI4NywwIEMyLjM2NywwLDAsMi4zNjcsMCw1LjI4N2MwLDUuNTIyLDguODY5LDExLjU3MSwxMCwxMS41NzFTMjAsMTAuODM2LDIwLDUuMjg3elwiLz48L3N2Zz48L2Rpdj48ZGl2IGNsYXNzPVwicGhvdG8taXRlbV9fbGlrZXMtdGV4dFwiPjA8L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48YSBocmVmPVwiJyArIGFsYnVtTGluayArICdcIiBjbGFzcz1cInBob3RvLWl0ZW1fX2FsYnVtXCI+PGRpdiBjbGFzcz1cInBob3RvLWl0ZW1fX2FsYnVtLWljb25cIj48c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIxOC4xODJweFwiIHZpZXdCb3g9XCIwIDAgMjAgMTguMTgyXCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDIwIDE4LjE4MlwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PGcgaWQ9XCJtaXVcIj48ZyBpZD1cIkFydGJvYXJkLTFcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTQ2Ny4wMDAwMDAsIC0yOTkuMDAwMDAwKVwiPjxnIGlkPVwic2xpY2VcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMjE1LjAwMDAwMCwgMTE5LjAwMDAwMClcIj48L2c+PHBhdGggaWQ9XCJlZGl0b3ItYWxidW0tY29sbGVjdGlvbi1nbHlwaFwiIGQ9XCJNNDY3LjEyOCwzMDIuNjM3Yy0wLjA3MSwwLTAuMTI4LDAuMDUzLTAuMTI4LDAuMTE3djE0LjMxMSBjMCwwLjA2NCwwLjA1NywwLjExNywwLjEyOCwwLjExN2gxOS43NDRjMC4wNzEsMCwwLjEyOC0wLjA1MywwLjEyOC0wLjExN3YtMTQuMzExYzAtMC4wNjUtMC4wNTctMC4xMTctMC4xMjgtMC4xMTdINDY3LjEyOHogTTQ2OC44MTgsMjk5djAuOTA5aDE2LjM2M1YyOTlINDY4LjgxOHogTTQ2Ny45MDksMzAwLjgxOHYwLjkwOWgxOC4xODJ2LTAuOTA5SDQ2Ny45MDl6XCIvPjwvZz48L2c+PC9zdmc+PC9kaXY+PGRpdiBjbGFzcz1cInBob3RvLWl0ZW1fX2FsYnVtLXRleHRcIj4nICsgaXRlbS5hbGJvbU5hbWUgKyAnPC9kaXY+PC9hPic7XHJcbiAgICAgICAgICAgICAgcGhvdG9Db250YWluZXIuYXBwZW5kQ2hpbGQocGhvdG9JdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhbGJvbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHVzZXJMaW5rID0gXCIvdXNlci9cIiArIGl0ZW0udXNlcklkO1xyXG4gICAgICAgICAgICAgIHZhciB1c2VyQXZhdGFyID0gXCIvbWVkaWEvXCIgKyBpdGVtLnVzZXJJZCArIFwiL2F2YXRhci9hdmF0YXIuanBnXCI7XHJcbiAgICAgICAgICAgICAgdmFyIGFsYnVtTGluayA9IFwiL2FsYnVtL1wiICsgaXRlbS5faWQ7XHJcbiAgICAgICAgICAgICAgdmFyIGFsYnVtVGh1bWJMaW5rID0gXCIvbWVkaWEvXCIgKyBpdGVtLnVzZXJJZCArIFwiL2FsYnVtcy9cIiArIGl0ZW0uX2lkICsgXCIvXCIgKyBpdGVtLnRodW1iICsgXCIuanBnXCI7XHJcblxyXG4gICAgICAgICAgICAgIC8v0KHQvtC30LTQsNC90LjQtSDRjdC70LXQvNC10L3RgtCwINCw0LvRjNCx0L7QvNCwXHJcbiAgICAgICAgICAgICAgdmFyIGFsYnVtSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2FydGljbGUnKTtcclxuICAgICAgICAgICAgICBhbGJ1bUl0ZW0uY2xhc3NMaXN0LmFkZCgnYWxidW0taXRlbScpO1xyXG4gICAgICAgICAgICAgIGFsYnVtSXRlbS5jbGFzc0xpc3QuYWRkKCdhbGJ1bS1pdGVtLS11c2VyJyk7XHJcbiAgICAgICAgICAgICAgYWxidW1JdGVtLmlubmVySFRNTCA9ICc8YSBocmVmPVwiJyArIGFsYnVtTGluayArICdcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgYWxidW1UaHVtYkxpbmsgKyAnKTtcIiBjbGFzcz1cImFsYnVtLWl0ZW1fX3Bob3RvXCI+PC9hPjxkaXYgY2xhc3M9XCJhbGJ1bS1pdGVtX19pbmZvXCI+PGJ1dHRvbiBpZD1cImFsYnVtSXRlbUVkaXRcIiBjbGFzcz1cImFsYnVtLWl0ZW1fX2VkaXRcIj48c3ZnIHZlcnNpb249XCIxLjFcIiBpZD1cIkxheWVyXzFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB3aWR0aD1cIjIwcHhcIiBoZWlnaHQ9XCIyMHB4XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIGVuYWJsZS1iYWNrZ3JvdW5kPVwibmV3IDAgMCAyMCAyMFwiIHhtbDpzcGFjZT1cInByZXNlcnZlXCI+PHBhdGggZD1cIk0xOC4zOTQsNi4zMTNjLTAuNTQ5LTAuOTA5LTEuMjI3LTEuNzk4LTIuMDU3LTIuNjIyYy0wLjgzOC0wLjgzMy0xLjc0My0xLjUxNi0yLjY2OS0yLjA2NEwxNS4yOTQsMCBjMCwwLDIuMzU0LDAsMy41MjksMS4xNzZDMjAsMi4zNTMsMjAsNC43MDYsMjAsNC43MDZMMTguMzk0LDYuMzEzeiBNNC43MDYsMjBIMHYtNC43MDZsMC41NjQtMC41NjUgYzAuOTU3LDAuNDU0LDEuOTA3LDEuMDksMi43NjMsMS45NDRjMC44NTYsMC44NTcsMS40OTIsMS44MDYsMS45NDMsMi43NjJMNC43MDYsMjB6IE0xNy4wMzYsNy42N0w2LjYyOCwxOC4wNzcgYy0wLjU0OS0wLjkwOC0xLjIyNy0xLjgtMi4wNTYtMi42MjNjLTAuODM4LTAuODM0LTEuNzQ0LTEuNTE2LTIuNjctMi4wNjNMMTIuMzMsMi45NjVjMC45NTYsMC40NSwxLjkwNywxLjA4NywyLjc2MiwxLjk0MiBDMTUuOTQ5LDUuNzY0LDE2LjU4Niw2LjcxNCwxNy4wMzYsNy42N3pcIi8+PC9zdmc+PC9idXR0b24+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFsYnVtLWl0ZW1fX3RpdGxlXCI+JyArIGl0ZW0udGl0bGUgKyAnPC9hPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgYWxidW1Db250YWluZXIuYXBwZW5kQ2hpbGQoYWxidW1JdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxidW1fX3VwbG9hZC5fX21vZGFsJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHZhciB1c2VyRWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckVkaXRCdG5cIik7XHJcbiAgICB2YXIgdXNlck9mZkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck9mZkJ0blwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LWhlYWRlclwiKTtcclxuICAgIHZhciB1c2VySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWhlYWRlclwiKTtcclxuICAgIHZhciB1c2VySGVhZGVyVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LWhlYWRlcl9fdG9wXCIpO1xyXG4gICAgdmFyIHVzZXJGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItZm9vdGVyXCIpO1xyXG4gICAgdmFyIHVzZXJTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItc2VhcmNoXCIpO1xyXG4gICAgdmFyIGVkaXRIZWFkZXJDYW5jZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VkaXRIZWFkZXJCdG5DYW5jZWxcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlclNhdmUgPSAkKFwiI2VkaXRIZWFkZXJCdG5TYXZlXCIpO1xyXG4gICAgdmFyIGVkaXRIZWFkZXJBdmF0YXIgPSAkKFwiI2VkaXRIZWFkZXJBdmF0YXJcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlckJnID0gJChcIiNlZGl0SGVhZGVyQmdcIik7XHJcblxyXG4gICAgdXNlckVkaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBlZGl0SGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHVzZXJIZWFkZXIuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgIHVzZXJTZWFyY2guc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICB9KTtcclxuICAgIGVkaXRIZWFkZXJDYW5jZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBlZGl0SGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHVzZXJIZWFkZXIuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgIHVzZXJTZWFyY2guc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICB9KTtcclxuICAgIC8v0KHQvtGG0LjQsNC70YzQvdGL0LUg0YHRgdGL0LvQutC4XHJcbiAgICB2YXIgc29jaWFsID0gJChcIi5lZGl0LWhlYWRlciAudXNlci1jYXJkX19zb2NpYWwtaWNvblwiKTtcclxuICAgIHZhciBzb2NpYWxTYXZlID0gJChcIi5zb2NpYWwtYnRuLS1zYXZlXCIpO1xyXG4gICAgdmFyIHNvY2lhbENhbmNlbCA9ICQoXCIuc29jaWFsLWJ0bi0tY2Fuc2VsXCIpO1xyXG4gICAgc29jaWFsLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBzb2NpYWwucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBzb2NpYWxTYXZlLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY3VycmVudCA9ICQoZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHNvY2lhbENhbmNlbC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGN1cnJlbnQgPSAkKGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICB2YXIgaW5wdXQgPSBjdXJyZW50LmZpbmQoXCIudXNlci1jYXJkX19zb2NpYWwtdGV4dFwiKTtcclxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0SGVhZGVyQXZhdGFyLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIHVzZXJFZGl0QXZhdGFyV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1lZGl0X19hdmF0YXItd3JhcHBlclwiKTtcclxuICAgICAgdmFyIHVzZXJFZGl0QXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWVkaXRfX2F2YXRhclwiKTtcclxuICAgICAgdmFyIHVzZXJBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItY2FyZF9fcGhvdG9cIik7XHJcbiAgICAgIHZhciBmaWxlID0gZS5jdXJyZW50VGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZGF0YVVybCA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS53aWR0aCA9IDEyODtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSBkYXRhVXJsO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1lZGl0X19hdmF0YXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgdXNlckVkaXRBdmF0YXJXcmFwLmFwcGVuZENoaWxkKGltYWdlKTtcclxuICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwidXNlci1lZGl0X19hdmF0YXJcIik7XHJcbiAgICAgICAgY3VycmVudEF2YXRhciA9IGRhdGFVcmw7XHJcbiAgICAgIH07XHJcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0SGVhZGVyQmcub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgdXNlckVkaXRCZyA9ICQoXCIjZWRpdEhlYWRlckJnXCIpO1xyXG4gICAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgdmFyIGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XHJcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGRhdGFVcmwgPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgdXNlckhlYWRlci5zdHlsZSA9IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZGF0YVVybCArIFwiKTtcIjtcclxuICAgICAgICB1c2VySGVhZGVyVG9wLnN0eWxlID0gXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBkYXRhVXJsICsgXCIpO1wiO1xyXG4gICAgICAgIHVzZXJGb290ZXIuc3R5bGUgPSBcImJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGRhdGFVcmwgKyBcIik7XCI7XHJcbiAgICAgICAgY3VycmVudEJnID0gZGF0YVVybDtcclxuICAgICAgfTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIC8v0J7QsdC90L7QstC70LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40YUg0LTQsNC90L3Ri9GFXHJcbiAgICBlZGl0SGVhZGVyU2F2ZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgkKCcjdXNlckVkaXRGb3JtJylbMF0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQXZhdGFyXCIpLnZhbHVlKTtcclxuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQmdcIikudmFsdWUpO1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL3Byb2ZpbGUnLFxyXG4gICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgdXNlclVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckVkaXRGb3JtXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0LDQu9GM0LHQvtC80LBcclxuICAgIHZhciBhZGRBbGJ1bUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG8tYnRuLnBob3RvLWJ0bi0tYWxidW1cIik7XHJcbiAgICB2YXIgYWRkQWxidW1Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1fX3VwbG9hZFwiKTtcclxuICAgIHZhciBhZGRBbGJ1bUNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1fX3VwbG9hZC5fX2NhbmNlbF9fYnRuXCIpO1xyXG4gICAgdmFyIGFkZEFsYnVtQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW1nLmFsYnVtX191cGxvYWRfX2Nsb3NlXCIpO1xyXG4gICAgdmFyIGFsYnVtVGh1bWJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxidW1VcGxvYWRUaHVtYlwiKTtcclxuICAgIHZhciBhbGJ1bVRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGJ1bV9fdXBsb2FkX19wcmV2aWV3XCIpO1xyXG4gICAgdmFyIGFkZEFsYnVtU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1fX3VwbG9hZC5fX3NhdmVfX2J0blwiKTtcclxuICAgIGFsYnVtVGh1bWJJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgdmFyIGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XHJcbiAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBkYXRhVXJsID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgIGFsYnVtVGh1bWIuc3JjID0gZGF0YVVybDtcclxuICAgICAgfTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGFkZEFsYnVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgYWRkQWxidW1Nb2RhbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRBbGJ1bUNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGFkZEFsYnVtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgYWRkQWxidW1DbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGFkZEFsYnVtTW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgYWRkQWxidW1TYXZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCQoJyNhZGRBbGJvbUZvcm0nKVswXSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL2FkZEFsYnVtJyxcclxuICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICAgICAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgIHVzZXJVcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
