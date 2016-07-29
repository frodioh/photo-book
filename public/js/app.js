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
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclNpZ25JbkxpbmtcIikpIHtcclxuICAgIC8v0J/QtdGA0LXQstC+0YDQvtGCXHJcbiAgICB2YXIgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyU2lnbkluTGlua1wiKSxcclxuICAgICAgICByZWdpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5TaWduVXBMaW5rXCIpO1xyXG4gICAgICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZsaXBwZXJcIik7XHJcbiAgICAgICAgaGVhZGVyTG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcnNfX2xvZ2luXCIpLFxyXG4gICAgICAgIGhlYWRlclJlZ2lzdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJzX19yZWdpc3RlclwiKTtcclxuICAgIGxvZ2luLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgZmxpcHBlci5zdHlsZS5oZWlnaHQgPSBcIjIwMHB4XCI7XHJcbiAgICAgIGhlYWRlckxvZ2luLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGhlYWRlclJlZ2lzdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHJlZ2lzdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgZmxpcHBlci5zdHlsZS5oZWlnaHQgPSBcIjI4MHB4XCI7XHJcbiAgICAgIGhlYWRlclJlZ2lzdGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGhlYWRlckxvZ2luLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIC8v0KDQtdCz0LjRgdGC0YDQsNGG0LjRj1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVnaXN0ZXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlZ2lzdGVyLWNyZWF0ZS1idG5cIiksXHJcbiAgICAgICAgICByZWdpc3Rlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyTmFtZVwiKSxcclxuICAgICAgICAgIHJlZ2lzdGVyRW1haWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyRW1haWxcIiksXHJcbiAgICAgICAgICByZWdpc3RlclBhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyUGFzc1wiKTtcclxuICAgICAgLy/QodCw0LwgZmV0Y2hcclxuICAgICAgcmVnaXN0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcmVnaXN0ZXJJbmZvID0ge1xyXG4gICAgICAgICAgXCJuYW1lXCI6IHJlZ2lzdGVyTmFtZS52YWx1ZSxcclxuICAgICAgICAgIFwiZW1haWxcIjogcmVnaXN0ZXJFbWFpbC52YWx1ZSxcclxuICAgICAgICAgIFwicGFzc3dvcmRcIjogcmVnaXN0ZXJQYXNzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL9Cd0LDRgdGC0YDQvtC50LrQuCDQtNC70Y8gZmV0Y2hcclxuICAgICAgICBteUhlYWRlcnMgPSBuZXcgSGVhZGVycyh7XHJcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBteUluaXQgPSB7IFxyXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICBoZWFkZXJzOiBteUhlYWRlcnMsXHJcbiAgICAgICAgICBtb2RlOiAnY29ycycsXHJcbiAgICAgICAgICBjYWNoZTogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgcmVkaXJlY3Q6ICdmb2xsb3cnLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVnaXN0ZXJJbmZvKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZmV0Y2goJy9yZWdpc3RlcicsIG15SW5pdCkudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KCkpO1xyXG4gICAgLy/QkNCy0YLQvtGA0LjQt9Cw0YbQuNGPXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBsb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG9naW4tZm9ybV9fbG9naW4tYnRuXCIpLFxyXG4gICAgICAgICAgbG9naW5FbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5FbWFpbFwiKSxcclxuICAgICAgICAgIGxvZ2luUGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5QYXNzXCIpO1xyXG4gICAgICAvL9Ch0LDQvCBmZXRjaFxyXG4gICAgICBsb2dpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhdXRoSW5mbyA9IHtcclxuICAgICAgICAgIFwiZW1haWxcIjogbG9naW5FbWFpbC52YWx1ZSxcclxuICAgICAgICAgIFwicGFzc3dvcmRcIjogbG9naW5QYXNzLnZhbHVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgYXV0aEluZm8gPSBKU09OLnN0cmluZ2lmeShhdXRoSW5mbyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgIHVybDogJy9hdXRoJyxcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgIGRhdGE6IGF1dGhJbmZvLFxyXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbG9jYXRpb24gPSAnL3VzZXInO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0oKSk7XHJcbiAgfVxyXG4gIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckVkaXRCdG5cIikpIHtcclxuICAgIHZhciB1c2VyRWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlckVkaXRCdG5cIik7XHJcbiAgICB2YXIgdXNlck9mZkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck9mZkJ0blwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LWhlYWRlclwiKTtcclxuICAgIHZhciB1c2VySGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLWhlYWRlclwiKTtcclxuICAgIHZhciB1c2VyU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c2VyLXNlYXJjaFwiKTtcclxuICAgIHZhciBlZGl0SGVhZGVyQ2FuY2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQnRuQ2FuY2VsXCIpO1xyXG4gICAgdmFyIGVkaXRIZWFkZXJTYXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlZGl0SGVhZGVyQnRuU2F2ZVwiKTtcclxuICAgIHVzZXJFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgZWRpdEhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB1c2VySGVhZGVyLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICB1c2VyU2VhcmNoLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgfSk7XHJcbiAgICBlZGl0SGVhZGVyQ2FuY2VsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgZWRpdEhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB1c2VySGVhZGVyLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICB1c2VyU2VhcmNoLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgfSk7XHJcbiAgICAvL9Ch0L7RhtC40LDQu9GM0L3Ri9C1INGB0YHRi9C70LrQuFxyXG4gICAgdmFyIHNvY2lhbCA9ICQoXCIuZWRpdC1oZWFkZXIgLnVzZXItY2FyZF9fc29jaWFsLWljb25cIik7XHJcbiAgICB2YXIgc29jaWFsU2F2ZSA9ICQoXCIuc29jaWFsLWJ0bi0tc2F2ZVwiKTtcclxuICAgIHZhciBzb2NpYWxDYW5jZWwgPSAkKFwiLnNvY2lhbC1idG4tLWNhbnNlbFwiKTtcclxuICAgIHNvY2lhbC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgc29jaWFsLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgc29jaWFsU2F2ZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdmFyIGN1cnJlbnQgPSAkKGUuY3VycmVudFRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICBjdXJyZW50LnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICBzb2NpYWxDYW5jZWwub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHZhciBjdXJyZW50ID0gJChlLmN1cnJlbnRUYXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcclxuICAgICAgdmFyIGlucHV0ID0gY3VycmVudC5maW5kKFwiLnVzZXItY2FyZF9fc29jaWFsLXRleHRcIik7XHJcbiAgICAgIGN1cnJlbnQucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIH0pO1xyXG4gIH1cclxufTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
