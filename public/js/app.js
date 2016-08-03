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
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyU2lnbkluTGlua1wiKSkge1xyXG4gICAgLy/Qn9C10YDQtdCy0L7RgNC+0YJcclxuICAgIHZhciBsb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJTaWduSW5MaW5rXCIpLFxyXG4gICAgICAgIHJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblNpZ25VcExpbmtcIik7XHJcbiAgICAgICAgZmxpcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmxpcHBlclwiKTtcclxuICAgICAgICBoZWFkZXJMb2dpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyc19fbG9naW5cIiksXHJcbiAgICAgICAgaGVhZGVyUmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcnNfX3JlZ2lzdGVyXCIpO1xyXG4gICAgbG9naW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLmhlaWdodCA9IFwiMjAwcHhcIjtcclxuICAgICAgaGVhZGVyTG9naW4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgaGVhZGVyUmVnaXN0ZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgcmVnaXN0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZmxpcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICBmbGlwcGVyLnN0eWxlLmhlaWdodCA9IFwiMjgwcHhcIjtcclxuICAgICAgaGVhZGVyUmVnaXN0ZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgaGVhZGVyTG9naW4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgLy/QoNC10LPQuNGB0YLRgNCw0YbQuNGPXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciByZWdpc3RlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVnaXN0ZXItY3JlYXRlLWJ0blwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJOYW1lXCIpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJFbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJFbWFpbFwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJQYXNzXCIpO1xyXG4gICAgICAvL9Ch0LDQvCBmZXRjaFxyXG4gICAgICByZWdpc3RlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciByZWdpc3RlckluZm8gPSB7XHJcbiAgICAgICAgICBcIm5hbWVcIjogcmVnaXN0ZXJOYW1lLnZhbHVlLFxyXG4gICAgICAgICAgXCJlbWFpbFwiOiByZWdpc3RlckVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOiByZWdpc3RlclBhc3MudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v0J3QsNGB0YLRgNC+0LnQutC4INC00LvRjyBmZXRjaFxyXG4gICAgICAgIG15SGVhZGVycyA9IG5ldyBIZWFkZXJzKHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIG15SW5pdCA9IHsgXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGhlYWRlcnM6IG15SGVhZGVycyxcclxuICAgICAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgICAgIGNhY2hlOiAnZGVmYXVsdCcsXHJcbiAgICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZWdpc3RlckluZm8pXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmZXRjaCgnL3JlZ2lzdGVyJywgbXlJbml0KS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiAgICAvL9CQ0LLRgtC+0YDQuNC30LDRhtC40Y9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGxvZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2dpbi1mb3JtX19sb2dpbi1idG5cIiksXHJcbiAgICAgICAgICBsb2dpbkVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbkVtYWlsXCIpLFxyXG4gICAgICAgICAgbG9naW5QYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblBhc3NcIik7XHJcbiAgICAgIC8v0KHQsNC8IGZldGNoXHJcbiAgICAgIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGF1dGhJbmZvID0ge1xyXG4gICAgICAgICAgXCJlbWFpbFwiOiBsb2dpbkVtYWlsLnZhbHVlLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOiBsb2dpblBhc3MudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBhdXRoSW5mbyA9IEpTT04uc3RyaW5naWZ5KGF1dGhJbmZvKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL2F1dGgnLFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgZGF0YTogYXV0aEluZm8sXHJcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsb2NhdGlvbiA9ICcvdXNlcic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSgpKTtcclxuICB9XHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyRWRpdEJ0blwiKSkge1xyXG4gICAgdmFyIHVzZXJFZGl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyRWRpdEJ0blwiKTtcclxuICAgIHZhciB1c2VyT2ZmQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyT2ZmQnRuXCIpO1xyXG4gICAgdmFyIGVkaXRIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtaGVhZGVyXCIpO1xyXG4gICAgdmFyIHVzZXJIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItaGVhZGVyXCIpO1xyXG4gICAgdmFyIHVzZXJIZWFkZXJUb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtaGVhZGVyX190b3BcIik7XHJcbiAgICB2YXIgdXNlckZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1mb290ZXJcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1zZWFyY2hcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlckNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdEhlYWRlckJ0bkNhbmNlbFwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyU2F2ZSA9ICQoXCIjZWRpdEhlYWRlckJ0blNhdmVcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlckF2YXRhciA9ICQoXCIjZWRpdEhlYWRlckF2YXRhclwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyQmcgPSAkKFwiI2VkaXRIZWFkZXJCZ1wiKTtcclxuXHJcbiAgICB1c2VyRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgIH0pO1xyXG4gICAgZWRpdEhlYWRlckNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH0pO1xyXG4gICAgLy/QodC+0YbQuNCw0LvRjNC90YvQtSDRgdGB0YvQu9C60LhcclxuICAgIHZhciBzb2NpYWwgPSAkKFwiLmVkaXQtaGVhZGVyIC51c2VyLWNhcmRfX3NvY2lhbC1pY29uXCIpO1xyXG4gICAgdmFyIHNvY2lhbFNhdmUgPSAkKFwiLnNvY2lhbC1idG4tLXNhdmVcIik7XHJcbiAgICB2YXIgc29jaWFsQ2FuY2VsID0gJChcIi5zb2NpYWwtYnRuLS1jYW5zZWxcIik7XHJcbiAgICBzb2NpYWwub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHNvY2lhbC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHNvY2lhbFNhdmUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gJChlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc29jaWFsQ2FuY2VsLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY3VycmVudCA9ICQoZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgIHZhciBpbnB1dCA9IGN1cnJlbnQuZmluZChcIi51c2VyLWNhcmRfX3NvY2lhbC10ZXh0XCIpO1xyXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICAgIGVkaXRIZWFkZXJBdmF0YXIub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgdXNlckVkaXRBdmF0YXJXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWVkaXRfX2F2YXRhci13cmFwcGVyXCIpO1xyXG4gICAgICB2YXIgdXNlckVkaXRBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzZXItZWRpdF9fYXZhdGFyXCIpO1xyXG4gICAgICB2YXIgdXNlckF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1jYXJkX19waG90b1wiKTtcclxuICAgICAgdmFyIGZpbGUgPSBlLmN1cnJlbnRUYXJnZXQuZmlsZXNbMF07XHJcbiAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBkYXRhVXJsID0gZS50YXJnZXQucmVzdWx0O1xyXG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLndpZHRoID0gMTI4O1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLnNyYyA9IGRhdGFVcmw7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWVkaXRfX2F2YXRhclwiKS5yZW1vdmUoKTtcclxuICAgICAgICB1c2VyRWRpdEF2YXRhcldyYXAuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJ1c2VyLWVkaXRfX2F2YXRhclwiKTtcclxuICAgICAgfTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIGVkaXRIZWFkZXJCZy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHZhciB1c2VyRWRpdEJnID0gJChcIiNlZGl0SGVhZGVyQmdcIik7XHJcbiAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICB2YXIgZmlsZSA9IGUuY3VycmVudFRhcmdldC5maWxlc1swXTtcclxuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgZGF0YVVybCA9IGUudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICB1c2VySGVhZGVyLnN0eWxlID0gXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBkYXRhVXJsICsgXCIpO1wiO1xyXG4gICAgICAgIHVzZXJIZWFkZXJUb3Auc3R5bGUgPSBcImJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIGRhdGFVcmwgKyBcIik7XCI7XHJcbiAgICAgICAgdXNlckZvb3Rlci5zdHlsZSA9IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgZGF0YVVybCArIFwiKTtcIjtcclxuICAgICAgfTtcclxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxuICAgIC8v0J7QsdC90L7QstC70LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40YUg0LTQsNC90L3Ri9GFXHJcbiAgICBlZGl0SGVhZGVyU2F2ZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgkKCcjdXNlckVkaXRGb3JtJylbMF0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQXZhdGFyXCIpLnZhbHVlKTtcclxuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQmdcIikudmFsdWUpO1xyXG4gICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgdXJsOiAnL3Byb2ZpbGUnLFxyXG4gICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8v0JTQvtCx0LDQstC70LXQvdC40LUg0LDQu9GM0LHQvtC80LBcclxuICAgIHZhciBhZGRBbGJ1bUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG8tYnRuLnBob3RvLWJ0bi0tYWxidW1cIik7XHJcbiAgICB2YXIgYWRkQWxidW1Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1fX3VwbG9hZFwiKTtcclxuICAgIHZhciBhZGRBbGJ1bUNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1fX3VwbG9hZC5fX2NhbmNlbF9fYnRuXCIpO1xyXG4gICAgdmFyIGFkZEFsYnVtQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW1nLmFsYnVtX191cGxvYWRfX2Nsb3NlXCIpO1xyXG4gICAgdmFyIGFsYnVtVGh1bWJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxidW1VcGxvYWRUaHVtYlwiKTtcclxuICAgIHZhciBhbGJ1bVRodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGJ1bV9fdXBsb2FkX19wcmV2aWV3XCIpO1xyXG4gICAgYWxidW1UaHVtYklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICB2YXIgZmlsZSA9IGUuY3VycmVudFRhcmdldC5maWxlc1swXTtcclxuICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGRhdGFVcmwgPSBlLnRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgYWxidW1UaHVtYi5zcmMgPSBkYXRhVXJsO1xyXG4gICAgICB9O1xyXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH0pO1xyXG4gICAgYWRkQWxidW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBhZGRBbGJ1bU1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIGFkZEFsYnVtQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgYWRkQWxidW1Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRBbGJ1bUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgYWRkQWxidW1Nb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
