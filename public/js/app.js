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
    //Обновление пользовательских данных
    editHeaderSave.on("click", function() {
      var data = new FormData($('#userEditForm')[0]);
      console.log(data);
      $.ajax({
          url: './work',
          type: 'POST',
          data: data,
          cache: false,
          processData: false,
          contentType: false,
          success: function(data) {
            if(data.isValid===true) {
              area.classList.add("admin-block-area--active");
              modal.classList.add("admin-modal--active");
              $('#workForm')[0].reset();
            }
            if(data.isValid===false) {
              area.classList.add("admin-block-area--active");
              modal.classList.add("admin-modal--active");
              modalText.innerHTML = "Похоже файл не смог загрузится(";
              $('#workForm')[0].reset();
            }
          }
      });
    });
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJTaWduSW5MaW5rXCIpKSB7XHJcbiAgICAvL9Cf0LXRgNC10LLQvtGA0L7RglxyXG4gICAgdmFyIGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclNpZ25JbkxpbmtcIiksXHJcbiAgICAgICAgcmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luU2lnblVwTGlua1wiKTtcclxuICAgICAgICBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mbGlwcGVyXCIpO1xyXG4gICAgICAgIGhlYWRlckxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJzX19sb2dpblwiKSxcclxuICAgICAgICBoZWFkZXJSZWdpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhZGVyc19fcmVnaXN0ZXJcIik7XHJcbiAgICBsb2dpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBmbGlwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgIGZsaXBwZXIuc3R5bGUuaGVpZ2h0ID0gXCIyMDBweFwiO1xyXG4gICAgICBoZWFkZXJMb2dpbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBoZWFkZXJSZWdpc3Rlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICByZWdpc3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBmbGlwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgIGZsaXBwZXIuc3R5bGUuaGVpZ2h0ID0gXCIyODBweFwiO1xyXG4gICAgICBoZWFkZXJSZWdpc3Rlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBoZWFkZXJMb2dpbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICAvL9Cg0LXQs9C40YHRgtGA0LDRhtC40Y9cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHJlZ2lzdGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWdpc3Rlci1jcmVhdGUtYnRuXCIpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlck5hbWVcIiksXHJcbiAgICAgICAgICByZWdpc3RlckVtYWlsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlckVtYWlsXCIpLFxyXG4gICAgICAgICAgcmVnaXN0ZXJQYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclBhc3NcIik7XHJcbiAgICAgIC8v0KHQsNC8IGZldGNoXHJcbiAgICAgIHJlZ2lzdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHJlZ2lzdGVySW5mbyA9IHtcclxuICAgICAgICAgIFwibmFtZVwiOiByZWdpc3Rlck5hbWUudmFsdWUsXHJcbiAgICAgICAgICBcImVtYWlsXCI6IHJlZ2lzdGVyRW1haWwudmFsdWUsXHJcbiAgICAgICAgICBcInBhc3N3b3JkXCI6IHJlZ2lzdGVyUGFzcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/QndCw0YHRgtGA0L7QudC60Lgg0LTQu9GPIGZldGNoXHJcbiAgICAgICAgbXlIZWFkZXJzID0gbmV3IEhlYWRlcnMoe1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgbXlJbml0ID0geyBcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgaGVhZGVyczogbXlIZWFkZXJzLFxyXG4gICAgICAgICAgbW9kZTogJ2NvcnMnLFxyXG4gICAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcclxuICAgICAgICAgIHJlZGlyZWN0OiAnZm9sbG93JyxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlZ2lzdGVySW5mbylcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZldGNoKCcvcmVnaXN0ZXInLCBteUluaXQpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSgpKTtcclxuICAgIC8v0JDQstGC0L7RgNC40LfQsNGG0LjRj1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgbG9naW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvZ2luLWZvcm1fX2xvZ2luLWJ0blwiKSxcclxuICAgICAgICAgIGxvZ2luRW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luRW1haWxcIiksXHJcbiAgICAgICAgICBsb2dpblBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luUGFzc1wiKTtcclxuICAgICAgLy/QodCw0LwgZmV0Y2hcclxuICAgICAgbG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYXV0aEluZm8gPSB7XHJcbiAgICAgICAgICBcImVtYWlsXCI6IGxvZ2luRW1haWwudmFsdWUsXHJcbiAgICAgICAgICBcInBhc3N3b3JkXCI6IGxvZ2luUGFzcy52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGF1dGhJbmZvID0gSlNPTi5zdHJpbmdpZnkoYXV0aEluZm8pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICB1cmw6ICcvYXV0aCcsXHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICBkYXRhOiBhdXRoSW5mbyxcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uID0gJy91c2VyJztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG4gIH1cclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJFZGl0QnRuXCIpKSB7XHJcbiAgICB2YXIgdXNlckVkaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJFZGl0QnRuXCIpO1xyXG4gICAgdmFyIHVzZXJPZmZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJPZmZCdG5cIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC1oZWFkZXJcIik7XHJcbiAgICB2YXIgdXNlckhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1oZWFkZXJcIik7XHJcbiAgICB2YXIgdXNlclNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXNlci1zZWFyY2hcIik7XHJcbiAgICB2YXIgZWRpdEhlYWRlckNhbmNlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdEhlYWRlckJ0bkNhbmNlbFwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyU2F2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZWRpdEhlYWRlckJ0blNhdmVcIik7XHJcbiAgICB1c2VyRWRpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgIH0pO1xyXG4gICAgZWRpdEhlYWRlckNhbmNlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGVkaXRIZWFkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgdXNlckhlYWRlci5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgdXNlclNlYXJjaC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgIH0pO1xyXG4gICAgLy/QodC+0YbQuNCw0LvRjNC90YvQtSDRgdGB0YvQu9C60LhcclxuICAgIHZhciBzb2NpYWwgPSAkKFwiLmVkaXQtaGVhZGVyIC51c2VyLWNhcmRfX3NvY2lhbC1pY29uXCIpO1xyXG4gICAgdmFyIHNvY2lhbFNhdmUgPSAkKFwiLnNvY2lhbC1idG4tLXNhdmVcIik7XHJcbiAgICB2YXIgc29jaWFsQ2FuY2VsID0gJChcIi5zb2NpYWwtYnRuLS1jYW5zZWxcIik7XHJcbiAgICBzb2NpYWwub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIHNvY2lhbC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHNvY2lhbFNhdmUub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gJChlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgY3VycmVudC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc29jaWFsQ2FuY2VsLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB2YXIgY3VycmVudCA9ICQoZS5jdXJyZW50VGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XHJcbiAgICAgIHZhciBpbnB1dCA9IGN1cnJlbnQuZmluZChcIi51c2VyLWNhcmRfX3NvY2lhbC10ZXh0XCIpO1xyXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9KTtcclxuICAgIC8v0J7QsdC90L7QstC70LXQvdC40LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GM0YHQutC40YUg0LTQsNC90L3Ri9GFXHJcbiAgICBlZGl0SGVhZGVyU2F2ZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgZGF0YSA9IG5ldyBGb3JtRGF0YSgkKCcjdXNlckVkaXRGb3JtJylbMF0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHVybDogJy4vd29yaycsXHJcbiAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZihkYXRhLmlzVmFsaWQ9PT10cnVlKSB7XHJcbiAgICAgICAgICAgICAgYXJlYS5jbGFzc0xpc3QuYWRkKFwiYWRtaW4tYmxvY2stYXJlYS0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhZG1pbi1tb2RhbC0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAgICQoJyN3b3JrRm9ybScpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZGF0YS5pc1ZhbGlkPT09ZmFsc2UpIHtcclxuICAgICAgICAgICAgICBhcmVhLmNsYXNzTGlzdC5hZGQoXCJhZG1pbi1ibG9jay1hcmVhLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcImFkbWluLW1vZGFsLS1hY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgbW9kYWxUZXh0LmlubmVySFRNTCA9IFwi0J/QvtGF0L7QttC1INGE0LDQudC7INC90LUg0YHQvNC+0LMg0LfQsNCz0YDRg9C30LjRgtGB0Y8oXCI7XHJcbiAgICAgICAgICAgICAgJCgnI3dvcmtGb3JtJylbMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
